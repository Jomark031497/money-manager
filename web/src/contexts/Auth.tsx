import { ReactNode, createContext, useEffect, useState } from 'react';
import { getCurrentAuthenticatedUser } from '../features/auth/api/getCurrentAuthenticatedUser';
import { signOutUser } from '../features/auth/api/signOutUser';
import { loginUser } from '../features/auth/api/loginUser';
import { LoginInputsType, SignUpInputsType } from '../features/auth/auth.schema';
import { signUpUser } from '../features/auth/api/signUpUser';

type UserType = {
  id: string;
  email: string;
  fullName?: string;
};

interface AuthContextType {
  user: UserType | null;
  handleLogin: (credentials: LoginInputsType) => Promise<void>;
  handleSignUp: (credentials: SignUpInputsType) => Promise<void>;
  handleSignOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // initial loading
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);

  const handleLogin = async (credentials: LoginInputsType) => {
    try {
      const data = await loginUser(credentials);
      setUser(data);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('Something went wrong');
    }
  };

  const handleSignUp = async (payload: SignUpInputsType) => {
    try {
      const data = await signUpUser(payload);
      setUser(data);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('Something went wrong');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('Something went wrong');
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await getCurrentAuthenticatedUser();
        setUser(user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleSignOut, handleSignUp }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
