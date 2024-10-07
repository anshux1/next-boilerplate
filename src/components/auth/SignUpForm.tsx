'use client'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { SignUpSchema, SignUpInput } from '@/types'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from '@/components/ui/form'
import { InputField } from '@/components/common/FormFields'
import { useEffect, useState } from 'react'
import { useDebounceCallback } from "usehooks-ts"
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { checkUniqueUsername } from '@/actions/auth'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export const SignupForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [, setIsCheckingUsername] = useState(false);
  const [uniqueUsernameMessage, setUniqueUsernameMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameUnique, setUsernameUnique] = useState('')
  const router = useRouter();
  const debounced = useDebounceCallback(setUsernameUnique, 500);
  const form = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      username: "",
      password: ""
    }
  })

  const watchedUsername = form.watch("username");
  useEffect(() => {
    debounced(watchedUsername)
    console.log(usernameUnique)
  }, [watchedUsername, usernameUnique])

  useEffect(() => {
    const checkUsername = async () => {
      if(usernameUnique.length < 3){
        return;
      }
      setIsCheckingUsername(true);
      setUniqueUsernameMessage("");
      try {
        const res = await checkUniqueUsername(usernameUnique);
        if(res.message){
          setUniqueUsernameMessage(res.message)
        }
        if(!res.success){
          toast(res.message)
        }
        setIsCheckingUsername(false);
      } catch (error) {
        toast.error("Oops an error accured");
        console.log(error);
      } finally {
        setIsCheckingUsername(false);
      }
    }
    checkUsername();
  }, [usernameUnique])
  
  const onSubmit = async(values: SignUpInput) => {
    console.log(values);
    setIsSubmitting(true);
    try {
      const loadId = toast.loading("Please wait...");
      console.log("inside submit")
      const res = await signIn("signup",  {
        name: values.name,
        username: values.username,
        password: values.password,
        redirect: false
      })
      console.log(res);
      toast.dismiss(loadId);
      if (res && !res.error) {
        toast.success("Account created successfully!");
        router.push('/'); // Redirect to homepage after successful sign-in
      } else {
        console.log("Sign-up error:", res?.error);
        toast.error(res?.error || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.log("Error :", error);
    }
  }
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              control={form.control}
              name="name"
              label="Firstname"
              placeholder='Firstname'
              required
            />
            <>
              <InputField
                control={form.control}
                name="username"
                label="Username"
                placeholder="Username"
                required
              />
              {uniqueUsernameMessage && 
                <p className={`${uniqueUsernameMessage === "Username is unique" ? "text-green-600" : "text-red-600"}`}>
                  {uniqueUsernameMessage}
                </p>
              }
            </>
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
            <Button type="submit" className="w-full">
              {isSubmitting ? "Please Wait" : "Sign Up"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
