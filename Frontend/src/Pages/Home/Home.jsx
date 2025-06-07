import { useNavigate } from "react-router-dom"
import { GoogleLogin,googleLogout } from "@react-oauth/google";

function Home() {
    const navigate = useNavigate();

    const menuBtnHandler = () => {
        navigate("/menu");
    }

    return (
        <>
            <div className='flex flex-col p-4 flex-1 justify-around'>
                <section>
                    <div>This is the Home page.</div>
                    <p>This page will tell you about our great Digital Restaurant Experience.</p>
                </section>
                
                <section className="flex justify-center">
                    <GoogleLogin
                        onSuccess={(credentialResponse)=>{
                            console.log("Login Successful");
                            console.log("credentialResponse ",credentialResponse)
                        }}
                        onError={(error)=>console.log("Error while Google Logging",error)}
                    />
                </section>

                <section>
                    <p className='p-6'>Currently we are working on our home page, but you can pay a visit to the delicious items on our menu...</p>
                    <button
                        onClick={menuBtnHandler}
                        className='px-3 py-2 font-bold border-2 rounded-full'
                    >
                        Check Our Menu
                    </button>
                </section>

            </div>
        </>
    )
}

export default Home