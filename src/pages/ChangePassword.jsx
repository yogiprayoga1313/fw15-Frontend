import http from '../helpers/http';
import React from 'react';
import NavbarPrivateRoute from '../components/NavbarPrivateRoute';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaUnlock, FaListAlt } from "react-icons/fa"
import { BsFillCreditCardFill } from "react-icons/bs"
import { AiTwotoneEdit, AiFillHeart, AiTwotoneSetting, AiFillPlusCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../redux/reducers/auth';
import { MdLogout } from 'react-icons/md'
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
// import * as Yup from 'yup';


// const validationSchema = Yup.object({
//     oldPassword: Yup.string().required('Password cannot be emprty'),
//     newPassword: Yup.string().required('Password cannot be emprty'),
//     confirmPassword: Yup.string().required('Password cannot be emprty')

// })

const ChangePassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const [profile, setProfile] = React.useState({})
    const [errMessage, setErrMessage] = React.useState('');

    React.useEffect(() => {
        async function getDataProfile() {
            const { data } = await http(token).get('/profile')
            console.log(data)
            setProfile(data.results)
        }
        getDataProfile()

    }, [token])

    const doLogout = () => {
        dispatch(logoutAction()),
            navigate('/login')
    }

    const doChange = async (values) => {
        try {
            form.append('oldPassword', values.oldPassword);
            form.append('newPassword', values.newPassword);
            form.append('confirmPassword', values.confirmPassword);
            const form = new URLSearchParams()
            const { data } = await http(token).patch('/changePassword', form.toString())
            console.log(data)
        } catch (err) {
            const message = err?.response?.data?.message
            if (message) {
                setErrMessage(message)
            }
        }
    }

    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>Change Password</title>
                    <meta name="description" content="Ini adalah deskripsi halaman saya" />
                </Helmet>
            </div>

            <div>
                {/* Navbar */}
                <NavbarPrivateRoute />
            </div>

            {/* data profile */}
            <div className=' bg-primary/10'>
                <div className='flex font-poppins '>
                    <div className='font-poppins ml-[90px] mt-[50px]'>
                        <div>
                            <div className='flex flex-col gap-5'>
                                {token ?
                                    <div>
                                        <div >
                                            <div className='flex gap-4 justify-start items-center'>
                                                <div className='border-2 border-indigo-600 rounded-full p-1'>
                                                    {profile.picture && <img className="w-[44px] h-[44px] rounded-3xl" src={profile.picture.startsWith('https') ? profile?.picture : `http://localhost:8888/uploads/${profile.picture}`} />}
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
                                        <Link to='/profile'>
                                            <div className='flex justify-start items-center gap-5'>
                                                <div><AiTwotoneEdit /></div>
                                                <div>Edit Profile</div>
                                            </div>
                                        </Link>
                                        <Link className='text-blue-500'>
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
                    <div className='bg-white rounded-3xl mt-[50px] ml-[188px] w-[1024px] h-[825px]'>
                        <div className='flex flex-col gap-10 ml-20 mt-14'>
                            <div className='font-semibold text-xl'>Change Password</div>
                            {errMessage &&
                                (<div>
                                    <div className="alert alert-error danger text-[11px]">{errMessage}</div>
                                </div>)}
                            <Formik
                                initialValues={{
                                    oldPassword: '',
                                    newPassword: '',
                                    confirmPassword: '',
                                }}
                                // validationSchema={validationSchema}
                                onSubmit={doChange}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <form onSubmit={handleSubmit} className='flex  flex-col gap-10'>
                                        <div className='flex justify-start items-center'>
                                            <div>Old Password</div>
                                            <div className='ml-[100px]'>
                                                <input
                                                    type="password"
                                                    placeholder="Input Old Password...."
                                                    className="input input-bordered w-[619px]"
                                                    name='oldPassword'
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.oldPassword} />
                                                {errors.oldPassword && touched.oldPassword && (
                                                    <label className="label">
                                                        <span className="label-text-left text-error text-xs ">{errors.oldPassword}</span>
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex justify-start items-center'>
                                            <div>New Password</div>
                                            <div className='ml-[93px]'>
                                                <input
                                                    type="password"
                                                    placeholder="Input New Password...."
                                                    className="input input-bordered w-[619px]"
                                                    name='newPassword'
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.newPassword} />
                                                {errors.newPassword && touched.newPassword && (
                                                    <label className="label">
                                                        <span className="label-text-left text-error text-xs ">{errors.newPassword}</span>
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex justify-start items-center'>
                                            <div>Confirm Password</div>
                                            <div className='ml-[63px]'>
                                                <input
                                                    type="password"
                                                    placeholder="Input Confirm Password...."
                                                    className="input input-bordered w-[619px]"
                                                    name='confirmPassword'
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.confirmPassword} />
                                                {errors.confirmPassword && touched.confirmPassword && (
                                                    <label className="label">
                                                        <span className="label-text-left text-error text-xs ">{errors.confirmPassword}</span>
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                        <button type='submit' className='btn btn-primary normal-case w-[826px] h-[61px] text-white text-[16px]'>Update</button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>

        </>
    )
}

export default ChangePassword