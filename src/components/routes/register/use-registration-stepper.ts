import { PublicRoutes } from '@/constants/routes/public-routes'
import { useCompaniesService } from '@/services/company'
import { useUsersService } from '@/services/user'
import {
  CreateCompanyAddressType,
  CreateCompanyType,
} from '@/validations/create-company-schema'
import { CreateUserType } from '@/validations/create-user-schema'
import { defineStepper } from '@stepperize/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const { useStepper } = defineStepper(
  { id: 'user-form' },
  { id: 'company-form' },
  { id: 'address-form' },
)

export function useRegistrationStepper() {
  const [companyData, setCompanyData] = useState<CreateCompanyType | undefined>(
    undefined,
  )
  const [userData, setUserData] = useState<CreateUserType | undefined>(
    undefined,
  )
  const [companyAddressData, setCompanyAddressData] = useState<
    CreateCompanyAddressType | undefined
  >(undefined)

  const [completedIds, setCompletedIds] = useState<string[]>([])
  const stepper = useStepper()
  const router = useRouter()

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

  const { mutateAsync } = useMutation({
    mutationFn: async () =>
      userData &&
      companyData &&
      companyAddressData &&
      handleSubmit(userData, companyData, companyAddressData),
    onSuccess: () => {
      router.push(PublicRoutes.SIGN_IN)
    },
  })

  const { createUsersService } = useUsersService()
  const { createCompanyService } = useCompaniesService()

  async function handleSubmit(
    userData: CreateUserType,
    companyData: CreateCompanyType,
    companyAddressData: CreateCompanyAddressType,
  ) {
    const { data } = await createUsersService(userData)
    const company = {
      ...companyData,
      address: companyAddressData,
      responsibleId: data.userId,
    }
    await createCompanyService(company)
  }

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
    setCompanyAddressData,
    companyAddressData,
    mutateAsync,
  }
}
