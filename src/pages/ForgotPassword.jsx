import { Helmet } from "react-helmet"
import { Link, useNavigate } from "react-router-dom"
// import Login from "./Login"
import NewLogo from "../Asset/NEWLOGO-Copy.png"
import LogoHumanProfil from "../Asset/new-animation.png"
// import { setErrorMessage } from "../redux/reducers/auth"
import React from "react"
import http from "../helpers/http"
// import { useState, useEffect } from "react"


const ForgotPassword = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = React.useState('')
    const [successMessage, setSuccessMessage] = React.useState('')

    const doForgot = async (event) => {
        event.preventDefault()
        setErrorMessage('')
        try {
            const { value: email } = event.target.email
            const body = new URLSearchParams({ email }).toString()
            const { data } = await http().post('/auth/forgotPassword', body)
            console.log(data)
            setSuccessMessage(data.message)
            setTimeout(() => {
                setSuccessMessage('')
            }, 1000)
            setTimeout(() => {
                navigate('/resetPassword')
            }, 2000)
        } catch (error) {
            const message = error?.response?.data?.message
            setErrorMessage(message)
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
                    <div>
                        <form onSubmit={doForgot} className="flex-col flex gap-3">
                            {errorMessage && <div className='alert alert-error'>{errorMessage}</div>}
                            {successMessage && <div className='alert alert-success'>{successMessage}</div>}
                            <div>
                                <input
                                    type="text"
                                    placeholder="email"
                                    className="input input-bordered w-full max-w-xs"
                                    name="email"
                                />
                            </div>
                            <div className="mt-5">
                                <button type="submit" className="btn normal-case btn-primary btn-block text-white">Sand</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )



}


export default ForgotPassword