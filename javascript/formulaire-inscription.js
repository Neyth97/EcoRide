document.querySelector("form").addEventListener("submit", function (e) {
    const password = document.getElementById("password").value;
    const passwordError = document.getElementById("password-error");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!passwordRegex.test(password)) {
      e.preventDefault(); // Empêche l'envoi du formulaire
      passwordError.style.display = "block"; // Affiche le message d'erreur
    } else {
      passwordError.style.display = "none"; // Cache le message d'erreur si le mot de passe est valide
    }
  });