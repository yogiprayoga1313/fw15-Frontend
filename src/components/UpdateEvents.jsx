// import { View, Text } from 'react-native'
import React from 'react'
import { Field, Formik } from 'formik'
import moment from 'moment'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Http from '../helpers/http'

const UpdateEvents = () => {
    // const [update, setUpdate] = React.useEffect(false)
    const {id} = useParams()
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const [categories, setCategories] = React.useState([])
    const [city, setCity] = React.useState([])
    const [categoriesValue, setcategoriesValue] = React.useState(null);
    const [LocationValue, setLocationValue] = React.useState(null);
    const [date, setDate] = React.useState(new Date());
    const [selectedPicure, setSelectedPicture] = React.useState();
    const [pictureURI, setPictureURI] = React.useState('')
    const [eventByUser, setEventByUser] = React.useState([])


    React.useEffect(() => {
        async function getDataCity() {
            const { data } = await Http(token).get('/citites')
            // console.log(data)
            setCity(data.results)
        }
        getDataCity()
    }, [token])

    React.useEffect(() => {
        async function getDataCategory() {
            const { data } = await Http(token).get('/categories')
            // console.log(data)
            setCategories(data.results)
        }
        getDataCategory()
    }, [token])

    React.useEffect(() => {
        async function getDataEventByUser() {
            const { data } = await Http(token).get(`/events/manage/${id}`)
            setEventByUser(data.results)
            // console.log(data)
        }
        getDataEventByUser()
    }, [token, id])

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

    const updateEvents = async values => {
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
        const { data } = await Http(token).post(`/events/manage/${id}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data)
        setLocationValue('')
        setcategoriesValue('')
        setDate(false)
        navigate('/createEvents')
    };
    return (
        <div>
            <div className='flex flex-col gap-10 ml-20 mt-10'>
                {/* <div className='flex items-center justify-between'>
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
                </div> */}
                {/* <div className='grid justify-start gap-7'>
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
                                    <Link onClick={() => deleteEvents(item.id)}>Delete</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
                <div>
                    <Formik
                        initialValues={{
                            title: eventByUser.title,
                            cityId: eventByUser.cityId,
                            categoriesId:eventByUser.categoriesId,
                            descriptions: eventByUser.descriptions,
                            date: eventByUser.date
                        }}
                        onSubmit={updateEvents}>
                        {({ handleBlur, handleChange, handleSubmit, values }) => (
                            <>
                                <div className='font-semibold text-xl mb-10'>Update Events</div>
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
            </div>
        </div>
    )
}

export default UpdateEvents