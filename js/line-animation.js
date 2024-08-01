document.addEventListener('DOMContentLoaded', function() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const paths = entry.target.querySelectorAll('.line-svg');
                paths.forEach(path => {
                    if (path && typeof path.getTotalLength === 'function') {
                        const pathLength = path.getTotalLength();
                        path.style.strokeDasharray = pathLength;
                        path.style.strokeDashoffset = pathLength;
                        path.getBoundingClientRect(); // Trigger a layout to apply initial dash offset
                        // Add a CSS transition to animate the stroke-dashoffset
                        path.style.transition = 'stroke-dashoffset 2s ease-in-out';
                        path.style.strokeDashoffset = 0;
                        path.style.opacity = 1;
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, options);
    document.querySelectorAll('[data-observe]').forEach(container => {
        observer.observe(container);
    });
});