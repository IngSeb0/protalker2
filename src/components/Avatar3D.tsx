// Avatar3D.tsx
import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
    import { GltfLoader } from 'gltf-loader-ts';

const Avatar3D = () => {
  const [model, setModel] = useState(null);
  const modelRef = useRef();

  // Cargar el modelo 3D (asegúrate de tener un archivo GLTF o GLB)
  const gltf = useLoader(GLTFLoader, "/path/to/your/3d_model.glb");

  useEffect(() => {
    if (gltf) {
      setModel(gltf.scene);
    }
  }, [gltf]);

  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 5, 5]} angle={0.15} />
      {model && (
        <primitive object={model} scale={[1, 1, 1]} ref={modelRef} />
      )}
    </Canvas>
  );
};

export default Avatar3D;
