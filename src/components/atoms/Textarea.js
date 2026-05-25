export const Textarea = ({ id='', text='', placeholder='' }) => {
    return `
        <textarea 
            id="${id}" 
            rows="5" 
            placeholder="${placeholder}" 
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
        >${text}</textarea>
    `
}