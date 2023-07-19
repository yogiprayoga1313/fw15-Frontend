import { Helmet } from "react-helmet";
import React from "react"
import http from "../helpers/http";
import moment from "moment/moment"
import { Link, useParams } from 'react-router-dom'
import NewMaps from "../Asset/New-maps-Events.png"
import { SlLocationPin } from "react-icons/sl"
import { FiClock } from "react-icons/fi"
import { AiOutlineHeart } from 'react-icons/ai'
import ScrollToTop from "../components/ScrollToTop";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Events = () => {
    const [events, setEvents] = React.useState([])
    const { id } = useParams();

    

    React.useEffect(() => {
        async function getDataEvents() {
            const { data } = await http().get(`/events/${id}`)
            setEvents(data.results)
            console.log(data)
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
            <Navbar />

            {/* Detail events */}

            <div className=" bg-primary/10">
                <div className="flex justify-center items-center font-poppins ">
                    <div className="flex justify-center items-center w-[1126px] h-[915px] bg-white mt-[50px] rounded-2xl ">
                        <div className="flex gap-20">
                            <div className="flex flex-col gap-10">
                                <>
                                    <div key={events?.id} className="">
                                        <img className="w-[375px] h-[486px] rounded-2xl" src={events?.picture} alt="" />
                                        <div></div>
                                    </div>
                                    <Link>
                                        <div className="flex  gap-5 justify-center items-center">
                                            <div className="opacity-80"><AiOutlineHeart size={30} /></div>
                                            <div className="text-xl font-semibold">Add to Wishlist</div>
                                        </div>
                                    </Link>
                                </>
                            </div>
                            <div className="flex flex-col">
                                <>
                                    <div key={events?.id}></div>
                                    <div className="text-3xl font-bold w-[233px] mb-[30px]">{events?.title}</div>
                                    <div className="flex gap-10 mb-[30px]">
                                        <div>
                                            <div className="flex justify-center items-center gap-1"><SlLocationPin size={15} color="red" />{events?.cityName}</div>
                                        </div>
                                        <div>
                                            <div className="flex justify-center items-center gap-1"><FiClock color="red" size={15} />{moment(events?.date).format('ddd, DD MMM YYYY, HH:mm')}</div>
                                        </div>
                                    </div>
                                    <div className="mb-[30px]" >Attendees</div>
                                    <hr className="mb-[30px]" />
                                    <div className="flex flex-col gap-2 mb-[30px]">
                                        <div className="text-md font-semibold">Event Detail</div>
                                        <div>{events?.descriptions}</div>
                                    </div>
                                    <div className="mb-[30px]">
                                        <div className="text-md font-semibold">Location</div>
                                    </div>
                                    <div className="w-[315px] h-[151px] mb-[30px]">
                                        <img className="rounded-2xl" src={NewMaps} alt="" />
                                    </div>
                                    <div className="mt-[50px]">
                                        <Link to={`/reservations/${id}`}><button className="btn btn-primary normal-case text-[16px] font-semibold w-[315px] h-[55px] text-white">Buy Tickets</button></Link>
                                    </div>
                                </>
                            </div>
                        </div>
                    </div>
                </div>
                {/* footer */}
                <Footer />
                <ScrollToTop />
            </div>
        </>
    )
}

export default Events