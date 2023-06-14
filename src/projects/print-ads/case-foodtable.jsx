import { Environment, Grid, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { DoubleSide } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function CaseFoodTable() {
  return (
    <Canvas>
      <ambientLight />

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
      <Environment background preset="sunset" blur={0.8} />
      <Scene></Scene>
      <OrbitControls />
    </Canvas>
  );
}

const Scene = () => {
  const table = useLoader(
    GLTFLoader,
    "https://ember-objects-01-1256331022.cos.ap-nanjing.myqcloud.com/models/table/tablecloth.glb"
  );
  const radius = 0.5;
  const segments = 32;

  return (
    <group>
      <Tablewave  position={[-0.3,.775,0]} />
      <Flower  scale = {[.05, .05, .05]} />
      <primitive scale={[0.005, 0.005, 0.005]} object={table.scene}></primitive>
      <mesh position={[0, 0.77, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, segments]} />
        <meshBasicMaterial color="white" side={DoubleSide} />
      </mesh>
    </group>
  );
};

const Tablewave = ({
  scale = [1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const tw = useLoader(
    GLTFLoader,
    "https://ember-objects-01-1256331022.cos.ap-nanjing.myqcloud.com/models/tableware/low_poly_tableware.glb"
  );
  console.log(tw);

  return (
    <group scale={scale} position={position} rotation={rotation}>
      <primitive scale={0.001} object={tw.scene}></primitive>;
    </group>
  );
};

const Flower = ({
  scale = [.05, .05, .05],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const tw = useLoader(
    GLTFLoader,
    "https://ember-objects-01-1256331022.cos.ap-nanjing.myqcloud.com/models/flowers/flowers.glb"
  );
  console.log(tw);

  return (
    <group scale={scale} position={position} rotation={rotation}>
      <primitive  object={tw.scene}></primitive>;
    </group>
  );
};