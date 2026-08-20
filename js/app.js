(function () {
  "use strict";

  const modelEntity = document.getElementById("img");
  const markerModal = document.getElementById("instructions-modal");
  const btnInstructions = document.getElementById("btn-instructions");
  const closeInstructionsModal = document.getElementById("close-instructions-modal");
  const printMarkerBtn = document.getElementById("print-marker-btn");

  const defaults = {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 }
  };

  function adjustScale(factor) {
    const s = modelEntity.getAttribute("scale");
    modelEntity.setAttribute("scale", {
      x: s.x * factor,
      y: s.y * factor,
      z: s.z * factor
    });
  }

  function adjustRotation(axis, angle) {
    const r = modelEntity.getAttribute("rotation");
    if (axis === "x") {
      modelEntity.setAttribute("rotation", { x: r.x + angle, y: r.y, z: r.z });
    } else if (axis === "y") {
      // Misma lógica que la versión original: giro horizontal sobre Z
      modelEntity.setAttribute("rotation", { x: r.x, y: r.y, z: r.z + -angle });
    }
  }

  function adjustPosition(axis, delta) {
    const p = modelEntity.getAttribute("position");
    const next = { x: p.x, y: p.y, z: p.z };
    next[axis] += delta;
    modelEntity.setAttribute("position", next);
  }

  function resetTransform() {
    modelEntity.setAttribute("position", { ...defaults.position });
    modelEntity.setAttribute("rotation", { ...defaults.rotation });
    modelEntity.setAttribute("scale", { ...defaults.scale });
  }

  function openInstructionsModal() {
    markerModal.classList.add("open");
  }

  function closeModal() {
    markerModal.classList.remove("open");
  }

  // Igual que la versión que funcionaba
  function resizeAR() {
    const video = document.querySelector("#arjs-video");
    if (video) {
      video.style.width = window.innerWidth + "px";
      video.style.height = window.innerHeight + "px";
      video.style.objectFit = "cover";
    }
  }

  function bindControlButtons() {
    document.querySelectorAll("[data-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const action = btn.getAttribute("data-action");
        const axis = btn.getAttribute("data-axis");
        const value = parseFloat(btn.getAttribute("data-value"));

        if (action === "position") {
          adjustPosition(axis, value);
        } else if (action === "rotation") {
          adjustRotation(axis, value);
        } else if (action === "scale") {
          adjustScale(value);
        } else if (action === "reset") {
          resetTransform();
        }
      });
    });
  }

  bindControlButtons();

  btnInstructions.addEventListener("click", openInstructionsModal);
  closeInstructionsModal.addEventListener("click", closeModal);
  markerModal.addEventListener("click", function (event) {
    if (event.target === markerModal) closeModal();
  });
  printMarkerBtn.addEventListener("click", function () {
    window.print();
  });

  const dock = document.getElementById("controls-dock");
  const dockToggle = document.getElementById("dock-toggle");
  const dockToggleText = document.getElementById("dock-toggle-text");

  function setDockOpen(isOpen) {
    dock.classList.toggle("open", isOpen);
    dockToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    dockToggleText.textContent = isOpen ? "Ocultar controles" : "Mostrar controles";
  }

  dockToggle.addEventListener("click", function () {
    setDockOpen(!dock.classList.contains("open"));
  });

  setDockOpen(false);

  window.addEventListener("resize", resizeAR);
  window.addEventListener("orientationchange", function () {
    setTimeout(resizeAR, 250);
  });

  setTimeout(resizeAR, 2000);
})();
