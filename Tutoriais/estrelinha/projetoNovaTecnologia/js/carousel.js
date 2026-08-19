document.addEventListener("DOMContentLoaded", listener = () =>{
    const prevButton = document.querySelector(".carousel-btn.prev");
    const nextButton = document.querySelector(".carousel-btn.next");
    const carouselContainer = document.querySelector(".carousel-container");
    const carouselItems = document.querySelectorAll(".carousel-item");
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    const changeSlide = () => {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalItems
        changeSlide();
    }

    const prevSlide = () =>{
        currentIndex = (currentIndex - 1 + totalItems) % totalItems
        changeSlide();
    }

    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    setInterval(nextSlide, 7000)
    changeSlide();

})
