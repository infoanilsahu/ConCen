import { type RootState } from "../Redux/store.ts"
import { useDispatch, useSelector } from "react-redux"
import user from '../icons/user.svg'
import search from '../icons/search.svg'
import { Link } from "react-router-dom"
import DropdownSelect from "./Drop.tsx"
import { useCallback, useEffect } from "react"
import axios from "axios"
import { pushData } from "../Redux/UserData.ts";

export default function Navbar() {
    const LoginUser = useSelector( (state: RootState) => state.LoginUser.value)
    const UserEmail = useSelector( (state: RootState) => state.UserData.email)
    const UserName = useSelector( (state: RootState) => state.UserData.username)
    const dispatch = useDispatch()
    const apiUrl = import.meta.env.VITE_API_URL

    const handleUser = useCallback(async () => {
        console.log("run1");
        
       try {
        if(!LoginUser) return ;
        const res = await axios.get(`${apiUrl}/api/v1/data/user`,{withCredentials: true})
        if(res.status === 200) dispatch(pushData({email: res.data.data.email, username: res.data.data.username}));
       } catch (error: any) {
        console.log(error);
       } 
    },[])

    useEffect( () => {
        handleUser()
        console.log("run2");
        
    },[])


    return (
        <>
        <div className="container bg-black flex items-center justify-between p-3 px-5 md:px-30 sticky top-0 z-10 ">
            <div className="left">
                <div className="logo text-white font-bold text-2xl cursor-pointer "><Link to="/">ConCen</Link></div>
            </div>
            <div className="right">
                {LoginUser ? (
                    <div className="user flex gap-3 items-center ">
                        <div className="search">
                            <img src={search} width="28px" />
                        </div>
                        <div className="user-icon ">
                            <div className="img  ">
                                <DropdownSelect trigger={
                                    <span className="hover:opacity-85"><img src={user} width="30px" /></span>
                                } username={UserName} email={UserEmail} />
                            </div>
                        </div>  
                    </div>
                ):(
                    <div className="login-link">
                        <div className="login bg-[#e1e1e1] border-2 border-white p-1 px-2 rounded-md font-bold cursor-pointer  ">
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}