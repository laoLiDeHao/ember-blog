import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Environment, Grid, OrbitControls } from "@react-three/drei";
export default function PointCrush() {
  const ref = useRef();

  

  useEffect(() => {}, []);
  return (
    <div ref={ref} className="container_global">
      <Canvas>

        <Grid
          renderOrder={-1}
          position={[0, 0, 0]}
          infiniteGrid
          cellSize={0.6}
          cellThickness={0.6}
          sectionSize={3.3}
          sectionThickness={1.5}
          sectionColor={[0.5, 0.5, 10]}
          fadeDistance={30}
        />
        <Environment
          background
          files={
            "https://ember-objects-01-1256331022.cos.ap-nanjing.myqcloud.com/hdrs/venice_sunset_1k.hdr"
          }
          blur={0.8}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
