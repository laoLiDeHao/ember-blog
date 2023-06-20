import React, { useEffect, useRef } from "react";

import styles from "./styles.module.css";
import createView from "./script";
export default function Particals1() {
  const dom = useRef(null);
  // const engine = useRef(null);
  useEffect(() => {
    createView(dom.current);
  }, []);

  return (
    <React.StrictMode off>
      <div className="container_global">
        <canvas ref={dom} className="webgl"></canvas>
      </div>
      <div className={styles.cover}></div>
    </React.StrictMode>
  );
}
