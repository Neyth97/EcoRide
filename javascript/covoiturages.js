document.getElementById("recherche").addEventListener("click", function (e) {
    e.preventDefault(); // Empêche le rechargement de la page
  
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
        ecologique: "Non",
      },
    ];
  
    // Sélectionne les conteneurs
    const resultatsContainer = document.getElementById("resultats-covoiturages");
    const messageParDefaut = document.getElementById("message-par-defaut");
    const row = resultatsContainer.querySelector(".row");
  
    // Masque le message par défaut
    messageParDefaut.style.display = "none";
  
    // Vide les résultats précédents
    row.innerHTML = "";
  
    // Ajoute chaque covoiturage
    resultats.forEach((covoiturage) => {
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
  });