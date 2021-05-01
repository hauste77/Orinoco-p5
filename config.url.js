// je crée une variable config qui me permet de changer les chemins URL utilisés plus facilement plutôt que de devoir les changer dans chaque fichier si besoin

const config = {
    apiBase: "https://orinoco77.herokuapp.com",
    frontBase: "http://127.0.0.1:5500"
}

const url = `${config.apiBase}/api/teddies`;
