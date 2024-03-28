import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
// import { FaGoogle } from 'react-icons/fa';
import { Button } from '../../components/ui/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { LoginInputsType, LoginSchema } from '../../features/auth/auth.schema';

export const Login = () => {
  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInputsType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputsType> = async (values) => {
    try {
      await handleLogin(values);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError('email', {
          message: error.message,
        });
        setError('password', {
          message: error.message,
        });
      }
    }
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
          <Input label="Email *" {...register('email')} error={!!errors.email} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <Input label="Password *" type="password" {...register('password')} error={!!errors.password} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <Link to="/auth/forgot" className="text-blue-500">
            Forgot Password?
          </Link>{' '}
        </div>

        <Button type="submit" className="w-64 self-center">
          Login
        </Button>

        <p className="my-2 text-center text-sm text-gray-500">
          No account yet?{' '}
          <Link to="/auth/sign-up" className="text-blue-500">
            sign up
          </Link>
        </p>

        {/* <div className="flex items-center gap-2">
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
        </div> */}
      </form>
    </main>
  );
};
