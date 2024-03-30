import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpInputsType, signUpSchema } from '../../features/auth/auth.schema';
import { useAuth } from '../../features/auth/hooks/useAuth';

export const SignUp = () => {
  const navigate = useNavigate();
  const { handleSignUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputsType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpInputsType> = async (values) => {
    try {
      await handleSignUp(values);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center shadow">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-lg flex-1 flex-col gap-4 rounded border-2 px-4 py-8 shadow"
      >
        <p className="mb-4 text-4xl">
          {' '}
          sign up to <span className="text-4xl font-semibold">hello.</span>
          <span className="text-4xl font-bold text-secondary">friend</span>
        </p>

        <div>
          <Input label="username *" {...register('username')} error={!!errors.username} />
          {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
        </div>

        <div>
          <Input label="email *" {...register('email')} error={!!errors.email} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <Input label="password *" type="password" {...register('password')} error={!!errors.password} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-64 self-center">
          Sign Up
        </Button>

        <p className="my-2 text-center text-sm text-gray-500">
          already have an account?{' '}
          <Link to="/auth/login" className="text-blue-500">
            login
          </Link>
        </p>
      </form>
    </main>
  );
};
