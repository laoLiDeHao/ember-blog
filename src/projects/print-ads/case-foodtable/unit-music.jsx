import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./unit-music.module.css";
const url =
  "https://ember-objects-01-1256331022.cos.ap-nanjing.myqcloud.com/music/Sviatoslav%20Richter%20-%20The%20Well-Tempered%20Clavier%2C%20Book%201%EF%BC%9APrelude%20and%20Fugue%20No.%204%20in%20C%20sharp%20minor%2C%20BWV%20849.mp3";
export default function UnitMusic() {
  // const [welcome, setWelcome] = useState(false);
  const [isplay, setplay] = useState(false);
  const ref = useRef(null);
  const [cover, setcover] = useState(true);

  const handleCtrl = () => {
    if (isplay) {
      setplay(false);
      ref.current.pause();
      ref.current.volume = 1.0;
    } else {
      setplay(true);
      ref.current.play();
      ref.current.volume = 1.0;
    }
  };
  return (
    <>
      <div
        className={[styles.musicplayer, isplay ? styles.play : ""].join(" ")}
        onClick={() => handleCtrl()}
      >
        <audio ref={ref} src={url}></audio>
        {!isplay && (
          <svg
            t="1686748270066"
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4702"
            width="40"
            height="40"
          >
            <path
              d="M640 481.706667l-85.333333-85.333334V149.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v7.253334a113.92 113.92 0 0 0 61.013333 103.253333A197.12 197.12 0 0 1 810.666667 436.906667v53.76a21.333333 21.333333 0 0 1-21.333334 21.333333h-42.666666a21.333333 21.333333 0 0 1-21.333334-21.333333v-11.52a115.626667 115.626667 0 0 0-64-100.693334c-7.68-4.266667-14.506667-9.386667-21.333333-14.08z m249.6 355.413333L186.88 134.4a20.48 20.48 0 0 0-29.866667 0l-22.613333 22.613333a20.48 20.48 0 0 0 0 29.866667L554.666667 607.573333v10.666667a183.04 183.04 0 0 0-85.333334-20.906667 161.28 161.28 0 0 0-170.666666 149.333334 161.28 161.28 0 0 0 170.666666 149.333333 161.28 161.28 0 0 0 170.666667-149.333333v-53.76l197.12 196.693333a20.48 20.48 0 0 0 29.866667 0l22.613333-22.613333a20.48 20.48 0 0 0 0-29.866667z"
              p-id="4703"
            ></path>
          </svg>
        )}
        {isplay && (
          <svg
            t="1686748701549"
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5692"
            width="50"
            height="50"
          >
            <path
              d="M789.333333 298.666667a170.666667 170.666667 0 0 1-170.666666-170.666667h-85.333334v416.426667A192 192 0 1 0 618.666667 704V318.506667A256 256 0 0 0 789.333333 384zM426.666667 810.666667a106.666667 106.666667 0 1 1 106.666666-106.666667 106.666667 106.666667 0 0 1-106.666666 106.666667z"
              p-id="5693"
            ></path>
          </svg>
        )}
      </div>
      <div className={styles.title}>
        <AnimatePresence>
          {isplay && (
            <motion.div
              key="title"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 5,
                stiffness: 40,
                restDelta: 0.1,
                duration: 0.3,
              }}
            >
              <div>
                {" "}
                Sviatoslav Richter - The Well-Tempered Clavier, Book
                1：Preludeand Fugue No. 4 in C sharp minor, BWV 849
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isplay && (
            <motion.div
              key="title"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 5,
                stiffness: 40,
                restDelta: 0.1,
                duration: 1.0,
              }}
            >
              <div> welcome Violate &. Violin</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {cover && (
        <div className={styles.cover}>
          <div className={styles.cover_title}>Violate &. Violin</div>
          <div className={styles.cover_tap} onClick={() => setcover(false)}>
            tap to have a wine ！ 🍷
          </div>
        </div>
      )}
    </>
  );
}
