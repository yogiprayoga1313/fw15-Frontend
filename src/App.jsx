import { BrowserRouter, Routes, Route } from "react-router-dom"
// import { VitePluginFonts } from "vite-plugin-fonts"

import Home from "./pages/home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import Events from "./pages/Events"
import Profile from "./pages/Profile"


function App(){
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/events/:id" element={<Events />}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default App