document.getElementById("recherche").addEventListener("click", function (e) {
  e.preventDefault();

  // Récupère les valeurs des champs
  const depart = document.getElementById("depart").value;
  const destination = document.getElementById("destination").value;
  const date = document.getElementById("datepicker").value;
  const passagers = document.getElementById("passagers").value;

  // Vérifie que tous les champs sont remplis correctement
  if (
    !date || // Vérifie que la date est renseignée
    !depart || depart === "Départ" || // Vérifie que le champ "Départ" n'est pas à sa valeur par défaut
    !destination || destination === "Destination" || // Vérifie que le champ "Destination" n'est pas à sa valeur par défaut
    !passagers || passagers === "Nombre de passagers" // Vérifie que le champ "Passagers" n'est pas à sa valeur par défaut
  ) {
    const erreurRecherche = document.getElementById("erreur-recherche");
    erreurRecherche.style.display = "block";
    erreurRecherche.textContent = "Veuillez remplir tous les champs de recherche.";
    return;
  }

  // Redirige vers la page covoiturages.html avec les paramètres de recherche
  const url = `navigation/covoiturages.html?depart=${encodeURIComponent(depart)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}&passagers=${encodeURIComponent(passagers)}`;
  window.location.href = url;
});