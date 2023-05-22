import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
// import Login from "./Login"
import NewLogo from "../Asset/NEWLOGO-Copy.png"
import LogoHumanProfil from "../Asset/new-animation.png"
import { setErrorMessage } from "../redux/reducers/auth"
import React from "react"
import http from "../helpers/http"
import { useState, useEffect } from "react"


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await http().post("/auth/forgotPassword", {
                email: email,

            });

            if (response.ok) {
                const data = await response.json();
                setResetCode(data.resetCode);
            } else {
                throw new Error("Error, please try again");
            }
        } catch (error) {
            setErrorMessage(error.message);
            console.error(error);
        }
    }

    return (
        <>

            {/* helmet */}
            <div>
                <Helmet>
                    <title>Forgot Password</title>
                    <meta name="description" content="Ini adalah deskripsi halaman saya" />
                </Helmet>
            </div>
            <div className="flex h-screen justify-center items-center">
                <div className='flex-1 bg-[#748DA6] w-full h-full'>
                    <div className="flex justify-center items-center h-screen">
                        <img src={LogoHumanProfil} alt="" />
                    </div>
                </div>
                <div className="flex-col flex md:mx-36 mx-20 font-poppins">
                    <Link to='/'>
                        <div className="flex justify-start items-center mb-[20px]">
                            <img className="w-[115px] h-[93px]" src={NewLogo} alt="" />
                        </div>
                    </Link>
                    <div className='flex flex-col mb-10 gap-4 w-60'>
                        <div className="font-semibold text-[20px]">Forgot Password</div>
                        <div className="text-sm">You’ll get mail soon on your email</div>
                    </div>
                    <form>
                        <div>
                            <form onSubmit={handleSubmit} className="flex-col flex gap-3">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="email"
                                        className="input input-bordered w-full max-w-xs"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="mt-5">
                                    <Link to="/resetPassword"><button type="submit" className="btn normal-case btn-primary btn-block text-white">Sand</button></Link>
                                </div>
                            </form>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )



}


export default ForgotPassword