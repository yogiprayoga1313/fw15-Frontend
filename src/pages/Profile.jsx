import { Link } from "react-router-dom"
import { Helmet } from "react-helmet";
import LogoWetick from "../Asset/Wetick-logo.png"
import LogoHumanProfil from "../Asset/new-animation.png"
import React from "react";
import http from "../helpers/http";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaUnlock } from "react-icons/fa"
import { BsFillCreditCardFill } from "react-icons/bs"
import { AiTwotoneEdit } from 'react-icons/ai'


const ProfilePage = () => {
    const navigate = useNavigate()
    const [token, setToken] = React.useState('')
    const [intitToken, setInitToken] = React.useState(false)
    const [profile, setProfile] = React.useState({})
    const [activeTabProfile, setActiveTabProfile] = React.useState('Edit Profile')
    const [profileEdit, setProfileEdit] = React.useState({})
    const EditProfile = ['Edit Profile','Change Password','My Booking','My Wishlist','Setting','Logout']


    React.useEffect(() => {
        if (window.localStorage.getItem('token')) {
            setToken(window.localStorage.getItem('token'))
        }
        setInitToken(true)
    }, [])
    const doLogout = () => {
        window.localStorage.removeItem('token')
        navigate('/login')
    }

    React.useEffect(() => {
        if (intitToken) {
            if (!token) {
                navigate('/login', { state: { warningMessage: 'You have to login first' } })
            }
        }
    }, [token, intitToken, navigate])

    React.useEffect(() => {
        async function getDataProfile() {
            const { data } = await http(token).get('/profile')
            console.log(data)
            setProfile(data.results)
        }
        getDataProfile()

    }, [token])
    return (
        <>
            <div>
                {/* Navbar */}
                <nav className='font-poppins'>
                    <div className='flex justify-between px-12 my-[15px]'>
                        <div className='flex justify-center items-center'>
                            <img src={LogoWetick} alt="" />
                        </div>
                        <div className='flex gap-12 justify-center items-center font-semibold'>
                            <div><Link to='/'>Home</Link></div>
                            <div><Link>Create Event</Link></div>
                            <div><Link>Location</Link></div>
                        </div>
                        {token ?
                            <div className="text-black flex justify-center items-center gap-9">
                                <div className="flex justify-center items-center gap-3">
                                    <div className="border-2 border-indigo-600 rounded-full p-[4px]">
                                        <Link to='/profile'><img className="w-[44px] h-[44px] rounded-3xl" src={`http://localhost:8888/uploads/${profile?.picture}`} /></Link>
                                    </div>
                                    <div className="text-xl font-semibold"><Link to='/profile'>{profile?.fullName}</Link></div>
                                </div>
                                <button onClick={doLogout} className="btn btn-primary normal-case text-white">Log Out</button>
                            </div> :
                            <div className="flex justify-center items-center gap-5">
                                <Link className="btn btn-ghost normal-case text-black w-[169px] " to='/Login'>Log In</Link>
                                <Link className="btn btn-primary normal-case text-white w-[169px] " to='/Login'>Sign Up</Link>
                            </div>}
                    </div>
                </nav>
            </div>

            {/* data profile */}
            <div className='flex bg-primary/20 '>
                <div className='font-poppins ml-[70px] mt-[50px]'>
                    <div>
                        <div className='flex flex-col gap-5'>
                            {token ?
                                <div>
                                    <div >
                                        <div className='flex gap-4'>
                                            <Link><img className="w-[44px] h-[44px] rounded-3xl" src={`http://localhost:8888/uploads/${profile?.picture}`} alt="" /></Link>
                                            <div>
                                                <div className='text-sm font-semibold'>{profile?.fullName}</div>
                                                <div className='text-xs'>{profile?.profession},{profile?.nationality}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div> : <div></div>}
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-4 justify-start items-center'>
                                    <div><FaUserCircle /></div>
                                    <div><Link>Profile</Link></div>
                                </div>
                                <div className='ml-[43px] flex flex-col gap-2'>
                                    <Link>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div><BsFillCreditCardFill /></div>
                                            <div>Card</div>
                                        </div>
                                    </Link>
                                    <Link>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div><AiTwotoneEdit /></div>
                                            <div>Edit Profile</div>
                                        </div>
                                    </Link>
                                    <Link>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div><FaUnlock /></div>
                                            <div>Change Password</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-md mt-[50px] ml-[58px]'>
                    <div>
                        <div>Profile</div>
                        <div className='flex justify-start items-center gap-20'>
                            <div>Name</div>
                            <form>
                                <input type="text" placeholder={profile?.fullName} className="input input-bordered w-full max-w-xs" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ProfilePage;
