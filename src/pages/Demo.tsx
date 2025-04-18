import { NavbarCustom } from "@/components/NavbarCustom";
import { useAuth } from "@/context/AuthContext"; 
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User, Mic, Send, Play } from "lucide-react";

// Define API URL constants
const OPENAI_API_URL = "http://localhost:5000"; // Update this as needed
const BASE_API_URL = "http://localhost:5000"; // Update this as needed

interface Badge {
  id: string;
  title: string;
  description: string;
  image: string;
  achieved: boolean;
  shareMessage: string;
}

export default function Demo() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [greeting, setGreeting] = useState("");
  const [completedSessions, setCompletedSessions] = useState(0);
  const [shareLink, setShareLink] = useState("");
  
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "newbie",
      title: "Principiante ProTalker",
      description: "Completaste tu primera sesión de práctica",
      image: "🎯",
      achieved: false,
      shareMessage: "¡Acabo de completar mi primera sesión en ProTalker! #ComunicaciónÉxito"
    },
    {
      id: "5-sessions",
      title: "Practicante Consistente",
      description: "Completaste 5 sesiones de práctica",
      image: "🏆",
      achieved: false,
      shareMessage: "¡He completado 5 sesiones en ProTalker! Mi comunicación mejora cada día. #HabilidadesEnCrecimiento"
    },
    {
      id: "10-sessions",
      title: "Maestro de la Comunicación",
      description: "Completaste 10 sesiones de práctica",
      image: "🌟",
      achieved: false,
      shareMessage: "¡Logré completar 10 sesiones en ProTalker! Dominando el arte de la comunicación. #ComunicaciónProfesional"
    },
    {
      id: "fast-learner",
      title: "Aprendiz Rápido",
      description: "Completaste 3 sesiones en un día",
      image: "⚡",
      achieved: false,
      shareMessage: "¡Completé 3 sesiones en un solo día con ProTalker! #AprendizajeAcelerado"
    },
    {
      id: "week-challenge",
      title: "Reto Semanal",
      description: "Completaste una sesión cada día por una semana",
      image: "📅",
      achieved: false,
      shareMessage: "¡Completé el Reto Semanal de ProTalker! 7 días mejorando mi comunicación. #Constancia"
    },
    {
      id: "early-bird",
      title: "Madrugador Comunicativo",
      description: "Completaste una sesión antes de las 8 AM",
      image: "🌅",
      achieved: false,
      shareMessage: "¡Practiqué mi comunicación temprano en la mañana con ProTalker! #EarlyBird"
    },
    {
      id: "weekend-warrior",
      title: "Guerrero de Fin de Semana",
      description: "Completaste una sesión el sábado o domingo",
      image: "🏝️",
      achieved: false,
      shareMessage: "¡Incluso los fines de semana practico con ProTalker! #AprendizajeContinuo"
    }
  ]);

  useEffect(() => {
    if (profile?.nombre) {
      setGreeting(`¡Hola, ${profile.nombre}! Bienvenido a nuestra demostración.`);
    } else if (user) {
      setGreeting("¡Bienvenido a nuestra demostración!");
    }
  }, [user, profile]);

  const { loading, signOut } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([
    {type: 'bot', content: '¡Hola! Soy tu asistente de entrenamiento. ¿En qué tipo de situación quieres practicar hoy? ¿Una entrevista laboral, una presentación académica o un discurso profesional?'}
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin');
    }
  }, [loading, user, navigate]);
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Efecto para notificar cuando se gana una insignia
  useEffect(() => {
    const newlyAchieved = badges.filter(b => b.achieved && 
      !badges.find(prevBadge => prevBadge.id === b.id && prevBadge.achieved));
      
    newlyAchieved.forEach(badge => {
      toast({
        title: `¡Nueva insignia desbloqueada! ${badge.image}`,
        description: `${badge.title}: ${badge.description}`,
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => shareBadge(badge)}
          >
            Compartir
          </Button>
        )
      });
    });
  }, [badges]);

 


  const shareBadge = (badge: Badge) => {
    const message = `${badge.shareMessage} ${generateShareLink()}`;
    if (navigator.share) {
      navigator.share({
        title: badge.title,
        text: message,
        url: generateShareLink()
      }).catch(console.error);
    } else {
      // Fallback para navegadores que no soportan la API de share
      navigator.clipboard.writeText(message).then(() => {
        toast({
          title: "¡Enlace copiado!",
          description: "Pega el enlace para compartir tu logro"
        });
      });
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, {type: 'user', content: message}]);
    setIsProcessing(true);
    
    try {
      const response = await fetch(`${OPENAI_API_URL}/api/openai-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });
      
      if (!response.ok) {
        throw new Error('Error al comunicarse con el asistente');
      }
      
      const data = await response.json();
      
      setMessages(prev => [...prev, {type: 'bot', content: data.response}]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al comunicarse con el asistente"
      });
      
      setMessages(prev => [...prev, {type: 'bot', content: 'Lo siento, estoy teniendo problemas para responder. Por favor, intenta de nuevo más tarde.'}]);
    } finally {
      setIsProcessing(false);
      setMessage('');
    }
  };

const runElevenLabsDemo = async () => {
  try {
    setIsProcessing(true);
    toast({
      title: "Iniciando ElevenLabs",
      description: "Preparando la demo de voz...",
    });

    const response = await fetch(`${BASE_API_URL}/api/run-prueba`, {
      method: "POST",
    });

    const data = await response.json();

    if (response.ok) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "Demo de ElevenLabs iniciado. ¡Ahora puedes interactuar con el asistente por voz!" },
        { type: "bot", content: `Output: ${data.output}` },
      ]);
      
      // Actualizamos el estado de forma correcta
      const newSessionCount = completedSessions + 1;
      setCompletedSessions(newSessionCount);
      
      // Actualizamos las insignias basándonos en el nuevo valor
      setBadges(prevBadges => prevBadges.map(badge => {
        if (badge.id === "newbie" && newSessionCount >= 1) {
          return {...badge, achieved: true};
        }
        if (badge.id === "5-sessions" && newSessionCount >= 5) {
          return {...badge, achieved: true};
        }
        if (badge.id === "10-sessions" && newSessionCount >= 10) {
          return {...badge, achieved: true};
        }
        return badge;
      }));
      
      // Generamos el enlace con el nuevo valor
      generateShareLink(newSessionCount);

      toast({
        title: "Demo iniciado",
        description: "Demo de ElevenLabs iniciado correctamente",
      });
    } else {
      // Manejo de errores...
    }
  } catch (error) {
    // Manejo de errores...
  } finally {
    setIsProcessing(false);
  }
};

// Modificamos generateShareLink para que pueda recibir el valor directamente
const generateShareLink = (sessionCount = completedSessions) => {
  const achievedBadges = badges.filter(b => b.achieved);
  const badgeList = achievedBadges.map(b => b.title).join(", ");
  
  const message = `¡He completado ${sessionCount} sesiones en ProTalker! ` +
    `Insignias obtenidas: ${badgeList || "Todavía estoy comenzando"}. ` +
    `Únete a mí en este viaje para mejorar nuestras habilidades de comunicación.`;
  
  const link = `${window.location.origin}/progreso?sesiones=${sessionCount}&insignias=${encodeURIComponent(badgeList)}`;
  
  setShareLink(link);
  return link;
};

  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      setTimeout(() => {
        setMessage(prev => prev + "Me gustaría practicar para una entrevista en el sector tecnológico. ");
        setIsListening(false);
      }, 3000);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarCustom />
      
      <main className="container mx-auto px-4 py-8">
        {greeting && (
          <Card className="mb-8 border-none shadow-md bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary">
                {greeting}
              </CardTitle>
              <CardDescription>
                Aquí podrás probar las funcionalidades de ProTalker.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Demo de entrenamiento</h1>
          <p className="text-muted-foreground">
            Interactúa con nuestro asistente para practicar tus habilidades de comunicación
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 flex-grow">
          <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md flex flex-col">
            <Tabs defaultValue="chat" className="flex-grow flex flex-col">
              <div className="border-b px-4">
                <TabsList className="mt-2">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="feedback">Retroalimentación</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="chat" className="flex-grow flex flex-col p-4">
                <div 
                  ref={chatContainerRef}
                  className="flex-grow overflow-y-auto mb-4 space-y-4"
                >
                  {messages.map((msg, index) => (
                    <div 
                      key={index}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${msg.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                      >
                        <div className="flex items-center mb-1">
                          {msg.type === 'bot' ? <Bot size={14} className="mr-1" /> : <User size={14} className="mr-1" />}
                          <span className="text-xs font-medium">
                            {msg.type === 'user' ? 'Tú' : 'Asistente'}
                          </span>
                        </div>
                        <p>{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="icon" 
                    variant={isListening ? "destructive" : "secondary"}
                    onClick={toggleListening}
                    className="flex-shrink-0"
                    disabled={isProcessing}
                  >
                    <Mic size={18} />
                  </Button>
                  
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="resize-none min-h-[2.5rem]"
                    disabled={isProcessing}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isProcessing}
                    className="flex-shrink-0"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="feedback" className="p-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Análisis de comunicación</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Claridad del mensaje</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Estructura</span>
                          <span className="font-medium">82%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '82%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Confianza percibida</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Recomendaciones</h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Trata de responder con ejemplos más específicos.</li>
                      <li>Evita usar muletillas como "eh", "um" y "como que".</li>
                      <li>Mantén contacto visual más consistente.</li>
                      <li>Mejora tu tono variando la entonación para enfatizar puntos clave.</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="w-full md:w-1/4 space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-medium mb-3">Escenarios disponibles</h3>
              <ul className="space-y-2">
                <li>
                  <Button variant="outline" className="w-full justify-start text-left">
                    Entrevista para desarrollador
                  </Button>
                </li>
                <li>
                  <Button variant="outline" className="w-full justify-start text-left">
                    Presentación de proyecto
                  </Button>
                </li>
                <li>
                  <Button variant="outline" className="w-full justify-start text-left">
                    Discurso motivacional
                  </Button>
                </li>
                <li>
                  <Button variant="outline" className="w-full justify-start text-left">
                    Conversación con cliente
                  </Button>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-medium mb-3">Tu progreso</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sesiones completadas</span>
                    <span className="font-medium">{completedSessions}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${(completedSessions / 10) * 100}%` }}></div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">Tus insignias:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {badges.filter(b => b.achieved).map((badge) => (
                      <div 
                        key={badge.id}
                        className="flex flex-col items-center p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg cursor-pointer hover:shadow-md transition-all"
                        onClick={() => shareBadge(badge)}
                        title="Haz clic para compartir"
                      >
                        <span className="text-2xl mb-1">{badge.image}</span>
                        <span className="text-xs font-medium text-center">{badge.title}</span>
                        <span className="text-xs text-muted-foreground text-center">{badge.description}</span>
                      </div>
                    ))}
                    
                    {/* Insignias no obtenidas aún */}
                    {badges.filter(b => !b.achieved).map((badge) => (
                      <div 
                        key={badge.id}
                        className="flex flex-col items-center p-3 bg-gray-100 rounded-lg opacity-50"
                      >
                        <span className="text-2xl mb-1">🔒</span>
                        <span className="text-xs font-medium text-center">{badge.title}</span>
                        <span className="text-xs text-muted-foreground text-center">{badge.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-medium mb-3">Demo de voz con ElevenLabs</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Inicia el demo para interactuar con el asistente utilizando voz (powered by ElevenLabs)
              </p>
              <Button 
                onClick={runElevenLabsDemo} 
                className="w-full flex items-center justify-center"
                disabled={isProcessing}
              >
                <Play className="mr-2 h-4 w-4" />
                Iniciar demo de voz
              </Button>
              <div className="mt-4">
                {shareLink && (
                  <a 
                    href={shareLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Compartir mi progreso
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}