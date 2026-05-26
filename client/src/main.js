import "./styles/global.css";
import { handleLocation } from "./router/router";

window.addEventListener('popstate', handleLocation)

handleLocation()
