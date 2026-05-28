import { getSession, saveSession } from "../../services/auth.services";
import { updateUser, verifyUser } from "../../services/users.service";

export const profile = () => {
    // todo: get the user data here, to set the value of the form inputs, also set the current role in the select input
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
                                <select  name="role" id="role" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
                                <option>USER</option>
                                <option>ADMIN</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid gap-5 md:grid-cols-2">
                            <button type="submit" class="cursor-pointer inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">
                            Confirmar cambios
                            </button>
                            <button type="reset" class="cursor-pointer inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">
                            Cancelar
                            </button>
                        </div>
                            
                    </form>
                </section>
            </section>
        </main>
    `
}

export const listenersProfile = () => {

    let user = getSession()
    
    const profileForm = document.getElementById('profile-form');

    profileForm.name.value = user.name;
    profileForm.lastname.value = user.lastname;
    profileForm.email.value = user.email;
    profileForm.password.value = user.password;
    profileForm.role.value = user.role;

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
            role: profileForm.role.value
        }
        
        await updateUser(user.id, updatedUser)

        const newSession = await verifyUser(updatedUser.email)

        saveSession(newSession)        

        user = getSession()

        alert('¡Perfil actualizado con exito!')

        // todo: when the user clicks cancel button, reset the form with the current data
    })
}

