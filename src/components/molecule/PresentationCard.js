export const PresentationCard = ({title, description=''}) => {
    return `
    <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
        <h1 class="mt-3 text-4xl font-black tracking-tight">${title}.</h1>
        <p class="mt-4 max-w-2xl text-blue-50">${description}</p>
    </section>
    `
}