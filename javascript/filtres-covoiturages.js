// Fonction pour appliquer les filtres supplémentaires
function appliquerFiltres(resultatsFiltres) {
    const filtreEcologique = document.getElementById("filtre-ecologique").value;
    const filtrePrix = parseInt(document.getElementById("filtre-prix").value, 10);
    const filtreDuree = parseInt(document.getElementById("filtre-duree").value, 10);
    const filtreNote = parseFloat(document.getElementById("filtre-note").value);
  
    return resultatsFiltres.filter((covoiturage) => {
      // Filtre écologique
      if (filtreEcologique && covoiturage.ecologique !== filtreEcologique) {
        return false;
      }
  
      // Filtre prix maximum
      if (!isNaN(filtrePrix)) {
        const prix = parseInt(covoiturage.prix.split(" ")[0], 10); // Extrait le prix en tant que nombre
        if (prix > filtrePrix) {
          return false;
        }
      }
  
      // Filtre durée maximum
      if (!isNaN(filtreDuree)) {
        const duree = covoiturage.heure.split(" - "); // Extrait les heures de début et de fin
        const debut = new Date(`1970-01-01T${duree[0]}:00`);
        const fin = new Date(`1970-01-01T${duree[1]}:00`);
        const dureeMinutes = (fin - debut) / (1000 * 60); // Convertit en minutes
        if (dureeMinutes > filtreDuree) {
          return false;
        }
      }
  
      // Filtre note minimale
      if (!isNaN(filtreNote) && parseFloat(covoiturage.note.split("/")[0]) < filtreNote) {
        return false;
      }
  
      return true;
    });
  }