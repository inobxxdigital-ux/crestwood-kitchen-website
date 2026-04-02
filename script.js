let currentStep = 1;
const totalSteps = 5;

document.addEventListener('DOMContentLoaded', function() {
    loadBookingProgress();
    updateProgressUI();
});

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('active');
}

function handleChatbotKeypress(event) {
    if (event.key === 'Enter') {
        sendChatbotMessage();
    }
}

function sendChatbotMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    addUserMessage(message);
    input.value = '';
    
    setTimeout(() => {
        processChatbotResponse(message);
    }, 500);
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-message user';
    messageDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addBotMessage(message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-message bot';
    messageDiv.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function chatbotQuickAction(action) {
    const messages = {
        quote: "Great! I'd be happy to help you get a quote. Click the 'Get a Quote' button to start our simple 5-step form.",
        cost: "Kitchen remodel costs vary based on scope. A basic remodel starts around $20,000, while premium full remodels range $50,000-$150,000+. Our team can provide a detailed estimate after consulting with you.",
        timeline: "Most full kitchen remodels take 6-10 weeks. Simpler projects like cabinet refacing can be done in 2-3 weeks. We'll give you a specific timeline after assessing your project.",
        contact: "You can reach us at:\n\n📞 (312) 555-8742\n📧 info@crestwoodkitchen.com\n🏠 2847 Maple Street, Chicago, IL 60614\n\nMon-Fri: 8am - 6pm\nSat: 9am - 2pm"
    };
    
    addBotMessage(messages[action]);
}

function processChatbotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
        cost: "Kitchen remodel costs vary based on size and materials. A basic remodel starts around $20,000, while premium full remodels range $50,000-$150,000+. Would you like to start a quote request?",
        price: "Kitchen remodel costs vary based on size and materials. A basic remodel starts around $20,000, while premium full remodels range $50,000-$150,000+. Would you like to start a quote request?",
        budget: "Kitchen remodel costs vary based on size and materials. A basic remodel starts around $20,000, while premium full remodels range $50,000-$150,000+. Would you like to start a quote request?",
        
        timeline: "Most full kitchen remodels take 6-10 weeks depending on complexity. Simpler projects like cabinet refacing can be completed in 2-3 weeks. Would you like to schedule a consultation?",
        time: "Most full kitchen remodels take 6-10 weeks depending on complexity. Simpler projects like cabinet refacing can be completed in 2-3 weeks. Would you like to schedule a consultation?",
        duration: "Most full kitchen remodels take 6-10 weeks depending on complexity. Simpler projects like cabinet refacing can be completed in 2-3 weeks. Would you like to schedule a consultation?",
        weeks: "Most full kitchen remodels take 6-10 weeks depending on complexity. Simpler projects like cabinet refacing can be completed in 2-3 weeks. Would you like to schedule a consultation?",
        
        warranty: "We offer a comprehensive 5-year warranty on all workmanship, plus manufacturer warranties on materials and appliances. This is one of the best warranties in the industry!",
        guarantee: "We offer a comprehensive 5-year warranty on all workmanship, plus manufacturer warranties on materials and appliances. This is one of the best warranties in the industry!",
        
        quote: "Great! Let me open the quote form for you.",
        estimate: "Great! Let me open the quote form for you.",
        booking: "Great! Let me open the quote form for you.",
        start: "Great! Let me open the quote form for you.",
        
        contact: "You can reach us at (312) 555-8742 or info@crestwoodkitchen.com. We're located at 2847 Maple Street, Chicago, IL 60614. Mon-Fri 8am-6pm, Sat 9am-2pm.",
        phone: "You can reach us at (312) 555-8742. We're open Mon-Fri 8am-6pm, Sat 9am-2pm.",
        email: "You can email us at info@crestwoodkitchen.com. We typically respond within 24 hours.",
        address: "We're located at 2847 Maple Street, Chicago, IL 60614. Stop by during business hours!",
        location: "We serve the greater Midwest region including Illinois, Indiana, Wisconsin, Michigan, and Ohio.",
        area: "We serve the greater Midwest region including Illinois, Indiana, Wisconsin, Michigan, and Ohio.",
        
        services: "We offer: Full Kitchen Remodeling, Custom Cabinetry, Countertop Installation, Kitchen Lighting, Island & Bar Installation, and Design & Planning services.",
        service: "We offer: Full Kitchen Remodeling, Custom Cabinetry, Countertop Installation, Kitchen Lighting, Island & Bar Installation, and Design & Planning services.",
        what: "We offer: Full Kitchen Remodeling, Custom Cabinetry, Countertop Installation, Kitchen Lighting, Island & Bar Installation, and Design & Planning services.",
        
        cabinets: "We specialize in custom cabinetry! We offer both face-frame and frameless cabinets in various styles. Would you like to see some examples or start a quote?",
        countertop: "We install granite, quartz, marble, and solid surface countertops. Would you like to learn more or get a quote?",
        granite: "We offer premium granite countertops in many colors and patterns. Granite is heat-resistant and adds great value to your home. Would you like a quote?",
        quartz: "Quartz countertops are low-maintenance and non-porous. We have many colors available! Would you like more information?",
        
        free: "Yes, we offer free in-home consultations and 3D design previews to help you visualize your new kitchen before committing. Would you like to schedule one?",
        consultation: "Yes, we offer free in-home consultations and 3D design previews to help you visualize your new kitchen before committing. Would you like to schedule one?",
        
        permit: "Yes, we handle all necessary permits and inspections for your project, ensuring everything meets local building codes. This is included in our service!",
        permits: "Yes, we handle all necessary permits and inspections for your project, ensuring everything meets local building codes. This is included in our service!",
        
        hello: "Hello! How can I help you with your kitchen remodeling project today?",
        hi: "Hi there! How can I assist you with your kitchen project?",
        hey: "Hey! What kitchen questions can I help you with?",
        help: "I can help with: getting a quote, cost estimates, project timelines, services offered, warranty info, and contact details. What would you like to know?",
        
        thank: "You're welcome! Let me know if you have any other questions about your kitchen project.",
        thanks: "You're welcome! Feel free to ask if you need anything else."
    };
    
    let response = null;
    for (const [keyword, answer] of Object.entries(responses)) {
        if (lowerMessage.includes(keyword)) {
            response = answer;
            break;
        }
    }
    
    if (response) {
        if (response.includes("open the quote form")) {
            openBookingModal();
        }
        addBotMessage(response);
    } else {
        addBotMessage("I'm here to help with questions about kitchen remodeling, quotes, costs, timelines, and our services. Would you like to start a quote, or is there something specific I can help you with?");
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    loadBookingProgress();
    updateProgressUI();
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    saveBookingProgress();
}

