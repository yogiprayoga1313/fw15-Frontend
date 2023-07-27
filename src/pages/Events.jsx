import { Helmet } from "react-helmet";
import React from "react"
import http from "../helpers/http";
import moment from "moment/moment"
import { Link, useNavigate, useParams } from 'react-router-dom'
import NewMaps from "../Asset/New-maps-Events.png"
import { SlLocationPin } from "react-icons/sl"
import { FiClock } from "react-icons/fi"
import ScrollToTop from "../components/ScrollToTop";
import { setWarningMessage } from '../redux/reducers/auth'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RiHeartLine, RiHeartFill } from 'react-icons/ri'

const Events = () => {
    const [events, setEvents] = React.useState([])
    const { id } = useParams();
    const [wishlistButton, setWishlistButton] = React.useState(false)
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    React.useEffect(() => {
        async function getDataEvents() {
            const { data } = await http().get(`/events/${id}`)
            setEvents(data.results)
            console.log(data)
        }
        getDataEvents()
    }, [id])

    React.useState(() => {
        const eventId = { eventId: id }
        const qString = new URLSearchParams(eventId).toString()
        const checkWishlist = async () => {
            const { data } = await http(token).get(`/wishlist/check?${qString}`)
            // console.log(data.results)
            const btnStatus = data.results
            if (btnStatus) {
                setWishlistButton(true)
            }
        }
        checkWishlist()
    }, [])

    const addRemoveWishlist = async (event) => {
        event.preventDefault()
        if (!token) {
            dispatch(setWarningMessage('You have to login first'))
            navigate('/auth/login')
        }
        try {
            const eventId = { eventId: events.id }
            const qString = new URLSearchParams(eventId).toString()
            const { data } = await http(token).post('/wishlist', qString)
            console.log(data)
            if (wishlistButton) {
                setWishlistButton(false)
            } else {
                setWishlistButton(true)
            }
        } catch (err) {
            const message = err?.response?.data?.message
            if (message) {
                console.log(message)
            }
        }
    }

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

            <div className="md:bg-primary/10">
                <div className="flex justify-center items-center font-poppins ">
                    <div className="md:flex justify-center items-center w-[1126px] h-[915px] md:bg-white mt-[200px] rounded-2xl ">
                        <div className="md:flex md:gap-20 md:justify-center md:items-center m-5  ">
                            <div className="md:flex flex flex-col gap-10">
                                <>
                                    <div key={events?.id} className="">
                                        <img className="w-[375px] h-[486px] rounded-2xl" src={events?.picture} alt="" />
                                        <div></div>
                                    </div>
                                    <Link>
                                        <div className="md:flex hidden gap-5 justify-center items-center">
                                            <button onClick={addRemoveWishlist}>
                                                {wishlistButton ? (
                                                    <i className='text-red-800'>
                                                        <RiHeartFill size={30} />
                                                    </i>
                                                ) : (
                                                    <i className=''>
                                                        <RiHeartLine size={30} />
                                                    </i>
                                                )}
                                            </button>
                                            <div className="text-xl font-semibold">Add to Wishlist</div>
                                        </div>
                                    </Link>
                                </>
                            </div>
                            <div className="md:flex flex-col flex justify-center">
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