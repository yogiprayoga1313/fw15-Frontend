import logo from '../assets/img/main_logo.png'
import logo_header from '../assets/img/logo tikcet.png'

import { useNavigate } from 'react-router-dom'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import propTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../redux/reducers/auth'

import { asyncForgotPasswordAction } from '../redux/actions/auth'
import { Link} from 'react-router-dom'

const validationSchema = Yup.object({
    email: Yup.string().email('Email is invalid'),
})

const FormForgotPassword = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
}) => {
    const errorMessage = useSelector((state) => state.auth.errorMessage)
    const warningMessage = useSelector((state) => state.auth.warningMessage)
    const succesMessage = useSelector((state) => state.auth.succesMessage)
   
    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-6 w-full px-8'
        >
            <Link to='/'>
                <div>
                    <img src={logo_header} />
                </div>
            </Link>
            <div className='font-bold text-2xl'>Forgot Password</div>
            <div className='flex flex-col gap-2'>
            You’ll get mail soon on your email
            </div>
            {succesMessage && (
                <div>
                    <div className='alert alert-success'>{succesMessage}</div>
                </div>
            )}
            {errorMessage && (
                <div>
                    <div className='alert alert-error'>{errorMessage}</div>
                </div>
            )}
            {warningMessage && (
                <div>
                    <div className='alert alert-warning'>{warningMessage}</div>
                </div>
            )}

            <div className='form-control'>
                <input
                    type='email'
                    name='email'
                    placeholder='email'
                    className={`input w-full input-bordered ${
                        errors.email && touched.email && 'input-error'
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
                {errors.email && touched.email && (<label className='label'>
                    <span className='label-text-alt text-error'>
                        {errors.email}
                    </span>
                </label>
                )}
            </div>
           
            <div>
                <button
                    disabled={isSubmitting}
                    type='submit'
                    className='btn btn-primary text-white w-full'
                >
                    send
                </button>
            </div>
        </form>
    )
}

FormForgotPassword.propTypes = {
    values: propTypes.objectOf(propTypes.string),
    errors: propTypes.objectOf(propTypes.string),
    touched: propTypes.objectOf(propTypes.bool),
    handleChange: propTypes.func,
    handleBlur: propTypes.func,
    handleSubmit: propTypes.func,
    isSubmitting: propTypes.bool,
}
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formError = useSelector((state) => state.auth.formError)
    const succesMessage = useSelector((state) => state.auth.succesMessage)


    React.useEffect(() => {
        if (succesMessage) {
            console.log('test')
            navigate('/ResetPassword')
        }
    }, [succesMessage, navigate])

    const doLogin = async (values, { setSubmitting, setErrors }) => {
        dispatch(clearMessage())
        dispatch(asyncForgotPasswordAction(values))
        if (formError.length) {
            setErrors({
                email: formError.filter((item) => item.param === 'email')[0]
                    .message
            })
        }
        setSubmitting(false)
    }
    return (
        <div className='h-screen flex'>
            <aside className='hidden  md:block bg-[#0E8388] md:w-[70%] md:justify-center md:items-center md:flex'>
                <img src={logo} />
            </aside>
            <div className='flex justify-center md:items-center items-center w-[100%] flex-1'>
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={doLogin}
                >
                    {(props) => <FormForgotPassword {...props} />}
                </Formik>
            </div>
        </div>
    )
}
export default Login
