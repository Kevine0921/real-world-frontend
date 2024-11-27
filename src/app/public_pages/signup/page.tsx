"use client";
import { useSignUp } from "@/api/auth";
import HelmetComponent from "@/components/HelmetComponent";
import SignUpForm from "@/components/forms/SignUpForm";
import { CreateUserTypes } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignUp = () => {
  const { signUp, isLoading, isSuccess } = useSignUp();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push("/public_pages/ValidateOTP");
    }
  }, [isSuccess, router]);

  const handleSignUp = (values: Omit<CreateUserTypes, "role">) => {
    // Transform the data to include the 'role' property
    const userData: CreateUserTypes = {
      ...values,
      role: "User", // or any default role you want to assign
    };
    signUp(userData);
  };

  return (
    <div className="">
      <HelmetComponent
        title="Create account"
        description="Register yourself to start applying"
      />

      <div className="">
        <SignUpForm onSignUp={handleSignUp} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SignUp;
