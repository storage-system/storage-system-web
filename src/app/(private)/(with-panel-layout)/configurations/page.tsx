import { CreateConfigurationsForm } from '@/components/routes/configurations/create-company-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Configurations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-textPrimary">Minhas Configurações</CardTitle>
        <CardDescription>
          Customize as suas configurações no formulário abaixo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateConfigurationsForm />
      </CardContent>
    </Card>
  )
}
