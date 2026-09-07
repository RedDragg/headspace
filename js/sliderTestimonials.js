function setupTestimonialSlider() {
  // Selecteer het volledige slideronderdeel.
  const slider = document.querySelector(".testimonials");

  // Stop als deze slider niet op de pagina bestaat.
  if (!slider) return;

  // De eerste div bevat de horizontaal scrollende kaarten.
  const slidesContainer = slider.querySelector(":scope > div:last-of-type");

  // Selecteer alle testimonialkaarten.
  const slides = [...slidesContainer.querySelectorAll("article")];

  // Selecteer de twee pijltjes.
  const previousButton = slider.querySelector(
    "nav button:first-of-type"
  );

  const nextButton = slider.querySelector(
    "nav button:last-of-type"
  );

  // Houd bij welke slide actief is.
  let currentSlide = 0;

  function updateButtons() {
    // Schakel het linkerpijltje uit bij de eerste slide.
    previousButton.disabled = currentSlide === 0;

    // Schakel het rechterpijltje uit bij de laatste slide.
    nextButton.disabled = currentSlide === slides.length - 1;
  }

  function showSlide(index) {
    // Zorg dat het nummer nooit buiten de beschikbare slides valt.
    currentSlide = Math.max(
      0,
      Math.min(index, slides.length - 1)
    );

    // Scroll naar de gekozen slide.
    slides[currentSlide].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });

    updateButtons();
  }

  // Ga één slide terug.
  previousButton.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });

  // Ga één slide vooruit.
  nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  /*
    Controleer na handmatig swipen welke kaart
    het dichtst bij de linkerkant staat.
  */
  slidesContainer.addEventListener("scroll", () => {
    let closestSlide = 0;
    let smallestDistance = Infinity;

    slides.forEach((slide, index) => {
      const distance = Math.abs(
        slide.offsetLeft - slidesContainer.scrollLeft
      );

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestSlide = index;
      }
    });

    currentSlide = closestSlide;
    updateButtons();
  });

  // Stel de knoppen bij het laden correct in.
  updateButtons();
}

setupTestimonialSlider();