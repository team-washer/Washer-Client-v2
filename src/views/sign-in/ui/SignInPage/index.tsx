import AuthLayout from "@/widgets/auth-layout/ui/AuthLayout";
import SignInForm from "@/features/auth/sign-in/ui/SignInForm";
const SignInPage = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;
