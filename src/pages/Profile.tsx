
import { useAuth } from "@/context/AuthContext";
import { NavbarCustom } from "@/components/NavbarCustom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarCustom />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Mi Perfil</CardTitle>
            <CardDescription>
              Gestiona tu información personal y configuración de cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500">Correo electrónico</h3>
              <p className="text-lg font-medium">{user?.email}</p>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500">ID de usuario</h3>
              <p className="text-sm text-gray-800 font-mono bg-gray-100 p-2 rounded">{user?.id}</p>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500">Cuenta creada</h3>
              <p className="text-lg font-medium">
                {user?.created_at 
                  ? new Date(user.created_at).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })
                  : 'No disponible'}
              </p>
            </div>
            
            <div className="pt-6">
              <Button 
                variant="destructive" 
                onClick={handleSignOut}
                className="flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
