import { getAllTasks, getUsers } from "../../services/admin.service"
import { getSession } from "../../services/auth.services"
import { deleteTask, updateTask } from "../../services/tasks.service"
import { deleteUser, updateUser } from "../../services/users.service"

// This view is only accessible for users with the ADMIN role, here they can see all the tasks and users in the system, and they can edit or delete any task or user, also they can change the role of any user
export const admin = () => {
    return `
        <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
            <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <a class="navigation text-xl font-black text-blue-900" href="/dashboard">TaskFlowSPA</a>
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

                    <dialog id="admin-users-modal" class="open:flex items-center justify-center z-10 w-full h-full items-center justify-center bg-transparent">
                        <form id="user-form-admin" class="mt-8 grid gap-5 w-150 p-4 rounded-3xl bg-slate-300 border border-slate-500">
                           <div class="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label class="mb-2 block text-sm font-medium text-slate-700" for="name">Nombre</label>
                                    <input required name="name" id="name" type="text" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                                </div>
                                <div>
                                    <label class="mb-2 block text-sm font-medium text-slate-700" for="lastname">Apellido</label>
                                    <input required name="lastname" id="lastname" type="text" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                                </div>
                            </div>

                            <div>
                                <label class="mb-2 block text-sm font-medium text-slate-700" for="email">Correo</label>
                                <input required name="email" id="email" type="email" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                            </div>

                            <div class="grid gap-5 md:grid-cols-2">
                                <div>
                                    <div>
                                        <label class="mb-2 block text-sm font-medium text-slate-700" for="password">Contrasena</label>
                                        <input required name="password" id="password" type="password" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                                    </div>
                                    <div class="flex items-center gap-2 px-2 my-2">
                                        <input name="show-password" id="show-password" type="checkbox" class="cursor-pointer rounded-2xl bg-blue-50 px-4 py-3 text-slate-900 " />
                                        <label class="cursor-pointer text-sm font-medium text-slate-700" for="show-password">Mostrar Contrasena</label>
                                    </div>
                                </div>
                                <div>
                                    <label class="mb-2 block text-sm font-medium text-slate-700" for="role">Rol</label>
                                    <select id="role" name="role" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
                                        <option>USER</option>
                                        <option>ADMIN</option>
                                    </select>
                                </div>
                            </div>

                            <div class="flex gap-5 justify-evenly">
                                <button type="submit" class="flex-grow-1 cursor-pointer inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">
                                    Confirmar cambios
                                </button>
                                <button type="reset" class="cancel-edition-btn flex-grow-1 cursor-pointer inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">
                                    Cancelar
                                </button>
                               
                            </div>
                        </form>
                    </dialog>

                    <div id="all-users" class="mt-5 space-y-4">

                    </div>
                </article>
            </section>
        </main>
    `
}

