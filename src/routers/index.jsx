import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import About from "../pages/about/about";
import Pages from "../pages";
import PrintAds from "../pages/print-ads";
import Gaming from "../pages/Gaming";
import PointCrush from "../projects-dev/point-crush";
import Particals1 from "../projects-dev/particals1";
import { useEffect } from "react";
import Homepage2 from "../projects-dev/homepage2";

function AppRoute() {
  const resizeListener = () => {
    // 定义设计图的尺寸 3840
    let designSize = 1080;
    // 获取 html 元素
    let html = document.documentElement;
    // 定义窗口的宽度
    let clientW = html.clientWidth;
    // let clienH = html.clientHight;
    // html 的fontsize 大小
    let htmlRem = (clientW * 10) / designSize;
    html.style.fontSize = htmlRem + "px";
    // console.log(clientW);
    console.log("change,html", html.style.fontSize);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeListener);
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>

        {/* shows */}
        <Route path="/printAds" element={<PrintAds />}></Route>
        <Route path="/Gaming" element={<Gaming />}></Route>
        <Route path="/PointCrush" element={<PointCrush />}></Route>
        <Route path="/Particals1" element={<Particals1 />}></Route>

        {/* blog2.0 */}
        <Route path="/Homepage2" element={<Homepage2 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;

// function Inits() {
//   return (<div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         welcome my blog Edit with Reactjs
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
//   </div>)
// }
