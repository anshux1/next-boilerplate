import { AuthForm } from "@/components/auth/AuthForm"
import { LoginForm } from "@/components/auth/LoginForm"
import { SignupForm } from "@/components/auth/SignUpForm"

const Auth = () => {
  return (
    <div className="flex w-full h-screen flex-col items-center justify-center">
      <AuthForm firstTab={<LoginForm />} secondTab={<SignupForm />} defaultTab={0} />
    </div>
  )
}

export default Auth