// the renderTasks and renderUsers functions are responsible for rendering the tasks and users in the admin view, they receive an array of tasks or users and create the corresponding HTML to display them in the page, also they add data attributes to the edit and delete buttons to store the task or user data that will be used later when we want to edit or delete a task or user
const renderTasks = (tasks) => {
    const tasksList = document.getElementById('all-tasks')

    // we clear the tasks list before rendering the updated tasks, to avoid duplicates when we re-render after an update or delete action
    tasksList.innerHTML = ''

    
    for (const task of tasks) {     
        
        // we destructure the task object to get the properties we need to display, and also we get the creator's email if the user exists, if the user was deleted we show 'usuario eliminado' as the creator
        const {id, status, title, description, user} = task

        const creator = user ? user.email : 'usuario eliminado'

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
                        <span class="mt-3 max-w-2xl text-sm text-slate-900">Creada por ${creator}</span>
                    </div>
                </div>
            </article>

        `
        
    }
}

const renderUsers = (users) => {

    const usersList = document.getElementById('all-users')

    // this function is similar to renderTasks but with some differences, here we also check if the user in the iteration is the same as the current logged in user, if it is we skip rendering that user to avoid showing the edit and delete buttons for the current user, since we don't want the admin to be able to edit or delete their own account from this panel, they can only do it from their profile page
    usersList.innerHTML = ''
    
    const currentUser = getSession()

    for (const user of users) {

        if (currentUser.id == user.id ) {
            continue
        }

        const {name, email, role} = user

        // we add the object user as a data attribute in the edit and delete buttons, so when we click on them we can access all the user data to populate the edit form or to show the confirmation dialog with the user's name when we want to delete it
        usersList.innerHTML += `
            <div class="rounded-2xl bg-blue-50 p-4">
                <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p class="font-bold text-slate-900">${name}</p>
                        <p class="text-sm text-slate-500">${email}</p>
                    </div>
                    <div class="flex gap-2">
                        <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">${role}</span>
                        <button data-user='${JSON.stringify(user)}' class="edit-user-btn rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white cursor-pointer">
                            Editar
                        </button>
                        <button data-user='${JSON.stringify(user)}' class="delete-user-btn rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white cursor-pointer">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `
    }
}


export const listenersAdmin = async () => {

    // when the admin view is loaded, we call the getAllTasks and getUsers services to fetch the tasks and users data from the backend, then we call the renderTasks and renderUsers functions to display them in the page
    const tasks = await getAllTasks()

    renderTasks(tasks)

    const users = await getUsers()

    renderUsers(users)

    // we get the admin task modal, the admin user modal, the task form and the user form elements from the DOM to add event listeners to them later for the edit actions
    const tasksModal = document.getElementById('admin-task-modal')
    
    const taskFormAdmin = document.getElementById('task-form-admin')    
    
    const tasksList = document.getElementById('all-tasks')

    // we add a click event to the tasks list container, when detect when the click origin is a button to edit or delete, to that we can access to them even if they are rendered dynamically after an update or delete action, then we get the task data from the data attribute of the clicked button to populate the edit form
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

        // when the click origin is a delete button, we show a confirmation dialog, if the user confirms we call the deleteTask service to delete the task from the backend, then we fetch the updated tasks list and re-render it to reflect the changes in the UI
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

    // when we submit the edit task form, we prevent the default behavior, we create an updated task object with the new values from the form, then we call the updateTask service to update the task in the backend, after that we reset the form, close the modal and fetch the updated tasks list to re-render it and show the updated task in the UI
    taskFormAdmin.addEventListener('submit', async (e) => {
        e.preventDefault()

        const taskToUpdate = {
            title : taskFormAdmin.title.value.trim(),
            description : taskFormAdmin.description.value.trim(),
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


    // we add event listeners to the cancel buttons in both modals to reset the forms and close the modals when clicked
    const cancelEditButtons = document.querySelectorAll('.cancel-edition-btn')

    cancelEditButtons.forEach(btn => {
        btn.addEventListener('click', ({target}) => {
            const modalToClose = target.closest('dialog')
            const form = modalToClose.querySelector('form')
            form.removeAttribute('data-task-id') || form.removeAttribute('data-user-id') 
            modalToClose.close()

        })
    })        

    // this code block is similar to the previous one but for the users list
    const usersList = document.getElementById('all-users')

    const modalUsers = document.getElementById('admin-users-modal')

    const userFormAdmin = document.getElementById('user-form-admin')    

    const showPassword = userFormAdmin['show-password']
    showPassword.addEventListener('change', () => {
        showPassword.checked ? userFormAdmin.password.type = 'text' : userFormAdmin.password.type = 'password'
    })
    
 

    usersList.addEventListener('click', async ({target}) => {
        const editBtn = target.closest('.edit-user-btn')
        if (editBtn) {

            modalUsers.showModal()            

            const user = JSON.parse(editBtn.dataset.user)

            userFormAdmin.name.value = user.name
            userFormAdmin.lastname.value = user.lastname
            userFormAdmin.email.value = user.email
            userFormAdmin.password.value = user.password
            userFormAdmin.role.value = user.role

            userFormAdmin.dataset.userId = user.id
            
            
        }

        const deleteBtn = target.closest('.delete-user-btn')
        if (deleteBtn) {
            const user = JSON.parse(deleteBtn.dataset.user)          
            
            const confirmDelete = confirm(`¿Eliminar la cuenta de ${user.name}?`)
            if (confirmDelete) {
                
                await deleteUser(user.id)
                
                const updatedUsers = await getUsers()

                renderUsers(updatedUsers)

                const updatedTasks = await getAllTasks()

                renderTasks(updatedTasks)
            }            
        }
    })

    userFormAdmin.addEventListener('submit', async (e) => {
        e.preventDefault()
        const userToUpdate = {
            name: userFormAdmin.name.value.trim(),
            lastname: userFormAdmin.lastname.value.trim(),
            email: userFormAdmin.email.value.trim(),
            password: userFormAdmin.password.value.trim(),
            role: userFormAdmin.role.value,
        }
        const userId = userFormAdmin.dataset.userId

        await updateUser(userId, userToUpdate)

        const updatedUsers = await getUsers()
        
        modalUsers.close()

        userFormAdmin.reset()

        userFormAdmin.removeAttribute('data-user-id')

        renderUsers(updatedUsers)
    })  

    // also we add a keyup event listener to the document to listen for the Escape key to reset the forms and close the modals when pressed, this way we ensure that if the user decides to cancel the edit action, we clear any data from the form and close the modal properly
    document.addEventListener('keyup', (e) => {
       if (e.key == 'Escape') {
            taskFormAdmin.reset() || userFormAdmin.reset()
            taskFormAdmin.removeAttribute('data-task-id') || userFormAdmin.removeAttribute('data-user-id') 
       }  
    })
}
