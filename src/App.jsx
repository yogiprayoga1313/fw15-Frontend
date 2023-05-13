import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

// import { VitePluginFonts } from "vite-plugin-fonts"

import Home from "./pages/home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import Events from "./pages/Events"
import Profile from "./pages/Profile"
import ChangePassword from "./pages/ChangePassword"
import MyBooking from "./pages/MyBooking"
import MyWishlist from "./pages/MyWishlist"
import CreateEvents from "./pages/CreateEvents"
import Reservation from "./pages/Reservations"
import Payment from "./pages/Payment"


import { store , persistor} from "./redux/store"
import PrivateRoute from "./components/privateRoute"


function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgotPassword" element={<ForgotPassword />} />
                        <Route path="/events/:id" element={<Events />} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path="/changePassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
                        <Route path="/myBooking" element={<PrivateRoute><MyBooking /></PrivateRoute>} />
                        <Route path="/myWishlist" element={<PrivateRoute><MyWishlist /></PrivateRoute>} />
                        <Route path="/createEvents" element={<PrivateRoute><CreateEvents /></PrivateRoute>} />
                        <Route path="/reservations" element={<PrivateRoute><Reservation /></PrivateRoute>} />
                        <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App