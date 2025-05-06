import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

interface ProductWarningContentProps {
  product: any
  onContinue: () => void
}

const ProductWarningContent = ({
  //   product,
  onContinue,
}: ProductWarningContentProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3 text-red-600">
        <AlertTriangle className="size-5 shrink-0" />
        <div>
          <p className="font-medium">Este produto está vencido</p>
          <p className="text-sm text-red-500">
            {/* Data de validade: {formatDate(product.dueDate)} */}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          Você está prestes a adquirir um produto com a data de validade
          expirada. Embora muitos produtos possam ser usados com segurança após
          essa data em determinadas circunstâncias, esteja ciente dos riscos
          potenciais:
        </p>

        <ul className="list-disc space-y-1 pl-5">
          <li>
            Dependendo do tipo de produto, a eficácia ou segurança pode estar
            comprometida.
          </li>
          <li>
            A qualidade do produto pode ter sido alterada (cor, sabor,
            consistência, etc).
          </li>
          <li>
            Produtos vencidos são vendidos no estado em que se encontram, sem
            garantias específicas quanto a seu desempenho.
          </li>
        </ul>

        <p className="mt-4 font-medium">
          Ao continuar com esta compra, você declara estar ciente destas
          informações.
        </p>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button onClick={onContinue}>Continuar com a compra</Button>
      </div>
    </div>
  )
}

export default ProductWarningContent
