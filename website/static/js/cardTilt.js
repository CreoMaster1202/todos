const tilt = document.querySelectorAll(".landing__card");

tilt.forEach(tilt => {
    tilt.addEventListener("mousemove", (event) => {
        rotateElement(event, tilt);
    });

    tilt.addEventListener("mouseleave", () => {
        tilt.style.setProperty("--rotateX", 0 + "deg");
        tilt.style.setProperty("--rotateY", 0 + "deg");
    });

    function rotateElement(event, element) {
        const x = event.clientX;
        const y = event.clientY;

        const rect = element.getBoundingClientRect();
        const middleX = rect.left + rect.width / 2;
        const middleY = rect.top + rect.height / 2;

        const maxAngle = 5000 / Math.sqrt(rect.width * rect.height);
        const offsetX = ((x - middleX) / middleX) * 10;
        const offsetY = ((y - middleY) / middleY) * 10;
        // console.log(offsetX, offsetY);

        element.style.setProperty("--rotateX", -1 * offsetY + "deg");
        element.style.setProperty("--rotateY", offsetX + "deg");
    }
});

