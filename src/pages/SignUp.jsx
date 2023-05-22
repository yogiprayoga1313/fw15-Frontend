import { Link } from "react-router-dom"
import { Helmet } from "react-helmet";
import NewLogo from "../Asset/NEWLOGO-Copy.png"
import LogoHumanProfil from "../Asset/new-animation.png"
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
import React from "react";
import http from "../helpers/http";
import { useNavigate, useLocation } from "react-router-dom";

const SignUp = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [errMessage, setErrMessage] = React.useState('')
    const [warningMessage, setWarningMessage] = React.useState(location.state?.warningMessage)
    const [token, setToken] = React.useState('')
    const [checkedBox, setCheckedBox] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(true);

    const handleCheckBoxChange = (event) => {
        setCheckedBox(event.target.checked);
        setButtonDisabled(!event.target.checked);
    };

    const doSignUp = async (event) => {
        event.preventDefault()
        setErrMessage('')
        setWarningMessage('')
        try {
            const { value: fullName } = event.target.fullName
            const { value: email } = event.target.email
            const { value: password } = event.target.password
            const { value: confirmPassword } = event.target.confirmPassword
            const body = new URLSearchParams({ fullName, email, password, confirmPassword }).toString()

            if (password !== confirmPassword) {
                setErrMessage(errMessage)
            }
            const { data } = await http().post('/auth/register', body)
            console.log(data)
            window.localStorage.setItem('token', data.results.token)
            setToken(data.results.token)
        } catch (err) {
            const message = err?.response?.data?.message
            if (message) {
                setErrMessage(message)
            }
        }
    }

    React.useEffect(() => {
        if (token) {
            navigate('/login')
        }
    }, [token, navigate])
    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>Sign Up</title>
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
                        <div className="font-semibold text-[20px]">Sign Up</div>
                        <div className="text-sm">Already have an account? <span className='text-blue-800 font-semibold'><Link to='/Login'>Log In</Link></span></div>
                    </div>
                    <div>
                        <form onSubmit={doSignUp} className="flex-col flex gap-3">
                            <div>
                                <input onFocus={() => setErrMessage('')} name="fullName" type="text" placeholder="Full Name" className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div>
                                <input onFocus={() => setErrMessage('')} name="email" type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div>
                                <input onFocus={() => setErrMessage('')} name="password" type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div>
                                <input onFocus={() => setErrMessage('')} name="confirmPassword" type="password" placeholder="Confirm Password" className="input input-bordered w-full max-w-xs" />
                            </div>
                            {errMessage && (<div>
                                <div className="alert alert-error danger text-[11px]">{errMessage}</div>
                            </div>)}
                            <div >
                                <label htmlFor="acceptTermsAndConditions" className="flex gap-3 mt-5">
                                    <input
                                        type="checkbox"
                                        id="acceptTermsAndConditions"
                                        name="acceptTermsAndConditions"
                                        checked={checkedBox}
                                        onChange={handleCheckBoxChange}
                                    />
                                    <div className='text-sm w-53'>Accept terms and conditions</div>
                                </label>
                            </div>
                            <div className="mt-5">
                                <button type="submit" disabled={buttonDisabled} className="btn normal-case btn-primary btn-block text-white">Sign Up</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SignUp