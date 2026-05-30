import { handleLocation, router } from "../../router/router";
import { getSession, removeSession, saveSession } from "../../services/auth.services";
import { deleteUser, updateUser, verifyUser } from "../../services/users.service";

export const profile = () => {
    const user = getSession()

    const {name, lastname, email, password} = user

    return `
        <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
            <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <a class="text-xl font-black text-blue-900" href="/src/views/home.html">TaskFlowSPA</a>
                <nav class="hidden gap-3 md:flex">
                    <a class="navigation rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
                    <a class="navigation rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
                    <a class="navigation rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/profile">Perfil</a>
                </nav>
            </div>
        </header>
        <main class="mx-auto max-w-5xl px-6 py-10">
            <section class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                <aside class="rounded-[2rem] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
                    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Cuenta</p>
                    <h1 class="mt-3 text-4xl font-black tracking-tight">Mi perfil</h1>
                    <p class="mt-4 text-blue-50">El usuario puede actualizar sus datos personales y gestionar su propia cuenta dentro del sistema.</p>
                </aside>

                <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
                    <form id="profile-form" class="mt-8 grid gap-5">
                        <div class="grid gap-5 md:grid-cols-2">
                            <div>
                                <label class="mb-2 block text-sm font-medium text-slate-700" for="name">Nombre</label>
                                <input required name="name" id="name" value="${name}" type="text" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                            </div>
                            <div>
                                <label class="mb-2 block text-sm font-medium text-slate-700" for="lastname">Apellido</label>
                                <input required name="lastname" id="lastname" value="${lastname}" type="text" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                            </div>
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-700" for="email">Correo</label>
                            <input required name="email" id="email" value="${email}" type="email" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                        </div>

                        <div class="grid gap-5 md:grid-cols-2">
                            <div>
                                <div>
                                    <label class="mb-2 block text-sm font-medium text-slate-700" for="password">Contrasena</label>
                                    <input required name="password" id="password" value="${password}" type="password" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                                </div>
                                <div class="flex items-center gap-2 px-2 my-2">
                                    <input name="show-password" id="show-password" type="checkbox" class="cursor-pointer rounded-2xl bg-blue-50 px-4 py-3 text-slate-900 " />
                                    <label class="cursor-pointer text-sm font-medium text-slate-700" for="show-password">Mostrar Contrasena</label>
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-5 justify-evenly">
                            <button type="submit" class="flex-grow-1 cursor-pointer inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">
                                Confirmar cambios
                            </button>
                            <button type="reset" class="flex-grow-1 cursor-pointer inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">
                                Cancelar
                            </button>
                            <button id="delete-account" type="reset" class="cursor-pointer border inline-flex items-center justify-center rounded-2xl  px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-200">
                                Eliminar mi cuenta
                            </button>
                        </div>
                            
                    </form>
                </section>
            </section>
        </main>
    `
}

export const listenersProfile = () => {

    const userData = getSession()

    const profileForm = document.getElementById('profile-form');

    profileForm['show-password'].addEventListener('change', (e) => {
        const passwordInput = profileForm.password;
        if(e.target.checked) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    })
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // todo: verify if the email exists before update, in this case display a message error
        const updatedUser = {
            name: profileForm.name.value,
            lastname: profileForm.lastname.value,
            email: profileForm.email.value,
            password: profileForm.password.value,
        }
        
        await updateUser(userData.id, updatedUser)

        const updatedSession = await verifyUser(updatedUser.email)
        
        saveSession(updatedSession)        

        router(location.pathname)
    })

    const deleteAccountButton = document.getElementById('delete-account')
    deleteAccountButton.addEventListener('click', async () => {
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')
        // todo: when the user attempts back whitout a session, redirect to login page
        if (confirmDelete) {
            await deleteUser(userData.id)
            removeSession()
            history.replaceState({}, '', '/')
            handleLocation()
        }else{
            alert('Eliminación cancelada')
        }
    })
}

