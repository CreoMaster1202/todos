window.onbeforeunload = function() {
    localStorage.setItem('scrollX', window.scrollX);
    localStorage.setItem('scrollY', window.scrollY);
};

// Restore scroll position after page reload
window.onload = function() {
    if (localStorage.getItem('scrollX') !== null) {
        window.scrollTo(
            localStorage.getItem('scrollX'),
            localStorage.getItem('scrollY')
        );
    }
};