function nextStep() {
    if (!validateCurrentStep()) {
        return;
    }
    
    if (currentStep < totalSteps) {
        currentStep++;
        updateProgressUI();
        showStep(currentStep);
    } else {
        submitBooking();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateProgressUI();
        showStep(currentStep);
    }
}

function showStep(step) {
    document.querySelectorAll('.booking-step').forEach(el => {
        el.classList.remove('active');
    });
    
    const stepEl = document.querySelector(`.booking-step[data-step="${step}"]`);
    if (stepEl) {
        stepEl.classList.add('active');
    }
    
    updateNavButtons();
}

function updateProgressUI() {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum < currentStep) {
            step.classList.add('completed');
            step.textContent = '✓';
        } else if (stepNum === currentStep) {
            step.classList.add('active');
            step.textContent = stepNum;
        } else {
            step.textContent = stepNum;
        }
    });
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
    nextBtn.textContent = currentStep === totalSteps ? 'Submit Quote' : 'Next';
}

function validateCurrentStep() {
    const currentStepEl = document.querySelector(`.booking-step[data-step="${currentStep}"]`);
    const requiredFields = currentStepEl.querySelectorAll('[required]');
    
    let isValid = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields.');
    }
    
    return isValid;
}

function saveBookingProgress() {
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
        if (data[key]) {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    }
    
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        data[cb.name] = data[cb.name] || [];
        if (cb.checked) {
            if (!Array.isArray(data[cb.name])) {
                data[cb.name] = [data[cb.name]];
            }
            if (!data[cb.name].includes(cb.value)) {
                data[cb.name].push(cb.value);
            }
        }
    });
    
    const radios = form.querySelectorAll('input[type="radio"]:checked');
    radios.forEach(radio => {
        data[radio.name] = radio.value;
    });
    
    data.currentStep = currentStep;
    
    localStorage.setItem('bookingProgress', JSON.stringify(data));
}

function loadBookingProgress() {
    const saved = localStorage.getItem('bookingProgress');
    if (!saved) return;
    
    const data = JSON.parse(saved);
    
    if (data.currentStep) {
        currentStep = data.currentStep;
    }
    
    const form = document.getElementById('bookingForm');
    
    for (const [key, value] of Object.entries(data)) {
        if (key === 'currentStep') continue;
        
        const field = form.querySelector(`[name="${key}"]`);
        if (!field) continue;
        
        if (field.type === 'checkbox') {
            field.checked = value === field.value || (Array.isArray(value) && value.includes(field.value));
        } else if (field.type === 'radio') {
            field.checked = value === field.value;
        } else if (field.type !== 'file') {
            field.value = value;
        }
    }
}

function previewPhotos() {
    const input = document.getElementById('projectPhotos');
    const preview = document.getElementById('photoPreview');
    preview.innerHTML = '';
    
    if (input.files) {
        Array.from(input.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }
}

function submitBooking() {
    saveBookingProgress();
    
    document.querySelectorAll('.booking-step').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelector('.booking-step[data-step="success"]').classList.add('active');
    
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    
    localStorage.removeItem('bookingProgress');
    
    console.log('Quote submitted:', getFormData());
}

function getFormData() {
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
        if (data[key]) {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    }
    
    return data;
}

function handleBookingSubmit(event) {
    event.preventDefault();
}

function handleContactSubmit(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
}

document.getElementById('bookingModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeBookingModal();
    }
});