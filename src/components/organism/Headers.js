import { Link } from "../atoms/link";
import { Logo } from "../atoms/Logo";

export const DashboardHeader = () => {
  return `
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
        <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            ${Logo()}
            <nav class="hidden gap-3 md:flex">
                ${Link({text:'Tareas', 
                        navigation:'/tasks', 
                        newClass:'navigation-spa'})}

                ${Link({text:'Perfil', 
                        navigation:'/profile', 
                        newClass:'navigation-spa'})}

                ${Link({text:'Cerrar sesión', 
                        navigation:'/login', 
                        newClass:'navigation-spa'})}
            </nav>
        </div>
    </header>
  `
};

export const TasksHeader = () => {
  return `
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
        <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            ${Logo()}
            <nav class="hidden gap-3 md:flex">
                ${Link({text:'Dashboard', 
                        navigation:'/dashboard', 
                        newClass:'navigation-spa'})}

                ${Link({text:'Perfil', 
                        navigation:'/profile', 
                        newClass:'navigation-spa'})}
            </nav>
        </div>
    </header>
  `
};

export const ProfileHeader = () => {
  return `
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
        <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            ${Logo()}
            <nav class="hidden gap-3 md:flex">
                ${Link({text:'Dashboard', 
                        navigation:'/dashboard', 
                        newClass:'navigation-spa'})}
            </nav>
        </div>
    </header>
  `
};