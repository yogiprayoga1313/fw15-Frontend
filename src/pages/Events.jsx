import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import React from "react"
import axios from "axios"
import moment from "moment/moment"
import { useParams } from 'react-router-dom'
import LogoWetick from "../Asset/Wetick-logo.png"
import { SlLocationPin } from "react-icons/sl"
import {FiClock} from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import http from "../helpers/http";
 
const Events = () => {
    const [events, setEvents] = React.useState([])
    const { id } = useParams();
    const navigate = useNavigate()
    const [token, setToken] = React.useState('')
    const [intitToken, setInitToken] = React.useState(false)
    const [profile, setProfile] = React.useState({})


    React.useEffect(() => {
        async function getDataEvents() {
            const { data } = await axios.get(`http://localhost:8888/events/${id}`)
            setEvents(data.results)
        }
        getDataEvents()
    }, [id])


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
                navigate(`/events/${id}`)
            }
        }
    }, [token, intitToken, navigate, id])

    React.useEffect(() => {
        async function getDataProfile() {
            const { data } = await http(token).get('/profile')
            console.log(data)
            setProfile(data.results)
        }
        getDataProfile()

    },[token])
    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>Events</title>
                    <meta name="description" content="Ini adalah deskripsi halaman saya" />
                </Helmet>
            </div>

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

            {/* Detail events */}

            <div className="flex justify-center items-center bg-primary/30 font-poppins ">
                <div className="flex justify-center items-center w-[1126px] h-[915px] bg-white mt-[50px] rounded-2xl ">
                    <div className="flex gap-20">
                        <div className="flex flex-col gap-10">
                            <>
                                <div key={events?.id} className="">
                                    <img className="w-[375px] h-[486px] rounded-2xl" src={`http://localhost:8888/uploads/${events?.picture}`} alt="" />
                                    <div></div>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="text-xl font-semibold">Add to Wishlist</div>
                                </div>
                            </>
                        </div>
                        <div className="flex flex-col gap-7">
                            <>
                                <div key={events?.id}></div>
                                <div className="text-3xl font-bold">{events?.title}</div>
                                <div className="flex gap-10">
                                    <div>
                                        <div className="flex justify-center items-center gap-1"><SlLocationPin size={15} color="red" />{events?.cityName}</div>
                                    </div>
                                    <div>
                                        <div className="flex justify-center items-center gap-1"><FiClock color="red" size={15}/>{moment(events?.date).format('dddd, DD MMMM YYYY')}</div>
                                    </div>
                                </div>
                                <div>Attendees</div>
                                <hr />
                                <div className="flex flex-col gap-2">
                                    <div className="text-md font-semibold">Event Detail</div>
                                    <div>{events?.descriptions}</div>
                                </div>
                                <div>
                                    <div className="text-md font-semibold">Location</div>
                                </div>
                                <div>
                                    <button className="btn btn-primary normal-case text-[16px] font-semibold w-[315px] h-[55px] text-white">Buy Tickets</button>
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Events