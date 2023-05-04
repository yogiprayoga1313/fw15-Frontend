import { Link } from "react-router-dom"
import LogoWetick from "../Asset/Wetick-logo.png"
import LogoHumanProfil from "../Asset/new-animation.png"
// import BackgroundImg1 from "../Asset/background-img-1.png"
import { FaSearch } from "react-icons/fa"
import { GrLocation } from "react-icons/Gr"
import { AiOutlineArrowRight } from "react-icons/ai"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { AiOutlineMinus } from "react-icons/ai"

const Home = () => {
    return (
        <>
            {/* Navbar */}
            <nav className='font-poppins'>
                <div className='flex justify-between px-12'>
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
                        <button className="btn btn-primary normal-case text-white w-[169px] "><Link to='/Login'>Sign Up</Link></button>
                    </div>
                </div>
            </nav>

            {/* iklan */}
            <div className='font-poppins'>
                <div className='flex bg-primary justify-around'>
                    <div className='flex flex-col justify-center items-center my-[200px]'>
                        <div className='text-[64px] w-[554px] h-[192px] font-bold text-white'>Find events you love with our</div>
                        <div className='bg-white w-[600px] h-[75px] rounded-2xl flex justify-center items-center'>
                            <div className='flex gap-7'>
                                <div className='flex justify-center items-center gap-3'>
                                    <div><FaSearch /></div>
                                    <input className='outline-none' type="text" placeholder='Search events..' />
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
                <div className='mt-[175px]'>
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
                        <div>
                            <div><AiOutlineArrowLeft /></div>
                        </div>
                        <div>
                            <div>13</div>
                            <div>Mon</div>
                        </div>
                        <div>
                            <div>14</div>
                            <div>The</div>
                        </div>
                        <div>
                            <div>15</div>
                            <div>Wed</div>
                        </div>
                        <div>
                            <div>16</div>
                            <div>Thu</div>
                        </div>
                        <div>
                            <div>17</div>
                            <div>Fri</div>
                        </div>
                        <div><AiOutlineArrowRight /></div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default Home