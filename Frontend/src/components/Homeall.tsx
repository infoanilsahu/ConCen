import { useCallback, useEffect, useState } from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import axios from "axios";


interface responce {
    email: string;
    username: string;
    address: string;
    hobby: string;
}

export default function HomeAll() {

    const [userData, setUserData] = useState<string[]>([])

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleData = useCallback(async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/v1/data/home`,{withCredentials: true})
            if (res.status === 200) {
                const usernam = res.data.data.map( (e: responce) => e.username)
                setUserData(usernam)
            }
            
        } catch (error: any) {
            console.log(error);
            
        }
    },[])

    useEffect( () => {
        handleData()
    }, [])



    return (
        <>
        <div className="container">
            <Navbar />
            <div className="main">
                <div className="all-data flex flex-col md:flex-row flex-wrap">
                    {userData.map( (e: string, index: number) => {
                        return <div key={index}><Cart username={e} key={index} /></div>
                    } )}
                </div>
            </div>
        </div>
        </>
    )
}