"use client";
import { useForgotPassword, useValidateOTP } from "@/api/auth";
import HelmetComponent from "@/components/HelmetComponent";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { ValidateOTPForm } from "@/components/forms/ValidateOTPForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ForgotPassword = () => {
  // const { validateOTP, isSuccess, isLoading } = useValidateOTP();
  const { forgotPassword, isError, isLoading, isSuccess } = useForgotPassword();
  const router = useRouter();

  if (isSuccess) {
    toast.success("Check your inbox for password reset link. ");
  }

  return (
    <div className="">
      <HelmetComponent title="Change Password" />

      <div>
        {/* <ValidateOTPForm onValidateOTP={validateOTP} isLoading={isLoading} /> */}
        <ForgotPasswordForm
          onForgotPassword={forgotPassword}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
