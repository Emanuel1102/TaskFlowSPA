import { Button } from "../atoms/button"

export const TaskCard = ({status, title, description}) => {
  return `
    <article class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
        <div>
            <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${status}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-900">${title}</h2>
            <p class="mt-3 max-w-2xl text-slate-600">${description}</p>
        </div>
        <div class="flex gap-3">
            ${Button({ 
                text: 'Editar',
                newClass: 'btn-edit'
})}    

             <!-- modal window with task form to edit task -->

            ${Button({ 
                text: 'Eliminar',
                newClass: 'btn-delete'
             })}    
        </div>
    </article>
  `
}
