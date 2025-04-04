'use client'

import { cn } from '@/utils/class-name'
import { Check } from 'lucide-react'
import { RegistrationForm } from './user-registration-form'
import { CompanyRegistrationForm } from './company-registration-form'
import { useRegistrationStepper } from './use-registration-stepper'
import * as React from 'react'
import { AddressRegistrationForm } from './address-registration-form'

export function RegistrationStepper() {
  const {
    stepper,
    completedIds,
    handleNextStep,
    handlePrevStep,
    setCompanyData,
    setUserData,
    setCompanyAddressData,
    companyAddressData,
    companyData,
    userData,
    mutateAsync,
  } = useRegistrationStepper()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        {stepper.all.map((step, index, array) => {
          return (
            <React.Fragment key={step.id}>
              {completedIds.some((id) => id === step.id) ? (
                <div
                  className={cn(
                    'size-14 rounded-full flex items-center justify-center text-lg border-2 border-primary bg-primary text-white',
                    stepper.current.id === step.id && 'border-2 border-primary',
                  )}
                >
                  <Check />
                </div>
              ) : (
                <div
                  key={step.id}
                  className={cn(
                    'size-14 rounded-full flex items-center justify-center text-lg border-2 border-primary',
                    stepper.current.id === step.id && 'border-2 border-primary',
                  )}
                >
                  {index + 1}
                </div>
              )}

              {index !== array.length - 1 && (
                <div className="h-1 flex-1 bg-input">
                  <div
                    className={cn(
                      'h-1 flex-1 bg-primary transition-all',
                      completedIds.some((id) => id === step.id)
                        ? 'w-full'
                        : 'w-0',
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
      <div>
        {stepper.switch({
          'user-form': () => (
            <RegistrationForm
              userData={userData}
              nextStep={handleNextStep}
              setUserData={setUserData}
            />
          ),
          'company-form': () => (
            <CompanyRegistrationForm
              nextStep={handleNextStep}
              prevStep={handlePrevStep}
              companyData={companyData}
              setCompanyData={setCompanyData}
            />
          ),
          'address-form': () => (
            <AddressRegistrationForm
              submit={mutateAsync}
              prevStep={handlePrevStep}
              companyAdressData={companyAddressData}
              setAddressData={setCompanyAddressData}
            />
          ),
        })}
      </div>
    </div>
  )
}
