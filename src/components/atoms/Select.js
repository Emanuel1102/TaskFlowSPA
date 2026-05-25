export const Select = ({ id='', options=[] }) => {
    return `
        <select id="${id}" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
            ${options.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
        </select>
    `
}