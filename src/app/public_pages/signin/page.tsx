"use client";
import { useSignIn } from "@/api/auth";
import HelmetComponent from "@/components/HelmetComponent";
import SignInForm from "@/components/forms/SignInForm";

const SignIn = () => {
  const { signIn, isLoading, isSuccess } = useSignIn();

  if (isSuccess) {
    window.location.href = "/main";
  }

  return (
    <div className="w-full ">
      <HelmetComponent title="Sign in to your account" />
      <SignInForm onSignIn={signIn} isLoading={isLoading} />
    </div>
  );
};

export default SignIn;
