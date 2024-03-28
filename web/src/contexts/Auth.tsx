import { ReactNode, createContext, useEffect, useState } from 'react';
import { AuthSchemaType } from '../features/auth/auth.schema';

type UserType = {
  id: string;
  email: string;
  fullName?: string;
};

type LoginInputsType = Pick<AuthSchemaType, 'email' | 'password'>;

interface AuthContextType {
  user: UserType | null;
  handleLogin: (credentials: LoginInputsType) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // initial loading
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);

  const handleLogin = async (credentials: LoginInputsType) => {
    console.log('loginerist');

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setUser(data);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('Something went wrong');
    }
  };

  useEffect(() => {
    const checkSession = () => {
      try {
        console.log('try');
      } catch (error) {
        console.log('error');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  return <AuthContext.Provider value={{ user, handleLogin }}>{!isLoading && children}</AuthContext.Provider>;
};
