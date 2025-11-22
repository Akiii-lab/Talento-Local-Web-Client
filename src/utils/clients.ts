export const GetGestionClient = () => {
    const url = process.env.NEXT_PUBLIC_GESTION_URL;
    if(!url){
        throw new Error("GestionApiUrl is not defined");
    }
    return url;
}

export const GetProfilesClient = () => {
    const url = process.env.NEXT_PUBLIC_PROFILES_URL;
    if(!url){
        throw new Error("ProfilesApiUrl is not defined");
    }
    return url;
}

export const GetNotificationsClient = () => {
    const url = process.env.NEXT_PUBLIC_NOTIFICATIONS_URL;
    if(!url){
        throw new Error("NotificationsApiUrl is not defined");
    }
    return url;
}