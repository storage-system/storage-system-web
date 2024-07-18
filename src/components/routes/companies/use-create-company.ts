import { toast } from '@/components/ui/use-toast'
import { useCompaniesService } from '@/services/company'
import {
  createCompanySchema,
  CreateCompanyType,
} from '@/validations/create-company-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'

export function useCreateCompany() {
  const { reset, ...form } = useForm<CreateCompanyType>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      contact: '',
      email: '',
      name: '',
      password: '',
      responsible: '',
      users: [],
    },
  })

  const { createCompanyService } = useCompaniesService()

  function handleSuccess() {
    reset()
    toast({ variant: 'success', title: 'Empresa criada com sucesso' })
  }

  function handleError(error: Error) {
    if (error instanceof AxiosError) {
      toast({ variant: 'destructive', title: error.message })
    }
  }

  const { mutateAsync: handleCreateCompany, isPending } = useMutation({
    mutationFn: createCompanyService,
    onSuccess: handleSuccess,
    onError: handleError,
  })

  return { form, isPending, handleCreateCompany }
}
