import { Logo } from "../components/atoms/Logo";
import { Link } from "../components/atoms/Link";
import { LoginForm } from "../components/organism/Forms";
import { AsideCard } from "../components/organism/AsideCard";
export const loginView = () => {
    return `
        <div class="grid min-h-screen lg:grid-cols-[1fr_0.95fr]">
            <section class="flex items-center justify-center px-6 py-10">
                <div class="w-full max-w-xl rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-100/70">
                    <div class="flex items-center justify-between">
                        <!-- logo here -->
                        ${Logo()}

                        <!-- link to register page here -->
                        ${Link({
                            text: 'Registrarme',
                            navigation: '/register'
                        })}
                    </div>

                    <div class="mt-8">
                        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Inicio de sesión</p>
                        <h1 class="mt-2 text-4xl font-black tracking-tight text-slate-900">Bienvenido de nuevo</h1>
                        <p class="mt-4 text-slate-600">Ingresa a tu espacio de trabajo y continua organizando tus tareas.</p>
                    </div>

                    <!-- form here -->
                    ${LoginForm()}
                </div>
            </section>

            <!-- aside card here -->
            ${AsideCard('Ingresa a tu espacio de trabajo y continua organizando tus tareas.')}
        </div>
    `

}

