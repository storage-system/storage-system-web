import { Card, CardContent } from '@/components/ui/card'
import { Headphones, Package, ShoppingBag, Truck } from 'lucide-react'

const benefits = [
  {
    icon: Truck,
    title: 'Frete Grátis',
    description: 'Frete grátis em todos os seus pedidos',
  },
  {
    icon: Headphones,
    title: 'Atendimento ao Cliente 24/7',
    description: 'Acesso instantâneo ao Suporte',
  },
  {
    icon: ShoppingBag,
    title: 'Pagamento 100% Seguro',
    description: 'Garantimos que seu dinheiro está seguro',
  },
  {
    icon: Package,
    title: 'Garantia de Devolução do Dinheiro',
    description: 'Garantia de Devolução do Dinheiro em 30 Dias',
  },
]

export function BenefitsSection() {
  return (
    <div className="flex justify-center pb-16">
      <Card className="flex h-[168px] w-full max-w-[1200px] items-center">
        <CardContent className="grid grid-cols-4 gap-4">
          {benefits.map(({ description, title, icon: Icon }) => (
            <div key={title} className="flex items-center gap-4">
              <Icon className="size-9 text-primary" />
              <div>
                <p className="font-bold">{title}</p>
                <p className="text-zinc-500">{description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
