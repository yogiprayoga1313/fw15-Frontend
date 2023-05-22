import { Helmet } from "react-helmet"
import Navbar from "../components/Navbar"
import Footer from "../components/footer"
import { useLocation } from "react-router-dom"

function Payment() {
    const state = useLocation()
    console.log(state)

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
            <Navbar />

            {/* Detail payment */}

            <div>
                {state?.eventName}
                {console.log(state)}
                {state?.eventId}
                {state?.sectionName}
            </div>


            <div className=" bg-primary/10">
                <div className="flex justify-center items-center font-poppins ">
                    <div className="flex justify-center items-center w-[1126px] h-[915px] bg-white mt-[50px] rounded-2xl ">
                        <div className="flex gap-20">
                            <div className="flex flex-col gap-10">
                                <div>
                                    <div>
                                        <div>
                                            {state?.eventName}
                                            {console.log(state)}
                                            {state?.eventId}
                                            {state?.sectionName}
                                        </div>
                                    </div>
                                </div>
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