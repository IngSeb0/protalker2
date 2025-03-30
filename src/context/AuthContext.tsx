
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

type ProfileData = {
  nombre: string | null;
}

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  profile: ProfileData | null;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: Session | null;
  }>;
  signUp: (email: string, password: string, nombre: string) => Promise<{
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
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('nombre')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      setProfile(null);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        let errorMessage = 'Error al iniciar sesión';
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Correo electrónico o contraseña incorrectos';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Por favor, confirma tu correo electrónico antes de iniciar sesión';
        }

        toast({
          title: 'Error al iniciar sesión',
          description: errorMessage,
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

  const signUp = async (email: string, password: string, nombre: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nombre,
          },
        },
      });

      if (error) {
        let errorMessage = 'Error al registrarse';
        if (error.message.includes('already registered')) {
          errorMessage = 'Este correo electrónico ya está registrado';
        } else if (error.message.includes('password')) {
          errorMessage = 'La contraseña debe tener al menos 6 caracteres';
        }

        toast({
          title: 'Error al registrarse',
          description: errorMessage,
          variant: 'destructive',
        });
        return { error, data: null };
      }

      // Si el registro fue exitoso, intentamos crear el perfil
      // Esto sucederá automáticamente con un trigger en Supabase

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
        profile,
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
