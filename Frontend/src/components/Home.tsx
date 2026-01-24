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

export default function Home() {

    const [userData, setUserData] = useState<responce[]>([])

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleData = useCallback(async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/v1/data/home-loginuser`,{withCredentials: true})
            if (res.status === 200) {
                setUserData(res.data.data)
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
                    {userData.map( (e: responce, index: number) => {
                        return <div key={index}><Cart username={e.username} email={e.email} address={e.address} hobby={e.hobby} key={index} /></div>
                    } )}
                </div>
            </div>
        </div>
        </>
    )
}