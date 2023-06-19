import React, { useEffect, useRef, useState } from "react";
import { TEngine } from "./script";
import styles from "./styles.module.css";
export default function JumpCtrl() {
  const dom = useRef(null);
  const engine = useRef(null);
  const [score, setScore] = useState(0);
  const [top, setTop] = useState(0);
  useEffect(() => {
    engine.value = new TEngine(dom.current, {
      top: (e) => setTop(e),
      score: (e) => setScore(e),
    });
    console.log("init");
  }, []);

  return (
    <React.StrictMode off>
      <div ref={dom} className="container_global"></div>

      <div className={styles.cover}>
        <h2>Top:{top}</h2>
        <h2>Score:{score}</h2>
      </div>
    </React.StrictMode>
  );
}
