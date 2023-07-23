import http from '../helpers/http';
import React from 'react';
import NavbarPrivateRoute from '../components/NavbarPrivateRoute';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaUnlock, FaListAlt } from "react-icons/fa"
import { BsFillCreditCardFill } from "react-icons/bs"
import { AiTwotoneEdit, AiFillHeart, AiTwotoneSetting, AiFillPlusCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../redux/reducers/auth';
import { MdLogout } from 'react-icons/md'
import { Helmet } from 'react-helmet';
import { Field, Formik } from 'formik';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import moment from 'moment';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


const CreateEvents = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const [profile, setProfile] = React.useState({})
    const [categories, setCategories] = React.useState([])
    const [city, setCity] = React.useState([])
    const [create, setCreate] = React.useState(false)
    const [categoriesValue, setcategoriesValue] = React.useState(null);
    const [LocationValue, setLocationValue] = React.useState(null);
    const [date, setDate] = React.useState(new Date());
    const [selectedPicure, setSelectedPicture] = React.useState();
    const [pictureURI, setPictureURI] = React.useState('')
    const [eventByUser, setEventByUser] = React.useState([])
    const [openModal, setOpenModal] = React.useState(false)



    React.useEffect(() => {
        async function getDataEventByUser() {
            const { data } = await http(token).get('/events/manage?limit=5')
            setEventByUser(data.results)
            // console.log(data)
        }
        getDataEventByUser()
    }, [token])




    React.useEffect(() => {
        async function getDataCity() {
            const { data } = await http(token).get('/citites')
            // console.log(data)
            setCity(data.results)
        }
        getDataCity()
    }, [token])

    React.useEffect(() => {
        async function getDataCategory() {
            const { data } = await http(token).get('/categories')
            // console.log(data)
            setCategories(data.results)
        }
        getDataCategory()
    }, [token])

    React.useEffect(() => {
        async function getDataProfile() {
            const { data } = await http(token).get('/profile')
            // console.log(data)
            setProfile(data.results)
        }
        getDataProfile()

    }, [])

    const doLogout = () => {
        dispatch(logoutAction()),
            navigate('/login')
    }

    const fileToDataUrl = (file) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setPictureURI(reader.result)
        })
        reader.readAsDataURL(file)
    }

    const changePicture = (e) => {
        const file = e.target.files[0]
        setSelectedPicture(file)
        fileToDataUrl(file)
    }

    const deleteEvents = async (id) => {
        try {
            const { data } = await http(token).delete(`/events/manage/${id}`)
            console.log(data)
            setEventByUser(data.results)
        } catch (error) {
            console.log("error", error)
        }

    }

    const createEvent = async values => {
        setOpenModal(true)
        const form = new FormData();
        Object.keys(values).forEach(key => {
            if (values[key] || key === 'descriptions') {
                form.append(key, values[key]);
            }
        });

        if (selectedPicure) {
            form.append('picture', selectedPicure);
        }
        if (date) {
            form.append('date', moment(date).format('YYYY-MM-DD'));
        }
        if (categoriesValue) {
            form.append('categoriesId', categoriesValue);
        }
        if (LocationValue) {
            form.append('cityId', LocationValue);
        }
        const { data } = await http(token).post('/events/manage', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data)
        setCreate(false)
        setOpenModal(false)
        navigate('/createEvents')
    };

    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>Create Events</title>
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
                                        <Link to='/changePassword'>
                                            <div className='flex justify-start items-center gap-5'>
                                                <div><FaUnlock /></div>
                                                <div>Change Password</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <Link className='text-blue-500'>
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
                    <div className='bg-white rounded-3xl mt-[50px] ml-[188px] w-[1024px] h-[925px]'>
                        <div className='flex flex-col gap-10 ml-20 mt-10'>
                            <div className='flex items-center justify-between'>
                                {!create && (
                                    <div>
                                        <div className='flex justify-between'>
                                            <div className='font-semibold text-xl'>Manage Events</div>
                                        </div>
                                    </div>
                                )}
                                {!create && (
                                    <div className='mr-20 bg-blue-500 w-24 h-10 rounded-xl justify-center items-center flex'>
                                        <Link onClick={() => setCreate(true)} className='text-white'>Create</Link>
                                    </div>
                                )}
                            </div>
                            <div className='grid justify-start gap-7'>
                                {!create && eventByUser && eventByUser.map(item => (
                                    <div className='flex' key={item?.id}>
                                        <div className='flex flex-col items-center bg-white shadow-lg shadow-gray-400/30 w-[50px] h-[75px] justify-center rounded-2xl'>
                                            <div className='text-orange-500'>{moment(item?.date).format('DD')}</div>
                                            <div className='opacity-60 text-sm'>{moment(item?.date).format('ddd')}</div>
                                        </div>
                                        <div className='flex flex-col gap-4 ml-[25px]'>
                                            <div className='font-bold text-2xl'>
                                                <div>{item?.title}</div>
                                            </div>
                                            <div className='text-sm font-normal opacity-70'>
                                                <div>{item?.location}</div>
                                                <div>{moment(item?.date).format('ddd, DD MMM YYYY')}</div>
                                            </div>
                                            <div className='flex gap-3 text-red-500'>
                                                <Link>Detail</Link>
                                                <Link>Update</Link>
                                                {/* <Link onClick={() => deleteEvents(item.id)}>Delete</Link> */}
                                                <button onClick={() => window.my_modal_5.showModal()}>Delete</button>
                                                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                    <form method="dialog" className="modal-box">
                                                        <h3 className="font-bold text-lg">Hello!</h3>
                                                        <p className="py-4">Press ESC key or click the button below to close</p>
                                                        <div className="modal-action">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn">Close</button>
                                                        </div>
                                                    </form>
                                                </dialog>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {create && (
                                <div>
                                    <Formik
                                        initialValues={{
                                            title: '',
                                            cityId: '',
                                            categoriesId: '',
                                            desciprions: '',
                                            date: ''
                                        }}
                                        onSubmit={createEvent}>
                                        {({ handleBlur, handleChange, handleSubmit, values }) => (
                                            <>
                                                <div className='font-semibold text-xl mb-10'>Create Events</div>
                                                <form onSubmit={handleSubmit} className='flex  flex-col gap-10'>
                                                    <div className='flex flex-col gap-16 justify-center mr-28'>
                                                        <div className='flex gap-16'>
                                                            <div className='flex flex-col gap-10'>
                                                                <div className='flex flex-col gap-3'>
                                                                    <span>Name</span>
                                                                    <input
                                                                        className="input input-bordered w-[381px]"
                                                                        type="text"
                                                                        placeholder='Input Name Event...'
                                                                        value={values.title}
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        name='title' />
                                                                </div>
                                                                <div className='flex flex-col gap-3'>
                                                                    <span>Location</span>
                                                                    <select
                                                                        className="select select-primary text-black"
                                                                        name="cityId"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        value={values.cityId}>
                                                                        {city.map((item) => {
                                                                            return (
                                                                                <option key={item.id} value={item.id}>
                                                                                    {item?.name}
                                                                                </option>
                                                                            )
                                                                        })}
                                                                    </select>
                                                                </div>
                                                                <div className='flex flex-col gap-3 form-control'>
                                                                    <span>Category</span>
                                                                    <select
                                                                        className="select select-primary text-black"
                                                                        name="categoriesId"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        value={values.categoriesId}>
                                                                        {categories.map(item => (
                                                                            <>
                                                                                <option key={item.id} value={item.id}>
                                                                                    {item.name}
                                                                                </option>
                                                                            </>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className='flex flex-col gap-10'>
                                                                <div className='flex flex-col gap-3'>
                                                                    <span>Date Time Show</span>
                                                                    <input
                                                                        className="input input-bordered w-[381px]"
                                                                        type="date"
                                                                        placeholder='Input Name Event...'
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.date} />
                                                                    {values.date && (
                                                                        <span>
                                                                            {moment(values.date).format('D MMMM YYYY')}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className='flex flex-col gap-3'>
                                                                    <span>Images</span>
                                                                    <input
                                                                        className="justify-center items-center"
                                                                        type="file"
                                                                        name='picture'
                                                                        onChange={changePicture}
                                                                    />
                                                                </div>
                                                                <div className='w-[380px] h-[180px] border-gray-900 border-2 flex justify-center items-center rounded-lg' >
                                                                    {selectedPicure ? (<img src={pictureURI} alt="events" className='w-[370px] h-[170px] rounded-lg bg-cover' />) : (
                                                                        <span className='font-bold text-red-500'>No Images</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="w-full h-100 border-primary text-black font-normal">
                                                                <Field name="descriptions">
                                                                    {({ field, form }) => (
                                                                        <CKEditor
                                                                            editor={ClassicEditor}
                                                                            config={{
                                                                                toolbar: {
                                                                                    items: [
                                                                                        'bold',
                                                                                        'italic',
                                                                                        'undo',
                                                                                        'redo',
                                                                                    ],
                                                                                },
                                                                            }}
                                                                            data={field.value}
                                                                            onChange={(event, editor) => {
                                                                                const data = editor.getData();
                                                                                form.setFieldValue(field.name, data);
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-cente mr-28'>
                                                        <button className='btn btn-primary w-full text-white normal-case'>Create</button>
                                                    </div>
                                                </form  >

                                            </>
                                        )}
                                    </Formik>
                                </div>
                            )}
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
            </div>
        </>
    )
}
export default CreateEvents