// Ajout de l'outil de sélection de date
// Utilisation de la librairie flatpickr

flatpickr("#datepicker", {
    dateFormat: "d/m/Y"
  });



  document.addEventListener("DOMContentLoaded", function () {
    // Sélectionne l'icône de calendrier et le champ de date
    const calendarIcon = document.querySelector(".input-group-text");
    const dateInput = document.querySelector("#datepicker");
  
    // Ajoute un événement "click" sur l'icône
    calendarIcon.addEventListener("click", function () {
      dateInput.focus(); // Simule un clic dans le champ de date
    });
  });