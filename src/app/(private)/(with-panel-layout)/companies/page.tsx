import { CreateCompanyForm } from '@/components/routes/companies/create-company-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Companies() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Minha Empresa</CardTitle>
        <CardDescription>
          Cadastre sua empresa no formulário abaixo para liberar seu acesso ao
          painel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateCompanyForm />
      </CardContent>
    </Card>
  )
}
