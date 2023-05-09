import { Link } from "react-router-dom"
import { Helmet } from "react-helmet";
import LogoWetick from "../Asset/Wetick-logo.png"
import LogoHumanProfil from "../Asset/new-animation.png"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import React from "react";
import http from "../helpers/http";
import { useNavigate, useLocation } from "react-router-dom";


const Login = () => {
    const location = useLocation()
    const navigate = useNavigate() 
    const [errMessage, setErrMessage] = React.useState('')
    const [warningMessage, setWarningMessage] = React.useState(location.state?.warningMessage )
    const [token, setToken] =React.useState('')
    const doLogin = async (event) => {
        event.preventDefault()
        setErrMessage('')
        setWarningMessage('')
        try {
            const { value: email } = event.target.email
            const { value: password } = event.target.password
            const body = new URLSearchParams({ email, password }).toString()
            const { data } = await http().post('http://localhost:8888/auth/login', body)
            window.localStorage.setItem('token', data.results.token)
            setToken(data.results.token)
        } catch (err) {
            const message = err?.response?.data?.message
            if (message) {
                setErrMessage(message)
            }
        }
    }

    React.useEffect(()=>{
        if(token){
            navigate('/')
        }
    },[token, navigate])

    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>Login</title>
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
                    <img src={LogoWetick} alt="" />
                    <div>
                        <form onSubmit={doLogin} className="flex-col flex gap-3">
                            <div className='flex flex-col mb-10 gap-4 w-60'>
                                <div className="font-semibold text-[20px]">Sign In</div>
                                <div className="text-sm">Hi, Welcome back to Urticket! </div>
                            </div>
                            {errMessage && (<div>
                                <div className="alert alert-error danger">{errMessage}</div>
                            </div>)}
                            {warningMessage && (<div>
                                <div className="alert alert-warning danger">{warningMessage}</div>
                            </div>)}
                            <div>
                                <input onFocus={()=>setWarningMessage('') || setErrMessage('')} type="text" placeholder="Email" name="email" className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div>
                                <input onFocus={()=>setWarningMessage('') || setErrMessage('')} type="password" placeholder="Password" name="password" className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div className="flex gap-3 mt-5 justify-end text-sm text-blue-800 font-semibold">
                                <Link to='/ForgotPassword'>Forgot Password?</Link>
                            </div>
                            <div className="mt-5">
                                <button className="btn normal-case btn-primary btn-block text-white">Sign In</button>
                            </div>
                            <div className='flex items-center justify-center mt-12 text-[14px] font-semibold'>
                                <div>or sign in with</div>
                            </div>
                            <div className='flex gap-5 justify-center items-center mt-5'>
                                <button className="btn btn-outline btn-primary w-[95px]" ><FcGoogle size={25} /></button>
                                <button className="btn btn-outline btn-primary w-[95px]"><FaFacebook size={25} /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login