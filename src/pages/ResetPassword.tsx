
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { NavbarCustom } from "@/components/NavbarCustom";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setIsSent(true);
        toast({
          title: 'Correo enviado',
          description: 'Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error inesperado',
        description: 'Ha ocurrido un error inesperado.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NavbarCustom />
      
      <div className="flex items-center justify-center p-4 mt-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <Button 
              variant="ghost" 
              className="absolute left-4 top-4"
              onClick={() => navigate('/signin')}
            >
              <ArrowLeft size={18} className="mr-2" />
              Volver
            </Button>
            <CardTitle className="text-2xl font-bold mt-4">Restablecer contraseña</CardTitle>
            <CardDescription>
              Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
            </CardDescription>
          </CardHeader>
          
          {isSent ? (
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  Hemos enviado un enlace para restablecer tu contraseña a <strong>{email}</strong>. 
                  Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
                </AlertDescription>
              </Alert>
              <Button 
                className="w-full mt-4" 
                onClick={() => navigate('/signin')}
              >
                Volver a iniciar sesión
              </Button>
            </CardContent>
          ) : (
            <form onSubmit={handleResetPassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="tu@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar enlace de restablecimiento'
                  )}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
