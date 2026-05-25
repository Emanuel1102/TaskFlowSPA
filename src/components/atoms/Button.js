export const Button = ({text='', type='button', newClass=''}) => {
    return `
        <button 
            class="${newClass} cursor-pointer inline-flex justify-center items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-500 duration-400"  
            type="${type}"
        >
        ${text}
        </button>
    `
} 