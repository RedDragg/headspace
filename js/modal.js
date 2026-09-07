  /* =========================
     OPEN- EN SLUITFUNCTIE
  ========================= */

  function setupModal() {
    const openItems = document.querySelectorAll(
      "main section:nth-of-type(2) ul:first-of-type li"
    );

    const modal = document.querySelector(
      "main section:nth-of-type(2) ul:last-of-type"
    );

    // Stop als de modal niet op deze pagina bestaat.
    if (!modal) return;

    const modalContent = modal.querySelector(":scope > li");
    const closeButton = modal.querySelector("button");

    function openModal() {
      modal.classList.add("is-open");
      document.body.classList.add("modal-open");

      // Laat de modal altijd bovenaan beginnen.
      requestAnimationFrame(() => {
        if (modalContent) {
          modalContent.scrollTop = 0;
        }
      });
    }

    function closeModal() {
      modal.classList.remove("is-open");
      document.body.classList.remove("modal-open");
    }

    // Maak alle lijstitems klikbaar.
    openItems.forEach((item) => {
      item.addEventListener("click", openModal);
    });

    // Sluit de modal met de sluitknop.
    closeButton?.addEventListener("click", closeModal);

    // Sluit de modal met de Escape-toets.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  setupModal();
