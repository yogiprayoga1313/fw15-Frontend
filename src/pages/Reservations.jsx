import { Helmet } from "react-helmet"
import Navbar from "../components/Navbar"
import Footer from "../components/footer"
import { Link } from "react-router-dom"
import rsvSection from "../Asset/rsv-section.png"
import { TbArrowsSort } from 'react-icons/tb'

const Reservation = () => {
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
            <Navbar />

            {/* Detail Reservations */}

            <div className=" bg-primary/10">
                <div className="flex justify-center items-center font-poppins ">
                    <div className="flex justify-center items-center w-[1126px] h-[915px] bg-white mt-[50px] rounded-2xl ">
                        <div className="flex gap-20">
                            <div className="flex flex-col gap-10">
                                <div className="flex">
                                    <div>
                                        <img src={rsvSection} alt="" />
                                    </div>
                                    <div className="flex flex-col gap-10">
                                        <div className="flex items-center gap-7">
                                            <div className="font-semibold">Tickets</div>
                                            <div className="flex items-center justify-center gap-5 ml-[190px]">
                                                <div className="text-xs text-red-500">BY PRICE</div>
                                                <div className="bg-white shadow-md shadow-black/20 rounded-xl1 w-[35px] h-[35px] flex justify-center items-center ">
                                                    <TbArrowsSort color="blue" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="bg-white shadow-md shadow-black/20  w-[45px] h-[45px] rounded-xl">
                                                <div></div>
                                            </div>
                                            <div className="flex flex-col gap-5 justify-center">
                                                <div>
                                                    <div className="text-sm font-semibold">SECTION REG, ROW 1</div>
                                                    <div className="text-xs opacity-60">12 Seats available</div>
                                                </div>
                                                <div className="text-sm font-semibold">Quantity</div>
                                            </div>
                                            <div className="flex flex-col justify-end items-end gap-3">
                                                <div>
                                                    <div className="font-semibold">$15</div>
                                                    <div className="text-sm opacity-60">per person</div>
                                                </div>
                                                <div className="flex gap-7 items-center">
                                                    <div className="border border-black/50 rounded-md w-[33px] h-[33px] flex justify-center items-center">
                                                        <div className="opacity-50">-</div>
                                                    </div>
                                                    <div>0</div>
                                                    <div className="border border-black/50 rounded-md w-[33px] h-[33px] flex justify-center items-center">
                                                        <div className="opacity-50">+</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <hr />
                                        </div>
                                        <div className="flex flex-col gap-4 font-semibold">
                                            <div className="flex gap-60">
                                                <div>Ticket Section</div>
                                                <div className="text-blue-500">VIP</div>
                                            </div>
                                            <div className="flex gap-72">
                                                <div>Quantity</div>
                                                <div className="text-blue-500">2</div>
                                            </div>
                                            <div className="flex gap-56">
                                                <div>Total Payment</div>
                                                <div className="text-blue-500">$70</div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <Link to='/payment'><button className=" w-[315px] btn btn-primary normal-case text-white">Checkout</button></Link>
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