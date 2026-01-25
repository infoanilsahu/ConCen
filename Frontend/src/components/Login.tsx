import { useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { pushData } from "../Redux/UserData";
import { useDispatch } from "react-redux";


interface error {
    isError: boolean;
    errorMessage: string;
}

export default function Login() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [error, setError] = useState<error>({
        isError: false,
        errorMessage: ""
    })

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleLogin = async (e: React.FormEvent) => {
         e.preventDefault();
        try {
            setIsLogin(true)
            if(email.length == 0 || password.length == 0){
                setError({
                    isError: true,
                    errorMessage: "Email and password required"
                })

                return ;
            }
            const res = await axios.post(`${apiUrl}/api/v1/auth/login`,{email, password}, {withCredentials: true})
            console.log(res);
            
            if(res.status === 200) {
                dispatch(pushData({email: res.data?.data?.email, username: res.data?.data?.username}))
                navigate("/home")
            }
            
        } catch (error: any) {
            console.log(error);
            setError({
                isError: true,
                errorMessage: error.message
            })
        } finally {
            setIsLogin(false)
        }
    }

    
    return (
        <>
        <div className="login text-black md:text-xl flex items-center justify-center h-dvh ">
            <div className="container felx flex-col w-[90%] lg:w-[40%] bg-[#f9f9f9] rounded-xl drop-shadow-black p-10 ">
                <div className="heading flex justify-center">
                    <div className="text font-bold text-2xl">Login</div>
                </div>
                <div className="from ">
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <div className="input flex flex-col gap-4">
                            <div className="email flex flex-col gap-2">
                                <label htmlFor="email">Email : </label>
                                <input type="text" value={email} onChange={(e) => setEmail(e.currentTarget.value)} className="outline-1 rounded-md p-1.5 px-3"/>
                            </div>
                            <div className="password flex flex-col gap-2">
                                <label htmlFor="password">Password : </label>
                                <input type="text" value={password} onChange={(e) => setPassword(e.currentTarget.value)} className="outline-1 rounded-md p-1.5 px-3"/>
                            </div>
                        </div>
                        <div className="submit">
                            <button disabled={isLogin} type="submit" className={`${isLogin ? "bg-[#323232]": "bg-[#171717] cursor-pointer"} text-white p-2 w-full rounded-md font-medium hover:bg-[#1f1f1f] disabled:cursor-none `}>
                                {isLogin ? (<span>Wait</span>) :(<span>Login</span>)}
                            </button>
                        </div>
                    </form>
                </div>
                {error?.isError && (
                    <div className="text-red-600">{error.errorMessage}</div>
                )}

                <div className="register md:text-lg flex justify-center gap-1 mt-4 ">
                    <span>Don't have an account yet? </span>
                    <span className="font-medium hover:underline cursor-pointer "><Link to="/register">Sign in</Link></span>
                </div>
            </div>
        </div>
        </>
    )
}