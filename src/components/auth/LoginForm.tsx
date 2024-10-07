'use client'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { SignInSchema, SignInInput } from '@/types'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from '@/components/ui/form'
import { InputField } from '@/components/common/FormFields'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const router = useRouter()
  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })
  const onSubmit = async(values: SignInInput) => {
    console.log(values);
    setIsSubmitting(true);
    try {
      const loadId = toast.loading("Please wait...");
      console.log("inside submit")
      const res = await signIn("signin", {
        username: values.username,
        password: values.password,
        redirect: false
      })
      console.log(res);
      toast.dismiss(loadId);
      if (res && !res.error) {
        toast.success("Successfully signed in!");
        router.push('/');
      } else {
        console.log("Sign-in error:", res?.error);
        toast.error("Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Card className="p-0 w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email below to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              control={form.control}
              name="username"
              label="Username"
              placeholder="Username"
              required
            />
            <div className='relative'>
              <InputField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Password"
                type={isPasswordVisible ? "text" : "password"}
                required
              />
              {isPasswordVisible ? (
                <EyeOff
                  onClick={() => setIsPasswordVisible(prev => !prev)}
                  className='absolute right-3 top-[30px] cursor-pointer size-5 text-zinc-700' />
              ) : (
                <Eye 
                  onClick={() => setIsPasswordVisible(prev => !prev)}
                  className='absolute right-3 top-[30px] cursor-pointer size-5 text-zinc-700' />
              )}
            </div>
            <div className="flex items-center">
              <Link href='/forgot-password' className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Button 
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait" : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

