export const Input = ({placeholder='Escribe aquí', value='', type='text', id='', newClass='', required=''}) => {
    return `
        <input 
            id="${id}"
            ${required}
            type="${type}" 
            placeholder="${placeholder}" 
            value="${value}"
            class="${newClass} w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" 
        />
    `
}