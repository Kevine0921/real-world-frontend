import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoadingButton from "../LoadingButton";

const formSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordFormData = z.infer<typeof formSchema>;

type Props = {
  onForgotPassword: (values: ForgotPasswordFormData) => void;
  isLoading: boolean;
};

const ForgotPasswordForm = ({ onForgotPassword, isLoading }: Props) => {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

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
              Reset your password
            </h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onForgotPassword)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Provide your email to get a reset password link.
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isLoading ? (
                <LoadingButton />
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-[#FDB347] hover:bg-[#E69F35] text-black font-semibold py-6"
                >
                  SUBMIT
                </Button>
              )}
            </form>
            {/* <div className="mt-5">
              <p>Do you remember your password?</p>
              <a href={"/public_pages/SignIn"} className="text-blue-600">
                Go back to sign in
              </a>
            </div> */}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
