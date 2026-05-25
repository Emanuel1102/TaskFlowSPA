import { Button } from "../components/atoms/Button";
import { Link } from "../components/atoms/link";
import { PresentationCard } from "../components/molecule/PresentationCard";
import { StatCard } from "../components/molecule/StatCard";
import { TaskCard } from "../components/molecule/TaskCard";
import { DashboardHeader } from "../components/organism/Headers";

export const dashboardView = () => {
    return `
    <!-- header dahsboard here -->
    ${DashboardHeader()}

    <main class="mx-auto max-w-6xl px-6 py-10">
        <!-- presentation card here -->
        ${PresentationCard({ 
                            title: "Bienvenido a TaskFlow", 
                            description: "Gestiona tus tareas de manera eficiente y organizada." })}

        <section class="mt-8  flex justify-evenly gap-6">

            <!-- stadistic cards here -->
            ${StatCard({ title: "En progreso", value: "0" })}
            ${StatCard({ title: "Pendientes", value: "0" })}
            ${StatCard({ title: "Completadas", value: "0" })}
        </section>

        <section class="mt-8">
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                <h2 class="text-xl font-bold text-slate-900">Accesos rapidos</h2>
                <div class="h-20 mt-6 grid gap-4 sm:grid-cols-2">
                    <!-- button to new task here -->
                    ${Button({
                        text: "Nueva Tarea",
                        newClass: "btn-new-task"
                    })}

                    <!-- modal window with task form here -->


                    <!-- button to edit profile here -->
                    ${Link({
                        text: "Editar Perfil",
                        navigation: "/profile",
                    })}
                </div>
            </article>
            <article id="user-tasks" class="grid gap-4 rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                <h2 class="text-xl font-bold text-slate-900">Mis Tareas</h2>

                <!-- task cards here -->
                ${TaskCard({
                            status: "Pendiente",
                            title: "Comprar víveres",
                            description: "Comprar leche, pan y huevos para la semana."})}
                
                ${TaskCard({
                            status: "Pendiente",
                            title: "Comprar víveres",
                            description: "Comprar leche, pan y huevos para la semana."})}
                
                ${TaskCard({
                            status: "Pendiente",
                            title: "Comprar víveres",
                            description: "Comprar leche, pan y huevos para la semana."})}
                
            </article>
        </section>
    </main>
    `
}