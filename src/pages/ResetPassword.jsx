import { Helmet } from "react-helmet"
import { Link, useNavigate } from "react-router-dom"
// import Login from "./Login"
import NewLogo from "../Asset/NEWLOGO-Copy.png"
import LogoHumanProfil from "../Asset/new-animation.png"
// import { setErrorMessage } from "../redux/reducers/auth"
import React from "react"
import http from "../helpers/http"
// import { useState, useEffect } from "react"


const ResetPassword = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = React.useState('')
    const [successMessage, setSuccessMessage] = React.useState('')

    const doReset = async (event) => {
        event.preventDefault()
        setErrorMessage('')
        try {
            const { value: code } = event.target.code
            const { value: email } = event.target.email
            const { value: password } = event.target.password
            const { value: confirmPassword } = event.target.confirmPassword
            const body = new URLSearchParams({ code, email, password, confirmPassword }).toString()

            const { data } = await http().post('/auth/resetPassword', body)

            setSuccessMessage(data.message)
            setTimeout(() => {
                setSuccessMessage('')
            }, 1000)
            setTimeout(() => {
                navigate('/login')
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
                    <title>Reset Password</title>
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
                        <div className="font-semibold text-[20px]">Reset Password</div>
                        <div className="text-sm">Update your Password here!</div>
                    </div>
                    <div>
                        <div>
                            <form onSubmit={doReset} className="flex-col flex gap-3">
                                {errorMessage && <div className='alert alert-error'>{errorMessage}</div>}
                                {successMessage && <div className='alert alert-success'>{successMessage}</div>}
                                <div>
                                    <input
                                        type="text"
                                        name='code'
                                        placeholder="code"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="email"
                                        name="email"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        name="password"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        name="confirmPassword"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </div>
                                <div className="mt-5">
                                    <button type="submit" className="btn normal-case btn-primary btn-block text-white">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )



}








export default ResetPassword