// src/pages/ShareProgress.tsx
import { useLocation } from "react-router-dom";

export default function ShareProgress() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const sesiones = params.get('sesiones');
  const insignias = params.get('insignias');
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Mi Progreso en ProTalker</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Sesiones completadas</h2>
            <p className="text-xl">{sesiones || '0'}</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold">Insignias obtenidas</h2>
            {insignias ? (
              <ul className="list-disc pl-5">
                {insignias.split(',').map((badge, index) => (
                  <li key={index}>{badge}</li>
                ))}
              </ul>
            ) : (
              <p>Todavía no has obtenido insignias</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}