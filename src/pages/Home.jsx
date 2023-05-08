import React from "react"
import axios from "axios"
import moment from "moment/moment"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import LogoWetick from "../Asset/Wetick-logo.png"
import LogoHumanProfil from "../Asset/new-animation.png"
import { FaSearch } from "react-icons/fa"
import { GrLocation } from "react-icons/Gr"
import { AiOutlineArrowRight } from "react-icons/ai"
import { TbPointFilled } from "react-icons/tb"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { AiOutlineMinus } from "react-icons/ai"

const Home = () => {
    const [events, setEvents] = React.useState([])
    const [eventsCategory, setEventCategory] = React.useState([])
    const [Locations, setLocation] = React.useState([])
    const [activeTabCategory, setActiveTabCategory] = React.useState('Festival')
    const [tabEvents, setTabEvents] = React.useState(1)
    const Categories = ['Music', 'Arts', 'Outdoors', 'Workshop', 'Sport', 'Festival', 'Fashion']
    const [partners, setPartners] = React.useState([])
    const [totalPage, setTotalPage] = React.useState()
    React.useEffect(() => {
        async function getDataEvents() {
            const { data } = await axios.get('http://localhost:8888/events?limit=8')
            setEvents(data.results)
        }
        getDataEvents()
    }, [])


    React.useEffect(() => {
        async function getDataLocation() {
            const { data } = await axios.get('http://localhost:8888/citites')
            setLocation(data.results)
        }
        getDataLocation()
    }, [])

    React.useEffect(() => {
        async function getEventscategory() {
            try {
                const { data } = await axios.get(`http://localhost:8888/events?categories=${activeTabCategory}&page=${tabEvents}&limit=3`)
                setTotalPage(data.totalPage)
                setEventCategory(data.results)
            } catch (error) {
                console.error(error);
            }
        }
        getEventscategory();
    }, [activeTabCategory, tabEvents]);

    const handleTabClick = (category) => {
        setActiveTabCategory(category)
        setTabEvents(1)
    };

    const handlePrevPage = () => {
        if (tabEvents > 1) {
            setTabEvents(tabEvents - 1);
        }
    }

    const handleNextPage = () => {
        if ((tabEvents + 1) <= totalPage) {
            setTabEvents(tabEvents + 1);
        }

    };


    React.useEffect(() => {
        async function getPartners() {
            const { data } = await axios.get('http://localhost:8888/partners')
            setPartners(data.results)
        }
        getPartners()
    }, [])


    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>HOME | Event Organizing</title>
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
                    <div className='flex justify-center items-center gap-5'>
                        <button className="btn btn-ghost normal-case text-black w-[169px] "><Link to='/Login'>Log In</Link></button>
                        <button className="btn btn-primary normal-case text-white w-[169px] "><Link to='/SignUp'>Sign Up</Link></button>
                    </div>
                </div>
            </nav>

            {/* iklan */}
            <div className='font-poppins'>
                <div className='flex bg-primary justify-around'>
                    <div className='flex flex-col justify-center items-center my-[200px]'>
                        <div className='text-[64px] w-[554px] h-[192px] font-bold text-white mb-10'>Find events you love with our</div>
                        <div className='bg-white w-[600px] h-[75px] rounded-2xl flex justify-center items-center'>
                            <div className='flex gap-7'>
                                <div className='flex justify-center items-center gap-3'>
                                    <div><FaSearch /></div>
                                    <input className='outline-none' type="text" placeholder='Search events . . .' />
                                </div>
                                <div className='flex justify-center items-center gap-3'>
                                    <div><GrLocation /></div>
                                    <input className='outline-none' type="text" placeholder="Where?" />
                                </div>
                                <div>
                                    <button className='btn btn-secondary'><AiOutlineArrowRight size={20} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-[110px]'>
                        <img src={LogoHumanProfil} />
                    </div>
                </div>
            </div>

            {/* Events */}
            <div>
                <div className='mt-[175px] font-poppins mb-20'>
                    <div className='flex flex-col justify-center items-center gap-7'>
                        <div className='bg-red-200 rounded-2xl w-[150px] h-[30px]'>
                            <div className='flex justify-center items-center gap-4'>
                                <div><AiOutlineMinus size={30} color="red" /></div>
                                <div className='text-red-500 font-medium'>EVENT</div>
                            </div>
                        </div>
                        <div>
                            <div className='text-[36px] font-semibold'>Events For You</div>
                        </div>
                    </div>
                    <div className='flex gap-10 justify-center items-center mt-[50px]'>
                        <div className='flex items-center justify-center rounded-md shadow-md'>
                            <button className='btn btn-base-100'><AiOutlineArrowLeft size={20} /></button>
                        </div>
                        <div className='flex gap-16 justify-center items-center'>
                            <div className='flex flex-col justify-center items-center opacity-50'>
                                <div>13</div>
                                <div>Mon</div>
                            </div>
                            <div className='flex flex-col justify-center items-center opacity-50'>
                                <div>14</div>
                                <div>The</div>
                            </div>
                            <div className='flex flex-col justify-center items-center text-orange-600 w-[50px] h-[75px] rounded-2xl border border-orange-500'>
                                <div>15</div>
                                <div>Wed</div>
                                <div><TbPointFilled size={15} color="orange-800" /></div>
                            </div>
                            <div className='flex flex-col justify-center items-center opacity-50'>
                                <div>16</div>
                                <div>Thu</div>
                            </div>
                            <div className='flex flex-col justify-center items-center opacity-50'>
                                <div>17</div>
                                <div>Fri</div>
                            </div>
                        </div>
                        <div className='bg-blue-600 justify-center items-center flex rounded-md shadow-2xl'>
                            <button className='btn btn-ghost'><AiOutlineArrowRight size={20} color="white" /></button>
                        </div>
                    </div>
                    <div className='flex gap-10 ml-[80px] font-poppins mt-14 overflow-x-scroll overflow-hidden'>
                        {events.map(event => {
                            return (
                                <>
                                    <Link to={`/events/${event.id}`}>
                                        <div className='inline-flex'>
                                            <div className="w-64 rounded-2xl overflow-hidden relative text-white" key={event.id}>
                                                <img className='w-[260px] h-[376px]' src={`http://localhost:8888/uploads/${event.picture}`} />
                                                <div className='absolute bottom-0 bg-gradient-to-t from-black/[0.7] to-black/[0.0] w-full p-8 flex flex-col gap-3'>
                                                    <div>{moment(event.date).format('DD-MM-YYYY')}</div>
                                                    <div className='text-xl font-bold'>{event.title}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Discover Events */}
            <div className='flex justify-center items-center font-poppins text-white mt-[275px]'>
                <div className='bg-blue-600 justify-center items-center w-[80%] rounded-3xl'>
                    <div className='flex justify-center items-center gap-x-28 mt-[74px]'>
                        <div className='grid grid-cols-4 gap-16'>
                            <div className='flex-col flex gap-5'>
                                <div className='flex justify-center items-center  gap-3 bg-slate-100/50 rounded-2xl w-[150px] h-[30px]'>
                                    <div><AiOutlineMinus size={20} color="white" /></div>
                                    <div className='text-whitetext-sm'>LOCATION</div>
                                </div>
                                <div className='w-[180px] h-[192px] text-4xl font-semibold'>
                                    <div>Discover Events Near You</div>
                                </div>
                            </div>
                            {Locations.map(location => {
                                return (
                                    <>
                                        <div className='flex flex-col gap-5 justify-center items-center'>
                                            <div key={location.id}></div>
                                            <img className="w-[230px] h-[140px] rounded-[15px]" src={`http://localhost:8888/uploads/${location.picture}`} alt="" />
                                            <div>{location.name}</div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-[50px] mb-[73px]'>
                        <button className='bg-white btn btn-ghost w-[255px] h-[40px] normal-case text-blue-800'>See All</button>
                    </div>
                </div>
            </div>

            {/* Events By Categories */}

            <div className='mt-[175px] font-poppins'>
                <div>
                    <div className='flex flex-col justify-center items-center gap-10'>
                        <div className='flex bg-red-300/50 w-[160px] h-[30px] justify-center items-center gap-5 rounded-full text-red-800/80 font-semibold text-sm'>
                            <div><AiOutlineMinus size={20} /></div>
                            <div>LOCATION</div>
                        </div>
                        <div className='text-3xl font-bold'>
                            <div>Browse Events By Category</div>
                        </div>
                        <>
                            <div className="flex gap-24">
                                {Categories.map(category => {
                                    return (
                                        <>
                                            <button
                                                key={category}
                                                className={`font-semibold px-4 py-2 hover:border-red-500  hover:text-red-500 ${activeTabCategory === category ? 'flex gap-10 activ border-b-2 border-red-500 text-red-600 ' : 'opacity-60'} px-4 py-2`}
                                                onClick={() => handleTabClick(category)}
                                            >
                                                {category}
                                            </button>

                                        </>
                                    )
                                })}
                            </div>
                            <div>
                                <div className="flex gap-10">
                                    <div className="flex justify-center items-center">
                                        <div>
                                            <button className="btn btn-base-100 shadow-lg shadow-black-500/70" onClick={handlePrevPage}><AiOutlineArrowLeft size={20} color="black" /></button>
                                        </div>
                                    </div>
                                    {eventsCategory.map(event => {
                                        return (
                                            <>
                                                <Link  to={`/events/${event.id}`}>
                                                    <div className='inline-flex'>
                                                        <div className='w-64 rounded-2xl overflow-hidden relative text-white' key={event.id}>
                                                            <img className='w-[260px] h-[376px]' src={`http://localhost:8888/uploads/${event.picture}`} />
                                                            <div className='absolute bottom-0 bg-primary w-full h-[150px] min-h-1 p-8 flex flex-col gap-3'>
                                                                <div>{moment(event.date).format('DD-MM-YYYY')}</div>
                                                                <div className='text-2xl font-bold'>{event.title}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </>
                                        )
                                    })}
                                    <div className="flex justify-center items-center">
                                        <div>
                                            <button className="btn btn-primary shadow-lg shadow-black-500/70" onClick={handleNextPage}><AiOutlineArrowRight size={20} color="white" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </div>

            {/* partners */}
            <div className="mt-[175px]" >
                <div className="justify-center items-center flex bg-[#373A42]">
                    <div className="flex flex-col justify-center items-center font-poppins text-white mt-[75px] gap-7">
                        <div className='bg-white/50 rounded-2xl w-[150px] h-[30px]'>
                            <div className='flex justify-center items-center gap-4'>
                                <div><AiOutlineMinus size={30} color="white" /></div>
                                <div className='text-white font-medium'>EVENT</div>
                            </div>
                        </div>
                        <div className="text-[36px] font-bold">
                            <div>Our Trusted Partners</div>
                        </div>
                        <div className="text-md font-normal">
                            <div>By companies like :</div>
                        </div>
                        <>
                            <div className="flex gap-24 mb-20">
                                {partners.map(partner => {
                                    return (
                                        <>
                                            <div key={partner.id}>
                                                <img src={`http://localhost:8888/uploads/${partner.picture}`} />
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    </div>
                </div>
            </div>

            {/* Footer */}



        </>

    )
}

export default Home