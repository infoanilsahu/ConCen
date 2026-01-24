import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import user from '../icons/userB.svg'

interface cartprop {
    username: string;
    email?: string;
    address?: string;
    hobby?: string;
}

export default function Cart({username, email, address, hobby}: cartprop) {
    const userLogin = useSelector((state: RootState) => state.LoginUser.value)

    const User = username[0]?.toUpperCase()+username?.slice(1).toLowerCase()

    return (
        <>
        <div className=" m-4 md:w-75">
            <div className="container bg-[#ffffff]  p-3 rounded-md shadow-lg ">
                <div className="username p-2 flex items-center justify-between mb-3 ">
                    <div className="text-xl font-semibold">{User}</div>
                    <img src={user} width="28px" />
                </div>
                {userLogin && (
                    <div className="lower-data text-[15px]">
                            <div className="email px-2 ">
                                <div className="opacity-70 text-[13px] ">Email: </div>
                                <div className="data">{email}</div>
                            </div>
                            <div className="hobby-address flex gap-3 ">
                                <div className="address p-2 w-[50%] ">
                                    <div className="opacity-70 text-[13px] ">Address : </div>
                                    <div className="data">{address}</div>
                                </div>
                                <div className="hobby p-2 ">
                                    <div className="opacity-70 text-[13px] ">Hobby : </div>
                                    <div className="data">{hobby}</div>
                                </div>
                            </div>
                    </div>
                )}
            </div>
            
        </div>
        </>
    )
}