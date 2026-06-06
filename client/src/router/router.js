import { getSession } from "../services/auth.services";
import { navigation } from "../utils/navigationSPA";
import { routes } from "./routes";

// this function handle the location to render the respective view
export const handleLocation = () => {

    const session = getSession()

    const path =  location.pathname;
    const page = routes[path] || routes['/not-found']

    // if the user is not authenticated, automatically is redirected to the home
    if (!page.isPublic && !session) {
        alert('Inicia sesión para poder acceder')
        history.replaceState({}, '', '/')
        handleLocation()
        return        
    }
    
    /* 
        if the user is authenticated and try to access a public page, automatically is redirected to the dashboard
        also when the user role is not admin and try access to the admin view
    */
    if ( (page.isPublic && session) || (page.onlyAdmin && session.role != 'ADMIN') ) {
        history.replaceState({}, '', '/dashboard')
        handleLocation()
        return        
    }

    // render the content of the page in the app div and call the actions if the page contains the actions property, also call the navigation function to update the navigation links
    const app = document.getElementById('app')
    app.innerHTML = page.template()
    // the functions are executed after the content rendering, so that we can access to the elements
    page.actions && page.actions()
    navigation()
}

// this function receive the path to modify the url as parameter, after calls the handleLocation function
export const router = (path) => {
    history.pushState({}, '', path)
    handleLocation()
}
