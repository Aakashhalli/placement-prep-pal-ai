
import { AuthForm } from "@/components/auth/AuthForm";
import { Heading } from "@/components/ui/heading";

const Auth = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center mb-8">
        <Heading level={1} className="mb-2">Welcome to PrepPal AI</Heading>
        <p className="text-muted-foreground">
          Sign in or create an account to continue your placement preparation journey
        </p>
      </div>
      <AuthForm />
    </div>
  );
};

export default Auth;
