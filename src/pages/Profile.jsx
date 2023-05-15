import http from '../helpers/http';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaUnlock, FaListAlt } from "react-icons/fa"
import { BsFillCreditCardFill } from "react-icons/bs"
import { AiTwotoneEdit, AiFillHeart, AiTwotoneSetting, AiFillPlusCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../redux/reducers/auth';
import moment from 'moment';
import { MdLogout } from 'react-icons/md'
import NavbarPrivateRoute from '../components/NavbarPrivateRoute';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet';

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
            {/* helmet */}
            <div>
                <Helmet>
                    <title>Profile</title>
                    <meta name="description" content="Ini adalah deskripsi halaman saya" />
                </Helmet>
            </div>

            <div>
                {/* Navbar */}
                <NavbarPrivateRoute />
            </div>

            {/* data profile */}
            <div className=' bg-primary/10'>
                <div className='flex font-poppins '>
                    <div className='font-poppins ml-[90px] mt-[50px]'>
                        <div>
                            <div className='flex flex-col gap-5'>
                                {token ?
                                    <div>
                                        <div >
                                            <div className='flex gap-4 justify-center items-center'>
                                                <div className='border-2 border-indigo-600 rounded-full p-1'>
                                                    {profile.picture && <img className="w-[44px] h-[44px] rounded-3xl" src={profile.picture.startsWith('https') ? profile?.picture : `http://localhost:8888/uploads/${profile.picture}`} />}
                                                </div>
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
                                    <Link to='/createEvents'>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div><AiFillPlusCircle /></div>
                                            <div>Create Event</div>
                                        </div>
                                    </Link>
                                    <Link to='/myBooking'>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div><FaListAlt /></div>
                                            <div>My Booking</div>
                                        </div>
                                    </Link>
                                    <Link to='/myWishlist'>
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
                    <div className='bg-white rounded-3xl mt-[50px] ml-[188px] w-[1024px] h-[855px]'>
                        <div className='flex flex-col gap- ml-20 mt-14'>
                            <div className='font-semibold text-xl'>Profile</div>
                            <form className='flex gap-32'>
                                <div className='flex flex-col gap-10'>
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
                                    <div className='flex justify-start items-center gap-16'>
                                        <div>Profession</div>
                                        <select className="select select-bordered w-full max-w-xs opacity-60">
                                            <option disabled selected>{profile?.profession}</option>
                                        </select>
                                    </div>
                                    <div className='flex justify-start items-center'>
                                        <div>Nationality</div>
                                        <select className="select select-bordered w-full max-w-xs opacity-60 ml-[60px]">
                                            <option disabled selected>{profile?.nationality}</option>
                                        </select>
                                    </div>
                                    <div className='flex justify-start items-center'>
                                        <div>Birth Date</div>
                                        <div className='ml-[73px] opacity-50 '>{moment(profile?.birthDate).format('DD / MM / YYYY')}</div>
                                    </div>
                                    <div>
                                        <button className='btn btn-primary normal-case w-[315px] h-[61px] text-white text-xl tracking-wider'>Save</button>
                                    </div>
                                </div>
                                <div className=''>
                                    <hr />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex gap-3'>
                                        <div className='border-4 border-indigo-600 rounded-full p-2'>
                                            {profile.picture && <img className='w-[110px] h-[110px] rounded-full' src={profile.picture.startsWith('https') ? profile?.picture : `http://localhost:8888/uploads/${profile.picture}`} />}
                                        </div>
                                    </div>
                                    <div className='mt-[30px]'>
                                        <button className='btn btn-outline btn-info normal-case text-md'>Choose Photo</button>
                                    </div>
                                    <div className='flex flex-col gap-4 text-xs opacity-60'>
                                        <div>Image size: max, 1 MB</div>
                                        <div>Image formats: .JPG, .JPEG</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    )
}


export default ProfilePage;
