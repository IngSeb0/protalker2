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

// Define API URL constants
const OPENAI_API_URL = "http://localhost:5000";
const BASE_API_URL = "http://localhost:5000";
  
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
      "lovable-uploads/scene.gltf",
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

  useEffect(() => {
    if (!mixer) return;

    const model = scene?.children.find((child) => child.name === "InterviewModel");
    if (model && "morphTargetInfluences" in model) {
      const influences = model.morphTargetInfluences;

      const updateMouthShape = () => {
        if (!analyserRef.current) return;

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        const avgFrequency = dataArray.reduce((acc, curr) => acc + curr, 0) / dataArray.length;

        // Map frequencies to mouth shapes
        if (avgFrequency > 200) {
          influences[0] = 1; // Open mouth
        } else {
          influences[0] = 0; // Rest position
        }

        requestAnimationFrame(updateMouthShape);
      };

      updateMouthShape();
    }
  }, [mixer, scene]);

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

      if (mixer) {
        mixer.timeScale = 1; // Resume animation
      }
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

    if (mixer) {
      mixer.timeScale = 0; // Pause animation
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

        <div className="avatar-wrapper mb-4" ref={avatarRef} style={{ width: "100%", height: "400px" }}></div>

        <div className="flex flex-col md:flex-row gap-6 flex-grow">
          <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md flex flex-col">
            {/* ...existing code for tabs and chat... */}
          </div>

          <div className="w-full md:w-1/4 space-y-4">
            {/* ...existing code for progress and voice demo... */}
          </div>
        </div>
      </main>
    </div>
  );
}