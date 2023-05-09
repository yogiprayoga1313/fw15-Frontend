import http from '../helpers/http';
import React from 'react';
import axios from 'axios';
import LogoWetick from "../Asset/Wetick-logo.png"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate()
    const [token, setToken] = React.useState('')
    const [intitToken, setInitToken] = React.useState(false)
    const [profile, setProfile] = React.useState({})


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
                navigate('/login', {state: {warningMessage: 'You have to login first'}})
            }
        }
    }, [token, intitToken, navigate])

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
        <div>
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
        </div>
        </>
    )
}


export default ProfilePage;
