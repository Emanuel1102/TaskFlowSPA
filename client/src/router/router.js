import { navigation } from "../utils/navigationSPA";
import { routes } from "./routes";

export const handleLocation = () => {
    const path =  location.pathname;
    const page = routes[path] || routes['/not-found']
    const app = document.getElementById('app')
    app.innerHTML = page.template || page
    page.actions && page.actions()
    navigation()
}

export const router = (path) => {
    history.pushState({}, '', path)
    handleLocation()
}
