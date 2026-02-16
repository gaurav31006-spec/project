import Home from "./component/home";
import Login from "./component/Login";
import ReelInsights from "./component/ReelInsights";
import Register from "./component/Register";
import {  Routes, Route } from "react-router-dom";
import Update from "./component/update";
function App() {
  return (
    <>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Update />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ReelInsights/>} />

        </Routes>
      {/* </BrowserRouter> */}
    </>

  )
}

export default App;
