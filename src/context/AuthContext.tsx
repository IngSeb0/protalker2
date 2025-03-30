
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: Session | null;
  }>;
  signUp: (email: string, password: string) => Promise<{
    error: Error | null;
    data: Session | null;
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Error al iniciar sesión',
          description: error.message,
          variant: 'destructive',
        });
        return { error, data: null };
      }

      toast({
        title: '¡Bienvenido de nuevo!',
        description: 'Has iniciado sesión correctamente.',
      });
      return { data: data.session, error: null };
    } catch (error) {
      toast({
        title: 'Error inesperado',
        description: 'Ha ocurrido un error inesperado.',
        variant: 'destructive',
      });
      return { error: error as Error, data: null };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Error al registrarse',
          description: error.message,
          variant: 'destructive',
        });
        return { error, data: null };
      }

      toast({
        title: '¡Registro exitoso!',
        description: 'Por favor, verifica tu correo electrónico para confirmar tu cuenta.',
      });
      return { data: data.session, error: null };
    } catch (error) {
      toast({
        title: 'Error inesperado',
        description: 'Ha ocurrido un error inesperado.',
        variant: 'destructive',
      });
      return { error: error as Error, data: null };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Sesión cerrada',
      description: 'Has cerrado sesión correctamente.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
