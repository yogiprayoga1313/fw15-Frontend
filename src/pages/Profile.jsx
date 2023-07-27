import http from '../helpers/http';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaUnlock, FaListAlt } from "react-icons/fa"
import { BsFillCreditCardFill } from "react-icons/bs"
import { AiTwotoneEdit, AiFillHeart, AiTwotoneSetting, AiFillPlusCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../redux/reducers/auth';
import moment from 'moment';
import { MdLogout } from 'react-icons/md'
import NavbarPrivateRoute from '../components/NavbarPrivateRoute';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Field, Formik } from 'formik';
import ScrollToTop from '../components/ScrollToTop';
import defaultProfile from '../Asset/avatar-default.png'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


const ProfilePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const [profile, setProfile] = React.useState({})
    const [editUserName, setEditUserName] = React.useState(false)
    const [editEmail, setEditEmail] = React.useState(false)
    const [editPhoneNumber, setEditPhoneNumber] = React.useState(false)
    const [editBirthDate, setEditBirthDate] = React.useState(false)
    const [selectedPicure, setSelectedPicture] = React.useState(false)
    const [openModal, setOpenModal] = React.useState(false)




    React.useEffect(() => {
        async function getDataProfile() {
            const { data } = await http(token).get('/profile')
            setProfile(data.results)
        }
        getDataProfile()

    }, [])

    const doLogout = () => {
        dispatch(logoutAction()),
            navigate('/login')
    }

    React.useEffect(() => {
        console.log(selectedPicure)
    }, [selectedPicure])

    const editProfile = async (values) => {
        setOpenModal(true)
        const form = new FormData()
        Object.keys(values).forEach((key) => {
            if (values[key]) {
                if (key === "birthDate") {
                    form.append(key, moment(values[key]).format('YYYY/MM/DD'))
                } else {
                    form.append(key, values[key])
                }
            }
        })
        if (selectedPicure) {
            form.append('picture', selectedPicure)
        }
        const { data } = await http(token).patch('/profile', form, {
            headers: {
                'Content-Type': 'multipart/from-data'
            }
        })
        console.log(data)
        setEditBirthDate(false)
        setEditEmail(false)
        setEditPhoneNumber(false)
        setEditUserName(false)
        setProfile(data.results)
        setOpenModal(false)
        setSelectedPicture(false)
        setProfile(data.results)
    }

    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>Profile</title>
                    <meta name="description" content="Ini adalah deskripsi halaman saya" />
                </Helmet>
            </div>

            <div>
                {/* Navbar */}
                <NavbarPrivateRoute />
            </div>

            {/* data profile */}
            <div className=' md:bg-primary/10'>
                <div className='flex font-poppins '>
                    <div className='font-poppins md:ml-[90px] mt-[50px] p-5'>
                        <div>
                            <div className='hidden md:flex flex-col gap-5'>
                                {token ?
                                    <div>
                                        <div >
                                            <div className='flex gap-4 justify-start items-center'>
                                                <div className='border-2 border-indigo-600 rounded-full p-1'>
                                                    <img className='w-[45px] h-[45px] rounded-3xl bg-cover' src={profile?.picture?.startsWith('https') ? profile.picture : (profile?.picture === null ? defaultProfile : `http://${import.meta.env.VITE_BACKEND_URL}/uploads/${profile?.picture}`)} />
                                                </div>
                                                <div>
                                                    <div className='text-sm font-semibold'>{profile?.fullName}</div>
                                                    <div className='text-xs'>{profile?.profession},{profile?.nationality}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : <div></div>}
                                <div className='flex flex-col gap-10 font-semibold'>
                                    <div className='flex gap-5 justify-start items-center'>
                                        <div><FaUserCircle /></div>
                                        <div><Link>Profile</Link></div>
                                    </div>
                                    <div className='ml-[43px] flex flex-col gap-7 '>
                                        <Link>
                                            <div className='flex justify-start items-center gap-5'>
                                                <div><BsFillCreditCardFill /></div>
                                                <div>Card</div>
                                            </div>
                                        </Link>
                                        <Link className='text-blue-500'>
                                            <div className='flex justify-start items-center gap-5'>
                                                <div><AiTwotoneEdit /></div>
                                                <div>Edit Profile</div>
                                            </div>
                                        </Link>
                                        <Link to='/changePassword'>
                                            <div className='flex justify-start items-center gap-5'>
                                                <div><FaUnlock /></div>
                                                <div>Change Password</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <Link to='/createEvents'>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div><AiFillPlusCircle /></div>
                                            <div>Create Event</div>
                                        </div>
                                    </Link>
                                    <Link to='/myBooking'>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div><FaListAlt /></div>
                                            <div>My Booking</div>
                                        </div>
                                    </Link>
                                    <Link to='/myWishlist'>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div><AiFillHeart /></div>
                                            <div>My Wishlist</div>
                                        </div>
                                    </Link>
                                    <Link>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div><AiTwotoneSetting /></div>
                                            <div>Settings</div>
                                        </div>
                                    </Link>
                                    <Link>
                                        <div className='flex justify-start items-center gap-5'>
                                            <div onClick={doLogout}><MdLogout color='red' /></div>
                                            <div className='text-red-500' onClick={doLogout}>Logout</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:bg-white md:rounded-3xl mt-[50px] md:ml-[188px] md:w-[1024px] md:h-[900px]'>
                        <div className='flex flex-col justify-center items-center gap-10 md:ml-20 md:mt-14'>
                            <div className='font-semibold text-xl'>Profile</div>
                            <Formik
                                initialValues={{
                                    fullName: profile?.fullName,
                                    userName: profile?.userName,
                                    email: profile?.email,
                                    phoneNumber: profile?.phoneNumber,
                                    nationality: profile?.nationality,
                                    profession: profile?.profession,
                                    gender: profile?.gender ? "1" : "0" ,
                                    birthDate: profile?.birthDate

                                }}
                                onSubmit={editProfile}
                                enableReinitialize
                            >
                                {({ handleSubmit, handleChange, handleBlur, values }) => (
                                    <form onSubmit={handleSubmit} className='md:flex md:gap-32'>
                                        <div className='flex flex-col gap-10'>
                                            <div className='md:flex justify-start items-center'>
                                                <div>Name</div>
                                                <div className='md:ml-[107px]'>
                                                    <input
                                                        name="fullName"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.fullName}
                                                        type="text"
                                                        placeholder={profile?.fullName}
                                                        className="input input-bordered w-full max-w-xs opacity-50" />
                                                </div>
                                            </div>
                                            <div className='md:flex justify-start items-center'>
                                                <div>Username</div>
                                                <div className='flex gap-2 md:ml-[72px]'>
                                                    <div>
                                                        {!editUserName && <span className='opacity-50'>{profile?.userName === null ? <span className='text-red-500'>Not Set</span> : profile?.userName}</span>}
                                                        {editUserName && <input name='userName' onChange={handleChange} onBlur={handleBlur} value={values.userName} type="text" className="input input-bordered w-full max-w-xs" />}
                                                    </div>
                                                    {!editUserName && <div>
                                                        <button onClick={() => setEditUserName(true)} className='font-semibold text-blue-700'>Edit</button>
                                                    </div>}
                                                </div>
                                            </div>
                                            <div className='md:flex justify-start items-center'>
                                                <div>Email</div>
                                                <div className='flex gap-2 md:ml-[110px]'>
                                                    <div>
                                                        {!editEmail && <span className='opacity-50'>{profile?.email === null ? <span className='text-red-500'>Not Set</span> : profile?.email}</span>}
                                                        {editEmail && <input name='email' type="email" onChange={handleChange} onBlur={handleBlur} value={values.email} className="input input-bordered w-full max-w-xs" />}
                                                    </div>
                                                    {!editEmail && <div>
                                                        <button onClick={() => setEditEmail(true)} className='font-semibold text-blue-700'>Edit</button>
                                                    </div>}
                                                </div>
                                            </div>
                                            <div className='md:flex justify-start items-center '>
                                                <div>Phone Number</div>
                                                <div className='flex gap-2 md:ml-[34px]'>
                                                    <div>
                                                        {!editPhoneNumber && <span className='opacity-50 '>{profile?.phoneNumber === null ? <span className='text-red-500 '>Not Set</span> : profile?.phoneNumber}</span>}
                                                        {editPhoneNumber && <input name='phoneNumber' onChange={handleChange} onBlur={handleBlur} value={values.phoneNumber} type="text" className="input input-bordered w-full max-w-xs" />}
                                                    </div>
                                                    {!editPhoneNumber && <div>
                                                        <button onClick={() => setEditPhoneNumber(true)} className='font-semibold text-blue-700'>Edit</button>
                                                    </div>}
                                                </div>
                                            </div>
                                            <div className='md:flex justify-start items-center'>
                                                <div>Gender</div>
                                                <div className='md:ml-[96px] flex gap-5'>
                                                    <label className='flex gap-2'>
                                                        <Field name='gender'  value="0" type="radio" className='radio radio-primary'/>
                                                        <span>Male</span>
                                                    </label>
                                                    <label className='flex gap-2'>
                                                        <Field name='gender' value="1" type="radio" className='radio radio-primary' />
                                                        <span>Famel</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='md:flex justify-start items-center gap-16'>
                                                <div>Profession</div>
                                                <select name='profession' value={values.profession} onChange={handleChange} onBlur={handleBlur} className="ml-[5px] select select-bordered w-full max-w-xs opacity-60">
                                                    <option className='hidden' >Select Profession</option>
                                                    <option>Developers</option>
                                                    <option>Freelance</option>
                                                    <option>Backend</option>
                                                </select>
                                            </div>
                                            <div className='md:flex justify-start items-center'>
                                                <div>Nationality</div>
                                                <select name='nationality' value={values.nationality} onChange={handleChange} onBlur={handleBlur} className="select select-bordered w-full max-w-xs opacity-60 md:ml-[63px]">
                                                    <option className='hidden' >Select Nationality</option>
                                                    <option>Indonesia</option>
                                                    <option>USA</option>
                                                    <option>Russia</option>
                                                </select>
                                            </div>
                                            <div className='md:flex justify-start items-center '>
                                                <div>Birth Date</div>
                                                <div className='flex gap-2 md:ml-[73px]'>
                                                    <div>
                                                        {!editBirthDate && <span className='opacity-50 '>{profile?.birthDate === null ? <span className='text-red-500'>Not Set</span> : moment(profile?.birthDate).format('YYYY/MM/DD')}</span>}
                                                        {editBirthDate && <input name='birthDate' onChange={handleChange} onBlur={handleBlur} value={values.birthDate} type="date" className="input input-bordered w-full max-w-xs" />}
                                                    </div>
                                                    {!editBirthDate && <div>
                                                        <button onClick={() => setEditBirthDate(true)} className='font-semibold text-blue-700'>Edit</button>
                                                    </div>}
                                                </div>
                                            </div>
                                            <div>
                                                <button type='submit' className='btn btn-primary normal-case w-[315px] h-[61px] text-white text-xl tracking-wider'>Save</button>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <hr />
                                        </div>
                                        <div className='md:flex flex-col gap-4'>
                                            <div>
                                                <div className='flex gap-3'>
                                                    <div className='border-4 border-indigo-600 rounded-full p-2'>
                                                        <img className='w-[110px] h-[110px] bg-cover rounded-full' src={profile?.picture?.startsWith('https') ? profile.picture : (profile?.picture === null ? defaultProfile : `http://${import.meta.env.VITE_BACKEND_URL}/uploads/${profile?.picture}`)} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className='mt-[30px] btn btn-primary normal-case text-white'>
                                                        <span>Choose Photo</span>
                                                        <input name='picture'  type="file" className='hidden' />
                                                    </label>
                                                </div>
                                            </div>  
                                            <div className='flex flex-col gap-4 text-xs opacity-60'>
                                                <div>Image size: max, 1 MB</div>
                                                <div>Image formats: .JPG, .JPEG</div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                <input type="checkbox" id="loading" className="modal-toggle" checked={openModal} />
                <div className="modal">
                    <div className="modal-box bg-transparent shadow-none">
                        <div className='justify-center flex '>
                            <AiOutlineLoading3Quarters className='animate-spin ' color='white' size={60} />
                        </div>
                    </div>
                </div>


                {/* Footer */}
                <Footer />
                <ScrollToTop />
            </div>
        </>
    )
}


export default ProfilePage;
