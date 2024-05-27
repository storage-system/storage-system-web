import { FormFieldsConstant } from "@/types/form-field"
import { telMask } from "@/utils/masker";
import { CreateAccountInput, CreateAccountType, createAccountSchema } from "@/validations/create-account-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useRegisterFormField() {
  const form = useForm<CreateAccountInput>({
    resolver: zodResolver(createAccountSchema)
  });

  const REGISTER_FORM_FIELD: FormFieldsConstant<CreateAccountType> = [
    [
      {
        name: 'name',
        label: 'Nome da sua empresa',
        className: 'col-span-full',
        placeholder: 'Ex: Pedro Eletrônicos',
        type: 'text',
      },
    ],
    [
      {
        name: 'email',
        label: 'Email',
        className: 'col-span-full',
        placeholder: 'Ex: johndoe@example.com',
        type: 'text',
      },
    ],
    [
      {
        name: 'responsible',
        label: 'Responsável',
        className: 'col-span-full md:col-span-6',
        placeholder: 'Ex: Pedro Veras',
        type: 'text',
      },
      {
        name: 'contact',
        label: 'Contato',
        className: 'col-span-full md:col-span-6',
        placeholder: 'Ex: (62) 9 9999 9999',
        type: 'masked',
        mask: telMask,
      },
    ],
    [
      {
        name: 'password',
        label: 'Senha',
        className: 'col-span-full',
        placeholder: 'Ex: **********',
        type: 'password',
      },
    ],
  ]

  return {
    form,
    REGISTER_FORM_FIELD
  }
}