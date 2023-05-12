import http from '../helpers/http';
import React from 'react';
import LogoWetick from "../Asset/Wetick-logo.png"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaUnlock, FaListAlt } from "react-icons/fa"
import { BsFillCreditCardFill } from "react-icons/bs"
import { AiTwotoneEdit, AiFillHeart, AiTwotoneSetting } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../redux/reducers/auth';
import moment from 'moment';
import { MdLogout } from 'react-icons/md'


const ProfilePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const [profile, setProfile] = React.useState({})
    const [activeTabProfile, setActiveTabProfile] = React.useState('Edit Profile')
    const [profileEdit, setProfileEdit] = React.useState({})
    const EditProfile = ['Edit Profile', 'Change Password', 'My Booking', 'My Wishlist', 'Setting', 'Logout']


    React.useEffect(() => {
        async function getDataProfile() {
            const { data } = await http(token).get('/profile')
            console.log(data)
            setProfile(data.results)
        }
        getDataProfile()

    }, [])

    const doLogout = () => {
        dispatch(logoutAction()),
            navigate('/login')
    }

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

                            </div> :
                            <div className="flex justify-center items-center gap-5">
                                <Link className="btn btn-ghost normal-case text-black w-[169px] " to='/Login'>Log In</Link>
                                <Link className="btn btn-primary normal-case text-white w-[169px] " to='/Login'>Sign Up</Link>
                            </div>}
                    </div>
                </nav>
            </div>

            {/* data profile */}
            <div className='flex bg-primary/20 font-poppins '>
                <div className='font-poppins ml-[90px] mt-[50px]'>
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
                            <div className='flex flex-col gap-10 font-semibold'>
                                <div className='flex gap-5 justify-start items-center'>
                                    <div><FaUserCircle /></div>
                                    <div><Link>Profile</Link></div>
                                </div>
                                <div className='ml-[43px] flex flex-col gap-7 '>
                                    <Link>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div><BsFillCreditCardFill /></div>
                                            <div>Card</div>
                                        </div>
                                    </Link>
                                    <Link className='text-blue-500'>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div><AiTwotoneEdit /></div>
                                            <div>Edit Profile</div>
                                        </div>
                                    </Link>
                                    <Link to='/changePassword'>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div><FaUnlock /></div>
                                            <div>Change Password</div>
                                        </div>
                                    </Link>
                                </div>
                                <Link to='/myBooking'>
                                    <div className='flex justify-start items-center gap-5'>
                                        <div><FaListAlt /></div>
                                        <div>My Booking</div>
                                    </div>
                                </Link>
                                <Link>
                                    <div className='flex justify-start items-center gap-5'>
                                        <div><AiFillHeart /></div>
                                        <div>My Wishlist</div>
                                    </div>
                                </Link>
                                <Link>
                                    <div className='flex justify-start items-center gap-5'>
                                        <div><AiTwotoneSetting /></div>
                                        <div>Settings</div>
                                    </div>
                                </Link>
                                <Link>
                                    <div className='flex justify-start items-center gap-5'>
                                        <div onClick={doLogout}><MdLogout color='red' /></div>
                                        <div className='text-red-500' onClick={doLogout}>Logout</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-xl mt-[50px] ml-[188px] w-[1024px] h-[825px]'>
                    <div className='flex flex-col gap- ml-20 mt-14'>
                        <div className='font-semibold text-xl'>Profile</div>
                        <form className='flex  flex-col gap-10'>
                            <div className='flex justify-start items-center'>
                                <div>Name</div>
                                <form className='ml-[107px]'>
                                    <input type="text" placeholder={profile?.fullName} className="input input-bordered w-full max-w-xs" />
                                </form>
                            </div>
                            <div className='flex justify-start items-center'>
                                <div>Username</div>
                                <form className=' ml-[63px]'>
                                    <input type="text" placeholder={profile?.username} className="input  w-full max-w-xs" />
                                </form>
                            </div>
                            <div className='flex justify-start items-center'>
                                <div>Email</div>
                                <form className=' ml-[95px]'>
                                    <input type="text" placeholder={profile?.email} className="input  w-full max-w-xs" />
                                </form>
                            </div>
                            <div className='flex justify-start items-center '>
                                <div>Phone Number</div>
                                <form className=' ml-[20px]'>
                                    <input type="text" placeholder={profile?.phoneNumber} className="input  w-full max-w-xs" />
                                </form>
                            </div>
                            <div className='flex justify-start items-center '>
                                <div>Gender</div>
                            </div>
                            <div className='flex justify-start items-center'>
                                <div>Profession</div>
                                <option className=' ml-[72px] opacity-50' value={profile?.profession}>{profile?.profession}</option>
                            </div>
                            <div className='flex justify-start items-center'>
                                <div>Nationality</div>
                                <option className=' ml-[67px] opacity-50' value={profile?.nationality}>{profile?.nationality}</option>
                            </div>
                            <div className='flex justify-start items-center'>
                                <div>Birth Date</div>
                                <div className='ml-[73px] opacity-50 '>{moment(profile?.birthDate).format('DD / MM / YYYY')}</div>
                            </div>
                            <div>
                                <button className='btn btn-primary normal-case w-[315px] h-[61px] text-white text-xl'>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ProfilePage;
