import { Link } from "react-router-dom"
import React from "react"
import { useSelector } from "react-redux"
import http from "../helpers/http"
import { useDispatch, useNavigate } from "react-redux"
import { logout as logoutAction } from "../redux/reducers/auth"
import { FaUserCircle, FaUnlock, FaListAlt } from "react-icons/fa"
import { BsFillCreditCardFill } from "react-icons/bs"
import { AiTwotoneEdit, AiFillHeart, AiTwotoneSetting, AiFillPlusCircle } from 'react-icons/ai'
import { MdLogout } from 'react-icons/md'

function DataProfileEdit() {
    const navigate = useNavigate()
    const [profile, setProfile] = React.useState({})
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()


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

    return (
        <>
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
        </>

    )
}

export default DataProfileEdit