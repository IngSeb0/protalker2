
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';
import { Loader2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { NavbarCustom } from "@/components/NavbarCustom";

export default function SignIn() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/perfil');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPasswordError(null);

    try {
      if (activeTab === "login") {
        const { error } = await signIn(email, password);
        if (!error) {
          navigate('/perfil');
        }
      } else {
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
          setPasswordError("Las contraseñas no coinciden");
          setIsLoading(false);
          return;
        }

        if (password.length < 6) {
          setPasswordError("La contraseña debe tener al menos 6 caracteres");
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(email, password, nombre);
        if (!error) {
          // Mostrar mensaje de éxito
          setActiveTab("login");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NavbarCustom />
      
      <div className="flex items-center justify-center p-4 mt-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">ProTalker</CardTitle>
            <CardDescription>
              {activeTab === "login" 
                ? "Inicia sesión para continuar" 
                : "Crea una cuenta nueva"}
            </CardDescription>
          </CardHeader>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleSubmit}>
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Contraseña</Label>
                      <Link to="/reset-password" className="text-sm text-blue-500 hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={passwordVisible ? "text" : "password"}
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 px-2"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Iniciando sesión...
                      </>
                    ) : (
                      'Iniciar Sesión'
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input 
                      id="nombre" 
                      type="text" 
                      placeholder="Tu nombre" 
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Correo electrónico</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="tu@email.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <div className="relative">
                      <Input 
                        id="register-password" 
                        type={passwordVisible ? "text" : "password"}
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 px-2"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                    <div className="relative">
                      <Input 
                        id="confirm-password" 
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder="••••••••" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 px-2"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {confirmPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      La contraseña debe tener al menos 6 caracteres
                    </p>
                  </div>

                  {passwordError && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertDescription>{passwordError}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creando cuenta...
                      </>
                    ) : (
                      'Crear Cuenta'
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
