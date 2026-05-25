export const AsideCard = (description) => {
    return `
        <section class="hidden bg-blue-600 p-10 text-white lg:flex lg:flex-col lg:justify-center">
            <div class="mx-auto max-w-lg">
                <h2 class="mt-4 text-5xl font-black tracking-tight">${description}</h2>
            </div>
        </section>
    `
}