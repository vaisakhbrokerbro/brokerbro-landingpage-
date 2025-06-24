// Enhanced responsiveness and interactions
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('getWebsiteBtn');
    const heroTitle = document.querySelector('.hero-title');
    const floatingElements = document.querySelectorAll('.floating-element'); // Assuming these exist in your HTML

    // Button click animation
    if (button) { // Ensure the button exists before adding event listener
        button.addEventListener('click', function(e) {
            // REMOVED: e.preventDefault();
            // We now want the default link behavior to happen AFTER our animation.
            // Or, we can manually open the link. Let's do the latter for consistent timing.
            
            const targetUrl = this.href; // Get the URL from the button's href attribute

            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            // Calculate ripple position relative to the button
            const rect = this.getBoundingClientRect();
            ripple.style.left = e.clientX - rect.left - 10 + 'px';
            ripple.style.top = e.clientY - rect.top - 10 + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.overflow = 'hidden'; // Ensure ripple stays within button bounds
            this.style.position = 'relative'; // Make button position relative for absolute ripple positioning

            this.appendChild(ripple);
            
            // Add some feedback
            this.style.transform = 'scale(0.95)';

            // Set a timeout to remove the ripple and revert transform, then open the link
            setTimeout(() => {
                ripple.remove();
                this.style.transform = ''; // Revert button scale
                // Open the link after the animation completes
                window.open(targetUrl, '_blank');
            }, 300); // Adjust this timeout to match your desired animation duration + a slight delay
        });
    }
    
    // Parallax effect for floating elements (if you have elements with class 'floating-element')
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            // Note: This might conflict with mousemove parallax if not carefully managed.
            // Consider combining or making exclusive if issues arise.
            element.style.transform = `translateY(${rate * speed}px)`; 
        });
    });
    
    // Mouse movement parallax
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            // This line APPENDS to transform, so it might compound with scroll parallax
            // If you only want mouse parallax, consider setting transform directly
            // e.g., element.style.transform = `translate(${x}px, ${y}px)`;
            // or combine like element.style.transform = `translateY(${currentScrollY}) translate(${x}px, ${y}px)`;
            element.style.transform += ` translate(${x}px, ${y}px)`; 
        });
    });
    
    // Responsive text sizing
    function adjustTextSize() {
        const viewport = window.innerWidth;
        const title = document.querySelector('.hero-title');
        const subtitle = document.querySelector('.hero-subtitle');
        
        if (title && subtitle) { // Ensure elements exist before trying to modify them
            if (viewport <= 480) {
                title.style.fontSize = '1.8rem';
                subtitle.style.fontSize = '0.95rem';
            } else if (viewport <= 576) {
                title.style.fontSize = '2rem';
                subtitle.style.fontSize = '1rem';
            } else if (viewport <= 768) {
                title.style.fontSize = '2.5rem'; // Example size, adjust as needed
                subtitle.style.fontSize = '1.1rem'; // Example size, adjust as needed
            } else {
                // Default sizes for larger screens if necessary
                title.style.fontSize = '3.5rem'; // Revert to your original desktop size or desired size
                subtitle.style.fontSize = '1.25rem'; // Revert to your original desktop size or desired size
            }
        }
    }

    // Call adjustTextSize on load and on resize
    adjustTextSize();
    window.addEventListener('resize', adjustTextSize);

}); 