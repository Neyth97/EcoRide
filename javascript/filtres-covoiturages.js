// Fonction pour appliquer les filtres supplémentaires
function appliquerFiltres(resultatsFiltres) {
    const filtreEcologique = document.getElementById("filtre-ecologique").value.trim().toLowerCase();
    const filtrePrix = document.getElementById("filtre-prix").value.trim();
    const filtreDuree = document.getElementById("filtre-duree").value.trim();
    const filtreNote = document.getElementById("filtre-note").value.trim();
  
    console.log("Valeurs des filtres :");
    console.log("Filtre écologique :", filtreEcologique);
    console.log("Filtre prix maximum :", filtrePrix);
    console.log("Filtre durée maximum :", filtreDuree);
    console.log("Filtre note minimale :", filtreNote);
  
    return resultatsFiltres.filter((covoiturage) => {
      console.log("Covoiturage en cours de vérification :", covoiturage);
  
      // Filtre écologique
      if (filtreEcologique && filtreEcologique !== "aspect écologique" && covoiturage.ecologique.trim().toLowerCase() !== filtreEcologique) {
        console.log("Exclu par le filtre écologique :", covoiturage.ecologique);
        return false;
      }
  
      // Filtre prix maximum
      if (filtrePrix && !isNaN(filtrePrix)) {
        const prix = parseInt(covoiturage.prix.replace(/\D/g, ""), 10); // Extrait uniquement les chiffres
        console.log("Prix du covoiturage :", prix);
        if (prix > parseInt(filtrePrix, 10)) {
          console.log("Exclu par le filtre prix :", prix);
          return false;
        }
      }
  
      // Filtre durée maximum (en heures)
      if (filtreDuree && !isNaN(filtreDuree)) {
        const duree = covoiturage.heure.split(" - "); // Extrait les heures de début et de fin
        if (duree.length === 2) {
          const debut = new Date(`1970-01-01T${duree[0].trim()}:00`);
          const fin = new Date(`1970-01-01T${duree[1].trim()}:00`);
          const dureeHeures = Math.ceil((fin - debut) / (1000 * 60 * 60)); // Convertit en heures et arrondit à l'entier supérieur
          console.log("Durée du covoiturage (en heures) :", dureeHeures);
          if (dureeHeures > parseFloat(filtreDuree)) {
            console.log("Exclu par le filtre durée :", dureeHeures);
            return false;
          }
        }
      }
  
      // Filtre note minimale
      if (filtreNote && !isNaN(filtreNote)) {
        const note = parseFloat(covoiturage.note.split("/")[0].trim()); // Extrait la note
        console.log("Note du covoiturage :", note);
        if (note < parseFloat(filtreNote)) {
          console.log("Exclu par le filtre note :", note);
          return false;
        }
      }
  
      console.log("Covoiturage validé :", covoiturage);
      return true;
    });
  }
  
  // Ajout d'écouteurs d'événements pour les filtres dynamiques
  document.querySelectorAll("#filtre-ecologique, #filtre-prix, #filtre-duree, #filtre-note").forEach((filtre) => {
    filtre.addEventListener("input", () => {
      const resultatsContainer = document.getElementById("resultats-covoiturages");
      const resultatsFiltresAppliques = appliquerFiltres(resultatsFiltres);
  
      if (resultatsFiltresAppliques.length > 0) {
        afficherResultats(resultatsFiltresAppliques);
        resultatsContainer.style.display = "block";
      } else {
        resultatsContainer.innerHTML = "<p class='text-center'>Aucun covoiturage trouvé avec les filtres appliqués.</p>";
        resultatsContainer.style.display = "block";
      }
    });
  });