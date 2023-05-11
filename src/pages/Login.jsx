import { Link } from "react-router-dom"
import { Helmet } from "react-helmet";
import LogoWetick from "../Asset/Wetick-logo.png"
import LogoHumanProfil from "../Asset/new-animation.png"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import React from "react";
import http from "../helpers/http";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from 'yup';
import propTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setErrorMessage } from "../redux/reducers/auth";
import { asyncLoginAction } from "../redux/actions/auth";


const validationSchema = Yup.object({
    email: Yup.string().email('Email is invalid'),
    password: Yup.string().required('Password is invalid')
})

const FormLogin = ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
    const errorMessage = useSelector(state => state.auth.errorMessage)
    const warningMessage = useSelector(state => state.auth.warningMessage)
    return (
        <form onSubmit={handleSubmit} className="flex-col flex gap-3">
            <div className='flex flex-col mb-10 gap-4 w-60'>
                <div className="font-semibold text-[20px]">Sign In</div>
                <div className="text-sm">Hi, Welcome back to Urticket! </div>
            </div>
            {errorMessage &&
                (<div>
                    <div className="alert alert-error danger text-[11px]">{errorMessage}</div>
                </div>)}
            {warningMessage &&
                (<div>
                    <div className="alert alert-warning danger text-[11px]">{warningMessage}</div>
                </div>)}
            <div className="form-control">
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className={`input input-bordered w-full  max-w-xs ${errors.email && touched.email && 'input-error'}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email} />
                {errors.email && touched.email && (<label className="label">
                    <span className="label-text-left text-error text-xs ">{errors.email}</span>
                </label>
                )}
            </div>
            <div className="from-control">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className={`input input-bordered w-full  max-w-xs ${errors.password && touched.password && 'input-error'}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password} />
                {errors.password && touched.password && (
                    <label className="label">
                        <span className="label-text-left text-error text-xs ">{errors.password}</span>
                    </label>
                )}
            </div>
            <div className="flex gap-3 mt-5 justify-end text-sm text-blue-800 font-semibold">
                <Link to='/ForgotPassword'>Forgot Password?</Link>
            </div>
            <div className="mt-5">
                <button disabled={isSubmitting} type="submit" className="btn normal-case btn-primary btn-block text-white">Sign In</button>
            </div>
            <div className='flex items-center justify-center mt-12 text-[14px] font-semibold'>
                <div>or sign in with</div>
            </div>
            <div className='flex gap-5 justify-center items-center mt-5'>
                <button className="btn btn-outline btn-primary w-[95px]" ><FcGoogle size={25} /></button>
                <button className="btn btn-outline btn-primary w-[95px]"><FaFacebook size={25} /></button>
            </div>
        </form>
    )
}

FormLogin.propTypes = {
    values: propTypes.string,
    errors: propTypes.string,
    touched: propTypes.string,
    handleBlur: propTypes.func,
    handleChange: propTypes.func,
    handleSubmit: propTypes.func,
    isSubmitting: propTypes.bool,
}

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const formError = useSelector(state => state.auth.formError)
    // const [warningMessage, setWarningMessage] = React.useState(location.state?.warningMessage)
    // const [errorMessage, setErrorMessage] = React.useState('')

    React.useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token, navigate])

    const doLogin = async (values, { setSubmitting, setErorrs }) => {
        dispatch(clearMessage())
        dispatch(asyncLoginAction(values))
        if (formError.length) {
            setErorrs({
                email: formError.filter(item => item.param === "email")[0].message,
                password: formError.filter(item => item.param === "email")[0].message
            })
        }
        setSubmitting(false) 
    }
    

    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>Login</title>
                    <meta name="description" content="Ini adalah deskripsi halaman saya" />
                </Helmet>
            </div>
            <div className="flex h-screen justify-center items-center">
                <div className='flex-1 bg-[#748DA6] w-full h-full'>
                    <div className="flex justify-center items-center h-screen">
                        <img src={LogoHumanProfil} alt="" />
                    </div>
                </div>
                <div className="flex-col flex md:mx-36 mx-20 font-poppins">
                    <Link to='/'><img src={LogoWetick} alt="" /></Link>
                    <div>
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={doLogin}
                        >
                            {(props) => (
                                <FormLogin {...props} />
                            )}
    
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
    
}


export default Login