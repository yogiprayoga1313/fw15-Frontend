import { Helmet } from "react-helmet"
import Navbar from "../components/Navbar"
import Footer from "../components/footer"
import { Link } from "react-router-dom"

const Payment = () => {
    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>Payment</title>
                    <meta name="description" content="Ini adalah deskripsi halaman saya" />
                </Helmet>
            </div>

            {/* Navbar */}
            <Navbar/>

            {/* Detail payment */}

            <div className=" bg-primary/10">
                <div className="flex justify-center items-center font-poppins ">
                    <div className="flex justify-center items-center w-[1126px] h-[915px] bg-white mt-[50px] rounded-2xl ">
                        <div className="flex gap-20">
                            <div className="flex flex-col gap-10">
                                <>

                                </>
                            </div>
                        </div>
                    </div>
                </div>

                {/* footer */}
                <Footer />
            </div>

        </>
    )
}

export default Payment