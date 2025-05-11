import { NavbarCustom } from "@/components/NavbarCustom";
import { useAuth } from "@/context/AuthContext"; 
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User, Mic, Send, Play, Phone } from "lucide-react";
import { MailIcon, CopyIcon, PhoneIcon} from "lucide-react";
import { useConversation } from '@11labs/react';
import React from "react";
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

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, avatarRef.current.clientWidth / avatarRef.current.clientHeight, 0.1, 1000);

    // Adjust camera position to better frame the animated model
    camera.position.set(0, 1.6, 1.8); // Focus on shoulders up

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(avatarRef.current.clientWidth, avatarRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    avatarRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Softer ambient light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6); // Directional light for better visibility
    directionalLight.position.set(0, 2, 2);
    scene.add(ambientLight, directionalLight);

    // Load 3D model with updated pose and animation
    const loader = new GLTFLoader();
    loader.load(
      "lovable-uploads/buisness_man_with_talking_animation.glb",
      (gltf) => {
        const model = gltf.scene;
        model.name = "InterviewModel";
        scene.add(model);

        // Set the initial pose to CC3_BASE_PLUS_TEMPMOTION
        const pose = model.getObjectByName("CC3_Base_Plus_TempMotion");
       
        
        if (pose) {
          pose.visible = true;
        }

        // Setup morph target animations for mouth movement
        const mixer = new THREE.AnimationMixer(pose);
        if (gltf.animations.length > 0) {
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        setMixer(mixer);
      },
      undefined,
      (error) => {
        console.error("Error loading 3D model:", error);
      }
    );

    // Set the background color to a light gray


    // Center the canvas in the container
    renderer.domElement.style.position = "relative";
    renderer.domElement.style.margin = "0 auto";
    renderer.domElement.style.display = "block";

    // Adjust canvas size to fit the container
    renderer.setSize(avatarRef.current.clientWidth, avatarRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Ensure the canvas does not overflow or disrupt the layout
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    setScene(scene);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(0.01);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
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

  {/* Pause Sketchfab model when ElevenLabs stops speaking */}
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe[title="Buisness man (With talking animation)"]');
    if (!iframe) return;

    if (conversation.status === 'connected' && conversation.isSpeaking) {
      // Resume the iframe if needed
      iframe.contentWindow?.postMessage('play', '*');
    } else {
      // Pause the iframe when not speaking
      iframe.contentWindow?.postMessage('pause', '*');
    }
  }, [conversation.status, conversation.isSpeaking]);

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
  }
}
  