import { FormFieldsConstant } from "@/@types/form-field"
import { AuthenticateType, authenticateSchema } from "@/validations/authenticate-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useAuthenticateFormField() {
  const form = useForm<AuthenticateType>({
    resolver: zodResolver(authenticateSchema)
  });

  const AUTHENTICATE_FORM_FIELD: FormFieldsConstant<AuthenticateType> = [
    [
      {
        name: 'email',
        label: 'Digite o seu email',
        className: 'col-span-full',
        placeholder: 'Ex: johndoe@example.com',
        type: 'text',
      },
    ],
    [
      {
        name: 'password',
        label: 'Digite a sua senha',
        className: 'col-span-full',
        placeholder: 'Ex: **********',
        type: 'password',
      },
    ],
  ]

  return {
    form,
    AUTHENTICATE_FORM_FIELD
  }
}