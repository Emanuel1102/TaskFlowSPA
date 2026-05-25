export const Link = ({text='primer parametro', navigation, newClass=''}) => {
    return `
     <a
        class="${newClass} inline-flex items-center justify-center rounded-full border border-blue-600 px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg shadow-blue-200 transition hover:bg-blue-200 hover:text-blue-900 duration-400"
        href="${navigation}"
      >
        ${text}
      </a>
    `
}