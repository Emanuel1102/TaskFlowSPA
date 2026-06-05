import { getSession } from "../services/auth.services";
import { navigation } from "../utils/navigationSPA";
import { routes } from "./routes";

export const handleLocation = () => {

    const session = getSession()

    const path =  location.pathname;
    const page = routes[path] || routes['/not-found']

    if (!page.isPublic && !session) {
        alert('Inicia sesión para poder acceder')
        history.replaceState({}, '', '/')
        handleLocation()
        return        
    }
    
    if ( (page.isPublic && session) || (page.onlyAdmin && session.role != 'ADMIN') ) {
        history.replaceState({}, '', '/dashboard')
        handleLocation()
        return        
    }

    const app = document.getElementById('app')
    app.innerHTML = page.template()
    page.actions && page.actions()
    navigation()
}

export const router = (path) => {
    history.pushState({}, '', path)
    handleLocation()
}
