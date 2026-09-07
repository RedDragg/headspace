  /* =========================
     SLIDERFUNCTIE
  ========================= */

  function setupSlider() {
    const slider = document.querySelector(".slider");

    // Stop als de slider niet op deze pagina bestaat.
    if (!slider) return;

    const slidesContainer = slider.querySelector(".slides");
    const slides = [...slidesContainer.querySelectorAll("article")];
    const tabs = [...slider.querySelectorAll(":scope > nav button")];
    const dots = [...slider.querySelectorAll(":scope > footer button")];

    // Scroll naar de gekozen slide.
    function selectSlide(index) {
      slides[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }

    // Verander de actieve tab en het actieve bolletje.
    function setActiveSlide(index) {
      tabs.forEach((tab, tabIndex) => {
        tab.classList.toggle("active", tabIndex === index);
      });

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === index);
      });

      // Zorg dat de actieve tab zichtbaar is.
      tabs[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }

    // Maak de tabs klikbaar.
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        selectSlide(Number(tab.dataset.slide));
      });
    });

    // Maak de bolletjes klikbaar.
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        selectSlide(Number(dot.dataset.slide));
      });
    });

    // Controleer welke slide zichtbaar is tijdens het swipen.
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSlide = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio
          )[0];

        if (visibleSlide) {
          const index = slides.indexOf(visibleSlide.target);
          setActiveSlide(index);
        }
      },
      {
        root: slidesContainer,
        threshold: 0.6
      }
    );

    slides.forEach((slide) => {
      observer.observe(slide);
    });
  }


  /* =========================
     FUNCTIES STARTEN
  ========================= */

  setupSlider();