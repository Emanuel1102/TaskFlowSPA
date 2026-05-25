import { Link } from "../components/atoms/Link"
import { AsideCard } from "../components/organism/AsideCard"
import { RegisterForm } from "../components/organism/Forms"

export const register = () => {
    return `
    <main class="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
      <!-- aside card here -->
        ${AsideCard('Crea tu cuenta y comienza a organizar tus tareas de forma eficiente.')}

        <section class="flex items-center justify-center px-6 py-10">
            <div class="w-full max-w-xl rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-100/70">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Registro</p>
                        <h2 class="mt-2 text-3xl font-black text-slate-900">Crear cuenta</h2>
                    </div>
                
                <!-- link to login here (ya tengo una cuenta) -->
                ${Link({
                    text: 'Ya tengo una cuenta',
                    navigation: '/login'
                })}
                </div>

                <!-- form here -->
                ${RegisterForm()}
            </div>
        </section>
    </main>
    `
}