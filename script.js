// Modal functionality
function openAuthModal() {
    document.getElementById('authModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function switchAuthTab(tab) {
    // Remove active class from all tabs and forms
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    // Add active class to selected tab and form
    if (tab === 'login') {
        document.querySelector('.auth-tab:first-child').classList.add('active');
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.querySelector('.auth-tab:last-child').classList.add('active');
        document.getElementById('registerForm').classList.add('active');
    }
}

// Chat functionality
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            generateAIResponse(message);
        }, 1000);
    }
}

function askQuestion(question) {
    addMessage(question, 'user');
    
    // Simulate AI response based on question
    setTimeout(() => {
        let response = '';
        if (question.includes('destination')) {
            response = "Great! I'd love to help you find the perfect destination. What type of experience are you looking for? Beach relaxation, city exploration, adventure, or cultural immersion?";
        } else if (question.includes('travel')) {
            response = "Perfect! When are you planning to travel? I can help you find the best deals and availability for your preferred dates.";
        } else if (question.includes('budget')) {
            response = "Excellent! Understanding your budget helps me find the perfect options. What's your preferred budget range for this trip?";
        } else {
            response = "That's a great question! I'm here to help you plan the perfect trip. Could you tell me more about your travel preferences?";
        }
        
        addMessage(response, 'ai');
        
        // Show recommendations after a few exchanges
        if (document.querySelectorAll('.message').length > 4) {
            setTimeout(() => {
                showRecommendations();
            }, 2000);
        }
    }, 1000);
}

function generateAIResponse(userMessage) {
    let response = '';
    
    if (userMessage.toLowerCase().includes('bali')) {
        response = "Bali is an excellent choice! It's perfect for a beach vacation with rich culture. I can help you find flights and accommodations. What's your budget range for this trip?";
    } else if (userMessage.toLowerCase().includes('budget') || userMessage.toLowerCase().includes('price')) {
        response = "I understand budget is important! I can find options ranging from budget-friendly to luxury. What's your preferred price range? I'll make sure to find the best value for your money.";
    } else if (userMessage.toLowerCase().includes('date') || userMessage.toLowerCase().includes('when')) {
        response = "Great! When are you planning to travel? I can check availability and find the best deals for your preferred dates.";
    } else if (userMessage.toLowerCase().includes('hotel') || userMessage.toLowerCase().includes('accommodation')) {
        response = "I can help you find the perfect accommodation! Do you prefer luxury resorts, boutique hotels, or budget-friendly options? I'll match it to your style and budget.";
    } else {
        response = "That sounds wonderful! I'm here to help you plan the perfect trip. Could you tell me more about your travel preferences and budget?";
    }
    
    addMessage(response, 'ai');
    
    // Show recommendations after a few exchanges
    if (document.querySelectorAll('.message').length > 6) {
        setTimeout(() => {
            showRecommendations();
        }, 2000);
    }
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    if (sender === 'ai') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function showRecommendations() {
    const chatMessages = document.getElementById('chatMessages');
    const recommendationDiv = document.createElement('div');
    recommendationDiv.className = 'message ai';
    recommendationDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p>Based on our conversation, I've found some great options for your Bali trip! Check out the recommendations below:</p>
            <div style="margin-top: 1rem;">
                <button class="btn-primary" onclick="showBookingConfirmation()">View Recommendations</button>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(recommendationDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Tab functionality
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Booking confirmation
function showBookingConfirmation() {
    document.getElementById('bookingConfirmation').style.display = 'block';
    document.getElementById('bookingConfirmation').scrollIntoView({ behavior: 'smooth' });
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle login form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (email && password) {
            closeAuthModal();
            // Simulate successful login
            setTimeout(() => {
                alert('Welcome back to GoWorld! Your AI travel agent is ready to help.');
            }, 500);
        }
    });
    
    // Handle registration form submission
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        if (name && email && password) {
            closeAuthModal();
            // Simulate successful registration
            setTimeout(() => {
                alert('Welcome to GoWorld! Your account has been created successfully.');
            }, 500);
        }
    });
    
    // Handle recommendation card selections
    document.querySelectorAll('.btn-select').forEach(btn => {
        btn.addEventListener('click', function() {
            showBookingConfirmation();
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('authModal');
        if (event.target === modal) {
            closeAuthModal();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add some interactive animations
function addHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .support-card, .recommendation-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    addHoverEffects();
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Simulate real-time chat updates
setInterval(() => {
    const statusElement = document.querySelector('.status');
    if (statusElement) {
        const statuses = ['Online • Ready to help', 'Online • Typing...', 'Online • Ready to help'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        statusElement.textContent = randomStatus;
    }
}, 5000);