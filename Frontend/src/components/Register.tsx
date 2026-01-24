import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";


interface error {
    isError: boolean;
    errorMassage: string;
}



export default function Register() {
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [hobby, setHobby] = useState<string>("")
    const [isRegister, setIsRegister] = useState<boolean>(false)
    const [error, setError] = useState<error>({
        isError: false,
        errorMassage: ""
    })


    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsRegister(true)
            if(!email.length || !username.length || !password.length || !address.length || !hobby.length) {
                setError({
                    isError: true,
                    errorMassage: "Please fill all data"
                })
                return ;
            }


            const res = await axios.post(`${apiUrl}/api/v1/auth/register`,{
                email,
                username,
                password,
                address,
                hobby
            },{withCredentials: true})
            if(res.status === 200) {
                const login = await axios.post(`${apiUrl}/api/v1/auth/login`,{email, password},{withCredentials: true})
                if(login.status === 200) {
                    return navigate("/home")
                }
            }
        } catch (error: any) {
            
        } finally {
            setIsRegister(false)
        }
    }


    return (
        <>
        <div className="Register text-black md:text-xl flex items-center justify-center h-dvh ">
            <div className="container felx flex-col w-[90%] lg:w-[40%] bg-[#f9f9f9] rounded-xl drop-shadow-black p-10 ">
                <div className="heading flex justify-center">
                    <div className="text font-bold text-2xl">Register</div>
                </div>
                <div className="from ">
                    <form onSubmit={handleRegister} className="flex flex-col gap-5">
                        <div className="input flex flex-col gap-4">
                            <div className="email flex flex-col gap-2">
                                <label htmlFor="email">Email : </label>
                                <input type="text" value={email} onChange={(e) => setEmail(e.currentTarget.value)} className="outline-1 rounded-md p-1.5 px-3"/>
                            </div>
                            <div className="username flex flex-col gap-2">
                                <label htmlFor="username">Username : </label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.currentTarget.value)} className="outline-1 rounded-md p-1.5 px-3"/>
                            </div>
                            <div className="password flex flex-col gap-2">
                                <label htmlFor="password">Password : </label>
                                <input type="text" value={password} onChange={(e) => setPassword(e.currentTarget.value)} className="outline-1 rounded-md p-1.5 px-3"/>
                            </div>
                            <div className="address flex flex-col gap-2">
                                <label htmlFor="address">Address : </label>
                                <input type="text" value={address} onChange={(e) => setAddress(e.currentTarget.value)} className="outline-1 rounded-md p-1.5 px-3"/>
                            </div>
                            <div className="hobby flex flex-col gap-2">
                                <label htmlFor="hobby">Hobby : </label>
                                <input type="text" value={hobby} onChange={(e) => setHobby(e.currentTarget.value)} className="outline-1 rounded-md p-1.5 px-3"/>
                            </div>
                        </div>
                        <div className="submit">
                            <button disabled={isRegister} type="submit" className={`${isRegister ? "bg-[#323232]": "bg-[#171717] cursor-pointer"} text-white p-2 w-full rounded-md font-medium hover:bg-[#1f1f1f] disabled:cursor-none `}>
                                {isRegister ? (<span>Wait</span>) :(<span>Register</span>)}
                            </button>
                        </div>
                    </form>
                </div>
                {error?.isError && (
                    <div className="text-red-600">{error.errorMassage}</div>
                )}

                <div className="login md:text-lg flex justify-center gap-1 mt-4 ">
                    <span>Already have an account? </span>
                    <span className="font-medium hover:underline cursor-pointer "><Link to="/login">Log in</Link></span>
                </div>
            </div>
        </div>
        </>
    )
}