import { Select } from "./components/atoms/select";
import { RegisterForm, TaskForm, updateProfileForm } from "./components/organism/Forms";
import "./styles/global.css";
import { dashboardView } from "./views/dashboard";
import { profileView } from "./views/profile";

// document.getElementById('').addEventListener('click', (e)=>{
//     console.log();
// })

document.getElementById('root').innerHTML = profileView()