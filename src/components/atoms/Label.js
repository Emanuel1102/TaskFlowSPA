export const Label = ({text='primer parametro', forInput='', identifier=''}) => {
    return `
        <label 
            class="${identifier} mb-2 block text-sm font-medium text-slate-700" 
            for="${forInput}">
            ${text}
        </label>
    `
}