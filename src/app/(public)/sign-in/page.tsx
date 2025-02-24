import { AuthenticateForm } from '@/components/routes/sign-in/authenticate-form'

export default async function SignInPage() {
  return (
    <div className="flex h-screen max-h-screen w-screen max-w-[100vw] items-start justify-between">
      <div className="flex h-screen w-[50vw] max-w-[50vw] flex-col items-center justify-center space-y-4">
        <div className="w-[30vw] space-y-3">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-textPrimary">Login</h3>
            <p className="text-gray-400">
              Digite seu email e a sua senha para autenticar.
            </p>
          </div>
          <AuthenticateForm />
        </div>
      </div>
      <div className="relative h-screen w-[50vw]">
        <img
          src="./sign-up-bg.png"
          className="contain size-full rounded-bl-[120px] bg-contain"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold text-white">
          STOR<span className="text-4xl font-normal">AGE</span>
        </h1>
      </div>
    </div>
  )
}
