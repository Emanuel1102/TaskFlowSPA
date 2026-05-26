import { home, listenersHome } from "../views/home";
import { listenersLogin, login } from "../views/auth/login";
import { listenersRegister, register } from "../views/auth/register";
import { dashboard } from "../views/user/dashboard";
import { notFound } from "../views/auth/notFound";

export const routes = {
    "/": {
        template: home(),
        actions: listenersHome
    }, 
    "/login": {
        template: login(),
        actions: listenersLogin
    },
    "/register": {
        template: register(),
        actions: listenersRegister
    },
    "/dashboard": {
        template: dashboard(),
        actions: () => {}
    },
    "/not-found": notFound(),
}