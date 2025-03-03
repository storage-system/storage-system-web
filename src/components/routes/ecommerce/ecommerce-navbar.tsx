import { Phone } from 'lucide-react'

const navitems = [
  {
    name: 'Início',
    subitems: [
      {
        name: 'Teste',
      },
    ],
  },
  {
    name: 'Categorias',
    subitems: [
      {
        name: 'Teste',
      },
    ],
  },
  {
    name: 'Blog',
    subitems: [
      {
        name: 'Teste',
      },
    ],
  },
  {
    name: 'Sobre Nós',
    subitems: [],
  },
  {
    name: 'Fale Conosco',
    subitems: [],
  },
]

export function NavBar() {
  return (
    <div className="flex w-screen justify-center bg-slate-700 p-4">
      <div className="flex w-full max-w-[1200px] justify-between ">
        <ul className="flex gap-4 text-gray-300">
          {navitems.map((item) => (
            <li key={item.name}>
              <a href="">{item.name}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 text-background">
          <Phone />
          <p>(219) 555-0114</p>
        </div>
      </div>
    </div>
  )
}
