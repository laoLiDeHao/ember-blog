import CloudText from "../component/cloudText";
import styles from "./page.module.css";

export default function Home() {
  // const getFile = () => {
  //   return new Promise((responce, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.addEventListener(
  //       "progress",
  //       (e) => {
  //         console.log("progress watch");
  //         if (e.lengthComputable) {
  //           const progress = e.loaded / e.total *100;
  //           console.log("upload,percent:", progress+'%');
  //         }
  //       },
  //       false
  //     );

  //     xhr.onreadystatechange = (e) => {
  //       if (xhr.readyState === 4 && xhr.status === 200) {
  //         const response = xhr.responseText;
  //         console.log(response);
  //         responce(response);
  //       }
  //     };

  //     xhr.open(
  //       "GET",
  //       "https://xuhuanqidian-1311574791.cos.ap-beijing.myqcloud.com/modelsource/10001/Hainanzhonglou.fbx",
  //       true
  //     );
  //     xhr.send();
  //   });
  //   // return fetch("http://transfer.xuhuanqidian.com", options)
  //   //   .then((response) =>{ response.json()})
  //   //   .then((data) => res.data.data)
  //   //   .catch((error) => console.error(error));
  // };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get 'beauté' 3D web vision by contact&nbsp;&nbsp;&nbsp;
          <code className={styles.code}>Ember UB</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {"Support "} By
            {/* <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
            {" "}
            <Image
              className={styles.logo}
              src="/next.svg"
              alt="Next.js Logo"
              width={100}
              height={24}
              priority
            /> */}
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.centerinner}>
          <CloudText />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Advs for Item <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            GI Serve <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Gaming <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://wonderful-sky-0c173cc00.3.azurestaticapps.net/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Shader <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
