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

// Fonction pour récupérer les paramètres de l'URL
function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    depart: params.get("depart"),
    destination: params.get("destination"),
    date: params.get("date"),
    passagers: params.get("passagers"),
  };
}

// Fonction pour trouver la date la plus proche
function trouverDateProche(dateRecherche, resultats, departRecherche, destinationRecherche) {
  const dateRechercheObj = new Date(dateRecherche.split("/").reverse().join("-")); // Convertit la date au format Date
  let dateProche = null;

  resultats.forEach((covoiturage) => {
    // Vérifie que le départ et la destination correspondent
    if (covoiturage.depart === departRecherche && covoiturage.destination === destinationRecherche) {
      const dateCovoiturageObj = new Date(covoiturage.date.split("/").reverse().join("-"));
      if (!dateProche || Math.abs(dateCovoiturageObj - dateRechercheObj) < Math.abs(new Date(dateProche.split("/").reverse().join("-")) - dateRechercheObj)) {
        dateProche = covoiturage.date;
      }
    }
  });

  return dateProche;
}

// Variables globales pour stocker les résultats
let resultats = [];
let resultatsFiltres = [];

// Fonction principale pour gérer la recherche
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

  // Simule des résultats de covoiturages
  resultats = [
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
      date: "20/04/2025",
      heure: "10:00 - 12:00",
      depart: "Lille",
      destination: "Marseille",
      ecologique: "Non",
    },
  ];

  // Filtre les résultats en fonction des critères de recherche
  resultatsFiltres = resultats.filter((covoiturage) => {
    const dateCovoiturage = new Date(covoiturage.date.split("/").reverse().join("-"));
    const dateRechercheObj = new Date(dateRecherche.split("/").reverse().join("-"));

    return (
      dateCovoiturage.getTime() === dateRechercheObj.getTime() && // Compare les dates
      covoiturage.depart.toLowerCase() === departRecherche.toLowerCase() && // Compare les départs
      covoiturage.destination.toLowerCase() === destinationRecherche.toLowerCase() && // Compare les destinations
      covoiturage.places >= parseInt(passagersRecherche) // Vérifie le nombre de places
    );
  });

  // Si aucun résultat n'est trouvé, chercher une date proche
  if (resultatsFiltres.length === 0) {
    const dateProche = trouverDateProche(dateRecherche, resultats, departRecherche, destinationRecherche);
    if (dateProche) {
      console.log("Aucun résultat exact trouvé. Date proche :", dateProche);
      document.getElementById("message-par-defaut").innerHTML = `
        <h3 class="text-muted">Aucun covoiturage trouvé pour la date sélectionnée.</h3>
        <p class="text-muted">Essayez avec la date la plus proche : <strong>${dateProche}</strong>, ou changez le nombre de passagers.</p>
      `;
    } else {
      console.log("Aucun covoiturage trouvé.");
      document.getElementById("message-par-defaut").innerHTML = `
        <h3 class="text-muted">Aucun covoiturage trouvé.</h3>
        <p class="text-muted">Aucun covoiturage disponible pour les critères sélectionnés.</p>
      `;
    }
    document.getElementById("message-par-defaut").style.display = "block";
    document.getElementById("resultats-covoiturages").style.display = "none";
    return;
  }

  // Affiche les résultats
  afficherResultats(resultatsFiltres);
});

// Fonction pour afficher les résultats dans l'interface utilisateur
function afficherResultats(resultatsFiltres) {
  const resultatsContainer = document.getElementById("resultats-covoiturages");
  const filtersContainer = document.querySelector(".form-container.mt-3"); // Sélectionne les filtres
  resultatsContainer.innerHTML = ""; // Vide le conteneur avant d'ajouter les nouveaux résultats

  if (resultatsFiltres.length > 0) {
    resultatsFiltres.forEach((covoiturage) => {
      const card = `
        <div class="card shadow-sm mb-4" style="max-width: 350px; margin: auto;">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <img
                src="${covoiturage.photo}"
                alt="Photo de ${covoiturage.pseudo}"
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
            <p><strong>Date :</strong> ${covoiturage.date}</p>
            <p><strong>Heure :</strong> ${covoiturage.heure}</p>
            <p><strong>Départ :</strong> ${covoiturage.depart}</p>
            <p><strong>Destination :</strong> ${covoiturage.destination}</p>
            <p><strong>Écologique :</strong> ${covoiturage.ecologique}</p>
            <button class="btn btn-primary btn-sm w-100">Détail</button>
          </div>
        </div>
      `;
      resultatsContainer.innerHTML += card; // Ajoute la carte au conteneur
    });

    resultatsContainer.style.display = "block"; // Affiche le conteneur des résultats
    filtersContainer.style.display = "flex"; // Affiche les filtres
    document.getElementById("message-par-defaut").style.display = "none"; // Cache le message par défaut
  } else {
    resultatsContainer.innerHTML = "<p class='text-center'>Aucun covoiturage trouvé.</p>";
    resultatsContainer.style.display = "block"; // Affiche le conteneur avec un message
    filtersContainer.style.display = "flex"; // Affiche les filtres même si aucun résultat
  }
}

// Vérifie si des paramètres sont passés dans l'URL
document.addEventListener("DOMContentLoaded", () => {
  const params = getURLParams();

  if (params.depart && params.destination && params.date && params.passagers) {
    const departSelect = document.getElementById("depart");
    const destinationSelect = document.getElementById("destination");

    // Définit les valeurs des champs <select>
    departSelect.value = params.depart;
    destinationSelect.value = params.destination;

    // Vérifie si les valeurs correspondent à une option valide
    if (!Array.from(departSelect.options).some(option => option.value === params.depart)) {
      departSelect.value = ""; // Réinitialise si la valeur est invalide
    }
    if (!Array.from(destinationSelect.options).some(option => option.value === params.destination)) {
      destinationSelect.value = ""; // Réinitialise si la valeur est invalide
    }

    document.getElementById("datepicker").value = params.date;
    document.getElementById("passagers").value = params.passagers;

    // Simule un clic sur le bouton "Rechercher" pour afficher les résultats
    document.getElementById("recherche").click();
  } else {
    // Affiche un message d'erreur si des paramètres sont manquants
    const erreurRecherche = document.getElementById("erreur-recherche");
    erreurRecherche.style.display = "block";
    erreurRecherche.textContent = "Veuillez remplir tous les champs de recherche.";
  }
});