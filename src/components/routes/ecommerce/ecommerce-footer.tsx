export function Footer() {
  return (
    <footer className="flex flex-col items-center bg-gray-400 pt-16">
      <div className="grid w-full max-w-[1000px] grid-cols-5 gap-36 pb-8">
        <div className="col-span-2">
          <h3 className="mb-4 text-xl">Sobre a Loja</h3>
          <p className="text-gray-600">
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
            dui, eget bibendum magna congue nec.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-nowrap text-xl">Minha Conta</h3>
          <ul>
            {Array.from({ length: 4 }).map((_, index) => (
              <li className="text-primary" key={index}>
                Link {index}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xl">Ajuda</h3>
          <ul>
            {Array.from({ length: 4 }).map((_, index) => (
              <li className="text-primary" key={index}>
                Link {index}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-full justify-center bg-gray-900 py-8">
        <p className="text-gray-400">
          Nome da loja © 2024. Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
