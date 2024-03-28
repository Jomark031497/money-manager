import { Link } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { FaGoogle } from "react-icons/fa";
import { Button } from "../../components/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthSchemaType, authSchema } from "../../features/auth/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = authSchema.omit({
  id: true,
});

type SignUpInputsType = Omit<AuthSchemaType, "id">;

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputsType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpInputsType> = (values) => {
    console.log(values);
  };

  return (
    <main className="flex h-screen items-center justify-center shadow">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-md flex-1 flex-col gap-4 rounded border-2 px-4 py-8"
      >
        <p className="text-center text-4xl tracking-wider">
          hello.<span className="font-bold text-secondary">friend</span>
        </p>

        <div>
          <Input label="Username" {...register("username")} />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <Input label="Password" {...register("password")} />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <Link to="/auth/forgot" className="text-blue-500">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="w-64 self-center">
          Login
        </Button>

        <div className="flex items-center gap-2">
          <hr className="flex-1" />
          <p>or</p>
          <hr className="flex-1" />
        </div>

        <div className="flex flex-col p-4">
          <Button
            type="button"
            className="flex items-center justify-center gap-2 border-2 border-accent bg-primary text-accent hover:bg-accent hover:text-black"
          >
            <FaGoogle /> Login with Google
          </Button>
        </div>
      </form>
    </main>
  );
};
