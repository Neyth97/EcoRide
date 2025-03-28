// Fonction pour convertir une date au format dd/mm/yyyy
function formatDate(date) {
  if (!date) {
    return ""; // Retourne une chaîne vide si la date est vide ou invalide
  }

  // Vérifie si la date est déjà au format dd/mm/yyyy
  if (date.includes("/")) {
    return date; // Retourne la date telle quelle
  }

  // Si la date est au format yyyy-mm-dd, la convertit en dd/mm/yyyy
  const parts = date.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`; // Retourne la date au format dd/mm/yyyy
  }

  return ""; // Retourne une chaîne vide si le format est inattendu
}

// Fonction pour trouver la date la plus proche
function trouverDateProche(dateRecherche, resultats, departRecherche, destinationRecherche) {
  const dateRechercheObj = new Date(dateRecherche.split("/").reverse().join("-")); // Convertit la date au format Date
  let dateProche = null;

  resultats.forEach((covoiturage) => {
    // Vérifie que le départ et la destination correspondent
    if (covoiturage.depart === departRecherche && covoiturage.destination === destinationRecherche) {
      const dateCovoiturageObj = new Date(covoiturage.date.split("/").reverse().join("-"));
      if (!dateProche || dateCovoiturageObj > dateRechercheObj) {
        if (!dateProche || dateCovoiturageObj < new Date(dateProche.split("/").reverse().join("-"))) {
          dateProche = covoiturage.date;
        }
      }
    }
  });

  return dateProche;
}

document.getElementById("recherche").addEventListener("click", function (e) {
  e.preventDefault(); // Empêche le rechargement de la page

  // Récupère les valeurs des champs de recherche
  const dateRecherche = formatDate(document.getElementById("datepicker").value); // Convertit la date
  const departRecherche = document.getElementById("depart").value;
  const destinationRecherche = document.getElementById("destination").value;
  const passagersRecherche = document.getElementById("passagers").value;

  // Sélectionne le conteneur du message d'erreur
  const erreurRecherche = document.getElementById("erreur-recherche");

  // Vérifie que tous les champs sont remplis
  if (!dateRecherche || !departRecherche || departRecherche === "Départ" || 
      !destinationRecherche || destinationRecherche === "Destination" || 
      passagersRecherche === "" || passagersRecherche === "Nombre de passagers") {
    erreurRecherche.style.display = "block"; // Affiche le message d'erreur
    erreurRecherche.textContent = "Veuillez remplir tous les champs de recherche.";
    return;
  } else {
    erreurRecherche.style.display = "none"; // Cache le message d'erreur si tout est rempli
  }

  // Affiche les filtres après la recherche
  const filtersContainer = document.querySelector(".form-container.mt-3");
  filtersContainer.style.display = "flex"; // Affiche les filtres
  filtersContainer.style.justifyContent = "center"; // Centre les filtres horizontalement

  // Simule des résultats de covoiturages
  const resultats = [
    {
      pseudo: "Jean Dupont",
      photo: "../assets/images/profil.jpg",
      note: "4.8/5",
      places: 2,
      prix: "10 crédits",
      date: "12/04/2025",
      heure: "14:00 - 16:30",
      depart: "Paris",
      destination: "Lyon",
      ecologique: "Oui",
    },
    {
      pseudo: "Marie Curie",
      photo: "../assets/images/profil.jpg",
      note: "4.5/5",
      places: 1,
      prix: "12 crédits",
      date: "13/04/2025",
      heure: "10:00 - 12:00",
      depart: "Lille",
      destination: "Marseille",
      ecologique: "Non",
    },
  ];

  // Filtre les résultats en fonction des critères de recherche
  const resultatsFiltres = resultats.filter((covoiturage) => {
    return (
      covoiturage.date === dateRecherche &&
      covoiturage.depart === departRecherche &&
      covoiturage.destination === destinationRecherche &&
      covoiturage.places >= parseInt(passagersRecherche) // Vérifie le nombre de places
    );
  });

  // Applique les filtres supplémentaires
  const resultatsFiltresAvecOptions = appliquerFiltres(resultatsFiltres);

  // Sélectionne les conteneurs
  const resultatsContainer = document.getElementById("resultats-covoiturages");
  const messageParDefaut = document.getElementById("message-par-defaut");
  const row = resultatsContainer.querySelector(".row");

  // Vide les résultats précédents
  row.innerHTML = "";

  if (resultatsFiltresAvecOptions.length > 0) {
    // Masque le message par défaut
    messageParDefaut.style.display = "none";

    // Ajoute chaque covoiturage filtré
    resultatsFiltresAvecOptions.forEach((covoiturage) => {
      const card = `
        <div class="col-md-6 mb-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <img
                  src="${covoiturage.photo}"
                  alt="Photo du chauffeur"
                  class="rounded-circle me-3"
                  style="width: 50px; height: 50px;"
                />
                <div>
                  <h5 class="mb-0">${covoiturage.pseudo}</h5>
                  <small class="text-muted">Note : ${covoiturage.note}</small>
                </div>
              </div>
              <p><strong>Nombre de places restantes :</strong> ${covoiturage.places}</p>
              <p><strong>Prix :</strong> ${covoiturage.prix}</p>
              <p><strong>Date et heure :</strong> ${covoiturage.date}, ${covoiturage.heure}</p>
              <p><strong>Écologique :</strong> ${covoiturage.ecologique}</p>
              <button class="btn btn-primary w-100">Détail</button>
            </div>
          </div>
        </div>
      `;
      row.innerHTML += card;
    });

    // Affiche les résultats
    resultatsContainer.style.display = "block";
  } else {
    // Si aucun résultat, affiche le message par défaut
    const dateProche = trouverDateProche(dateRecherche, resultats, departRecherche, destinationRecherche);
    if (dateProche) {
      messageParDefaut.innerHTML = `
        <p>Aucun covoiturage disponible pour la date sélectionnée.</p>
        <p>Essayez de modifier votre date de voyage pour le <strong>${dateProche}</strong>, ou de changer votre nombre de passagers.</p>
      `;
    } else {
      messageParDefaut.innerHTML = `
        <p>Aucun covoiturage disponible pour le moment.</p>
      `;
    }
    messageParDefaut.style.display = "block";
    resultatsContainer.style.display = "none";
  }
});