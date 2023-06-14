import { Environment, Grid, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { DoubleSide } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import UnitMusic from "./unit-music";

export default function CaseFoodTable() {
  return (
    <>
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
        <Environment
          background
          files={
            "https://ember-objects-01-1256331022.cos.ap-nanjing.myqcloud.com/hdrs/venice_sunset_1k.hdr"
          }
          blur={0.2}
        />
        <Scene></Scene>
        <OrbitControls />
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
        }}
      >
        <UnitMusic />
      </div>
    </>
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
      <Menuboard position={[1, 0, 1]} rotation={[0, Math.PI / 2, 0]} />
      <Menuboard
        position={[0, 0.77, -0.8]}
        scale={[0.002, 0.002, 0.002]}
        rotation={[0, Math.PI / 2, 0]}
        billboard={1}
      />
      <RedVioletCake position={[0.1, 0.775, 0.3]} />
      <FriutCake position={[-0.3, 0.755, -0.1]} />
      <Tablewave position={[-0.3, 0.775, 0]} />
      <Flower scale={[0.05, 0.05, 0.05]} />
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

  return (
    <group scale={scale} position={position} rotation={rotation}>
      <primitive scale={0.001} object={tw.scene}></primitive>;
    </group>
  );
};

const Flower = ({
  scale = [0.05, 0.03, 0.05],
  position = [0.25, 0.76, 0],
  rotation = [0, 0, 0],
}) => {
  const tw = useLoader(
    GLTFLoader,
    "https://ember-objects-01-1256331022.cos.ap-nanjing.myqcloud.com/models/flowers/flowers.glb"
  );

  return (
    <group scale={scale} position={position} rotation={rotation}>
      <primitive object={tw.scene}></primitive>;
    </group>
  );
};

const FriutCake = ({
  scale = [1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const tw = useLoader(
    GLTFLoader,
    "https://ember-objects-01-1256331022.cos.ap-nanjing.myqcloud.com/models/foods/fruit_cake_slice.glb"
  );

  return (
    <group scale={scale} position={position} rotation={rotation}>
      <primitive object={tw.scene}></primitive>;
    </group>
  );
};
const RedVioletCake = ({
  scale = [0.05, 0.05, 0.05],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const tw = useLoader(
    GLTFLoader,
    "https://ember-objects-01-1256331022.cos.ap-nanjing.myqcloud.com/models/foods/red_velvet_cake_1k.glb"
  );
  return (
    <group scale={scale} position={position} rotation={rotation}>
      <primitive object={tw.scene}></primitive>;
    </group>
  );
};
//
const Menuboard = ({
  billboard = 4,
  scale = [0.01, 0.01, 0.01],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const tw = useLoader(
    GLTFLoader,
    "https://ember-objects-01-1256331022.cos.ap-nanjing.myqcloud.com/models/tableware/stylized_menu_boards%20%281%29.glb"
  );
  const modellist = {};
  console.log(tw);
  tw.scene.traverse((item) => {
    if (item.name === "SM_Menu_Board_01_M_Menu_Board_01_0")
      modellist["billboard1"] = item;
    else if (item.name === "SM_Menu_Board_02_M_Menu_Board_02_0")
      modellist["billboard2"] = item;
    else if (item.name === "SM_Menu_Board_03_M_Menu_Board_03_0")
      modellist["billboard3"] = item;
    else if (item.name === "SM_Menu_Board_04_M_Menu_Board_04_0")
      modellist["billboard4"] = item;
  });
  return (
    <group scale={scale} position={position} rotation={rotation}>
      <mesh
        position={[-125, 0, 0]}
        geometry={modellist[`billboard${billboard}`].geometry}
        material={tw.materials[`M_Menu_Board_0${billboard}`]}
      ></mesh>
    </group>
  );
};
