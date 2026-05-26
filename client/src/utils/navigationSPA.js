import { router } from "../router/router";

export const navigation = () => {
    const navigationLinks = document.querySelectorAll('.navigation');
    
    navigationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const path = link.getAttribute('href');
            router(path)
        })
    })
}
