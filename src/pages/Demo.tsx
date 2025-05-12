import { NavbarCustom } from "@/components/NavbarCustom";
import { useAuth } from "@/context/AuthContext"; 
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { useConversation } from '@11labs/react';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Bot, User } from "lucide-react";

// Define API URL constants
const OPENAI_API_URL = "http://localhost:5000";
const BASE_API_URL = "http://localhost:5000";
  let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
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
  const [mouthShape, setMouthShape] = useState("rest");
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [mixer, setMixer] = useState<THREE.AnimationMixer | null>(null);
  const [isAnimating, setIsAnimating] = useState(false); // Controla si la animación está activa

  const [completedSessions, setCompletedSessions] = useState(() => {
    const saved = localStorage.getItem('completedSessions');
    return saved ? parseInt(saved) : 0;
  });
  const [shareLink, setShareLink] = useState("");
  
  const [badges, setBadges] = useState<Badge[]>(() => {
    const initialBadges = [
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
    ];

    const savedSessions = localStorage.getItem('completedSessions');
    const sessionCount = savedSessions ? parseInt(savedSessions) : 0;
    
    return initialBadges.map(badge => ({
      ...badge,
      achieved: badge.achieved || 
               (badge.id === "newbie" && sessionCount >= 1) ||
               (badge.id === "5-sessions" && sessionCount >= 5) ||
               (badge.id === "10-sessions" && sessionCount >= 10)
    }));
  });

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
            Compartir logro
          </Button>
        )
      });
    });
  }, [badges]);

  const incrementSessions = () => {
    setCompletedSessions(prev => {
      const newCount = prev + 1;
      localStorage.setItem('completedSessions', newCount.toString());
      
      setBadges(currentBadges => 
        currentBadges.map(badge => ({
          ...badge,
          achieved: badge.achieved || 
                   (badge.id === "newbie" && newCount >= 1) ||
                   (badge.id === "5-sessions" && newCount >= 5) ||
                   (badge.id === "10-sessions" && newCount >= 10)
        }))
      );
      
      return newCount;
    });
  };

  const generateShareLink = () => {
    return "https://protalker-demo.vercel.app/";
  };

  useEffect(() => {
    generateShareLink();
  }, [completedSessions, badges]);

  const shareBadge = (badge: Badge) => {
    const message = `${badge.shareMessage}\n\nPrueba la demo del mejor simulador de entrevistas en tiempo real: ${generateShareLink()}`;
  
    if (navigator.share) {
      navigator.share({
        title: `¡Logré la insignia ${badge.title}!`,
        text: message,
        url: generateShareLink()
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(message).then(() => {
        toast({
          title: "¡Mensaje copiado!",
          description: "El mensaje con tu insignia ha sido copiado al portapapeles",
          action: (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open(generateShareLink(), '_blank')}
            >
              Abrir ProTalker
            </Button>
          )
        });
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "¡Mensaje copiado!",
        description: "Pega para compartir tu logro",
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.open(generateShareLink(), '_blank')}
          >
            Abrir ProTalker
          </Button>
        )
      });
    });
  };

  const shareProgress = () => {
    const achievedBadges = badges.filter(b => b.achieved);
    const message = `¡He completado ${completedSessions} sesiones en ProTalker y gané ${achievedBadges.length} insignias! 🎉\n\nÚnete a la mejor plataforma de práctica de entrevistas: ${generateShareLink()}`;
  
    if (navigator.share) {
      navigator.share({
        title: "Mi progreso en ProTalker",
        text: message,
        url: generateShareLink()
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(message).then(() => {
        toast({
          title: "¡Progreso copiado!",
          description: "Pega para compartir tus logros",
          action: (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open(generateShareLink(), '_blank')}
            >
              Ver demo
            </Button>
          )
        });
      });
    }
  };

  const conversation = useConversation({
    onMessage: (msg) => {
      if (msg.source === "ai") {
        setMessages(prev => [...prev, {
          type: 'bot',
          content: msg.message
        }]);

        // Analizar el texto del mensaje para sincronizar las formas de la boca
        const words = msg.message.split(" ");
        let wordIndex = 0;

        const updateMouthShapeFromText = () => {
          if (wordIndex >= words.length) return;

          const word = words[wordIndex].toLowerCase();

          // Mapear palabras o sonidos a formas de la boca
          if (/[aeiou]/.test(word)) {
            setMouthShape("open");
          } else if (/f|v/.test(word)) {
            setMouthShape("f");
          } else if (/m|b|p/.test(word)) {
            setMouthShape("mbp");
          } else if (/th/.test(word)) {
            setMouthShape("th");
          } else {
            setMouthShape("rest");
          }

          wordIndex++;
          setTimeout(updateMouthShapeFromText, 300); // Cambiar forma cada 300ms
        };

        updateMouthShapeFromText();
      }
    },
    onAudioPlayback: (audioStream: MediaStream) => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
    
      const source = audioContextRef.current.createMediaStreamSource(audioStream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      source.connect(analyserRef.current);
    
      const updateMouthShape = () => {
        if (!analyserRef.current) return;
    
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
    
        const avgFrequency = dataArray.reduce((acc, curr) => acc + curr, 0) / dataArray.length;
    
        // Mapear frecuencias a formas de la boca
        if (avgFrequency > 200) {
          setMouthShape("open");
        } else if (avgFrequency > 150) {
          setMouthShape("o");
        } else if (avgFrequency > 100) {
          setMouthShape("e");
        } else if (avgFrequency > 75) {
          setMouthShape("mbp");
        } else if (avgFrequency > 50) {
          setMouthShape("f");
        } else if (avgFrequency > 25) {
          setMouthShape("th");
        } else {
          setMouthShape("rest");
        }
    
        requestAnimationFrame(updateMouthShape);
      };
      updateMouthShape();
    },
    onConnect: () => {
      toast({
        title: "🎙️ Conectado",
        description: "Puedes comenzar a hablar con el agente",
      });
    },
    onDisconnect: () => {
      toast({
        title: "🔴 Conversación terminada",
        description: "El agente ya no está activo",
      });
    },
    onError: (error) => {
      console.error("Error con ElevenLabs:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error en la conversación de voz",
      });
    },
  });

  useEffect(() => {
    if (!avatarRef.current) return;

    const camera = new THREE.PerspectiveCamera(75, avatarRef.current.clientWidth / avatarRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 1.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(avatarRef.current.clientWidth, avatarRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    avatarRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(0, 2, 2);
    scene.add(ambientLight, directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      "lovable-uploads/scene_converted.gltf", // Updated to use the optimized GLTF file
      (gltf) => {
        const loadedScene = gltf.scene;
        loadedScene.name = "CompleteScene";
        scene.add(loadedScene);

        const mixer = new THREE.AnimationMixer(loadedScene);
        if (gltf.animations.length > 0) {
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        setMixer(mixer);
        renderer.render(scene, camera);
        
        // Iniciar el bucle de animación solo después de cargar la escena
        const animate = () => {
          requestAnimationFrame(animate);
          if (mixer) mixer.update(0.01);
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error("Error al cargar la escena GLTF:", error);
      }
    );

    return () => {
      renderer.dispose();
      avatarRef.current?.removeChild(renderer.domElement);
    };
  }, []);


  const animate = () => {
    if (!isAnimating) return; // Detiene el bucle si no debe animarse

    requestAnimationFrame(animate);
    if (mixer) mixer.update(0.01);
    renderer.render(scene, camera);
  };

  const startVoiceDemo = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId: 'P1ORnc1dGjU8sp1tdcOu',
      });

      setMessages(prev => [
        ...prev,
        { type: "bot", content: "Sesión de voz iniciada con ElevenLabs. ¡Puedes hablar ahora!" }
      ]);

      incrementSessions();

      setIsAnimating(true); // Activa la animación
      animate();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo iniciar la demo de voz",
      });
    }
  };

  const stopVoiceDemo = async () => {
    await conversation.endSession();

    setIsAnimating(false); // Detiene la animación

    if (mixer) {
      mixer.timeScale = 0; // Pausa la animación
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
            Interactúa con nuestro asistente para practicar tus habilidades de comunicación.
          </p>
        </div>

        <div className="avatar-wrapper mb-4" ref={avatarRef} style={{ width: "100%", height: "400px" }}></div>

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
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          {msg.type === 'bot' ? (
                            <Bot size={14} className="mr-1" />
                          ) : (
                            <User size={14} className="mr-1" />
                          )}
                          <span className="text-xs font-medium">
                            {msg.type === 'user' ? 'Tú' : 'Asistente ElevenLabs'}
                          </span>
                        </div>
                        <p>{msg.content}</p>
                      </div>
                    </div>
                  ))}
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
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: '78%' }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Estructura</span>
                          <span className="font-medium">82%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: '82%' }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Confianza percibida</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: '65%' }}
                          ></div>
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
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    Entrevista para desarrollador
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    Presentación de proyecto
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    Discurso motivacional
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
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
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${Math.min(100, (completedSessions / 10) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">Tus insignias:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {badges
                      .filter((b) => b.achieved)
                      .map((badge) => (
                        <div
                          key={badge.id}
                          className="flex flex-col items-center p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg cursor-pointer hover:shadow-md transition-all"
                          onClick={() => shareBadge(badge)}
                          title="Haz clic para compartir"
                        >
                          <span className="text-2xl mb-1">{badge.image}</span>
                          <span className="text-xs font-medium text-center">
                            {badge.title}
                          </span>
                          <span className="text-xs text-muted-foreground text-center">
                            {badge.description}
                          </span>
                        </div>
                      ))}

                    {badges
                      .filter((b) => !b.achieved)
                      .map((badge) => (
                        <div
                          key={badge.id}
                          className="flex flex-col items-center p-3 bg-gray-100 rounded-lg opacity-50"
                        >
                          <span className="text-2xl mb-1">🔒</span>
                          <span className="text-xs font-medium text-center">
                            {badge.title}
                          </span>
                          <span className="text-xs text-muted-foreground text-center">
                            {badge.description}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-medium mb-3">Demo de voz con ElevenLabs</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Inicia el demo para interactuar con el asistente utilizando voz
                (powered by ElevenLabs)
              </p>
              <Button
                onClick={startVoiceDemo}
                className="w-full flex items-center justify-center"
                disabled={conversation.status === 'connected'}
              >
                Iniciar demo de voz
              </Button>

              <Button
                onClick={stopVoiceDemo}
                className="w-full flex items-center justify-center mt-2 bg-red-600 text-white hover:bg-red-700"
                disabled={conversation.status !== 'connected'}
              >
                Detener demo de voz
              </Button>

              <div className="text-xs text-muted-foreground mt-2 text-center">
                Estado: <strong>{conversation.status}</strong> — Agente está:{' '}
                <strong>{conversation.isSpeaking ? 'Hablando' : 'Escuchando'}</strong>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={shareProgress}
                  className="flex items-center justify-center gap-2 mt-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Compartir mi progreso
                </Button>

                <Button
                  variant="link"
                  onClick={() => {
                    const message = `¡Estoy mejorando mis habilidades con ProTalker! Prueba la demo: ${generateShareLink()}`;
                    navigator.clipboard
                      .writeText(message)
                      .then(() => {
                        toast({
                          title: '¡Enlace copiado!',
                          description: 'Pega para compartir ProTalker',
                        });
                      })
                      .catch((error) => {
                        console.error('Error al copiar al portapapeles:', error);
                        toast({
                          variant: 'destructive',
                          title: 'Error',
                          description: 'No se pudo copiar el enlace',
                        });
                      });
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  Compartir ProTalker
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}