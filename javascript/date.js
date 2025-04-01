document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.querySelector("#datepicker");

  if (dateInput) {
    // Supprime l'attribut "type" pour éviter les conflits avec le sélecteur natif
    dateInput.removeAttribute("type");

    // Initialise flatpickr
    flatpickr("#datepicker", {
      dateFormat: "d/m/Y", // Format de la date
      locale: "fr", // Définit la langue en Français
    });

    // Ajout d'un événement pour l'icône de calendrier
    const calendarIcon = document.querySelector(".input-group-text");
    if (calendarIcon) {
      calendarIcon.addEventListener("click", function () {
        dateInput.focus(); // Simule un clic dans le champ de date
      });
    }
  }
});