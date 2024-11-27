import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import Cookies from "js-cookie";

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  phone: z.string().min(10).max(10),
  email: z.string().email("Invalid email"),
  password: z.string().min(2, "Too short"),
});

type SignUpFormData = z.infer<typeof formSchema>;

type Props = {
  onSignUp: (values: SignUpFormData) => void;
  isLoading: boolean;
};

const SignUpForm = ({ onSignUp, isLoading }: Props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (Cookies.get("access-token")) {
      console.log("cookie found");
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gray-950 text-white">
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
              Create your account
            </h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSignUp)}
              className="space-y-4 w-full"
            >
              <div className="flex w-full flex-wrap justify-between">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[49%]">
                      <FormLabel>First name</FormLabel>
                      <FormControl className="text-black">
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[49%]">
                      <FormLabel>Last name</FormLabel>
                      <FormControl className="text-black">
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl className="text-black">
                      <Input
                        type="tel"
                        placeholder="Your phone number"
                        {...field}
                      />
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

              {isLoading ? (
                <LoadingButton />
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-[#FDB347] hover:bg-[#E69F35] text-black font-semibold py-6"
                >
                  REGISTER
                </Button>
              )}
            </form>
            <div className="text-sm text-center text-gray-400">
              Already have an account?{" "}
              <Link
                href={"/public_pages/signin"}
                className="text-[#6366f1] hover:text-[#818cf8]"
              >
                {" "}
                Sign in
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
