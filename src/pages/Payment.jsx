import { Helmet } from "react-helmet"
import Footer from "../components/Footer"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Http from "../helpers/http"
import React from "react"
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
import { BsCreditCardFill, BsBank2 } from 'react-icons/bs'
import { IoStorefront } from 'react-icons/io5'
import { FaDollarSign } from 'react-icons/fa'
import creditCard from '../Asset/card-display.png'
import HeaderHome from "../components/HeaderHome"

function Payment() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token)
    const [selectedPayment, setSelectedPayment] = React.useState(null)

    const doPayment = async (e) => {
        e.preventDefault()
        const { reservationId } = state
        const form = new URLSearchParams({
            reservationId,
            paymentMethodId: selectedPayment,
        }).toString()
        const { data } = await Http(token).post('/payment', form)
        // console.log(data)
        if (data) {
            navigate('/myBooking', { replace: true })
        }
    }




    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>Payment</title>
                    <meta name="description" content="Ini adalah deskripsi halaman saya" />
                </Helmet>
            </div>

            {/* Navbar */}
            <HeaderHome />

            {/* Detail payment */}


            <div className=" md:bg-primary/10">
                <div className="flex justify-center items-center font-poppins ">
                    <div className="flex justify-center items-center w-[1126px] h-[915px] bg-white mt-[150px] rounded-2xl ">
                        <div className="flex gap-20">
                            <div className="flex flex-col gap-10">
                                <div>
                                    <div>
                                        <form onSubmit={doPayment} className='container flex flex-col md:flex-row justify-between items-center gap-11 md:items-start bg-white px-7 lg:px-24 py-24 lg:rounded-3xl'>
                                            <div className='w-full h-full flex-1'>
                                                <div className='flex flex-col justify-start gap-12 w-full'>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='text-[20px] text-black font-semibold tracking-[1px] capitalize'>Payment method</div>
                                                    </div>
                                                    <div className='pt-4 flex flex-col gap-7'>
                                                        <div className='flex items-center justify-between gap-2'>
                                                            <div className='w-[10%]'>
                                                                <input type='radio' value='1' onChange={(e) => setSelectedPayment(e.target.value)} name='change-payment' defaultChecked='1' />
                                                            </div>
                                                            <div className='w-[15%]'>
                                                                <div className='flex justify-center items-center w-[45px] h-[45px] rounded-[10px] bg-[#884DFF33]'>
                                                                    <i className='text-[#884DFF]'>
                                                                        <BsCreditCardFill size={25} />
                                                                    </i>
                                                                </div>
                                                            </div>
                                                            <div className='w-[100%] text-sm text-[#373a42] font-semibold tracking-[1px]'>Card</div>
                                                            <div className='w-[20%]'>
                                                                <i className=''>
                                                                    <FiChevronUp size={20} />
                                                                </i>
                                                            </div>
                                                        </div>
                                                        <div className='scrollbar-hide w-full flex justify-end items-center overflow-scroll'>
                                                            <div className='w-[93%] flex items-center justify-start gap-4'>
                                                                <img src={creditCard} alt='' />
                                                                <div className='min-w-[60px] w-[60px] h-[60px] border-dashed border-2 border-[#4c3f91] flex items-center justify-center rounded-2xl text-[#4c3f91] text-[36px]'>
                                                                    <a href='#'>+</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center justify-between gap-2'>
                                                            <div className='w-[10%]'>
                                                                <input type='radio' value='2' onChange={(e) => setSelectedPayment(e.target.value)} name='change-payment' />
                                                            </div>
                                                            <div className='w-[15%]'>
                                                                <div className='flex justify-center items-center w-[45px] h-[45px] rounded-[10px] bg-[#FC105533]'>
                                                                    <i className='text-[#FC1055]'>
                                                                        <BsBank2 size={25} />
                                                                    </i>
                                                                </div>
                                                            </div>
                                                            <div className='w-[100%] text-sm text-[#373a42] font-semibold tracking-[1px] capitalize'>bank transfer</div>
                                                            <div className='w-[20%]'>
                                                                <i className=''>
                                                                    <FiChevronDown size={20} />
                                                                </i>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center justify-between gap-2'>
                                                            <div className='w-[10%]'>
                                                                <input type='radio' value='3' onChange={(e) => setSelectedPayment(e.target.value)} name='change-payment' />
                                                            </div>
                                                            <div className='w-[15%]'>
                                                                <div className='flex justify-center items-center w-[45px] h-[45px] rounded-[10px] bg-[#FF890033]'>
                                                                    <i className='text-[#FF8900]'>
                                                                        <IoStorefront size={25} />
                                                                    </i>
                                                                </div>
                                                            </div>
                                                            <div className='w-[100%] text-sm text-[#373a42] font-semibold tracking-[1px] capitalize'>retail</div>
                                                            <div className='w-[20%]'>
                                                                <i className=''>
                                                                    <FiChevronDown size={20} />
                                                                </i>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center justify-between gap-2'>
                                                            <div className='w-[10%]'>
                                                                <input type='radio' value='4' onChange={(e) => setSelectedPayment(e.target.value)} name='change-payment' />
                                                            </div>
                                                            <div className='w-[15%]'>
                                                                <div className='flex justify-center items-center w-[45px] h-[45px] rounded-[10px] bg-[#3366FF33]'>
                                                                    <i className='text-[#3366FF]'>
                                                                        <FaDollarSign size={25} />
                                                                    </i>
                                                                </div>
                                                            </div>
                                                            <div className='w-[100%] text-sm text-[#373a42] font-semibold tracking-[1px] capitalize'>e-money</div>
                                                            <div className='w-[20%]'>
                                                                <i className=''>
                                                                    <FiChevronDown size={20} />
                                                                </i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mt-11 md:mt-0 flex flex-col flex-1 gap-7 w-full'>
                                                <div className='flex flex-col justify-start gap-12 w-full'>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='text-[20px] text-black font-semibold tracking-[1px] capitalize'>ticket details</div>
                                                    </div>
                                                    <div className='pt-4 flex flex-col gap-3.5'>
                                                        <div className='flex items-center justify-between'>
                                                            <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px]'>Ticket Section</div>
                                                            <div className='text-sm text-[#4c3f91] font-semibold tracking-[0.5px] uppercase'>{state.sectionName}</div>
                                                        </div>
                                                        <div className='flex items-center justify-between'>
                                                            <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px]'>Quantity</div>
                                                            <div className='text-sm text-[#4c3f91] font-semibold tracking-[0.5px]'>{state.quantity}</div>
                                                        </div>
                                                        <div className='flex items-center justify-between'>
                                                            <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px]'>Total Payment</div>
                                                            <div className='text-sm text-[#4c3f91] font-semibold tracking-[0.5px]'>IDR{state.totalPayment}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-full mt-11'>
                                                    <div className='shadow-for-all-button flex items-center justify-center w-full md:w-[315px] h-[55px] rounded-2xl text-white text-base font-semibold tracking-[1px]'>
                                                        <button type='submit' className='h-full w-full flex items-center btn-primary justify-center rounded-xl text-white'>
                                                            Payment
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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

export default Payment