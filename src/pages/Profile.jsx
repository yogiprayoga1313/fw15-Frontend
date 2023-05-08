import React from "react"
import axios from "axios"
import moment from "moment/moment"
// import { useParams } from "react-router-dom"
import LogoWetick from "../Asset/Wetick-logo.png"
import { Helmet } from "react-helmet"
import { Link, useParams } from "react-router-dom"


const Profile = () => {
    const [profile, setProfile] = React.useState([])
    const { userId } = useParams();

    React.useEffect(() =>{
        async function getDataProfile() {
            const {data} = await axios.get(`http://localhost:8888/profile/${userId}`)
            console.log(data)
            setProfile(data.results)
        }
        getDataProfile
    },[userId])
    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>Profile</title>
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

            {/* profile detail */}
            <div>
                <div>
                    <div>
                        {profile.map(profile =>{
                            return(
                                <>
                                <div key={profile.id}></div>
                                <img  src={`http://localhost:8888/uploads/${profile.picture}`} alt="" />
                                </>
                            )
                        })}
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default Profile