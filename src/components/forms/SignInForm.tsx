import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import SocialAuthForm from "./SocialAuthForm";
import Cookies from "js-cookie";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, "Password is required"),
});

type SignInFormData = z.infer<typeof formSchema>;

type Props = {
  onSignIn: (values: SignInFormData) => void;
  isLoading: boolean;
};

const SignInForm = ({ onSignIn, isLoading }: Props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // useEffect(() => {
  //   if (Cookies.get('access-token')) {
  //     window.location.href = '/'
  //   }
  // }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="bg-[#1c2127] rounded-lg p-6 space-y-6">
          <div className="flex items-center">
            <Link href={"/"} className="flex items-center">
              <button className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Back</span>
              </button>
            </Link>

            <h1 className="text-xl font-semibold text-center flex-1 mr-6">
              Sign in to your account
            </h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSignIn)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl className="text-black">
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl className="text-black">
                      <Input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-start gap-2">
                <Checkbox
                  id="viewpassword"
                  className=""
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
                <label htmlFor="viewpassword" className="text-sm">
                  {" "}
                  View password
                </label>
              </div>
              <div className="space-y-4">
                <Link href={"/public_pages/forgotpassword"}>
                  <button className="text-[#6366f1] hover:text-[#818cf8] text-sm">
                    Forgot your password?
                  </button>
                </Link>

                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-[#FDB347] hover:bg-[#E69F35] text-black font-semibold py-6"
                  >
                    LOG IN
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
