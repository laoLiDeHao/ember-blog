import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import About from "../pages/about/about";
import Pages from "../pages";
import PrintAds from "../pages/print-ads";
import Gaming from "../pages/Gaming";
import PointCrush from "../projects-dev/point-crush";
import Particals1 from "../projects-dev/particals1";

function AppRoute() {
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
