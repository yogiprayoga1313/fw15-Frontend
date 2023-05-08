import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import React from "react"
import axios from "axios"
import moment from "moment/moment"
import { useParams } from 'react-router-dom'
import LogoWetick from "../Asset/Wetick-logo.png"
import { SlLocationPin } from "react-icons/sl"
import {FiClock} from "react-icons/fi"
 
const Events = () => {
    const [events, setEvents] = React.useState([])
    const { id } = useParams();


    React.useEffect(() => {
        async function getDataEvents() {
            const { data } = await axios.get(`http://localhost:8888/events/${id}`)
            setEvents(data.results)
        }
        getDataEvents()
    }, [id])
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
                                    <div className="bg-gradient-to-t from-black/[0.7] to-black/[0.0] w-full"></div>
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
                                        <div className="flex justify-center items-center gap-1"><FiClock color="red" size={15}/>{moment(events?.date).format('DD-MM-YYYY')}</div>
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