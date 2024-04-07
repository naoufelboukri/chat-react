export function getErrorMessage(errorCode) {

    console.log("errorCode", errorCode);
    switch (errorCode) {
        case "auth/invalid-credential":
            return "Les informations d'identification fournies ne sont pas valides.";
        case "auth/user-not-found":
            return "Aucun utilisateur trouvé avec cet email.";
        case "auth/wrong-password":
            return "Le mot de passe est incorrect.";
        case "auth/weak-password":
            return "Le mot de passe doit contenir au moins 6 caractères.";
        case "auth/email-already-in-use":
            return "L'adresse e-mail est déjà utilisée par un autre compte.";
        case "auth/operation-not-allowed":
            return "L'authentification par e-mail et mot de passe n'est pas activée.";
        case "auth/invalid-email":
            return "L'adresse e-mail est incorrect.";
        case "auth/username-already-in-use":
            return "Le nom d'utilisateur est déjà utilisé par un autre compte.";
        default:
            return "Une erreur s'est produite lors de l'authentification.";
    }
}