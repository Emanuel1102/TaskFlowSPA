import { getSession, removeSession } from "../../services/auth.services";
import { getTasks } from "../../services/tasks.service";

export const dashboard = () => {
    // we get the current user from the session to conditionally render the admin link in the navigation if the user is an admin
    const currentUser = getSession()
    return `
        <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
            <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <a class="navigation text-xl font-black text-blue-900" href="/dashboard">TaskFlowSPA</a>
                <nav class="hidden gap-3 md:flex">
                    <a class="navigation rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/dashboard">Dashboard</a>
                    <a class="navigation rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
                    <a class="navigation rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
                    ${currentUser.role == 'ADMIN' ? `<a class="navigation rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin">Admin</a>` : ''}
                    
                    <a id="logout-link" class="navigation rounded-full px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/login">Logout</a>
                </nav>
            </div>
        </header>
        <main class="mx-auto max-w-6xl px-6 py-10">
            <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
                <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Dashboard principal</p>
                <h1 id="welcome-message" class="mt-3 text-4xl font-black tracking-tight"></h1>
                <p class="mt-4 max-w-2xl text-blue-50">Resumen general del trabajo del usuario, accesos rapidos y estado actual de productividad.</p>
            </section>

            <section class="mt-8 grid gap-4 md:grid-cols-3">
                <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                    <p class="text-sm text-slate-500">Tareas activas</p>
                    <p id="active-tasks" class="mt-3 text-4xl font-black text-blue-700"></p>
                </article>
                <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                    <p class="text-sm text-slate-500">Completadas</p>
                    <p id="completed-tasks" class="mt-3 text-4xl font-black text-blue-700"></p>
                </article>
                <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                    <p class="text-sm text-slate-500">Pendientes</p>
                    <p id="pending-tasks" class="mt-3 text-4xl font-black text-blue-700"></p>
                </article>
            </section>

            <section class="mt-8">
                <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-slate-900">Accesos rapidos</h2>
                        <a class="navigation text-sm font-semibold text-blue-700 hover:text-blue-600" href="/tasks">Ver tareas</a>
                    </div>
                    <div class="mt-6 grid gap-4 sm:grid-cols-2">
                        <a class="navigation rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/task-form">
                            <p class="text-sm font-semibold text-blue-600">Crear</p>
                            <h3 class="mt-2 text-lg font-bold text-slate-900">Nueva tarea</h3>
                        </a>
                        <a class="navigation rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/profile">
                            <p class="text-sm font-semibold text-blue-600">Cuenta</p>
                            <h3 class="mt-2 text-lg font-bold text-slate-900">Editar perfil</h3>
                        </a>
                    </div>
                </article>
            </section>
        </main>
    `
}

export const listenersDashboard = async ()=> {
    // we get the welcome message element and set its text content to a personalized greeting using the user's name from the session 
    const welcomeMessage = document.getElementById('welcome-message');
    const user = getSession()
    welcomeMessage.textContent = `¡Que bien tenerte de vuelta, ${user.name}!`;

    // we add an event listener to the logout link to call the removeSession function when clicked, this will clear the user's session and effectively log them out of the application
    const logoutLink = document.getElementById('logout-link')
    logoutLink.addEventListener('click', () => {
        removeSession()
    })

    // we fetch the user's tasks from the backend using the getTasks service, then we calculate the number of tasks in each status (pending, in-progress and completed) using the reduce method and update the corresponding elements in the UI to show these counts
    const tasks = await getTasks(user.id)

    const pendingTasks = document.getElementById('pending-tasks')
    const activeTasks = document.getElementById('active-tasks')
    const completedTasks = document.getElementById('completed-tasks')

    pendingTasks.textContent = tasks.reduce((acc, task) => {
        task.status == 'pending' && acc++
        return acc
    }, 0)
    
    activeTasks.textContent = tasks.reduce((acc, task) => {
        task.status == 'in-progress' && acc++
        return acc
    }, 0)

    completedTasks.textContent = tasks.reduce((acc, task) => {
        task.status == 'completed' && acc++
        return acc
    }, 0)
    

}