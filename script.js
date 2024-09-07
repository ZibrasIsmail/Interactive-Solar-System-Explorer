function createStars() {
  const starsContainer = document.createElement("div");
  starsContainer.className = "stars-container";
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.animationDuration = `${Math.random() * 3 + 1}s`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    starsContainer.appendChild(star);
  }
  document.body.appendChild(starsContainer);
}

function createComets() {
  setInterval(() => {
    const comet = document.createElement("div");
    comet.className = "comet";
    comet.style.top = `${Math.random() * 100}vh`;
    document.body.appendChild(comet);
    setTimeout(() => comet.remove(), 10000);
  }, 15000);
}

function createModal() {
  const modal = document.createElement("div");
  modal.id = "planetModal";
  document.body.appendChild(modal);

  const planets = document.querySelectorAll(
    ".planet, .moon, .asteroid-belt, .comets, .kuiper-belt"
  );
  planets.forEach((planet) => {
    planet.addEventListener("click", () => {
      const planetName = planet.querySelector("h3").textContent;
      const planetInfo = planet.querySelector("p").textContent;
      modal.innerHTML = `
        <div class="modal-content">
          <h2>${planetName}</h2>
          <p>${planetInfo}</p>
          <button onclick="closeModal()">Close</button>
        </div>
      `;
      modal.style.display = "block";
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

function closeModal() {
  document.getElementById("planetModal").style.display = "none";
}

function smoothScroll() {
  const navigation = document.createElement("nav");
  navigation.id = "navigation";
  navigation.innerHTML = `
    <a href="#solar-system-overview">Overview</a>
    <a href="#planets">Planets</a>
    <a href="#moons">Moons</a>
    <a href="#solar-system-objects">Other Objects</a>
  `;
  document.body.insertBefore(navigation, document.body.firstChild);

  document.querySelectorAll("#navigation a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.querySelector(`.${targetId}`);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}

window.onload = () => {
  createStars();
  createComets();
  createModal();
  smoothScroll();
};

function addAccessibility() {
  const interactiveElements = document.querySelectorAll(
    ".planet, .moon, .asteroid-belt, .comets, .kuiper-belt"
  );
  interactiveElements.forEach((el) => {
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.setAttribute(
      "aria-label",
      `Learn more about ${el.querySelector("h3").textContent}`
    );

    el.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        el.click();
      }
    });
  });
}

window.onload = () => {
  createStars();
  createComets();
  createModal();
  smoothScroll();
  addAccessibility();
};
