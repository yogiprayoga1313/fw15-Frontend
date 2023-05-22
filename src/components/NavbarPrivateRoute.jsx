import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import React from "react";
import http from "../helpers/http";
import LogoWetick from "../Asset/Wetick-logo.png"
import defaultProfile from '../Asset/avatar-default.png'
import NewLogo from "../Asset/NEWLOGO.png"

function NavbarPrivateRoute() {
    const [profile, setProfile] = React.useState({})
    const token = useSelector(state => state.auth.token)


    React.useEffect(() => {
        async function getDataProfile() {
            const { data } = await http(token).get('/profile')
            setProfile(data.results)
        }
        getDataProfile()

    }, [])

    return (
        <>
            {/* Navbar */}
            <nav className='font-poppins'>
                <div className='flex justify-between px-12 my-[15px]'>
                    <div className='flex justify-center items-center w-[180px] h-[70px]'>
                        <Link to='/'><img className=" " src={NewLogo} alt="" /></Link>
                    </div>
                    <div className='flex gap-12 justify-center items-center font-semibold'>
                        <div><Link to='/'>Home</Link></div>
                        <div><Link>Create Event</Link></div>
                        <div><Link>Location</Link></div>
                    </div>
                    {token ?
                        <div className="text-black flex justify-center items-center gap-10">
                            <div className="flex justify-center items-center gap-3">
                                <div className="border-2 border-indigo-600 rounded-full p-[4px]">
                                    <Link to='/profile'><img className='w-[44px] h-[44px] rounded-3xl bg-cover' src={profile?.picture?.startsWith('https') ? profile.picture : (profile?.picture === null ? defaultProfile : `http://${import.meta.env.VITE_BACKEND_URL}/uploads/${profile?.picture}`)} /></Link>
                                </div>
                                <div className="text-xl font-semibold"><Link to='/profile'>{profile?.fullName}</Link></div>
                            </div>
                        </div> :
                        <div className="flex justify-center items-center gap-5">
                            <Link className="btn btn-ghost normal-case text-black w-[169px] " to='/Login'>Log In</Link>
                            <Link className="btn btn-primary normal-case text-white w-[169px] " to='/signUp'>Sign Up</Link>
                        </div>}
                </div>
            </nav>
        </>
    )
}

export default NavbarPrivateRoute