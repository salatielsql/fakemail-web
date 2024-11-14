import { SignUpForm, type SignUpFormValues } from "@/components/sign-up-form";
import { pb } from "@/lib/pb";

export default function SignUp() {
  const signUp = async (values: FormData) => {
    "use server";
    console.log("> sign up", values);

    const email = values.get("email");
    const password = values.get("password");
    const name = values.get("name");

    try {
      const record = await pb.collection("users").create({
        email: email,
        emailVisibility: true,
        password: password,
        passwordConfirm: password,
        name: name,
      });
      console.log("> user created", record);
    } catch (error) {
      console.log("> error", error);
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6 h-screen flex flex-col justify-center">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold mb-4">Fakemail</h1>
        <h2 className="text-3xl">Sign Up</h2>
        <p className="text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>
      <SignUpForm onSubmit={signUp} />
    </div>
  );
}
