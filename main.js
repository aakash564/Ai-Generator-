const UI = {
    promptInput: document.getElementById('prompt-input'),
    engineSelect: document.getElementById('engine-select'),
    generateButton: document.getElementById('generate-button'),
    resultImage: document.getElementById('result-image'),
    loadingOverlay: document.getElementById('loading-overlay'),
    placeholderText: document.getElementById('placeholder-text'),
};

const INITIAL_PROMPT = "A scalable, unified API gateway design diagram incorporating AWS S3/EC2/SageMaker, Azure Blob/Cognitive Services, and GCP Cloud Storage/Vertex AI, isometric vector art.";

let isGenerating = false;

/**
 * Initializes the application state and event listeners.
 */
function initializeApp() {
    UI.promptInput.value = INITIAL_PROMPT;
    UI.generateButton.addEventListener('click', handleGenerate);
}

/**
 * Updates the UI state (loading/enabled/disabled).
 * @param {boolean} loading 
 */
function setLoadingState(loading) {
    isGenerating = loading;
    UI.generateButton.disabled = loading;
    UI.promptInput.disabled = loading;
    UI.engineSelect.disabled = loading;
    
    if (loading) {
        UI.loadingOverlay.classList.remove('hidden');
        UI.placeholderText.classList.add('hidden');
        UI.resultImage.classList.add('hidden');
    } else {
        UI.loadingOverlay.classList.add('hidden');
    }
}

/**
 * Handles the image generation process.
 */
async function handleGenerate() {
    if (isGenerating) return;

    const prompt = UI.promptInput.value.trim();
    const engine = UI.engineSelect.value;

    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }

    setLoadingState(true);
    
    let effectivePrompt = prompt;
    
    // Simulate model variation based on selected engine, aligning with potential platform strengths
    switch (engine) {
        case 'aws':
            // AWS SageMaker emphasis: Training, optimization, performance
            effectivePrompt += ", highly optimized for training and quick inference response time.";
            break;
        case 'azure':
            // Azure Cognitive Services emphasis: Feature integration, specific recognition/manipulation tasks
            effectivePrompt += ", subtle photorealism applied, focusing on defined objects.";
            break;
        case 'gcp':
        default:
            // GCP Vertex AI emphasis: Latest generative models, multimodal, complexity
            effectivePrompt += ", cinematic render, hyper-detailed concept style.";
            break;
    }


    try {
        console.log(`Sending request to Unified API via ${engine} backend...`);
        
        // websim.imageGen simulates the high-quality generation process using the LLM capability
        const result = await websim.imageGen({
            prompt: effectivePrompt,
            aspect_ratio: "4:3",
        });

        if (result && result.url) {
            UI.resultImage.src = result.url;
            UI.resultImage.classList.remove('hidden');
        } else {
            UI.placeholderText.textContent = "Error: Image generation failed or returned no URL.";
            UI.placeholderText.classList.remove('hidden');
        }

    } catch (error) {
        console.error("Image generation error:", error);
        UI.placeholderText.textContent = `Error during generation: ${error.message}. Please try again.`;
        UI.placeholderText.classList.remove('hidden');
    } finally {
        setLoadingState(false);
    }
}

initializeApp();
