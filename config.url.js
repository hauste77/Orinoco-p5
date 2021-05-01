// je crée une variable config qui me permet de changer les chemins URL utilisés plus facilement plutôt que de devoir les changer dans chaque fichier si besoin

const config = {
    apiBase: "http://localhost:3000",
    frontBase: "https://orinoco77.herokuapp.com"
}

const url = `${config.apiBase}/api/teddies`;
