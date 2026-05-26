import "./styles/global.css";
import { handleLocation, router } from "./router/router";

window.addEventListener('popstate', handleLocation)

handleLocation()
