import { RegisterForm } from "@/components/routes/register/register-form";

export default async function RegisterPage() {
  return (
    <div className="w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh] flex justify-between items-start">
      <div>
        <img src="./sign-up-bg.png" className="w-[50vw] h-[100vh] contain bg-contain rounded-br-[120px]" />
      </div>
      <div className="w-[50vw] max-w-[50vw] h-[100vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-[30vw] space-y-8">
          <div>
            <h3 className="text-textPrimary font-bold text-3xl">Crie a sua conta</h3>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
