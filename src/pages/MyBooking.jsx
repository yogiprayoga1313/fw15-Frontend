import http from '../helpers/http';
import React from 'react';
import NavbarPrivateRoute from '../components/NavbarPrivateRoute';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaUnlock, FaListAlt } from "react-icons/fa"
import { BsFillCreditCardFill } from "react-icons/bs"
import { AiTwotoneEdit, AiFillHeart, AiTwotoneSetting, AiFillPlusCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../redux/reducers/auth';
import { MdLogout } from 'react-icons/md'
import { Helmet } from 'react-helmet';
import moment from 'moment';


const MyBooking = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const [profile, setProfile] = React.useState({})
    const [booking, setBooking] = React.useState([])


    React.useEffect(() => {
        async function getDataBooking() {
            const { data } = await http(token).get('/history?sortBy=DESC')
            console.log(data)
            setBooking(data.results)
        }
        getDataBooking()
    }, [token])

    React.useEffect(() => {
        async function getDataProfile() {
            const { data } = await http(token).get('/profile')
            console.log(data)
            setProfile(data.results)
        }
        getDataProfile()

    }, [token])

    const doLogout = () => {
        dispatch(logoutAction()),
            navigate('/login')
    }
    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>My Booking</title>
                    <meta name="description" content="Ini adalah deskripsi halaman saya" />
                </Helmet>
            </div>
            <div>
                {/* Navbar */}
                <NavbarPrivateRoute />
            </div>


            {/* data profile */}
            <div className='md:bg-primary/10'>
                <div className='flex font-poppins '>
                    <div className='font-poppins md:ml-[90px] mt-[50px]'>
                        <div>
                            <div className='md:flex hidden flex-col gap-5'>
                                {token ?
                                    <div>
                                        <div >
                                            <div className='flex gap-4 justify-start items-center'>
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
                                        <Link to='/profile'>
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
                                    <Link className='text-blue-500'  >
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
                    <div className='bg-white rounded-3xl mt-[50px] md:ml-[188px] p-10 w-[1024px] h-[825px]'>
                        <div className='flex flex-col gap-10 md:ml-20 mt-14'>
                            <div className='font-semibold text-xl'>My Booking</div>
                            <form className='flex  flex-col gap-10'>
                                <div>
                                    <div className='grid justify-start gap-7'>
                                        {booking.map(wishlist => {
                                            return (
                                                <>
                                                    <div className='flex'>
                                                        <div key={wishlist?.id}></div>
                                                        <div className='flex flex-col items-center bg-white shadow-lg shadow-gray-400/30 w-[50px] h-[75px] justify-center rounded-2xl'>
                                                            <div className='text-orange-500'>{moment(wishlist?.date).format('DD')}</div>
                                                            <div className='opacity-60 text-sm'>{moment(wishlist?.date).format('ddd')}</div>
                                                        </div>
                                                        <div className='flex flex-col gap-4 ml-[25px]'>
                                                            <div className='font-bold text-2xl'>
                                                                <div>{wishlist?.title}</div>
                                                            </div>
                                                            <div className='text-sm font-normal opacity-70'>
                                                                <div>{wishlist?.location}</div>
                                                                <div>{moment(wishlist?.date).format('ddd, DD MMM YYYY')}</div>
                                                            </div>
                                                        </div>
                                                        {/* <div className=''>
                                                            <Link><div><AiOutlineHeart size={30} color='blue' /></div></Link>
                                                        </div> */}
                                                    </div>
                                                </>
                                            )
                                        })}
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

export default MyBooking