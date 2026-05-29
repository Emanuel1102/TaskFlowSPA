import { router } from "../../router/router"
import { createUser, verifyUser } from "../../services/users.service"

export const register = () => {
    return `
        <main class="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
            <section class="hidden border-r border-blue-100 bg-blue-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
                <a class="text-xl font-black tracking-tight" href="/src/views/home.html">TaskFlowSPA</a>
                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Nuevo usuario</p>
                    <h1 class="mt-4 text-5xl font-black tracking-tight">Crea tu cuenta y empieza a organizar tu flujo.</h1>
                    <p class="mt-5 max-w-md text-lg leading-8 text-blue-50">
                        Esta vista permite enseñar el registro como parte del alcance funcional antes de llevarlo al flujo SPA definitivo.
                    </p>
                </div>
                <p class="text-sm text-blue-100">Interfaz base del modulo de autenticacion.</p>
            </section>

            <section class="flex items-center justify-center px-6 py-10">
                <div class="w-full max-w-xl rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-100/70">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Registro</p>
                            <h2 class="mt-2 text-3xl font-black text-slate-900">Crear cuenta</h2>
                        </div>
                        <a class="navigation rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/login">Ya tengo cuenta</a>
                    </div>

                    <form id="register-form" class="mt-8 grid gap-5">
                        <div class="grid gap-5 md:grid-cols-2">
                            <div>
                                <label class="mb-2 block text-sm font-medium text-slate-700" for="register-name">Nombre</label>
                                <input required name="register-name" type="text" placeholder="Ana" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                            </div>
                            <div>
                                <label class="mb-2 block text-sm font-medium text-slate-700" for="register-lastname">Apellido</label>
                                <input required name="register-lastname" type="text" placeholder="Torres" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                            </div>
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-700" for="register-email">Correo</label>
                            <input required name="register-email" type="email" placeholder="usuario@taskflow.com" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                        </div>

                        <div class="grid gap-5 md:grid-cols-2">
                            <div>
                                <div>
                                    <label class="mb-2 block text-sm font-medium text-slate-700" for="register-password">Contrasena</label>
                                    <input required name="register-password" type="password" placeholder="Crea una contrasena" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                                </div>
                                <div class="flex items-center gap-2 px-2 my-2">
                                    <input name="show-password" id="show-password" type="checkbox" class="cursor-pointer rounded-2xl bg-blue-50 px-4 py-3 text-slate-900 " />
                                    <label class="cursor-pointer text-sm font-medium text-slate-700" for="show-password">Mostrar Contrasena</label>
                                </div>
                            </div>
                            <div>
                                <label class="mb-2 block text-sm font-medium text-slate-700" for="register-role">Rol</label>
                                <select  name="register-role" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
                                <option>USER</option>
                                <option>ADMIN</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid gap-5 md:grid-cols-2">
                            <button type="submit" class="cursor-pointer inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">
                            Registrarme
                            </button>
                            <button type="reset" class="cursor-pointer inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">
                            Cancelar
                            </button>
                        </div>
                            
                    </form>
                </div>
            </section>
        </main>
    `
}


export const listenersRegister = () => {

    const registerForm = document.getElementById('register-form')

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const newUser = {
            name: registerForm['register-name'].value.trim(),
            lastname: registerForm['register-lastname'].value.trim(),
            email: registerForm['register-email'].value.trim(),
            password: registerForm['register-password'].value.trim(),
            role: registerForm['register-role'].value
        }

        const userExists = await verifyUser(newUser.email)

        if (userExists) {
            alert(`${newUser.email} ya existe`)
        }else{
            createUser(newUser)
            router('/login')
        }

        registerForm.reset()

    })

    const showPassword = registerForm['show-password'];

    showPassword.addEventListener('change', () => {
        const passwordInput = registerForm['register-password'];
        if (showPassword.checked) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });
}