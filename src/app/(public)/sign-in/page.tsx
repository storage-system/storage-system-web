import { AuthenticateForm } from '@/components/routes/sign-in/authenticate-form'
import { LoginGoogle } from '@/components/routes/sign-in/login-google'
import { Separator } from '@/components/ui/separator'

export default async function SignInPage() {
  return (
    <div className="w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh] flex justify-between items-start">
      <div className="w-[50vw] max-w-[50vw] h-[100vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-[30vw] space-y-3">
          <div className="space-y-4">
            <h3 className="text-textPrimary font-bold text-3xl">Login</h3>
            <p className="text-gray-400">
              Digite seu email e a sua senha para autenticar.
            </p>
          </div>
          <LoginGoogle />
          <div className="flex justify-center items-center">
            <Separator className="w-[100px]" />
            <p className="p-4 text-gray-400 font-normal">ou</p>
            <Separator className="w-[100px]" />
          </div>
          <AuthenticateForm />
        </div>
      </div>
      <div>
        <img
          src="./sign-up-bg.png"
          className="w-[50vw] h-[100vh] contain bg-contain rounded-bl-[120px]"
        />
      </div>
    </div>
  )
}
