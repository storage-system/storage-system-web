import { CreateCompanyType } from '@/validations/create-company-schema'
import { CreateUserType } from '@/validations/create-user-schema'
import { defineStepper } from '@stepperize/react'
import { useState } from 'react'

const { useStepper } = defineStepper(
  { id: 'user-form' },
  { id: 'company-form' },
)

export function useRegistrationStepper() {
  const [companyData, setCompanyData] = useState<CreateCompanyType | undefined>(
    undefined,
  )
  const [userData, setUserData] = useState<CreateUserType | undefined>(
    undefined,
  )
  const [completedIds, setCompletedIds] = useState<string[]>([])
  const stepper = useStepper()

  function handleNextStep() {
    setCompletedIds((state) => [...state, stepper.current.id])
    stepper.next()
  }

  function handlePrevStep() {
    const currentIndex = stepper.all.findIndex(
      (step) => step.id === stepper.current.id,
    )
    const previousIndex = currentIndex - 1

    setCompletedIds((state) => {
      const idsToRemove = [stepper.current.id]
      if (previousIndex >= 0) {
        idsToRemove.push(stepper.all[previousIndex].id)
      }
      return state.filter((id) => !idsToRemove.includes(id as never))
    })

    stepper.prev()
  }

  // const {} = useMutation({
  //   mutationFn: async () =>
  //     userData && companyData && handleSubmit(userData, companyData),
  // })

  // const { createUsersService } = useUsersService()
  // const { createCompanyService } = useCompaniesService()

  // async function handleSubmit(
  //   userData: CreateUserType,
  //   companyData: CreateCompanyType,
  // ) {
  //   try {
  //     const { data } = await createUsersService(userData)
  //   } catch (error) {
  //     toast({ variant: 'destructive', title: 'Erro ao cadastrat usuário' })
  //   }
  // }

  return {
    stepper,
    companyData,
    setCompanyData,
    userData,
    setUserData,
    completedIds,
    setCompletedIds,
    handleNextStep,
    handlePrevStep,
  }
}
