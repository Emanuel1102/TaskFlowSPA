import { Label } from "../atoms/Label";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { Select } from "../atoms/select";
import { Textarea } from "../atoms/Textarea";

export const LoginForm = () =>{
  return `
    <form class="mt-8 grid gap-5">
      <div>
        ${Label({
                text:'Correo', 
                forInput:'email'})}
        ${Input({
                id:'email',
                type:'email',
                placeholder:'usuario@taskflow.com'})}
      </div>
      <div>
        ${Label({
                text:'Contrasena', 
                forInput:'password'})}
        ${Input({
                id:'password',
                type:'password',
                placeholder:'Ingresa tu contrasena'})}
      </div>
      
      ${Button({
              type:'submit',
              text:'ingresar'})}
    </form>
  `
}

export const RegisterForm = () =>{
  return `
    <form class="mt-8 grid gap-5">
      <div class="grid gap-5 md:grid-cols-2">
        <div>
          ${Label({
                  text:'Nombre', 
                  forInput:'register-name'})}
          ${Input({
                  id:'register-name',
                  placeholder:'Juan',
                  required:'required'})}
        </div>
        <div>
          ${Label({
                  text:'Apellido', 
                  forInput:'register-lastname'})}
          ${Input({
                  id:'register-lastname',
                  placeholder:'Torres Lopez',
                  required:'required'})}
        </div>
      </div>

      <div>
        ${Label({
                text:'Correo', 
                forInput:'email'})}
        ${Input({
                id:'email',
                type:'email',
                placeholder:'usuario@taskflow.com',
                required:'required'})}
      </div>
        
      <div class="grid gap-5 md:grid-cols-2">
        <div>
          ${Label({
                  text:'Contraseña', 
                  forInput:'register-password'})}
          ${Input({
                  id:'register-password',
                  type:'password',
                  required:'required'})}
        </div>
              
        
        <div>
          ${Label({
                  text:'Rol', 
                  forInput:'register-role'})}
          ${Select({
                  id:'register-role',
                  options:[
                    {value:'user', label:'USER'},
                    {value:'admin', label:'ADMIN'}
                  ]
          })}
        </div>
      </div>

      ${Button({
                type:'submit',
                text: 'Registrarme'
      })}
    </form>
  `
}

export const TaskForm = () =>{
  return `
    <section class="mx-auto max-w-5xl px-6 p-10 rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
      <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-900"></h1>

      <form class="mt-8 grid gap-5">
        <div>
          ${Label({
                  text:'Titulo', 
                  forInput:'title'})}
          ${Input({
                  id:'title',
                  placeholder:'Ej. Preparar proyecto final',
                  required:'required'})}
        </div>

        <div>
          ${Label({
                  text:'Descripcion', 
                  forInput:'description'})}
          ${Textarea({
                  id:'description',
                  placeholder:'Describe la tarea...'})}
        </div>
        
        <div>
          ${Label({
                  text:'Estado', 
                  forInput:'status'})}
          ${Select({
                  id:'status',
                  options:[
                      {value:'pending', label:'Pendiente'},
                      {value:'in-progress', label:'En progreso'},
                      {value:'completed', label:'Completada'}
                  ]
          })}
        <div class="flex flex-col gap-3 pt-2 sm:flex-row">

          ${Button({
                  type:'submit',
                  text:'Guardar tarea'})}
          
          ${Button({type: 'reset',
                    text: 'Cancelar',
                    newClass: 'btn-close'})}
        </div>
      </form>
    </section>

  `
}

export const updateProfileForm = ({ name, lastname, email, password }) =>{
  return `
    <form class="mt-8 grid gap-5">
      <div class="grid gap-5 md:grid-cols-2">
        <div>
          ${Label({
                  text:'Nombre', 
                  forInput:'update-name'})}
          ${Input({
                  id:'update-name',
                  value:name,
                  required:'required'})}
        </div>
        <div>
          ${Label({
                  text:'Apellido', 
                  forInput:'update-lastname'})}
          ${Input({
                  id:'update-lastname',
                  value:lastname,
                  required:'required'})}
        </div>
      </div>

      <div>
        ${Label({
                text:'Correo', 
                forInput:'email'})}
        ${Input({
                id:'email',
                type:'email',
                value:email,
                required:'required'})}
      </div>
        
      <div class="grid gap-5 md:grid-cols-2">
        <div>
          ${Label({
                  text:'Contraseña', 
                  forInput:'update-password'})}
          ${Input({
                  id:'update-password',
                  type:'password',
                  value:password,
                  required:'required'})}
        </div>
      </div>

      ${Button({
                type:'submit',
                text: 'Actualizar perfil'
      })}
    </form>
  `
}