import SignInForm from "@/features/auth/sign-in/ui/SignInForm";
import AuthLayout from "../layout/auth-layout/ui/AuthLayout";

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;
