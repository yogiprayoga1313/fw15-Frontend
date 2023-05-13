import http from '../helpers/http';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaUnlock, FaListAlt } from "react-icons/fa"
import { BsFillCreditCardFill } from "react-icons/bs"
import { AiTwotoneEdit, AiFillHeart, AiTwotoneSetting, AiFillPlusCircle, AiOutlineHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../redux/reducers/auth';
import { MdLogout } from 'react-icons/md'
import NavbarPrivateRoute from '../components/NavbarPrivateRoute';
import Footer from '../components/footer';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Helmet } from 'react-helmet';

const MyWishlist = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const [profile, setProfile] = React.useState({})
    const [wishlist, setWishlist] = React.useState([])
    const { eventId } = useParams()

    React.useEffect(() => {
        async function getDataProfile() {
            const { data } = await http(token).get('/profile')
            // console.log(data)
            setProfile(data.results)
        }
        getDataProfile()

    }, [])

    const doLogout = () => {
        dispatch(logoutAction()),
            navigate('/login')
    }

    React.useEffect(() => {
        async function getDataWishlist() {
            const { data } = await http(token).get('/wishlist')
            // console.log(data)
            setWishlist(data.results)
        }
        getDataWishlist()
    }, [token])


    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>My Wishlist</title>
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
                                            <div className='flex gap-4'>
                                            <div className='border-2 border-indigo-600 rounded-full p-1'>
                                                    <Link><img className="w-[44px] h-[44px] rounded-3xl" src={`http://localhost:8888/uploads/${profile?.picture}`} alt="" /></Link>
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
                                    <Link to='/myBooking'>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div><FaListAlt /></div>
                                            <div>My Booking</div>
                                        </div>
                                    </Link>
                                    <Link className='text-blue-500'>
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
                    <div className='bg-white rounded-3xl mt-[50px] ml-[188px] w-[1024px] h-[825px]'>
                        <div className='flex flex-col gap-10 ml-20 mt-14'>
                            <div className='font-semibold text-xl'>My Wishlist</div>
                            <div className='flex  flex-col gap-10'>
                                <div>
                                    <div className='grid justify-start gap-7'>
                                        {wishlist.map(wishlist => {
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
                                                                <div>{wishlist?.cityName}</div>
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    )
}

export default MyWishlist