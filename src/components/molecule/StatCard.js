export const StatCard = ({title, value}) => {
  return `
    <article class="text-center rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
        <p class="text-sm text-slate-500">${title}</p>
        <p class="mt-3 text-4xl font-black text-blue-700">${value}</p>
    </article>
  `
}
