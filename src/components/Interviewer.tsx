import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

const Interviewer = ({ isSpeaking }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (isSpeaking) {
      setText('Hablando...');
    } else {
      setText('Esperando...');
    }
  }, [isSpeaking]);

  return (
    <div className="interviewer-container">
      <Canvas>
        {/* Placeholder for 3D model or animation */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={isSpeaking ? 'red' : 'blue'} />
        </mesh>
      </Canvas>
      <p className="interviewer-text">{text}</p>
    </div>
  );
};

export default Interviewer;