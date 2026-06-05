import { getSession } from "../../services/auth.services"
import { deleteTask, getTasks, updateTask } from "../../services/tasks.service"
import { router } from "../../router/router";

export const tasks = () => {
    const currentUser = getSession()

    return `
        <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
            <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <a class="navigation text-xl font-black text-blue-900" href="/dashboard">TaskFlowSPA</a>
                <nav class="hidden gap-3 md:flex">
                    <a class="navigation rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
                    <a class="navigation rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
                    <a class="navigation rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
                    ${currentUser.role == 'ADMIN' ? `<a class="navigation rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin">Admin</a>` : ''}
                </nav>
            </div>
        </header>

        <main class="mx-auto max-w-6xl px-6 py-10">
            <section class="flex flex-col gap-4 rounded-[2rem] bg-blue-600 px-8 py-10 text-white md:flex-row md:items-end md:justify-between">
                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">CRUD de tareas</p>
                    <h1 class="mt-3 text-4xl font-black tracking-tight">Mis tareas</h1>
                    <p class="mt-4 max-w-2xl text-blue-50">Vista principal para listar, editar y eliminar las tareas del usuario autenticado.</p>
                </div>
                <a class="navigation inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/task-form">
                Crear tarea
                </a>
            </section>

            <dialog id="edit-task-modal" class="open:flex items-center justify-center z-10 w-full h-full items-center justify-center bg-transparent">
                <form id="edit-task-form" class="mt-8 grid gap-5 w-150 p-4 rounded-3xl bg-slate-300 border border-slate-500">
                    <div>
                        <label class="mb-2 block text-sm font-medium text-slate-700" for="title">Titulo</label>
                        <input name="title" required id="title" type="text" placeholder="Ej. Preparar proyecto final" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                    </div>

                    <div>
                        <label class="mb-2 block text-sm font-medium text-slate-700" for="description">Descripcion</label>
                        <textarea name="description" id="description" rows="5" placeholder="Describe la tarea..." class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"></textarea>
                    </div>

                    <div class="grid gap-5 md:grid-cols-2">
                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-700" for="status">Estado</label>
                            <select name="status" id="status" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
                                <option value="pending">Pendiente</option>
                                <option value="in-progress">En progreso</option>
                                <option value="completed">Completada</option>
                            </select>
                        </div>
                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-700" for="date">Fecha limite</label>
                            <input name="deadline" id="date" type="date" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 pt-2 sm:flex-row">
                        <button type="submit" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500 cursor-pointer">
                            Guardar
                        </button>
                        <button type="reset" class="edit-task-cancel inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50 cursor-pointer">
                            Cancelar
                        </button>
                    </div>
                </form>
            </dialog>

            <section id="task-list" class="mt-8 grid gap-4">
               
            </section>
        </main>
    `
}

export const listenersTasks = async () => {
    const currentUser = getSession()

    const tasks = await getTasks(currentUser.id)

    const tasksList = document.getElementById('task-list')

    for (const task of tasks.reverse()) {

        const {status, title, description, id} = task

        tasksList.innerHTML += `
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${status}</p>
                        <h2 class="mt-2 text-2xl font-bold text-slate-900">${title}</h2>
                        <p class="mt-3 max-w-2xl text-slate-600">${description}</p>
                    </div>
                    <div class="flex gap-3">
                        <button data-id="${id}" class="edit-task-btn cursor-pointer rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
                            Editar
                        </button>
                        <button data-id="${id}" class="delete-task-btn cursor-pointer rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
                            Eliminar
                        </button>
                    </div>
                </div>
            </article>
        `   
    }

    const editButtons = document.querySelectorAll('.edit-task-btn')    

    const modal = document.getElementById('edit-task-modal')

    const editTaskForm = document.getElementById('edit-task-form')

    const title = editTaskForm.title
    const description = editTaskForm.description
    const status = editTaskForm.status
    const deadline = editTaskForm.deadline    
    let currentTask

    editButtons.forEach(btn => {
        btn.addEventListener('click', ({target}) => {
            modal.showModal()

            currentTask = tasks.find(task => task.id == target.dataset.id)

            title.value = currentTask.title
            description.value = currentTask.description
            status.value = currentTask.status
            deadline.value = currentTask.deadline            
        })
    })


    editTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const updatedTask = {
            title: title.value,
            description: description.value,
            status: status.value,
            deadline: deadline.value
        }

        await updateTask(currentTask.id, updatedTask)
        
        e.target.reset()

        modal.close()

        router(location.pathname)

        
    })

    const cancelUpdateButtons = document.querySelectorAll('.edit-task-cancel')

    cancelUpdateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.close()
        })
    })

    document.addEventListener('keyup', (e) => {
      e.key == 'Escape' && editTaskForm.reset()
    })


    const deleteTaskButtons = document.querySelectorAll('.delete-task-btn')
    
    deleteTaskButtons.forEach(btn => {
        btn.addEventListener('click', async ({target}) => {
            const confirmDelete = confirm('¿Eliminar tarea?')
            if (confirmDelete) {
                const taskId = target.dataset.id
                await deleteTask(taskId)
                router(location.pathname)
            }
        })
    })

}
