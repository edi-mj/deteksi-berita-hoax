document.getElementById('predictionForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // UI References
    const btn = document.querySelector('button[type="submit"]');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const resultArea = document.getElementById('resultArea');
    const resultCard = document.getElementById('resultCard');
    const resultTitle = document.getElementById('resultTitle');
    const resultBadge = document.getElementById('resultBadge');
    const resultMessage = document.getElementById('resultMessage');
    const resultIcon = document.getElementById('resultIcon');
    const confidenceBar = document.getElementById('confidenceBar');
    const confidenceValue = document.getElementById('confidenceValue');

    // Input values
    const titleInput = document.getElementById('title').value;
    const contentInput = document.getElementById('content').value;

    // Loading State
    btn.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    btnLoader.classList.add('flex');
    resultArea.classList.add('hidden'); // Hide previous result

    // Update Text to warn about cold start
    const originalBtnText = btnText.innerHTML;

    try {
        // API URL
        const API_URL = "https://edi-mj-hoax-detection-api.hf.space/predict";

        // Construct Request Body (Note: API expects 'judul' and 'isi')
        const requestBody = {
            judul: titleInput,
            isi: contentInput
        };

        console.log("Sending request:", requestBody);

        // Fetch Request
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        // PARSE RESPONSE
        // Anticipating format based on user request: { "prediction": "Hoax", "confidence": 0.XX } 
        // OR { "label": "Hoax", "score": 0.XX }
        // We will normalize it.

        let prediction = "";
        let confidence = 0;

        // Try to find prediction
        if (data.prediction) prediction = data.prediction;
        else if (data.label) prediction = data.label;
        else if (data.result) prediction = data.result;
        else if (data.class) prediction = data.class;

        // Try to find confidence/score
        if (data.confidence !== undefined) confidence = parseFloat(data.confidence);
        else if (data.score !== undefined) confidence = parseFloat(data.score);
        else if (data.probability !== undefined) confidence = parseFloat(data.probability);
        else if (data.percentage !== undefined) confidence = parseFloat(data.percentage);

        // Normalize confidence to 0-100 range if it comes in as 0-1
        if (confidence <= 1 && confidence > 0) {
            confidence = Math.round(confidence * 100);
        } else {
            confidence = Math.round(confidence);
        }

        // Determine Valid vs Hoax based on String content (Case insensitive)
        const lowerPred = prediction.toLowerCase();
        const isHoax = lowerPred.includes('hoax') || lowerPred.includes('fake') || lowerPred.includes('bohong');

        // Show Result Area
        resultArea.classList.remove('hidden');

        if (isHoax) {
            // HOAX STYLE
            resultCard.className = "rounded-2xl p-6 sm:p-8 border border-red-500/30 bg-gradient-to-br from-slate-900 to-red-900/20 shadow-lg shadow-red-900/10 animate-fade-in";
            resultIcon.className = "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner bg-red-500/10 text-red-500 ring-1 ring-red-500/20";
            resultIcon.innerHTML = '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>';

            resultTitle.className = "text-2xl font-bold text-red-400 tracking-tight";
            resultTitle.textContent = "Terindikasi HOAX";

            resultBadge.className = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border bg-red-500/10 border-red-500/20 text-red-400";
            resultBadge.textContent = "Berisiko Tinggi";

            resultMessage.innerHTML = `
                <span class="block mb-2 font-semibold text-white">Sistem mendeteksi indikasi ketidakbenaran.</span>
                Model AI memprediksi berita ini sebagai <strong>HOAX</strong>. 
                Pastikan untuk memeriksa kembali informasi ini melalui sumber-sumber resmi atau situs pencari fakta.
                <br><br>
                <span class="text-xs text-slate-400">Raw Prediction: ${prediction}</span>
            `;

            confidenceBar.className = "h-full rounded-full transition-all duration-1000 ease-out relative bg-gradient-to-r from-red-600 to-orange-600";
        } else {
            // VALID STYLE
            resultCard.className = "rounded-2xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-br from-slate-900 to-emerald-900/20 shadow-lg shadow-emerald-900/10 animate-fade-in";
            resultIcon.className = "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20";
            resultIcon.innerHTML = '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

            resultTitle.className = "text-2xl font-bold text-emerald-400 tracking-tight";
            resultTitle.textContent = "Terindikasi VALID";

            resultBadge.className = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
            resultBadge.textContent = "Dapat Dipercaya";

            resultMessage.innerHTML = `
                <span class="block mb-2 font-semibold text-white">Berita ini terdeteksi Valid.</span>
                Model AI memprediksi bahwa konten berita ini konsisten dengan pola berita <strong>FAKTA</strong>.
                Namun, tetaplah kritis dan verifikasi sumbernya.
                <br><br>
                <span class="text-xs text-slate-400">Raw Prediction: ${prediction}</span>
            `;

            confidenceBar.className = "h-full rounded-full transition-all duration-1000 ease-out relative bg-gradient-to-r from-emerald-500 to-teal-500";
        }

        // Animate Bar
        setTimeout(() => {
            confidenceBar.style.width = `${confidence}%`;
            confidenceValue.textContent = `${confidence}%`;
        }, 100);

        // Scroll to result
        setTimeout(() => {
            resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);

    } catch (error) {
        console.error("Prediction Error:", error);
        alert("Terjadi kesalahan saat menghubungi server: " + error.message + ". Silakan coba lagi.");
    } finally {
        // RESET STATE
        btn.disabled = false;
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        btnLoader.classList.remove('flex');
    }
});
