import NewLogo from "../Asset/NEWLOGO.png"
import FbLogo from "../Asset/fb-icon.png"
import WaLogo from "../Asset/wa-icon.png"
import IgLogo from "../Asset/ig-icon.png"
import TwtLogo from "../Asset/twt-icon.png"
import { Link } from "react-router-dom"

function Footer() {
    return(
        <>
        <div className="md:mt-[175px] mt-[300px]">
                <div className="font-poppins md:flex p-10 gap-40 justify-center ">
                    <div className="flex flex-col gap-3">
                        <img className="w-[210px] h-[140px]" src={NewLogo} alt="" />
                        <div className="font-semibold">Find events you love with our</div>
                        <div className="flex justify-start items-center gap-5">
                            <Link><img src={FbLogo} /></Link>
                            <Link><img src={WaLogo} /></Link>
                            <Link><img src={IgLogo} /></Link>
                            <Link><img src={TwtLogo} /></Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="font-semibold">Wetick</div>
                        <div className="flex flex-col gap-2 opacity-60">
                            <Link><div>About Us</div></Link>
                            <Link><div>Features</div></Link>
                            <Link><div>Blog</div></Link>
                            <Link><div>Payments</div></Link>
                            <Link><div>Mobile App</div></Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="font-semibold">Features</div>
                        <div className="flex flex-col gap-2 opacity-60">
                            <Link><div>Booking</div></Link>
                            <Link><div>Create Event</div></Link>
                            <Link><div>Discover</div></Link>
                            <Link><div>Register</div></Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="font-semibold">Company</div>
                        <div className="flex flex-col gap-2 opacity-60">
                            <Link><div>Partnership</div></Link>
                            <Link><div>Help</div></Link>
                            <Link><div>Terms of Service</div></Link>
                            <Link><div>Privacy Policy</div></Link>
                            <Link><div>Sitemap</div></Link>
                        </div>
                    </div>
                </div>
                <div className="p-10 md:ml-[430px] md:mt-[75px] md:pb-[100px]">
                    <div className="font-bold text-xl">© 2020 Wetick All Rights Reserved</div>
                </div>
            </div>
        </>
    )
}

export default Footer