import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
// import Login from "./Login"
import LogoWetick from "../Asset/Wetick-logo.png"
import LogoHumanProfil from "../Asset/new-animation.png"


const ForgotPassword = () => {
    return(
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
                    <img src={LogoWetick} alt="" />
                    <div className='flex flex-col mb-10 gap-4 w-60'>
                        <div className="font-semibold text-[20px]">Forgot Password</div>
                        <div className="text-sm">You’ll get mail soon on your email</div>
                    </div>
                    <div>
                        <form className="flex-col flex gap-3">
                            <div>
                                <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                            </div>
                        </form>
                    </div>
                    <div className="mt-5">
                        <button className="btn normal-case btn-primary btn-block text-white">Sand</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword