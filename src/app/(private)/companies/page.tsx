import { CreateCompanyForm } from '@/components/routes/companies/create-company-form'
import { useCreateCompanyFormField } from '@/components/routes/companies/create-company-form-field'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'

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
