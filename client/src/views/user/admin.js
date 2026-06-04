import { getAllTasks } from "../../services/admin.service"
import { deleteTask, updateTask } from "../../services/tasks.service"

export const admin = () => {
    return `
        <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
            <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <a class="text-xl font-black text-blue-900" href="/src/views/home.html">TaskFlowSPA</a>
                <nav class="hidden gap-3 md:flex">
                    <a class="navigation rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">
                        Dashboard
                    </a>
                    <a class="navigation rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">
                        Tareas
                    </a>
                    <a class="navigation rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">
                        Perfil
                    </a>
                    <a class="navigation rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/admin">
                        Admin
                    </a>
                </nav>
            </div>
        </header>
        <main class="mx-auto max-w-7xl px-6 py-10">
            <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
                <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Rol administrador</p>
                <h1 class="mt-3 text-4xl font-black tracking-tight">Panel administrativo</h1>
                <p class="mt-4 max-w-2xl text-blue-50">Vista reservada para gestionar usuarios, roles, permisos y monitoreo general del sistema.</p>
            </section>

            <section class="mt-8 grid gap-6 xl:grid-cols-2">
                

                <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-slate-900">Tareas</h2>
                        <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">Mockup</span>
                    </div>

                    <dialog id="admin-task-modal" class="open:flex items-center justify-center z-10 w-full h-full items-center justify-center bg-transparent">
                        <form id="task-form-admin" class="mt-8 grid gap-5 w-150 p-4 rounded-3xl bg-slate-300 border border-slate-500">
                            <div>
                                <label class="mb-2 block text-sm font-medium text-slate-700" for="title">Titulo</label>
                                <input name="title" value="" required id="title" type="text" placeholder="Ej. Preparar proyecto final" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
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
                                <button type="reset" class="cancel-edition-btn inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50 cursor-pointer">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </dialog>

                    <div id="all-tasks" class="mt-5 space-y-4">

                    </div>
                </article>

                
                <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-slate-900">Usuarios</h2>
                        <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">Mockup</span>
                    </div>
                    <div class="mt-5 space-y-4">
                        <div class="rounded-2xl bg-blue-50 p-4">
                            <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p class="font-bold text-slate-900">Nombre</p>
                                    <p class="text-sm text-slate-500">correo</p>
                                </div>
                                <div class="flex gap-2">
                                    <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">ROL</span>
                                    <button class="rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white">Editar</button>
                                </div>
                            </div>
                        </div>

                        
                        <div class="rounded-2xl bg-blue-50 p-4">
                            <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p class="font-bold text-slate-900">Nombre</p>
                                    <p class="text-sm text-slate-500">correo</p>
                                </div>
                                <div class="flex gap-2">
                                    <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">ROL</span>
                                    <button class="rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white">Editar</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </article>
            </section>
        </main>
    `
}

const renderTasks = (tasks) => {
    const tasksList = document.getElementById('all-tasks')
    tasksList.innerHTML = ''

    for (const task of tasks) {

        const {id, status, title, description, user} = task
        tasksList.innerHTML += `
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${status}</p>
                        <h2 class="mt-2 text-2xl font-bold text-slate-900">${title}</h2>
                        <p class="mt-3 max-w-2xl text-slate-600">${description}</p>
                    </div>
                    <div class="flex flex-col items-center ">
                        <div>
                            <button data-task='${JSON.stringify(task)}' class="edit-task-btn cursor-pointer rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
                                Editar
                            </button>
                            <button data-task-id="${id}" class="delete-task-btn cursor-pointer rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
                                Eliminar
                            </button>
                        </div>
                        <span class="mt-3 max-w-2xl text-sm text-slate-900">Creada por ${user.name}</span>
                    </div>
                </div>
            </article>

        `
        
    }
    

}

export const listenersAdmin = async () => {
    const tasks = await getAllTasks()

    renderTasks(tasks)

    
    const tasksModal = document.getElementById('admin-task-modal')
    
    const taskFormAdmin = document.getElementById('task-form-admin')    
    
    const tasksList = document.getElementById('all-tasks')

    tasksList.addEventListener('click', async ({target})=> {
        const btnEdit = target.closest('.edit-task-btn')
        if (btnEdit) {
            
            const task = JSON.parse(btnEdit.dataset.task)            
            
            tasksModal.showModal()
            
            taskFormAdmin.title.value = task.title
            taskFormAdmin.description.value = task.description
            taskFormAdmin.status.value = task.status
            taskFormAdmin.deadline.value = task.deadline
    
            taskFormAdmin.dataset.taskId = task.id   
        }

        const btnDelete = target.closest('.delete-task-btn')
        if (btnDelete) {
            const confirmDelete = confirm('¿seguro que quieres eliminar esta tarea?')
            if (confirmDelete) {
                
                const taskId = btnDelete.dataset.taskId
                
                await deleteTask(taskId)
    
                const updatedTasks = await getAllTasks()
    
                renderTasks(updatedTasks)
            }
        }

    })

    taskFormAdmin.addEventListener('submit', async (e) => {
        e.preventDefault()

        const taskToUpdate = {
            title : taskFormAdmin.title.value,
            description : taskFormAdmin.description.value,
            status : taskFormAdmin.status.value,
            deadline : taskFormAdmin.deadline.value,
        }

        const taskId = taskFormAdmin.dataset.taskId

        await updateTask(taskId, taskToUpdate)

        taskFormAdmin.removeAttribute('data-task-id')
        tasksModal.close()

        const updatedTasks = await getAllTasks()

        renderTasks(updatedTasks)
        
    })


    const cancelEditButtons = document.querySelectorAll('.cancel-edition-btn')

    cancelEditButtons.forEach(btn => {
        btn.addEventListener('click', ({target}) => {
            const modalToClose = target.closest('dialog')
            modalToClose.close()
            taskFormAdmin.removeAttribute('data-task-id')

        })
    })    
}
