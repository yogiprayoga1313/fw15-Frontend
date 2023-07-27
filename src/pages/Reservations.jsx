import { Helmet } from "react-helmet"
import Footer from "../components/Footer"
import {  useNavigate, useParams } from "react-router-dom"
import rsvSection from "../Asset/rsv-section.png"
import React from "react"
import http from "../helpers/http"
import { useSelector } from "react-redux"
import { FiPlus, FiMinus } from "react-icons/fi"
import fillOne from "../Asset/Fill-ungu.png"
import { BiSort } from "react-icons/bi";
import HeaderHome from "../components/HeaderHome"

const Reservation = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [sections, setSections] = React.useState([])
    const [err, setErr] = React.useState('')
    const [fillSection, setFillSection] = React.useState({
        id: 0,
        quantity: 0
    })
    const token = useSelector(state => state.auth.token)

    const increment = (id) => {
        if (fillSection.quantity === 10) {
            setErr('')
        } else {
            setFillSection({
                id,
                quantity: fillSection.quantity + 1
            })
        }

    }

    const decrement = (id) => {
        if (fillSection.quantity === 0) {
            setErr('')
        } else {
            setFillSection({
                id,
                quantity: fillSection.quantity - 1
            })
        }

    }

    React.useEffect(() => {
        const getSection = async () => {
            const { data } = await http(token).get('/section')
            setSections(data.results)
        }
        getSection()
    }, [token])

    const selectedSection = fillSection && sections.filter(item => item.id === fillSection.id)[0]

    const doReservation = async () => {
        try {
            const form = new URLSearchParams({
                eventId: id,
                sectionId: fillSection.id,
                quantity: fillSection.quantity
            }).toString()
            const { data } = await http(token).post('/reservations', form)
            // console.log(data)
            navigate('/payment', {
                state:
                {
                    id,
                    eventName: data.results.events.title,
                    reservationId: data.results.id,
                    sectionName: data.results.sectionName,
                    quantity: data.results.quantity,
                    totalPayment: data.results.totalPrice
                }
            })
        } catch (error) {
            console.log('Error', error)
        }
    }
    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>Reservations</title>
                    <meta name="description" content="Ini adalah deskripsi halaman saya" />
                </Helmet>
            </div>

            {/* Navbar */}
            <HeaderHome />

            {/* Detail Reservations */}

            <div className=" md:bg-primary/10">
                <div className="flex justify-center items-center font-poppins ">
                    <div className="flex justify-center items-center w-[1126px] h-[915px] bg-white mt-[50px] rounded-2xl ">
                        <div className="flex gap-20">
                            <div className="flex flex-col gap-10">
                                <div className="md:flex p-10">
                                    <div>
                                        <img src={rsvSection} alt="" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-semibold">Tickets</div>
                                            </div>
                                            <div className="flex gap-3 justify-center items-center">
                                                <div className="font-semibold text-sm text-red-500">BY PRICE</div>
                                                <div>
                                                    <button className="btn btn-primary/20 drop-shadow-xl">
                                                        <BiSort size={20} color="blue" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <>
                                                    <div className="flex flex-col gap-5 mt-[50px]">{sections.map(item => {
                                                        return (
                                                            <React.Fragment key={item.id}>
                                                                <div className="flex gap-10 ">
                                                                    <div className="flex gap-4">
                                                                        <div className="bg-gray-400 w-10 h-10 rounded-md flex items-center justify-center">
                                                                            <img src={fillOne} alt="" />
                                                                        </div>
                                                                        <div className="flex flex-col gap-9">
                                                                            <div>
                                                                                <div className="text-sm font-semibold">{item.name}</div>
                                                                                <div className="text-xs opacity-50">Seats available</div>
                                                                            </div>
                                                                            <div className="text-sm font-semibold ">Quantity</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col justify-center items-end gap-3">
                                                                        <div className="flex flex-col justify-end items-end">
                                                                            <div className="text-sm font-semibold">{item?.price}</div>
                                                                            <div className="text-sm opacity-30">per person</div>
                                                                        </div>
                                                                        <div className="flex gap-2 justify-center items-center">
                                                                            <button className="btn btn-primary/30" onClick={() => decrement(item.id)}>
                                                                                <FiMinus size={10} />
                                                                            </button>
                                                                            <div>
                                                                                <div>{err}</div>
                                                                            </div>
                                                                            <div>{item.id === fillSection.id ? fillSection.quantity : 0}</div>
                                                                            <button className="btn btn-primary/30" onClick={() => increment(item.id)}>
                                                                                <FiPlus size={10} />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                        <div className="mt-10">
                                                            <hr />
                                                        </div>
                                                        <div className="mt-10 gap-3 flex flex-col">
                                                            <div className="flex justify-between">
                                                                <div className="flex text-md font-semibold">
                                                                    <div>Ticket Section</div>
                                                                </div>
                                                                <div className="font-semibold">
                                                                    <div className="text-blue-700">{(selectedSection?.name) || "-"}</div>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <div className="flex font-semibold">
                                                                    <div>Quantity</div>
                                                                </div>
                                                                <div className="font-semibold">
                                                                    <div className="text-blue-700">{fillSection?.quantity}</div>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <div className="flex font-semibold">
                                                                    <div>Total Payment</div>
                                                                </div>
                                                                <div className="font-semibold">
                                                                    <div className="text-blue-700">IDR {(selectedSection?.price * fillSection?.quantity || "0")}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-[30px] drop-shadow-xl">
                                                            <button onClick={doReservation} className=" w-[315px] btn btn-primary normal-case text-white">Checkout</button>
                                                        </div>
                                                    </div>
                                                </>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* footer */}
                <Footer />
            </div>
        </>
    )
}

export default Reservation