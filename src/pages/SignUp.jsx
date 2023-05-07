import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
// import Login from "./Login"
import LogoWetick from "../Asset/Wetick-logo.png"
import LogoHumanProfil from "../Asset/new-animation.png"

const SignUp = () => {
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
                    <img src={LogoWetick} alt="" />
                    <div className='flex flex-col mb-10 gap-4 w-60'>
                        <div className="font-semibold text-[20px]">Sign Up</div>
                        <div className="text-sm">Already have an account? <span className='text-blue-800 font-semibold'><Link to='/Login'>Log In</Link></span></div>
                    </div>
                    <div>
                        <form className="flex-col flex gap-3">
                            <div>
                                <input type="text" placeholder="Full Name" className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div>
                                <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div>
                                <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div>
                                <input type="password" placeholder="Confirm Password" className="input input-bordered w-full max-w-xs" />
                            </div>
                        </form>
                    </div>
                    <div className="flex gap-3 mt-5">
                        <input type="checkbox" name="" id="" />
                        <div className='text-sm w-52'>Accept terms and condition</div>
                    </div>
                    <div className="mt-5">
                        <button className="btn normal-case btn-primary btn-block text-white">Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp