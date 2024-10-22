import { toast } from '@/components/ui/use-toast'
import { useConfigurationsService } from '@/services/configurations'
import {
  createConfigurationsSchema,
  CreateConfigurationsType,
} from '@/validations/create-configurations-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

export function useCreateConfigurations() {
  const form = useForm<CreateConfigurationsType>({
    resolver: zodResolver(createConfigurationsSchema),
  })
  const { data: session } = useSession()

  const { createConfigurationsService } = useConfigurationsService()

  function handleSuccess() {
    toast({ variant: 'success', title: 'Empresa criada com sucesso' })
  }

  function handleError(error: Error) {
    if (error instanceof AxiosError) {
      toast({ variant: 'destructive', title: error.message })
    }
  }

  const { mutateAsync: handleCreateConfigurations, isPending } = useMutation({
    mutationFn: async (data: CreateConfigurationsType) => {
      console.log(session && session.user.companyId)
      if (session && session.user.companyId) {
        console.log('TESTE')
        return await createConfigurationsService({
          ...data,
          userId: session?.user.sub,
          companyId: session?.user.companyId,
        })
      }
    },
    onSuccess: handleSuccess,
    onError: handleError,
  })

  return { form, isPending, handleCreateConfigurations }
}
