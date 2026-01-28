import axios from "axios"
import { useEffect, useState } from "react";
import Cart from "./Cart";
import cross from '../icons/cross.svg'
import arrow from '../icons/arrow.svg'
import { Link } from "react-router-dom";


interface user {
    email: string;
    username: string;
    address: string;
    hobby: string;
}

export default function Search() {
    const [search, setSearch] = useState<string>("")
    const [searchData, setSearchData] = useState<user[]>([])
    const apiUrl = import.meta.env.VITE_API_URL 

    const handleSearch = async () => {
        try {
            if(search.length === 0) {
                setSearchData([])
                return ;
            }
            const res = await axios.post(`${apiUrl}/api/v1/data/search`,{ search },{withCredentials: true})
            
            if (res.status === 200) {
                setSearchData(res.data.data)
            }
            
        } catch (error: any) {
            
        }
    }

    const handleReset = async () => {
        setSearchData([])
        setSearch("")
    }

    useEffect(() => {
        if(search.length === 0) {
            setSearchData([])
        }
        handleSearch()
    }, [search])

    return (
        <>
        <div className="container">
            <div className="nav bg-black p-3 flex items-center gap-3 ">
                <div className="back">
                    <Link to='/home'>
                        <img className="rotate-180" src={arrow} width="30px" />
                    </Link>
                </div>
                <div className="search outline-2 w-full rounded-md text-white flex p-2 items-center mr-4 ">
                    <div className="input w-full">
                        <input type="text w-full" value={search} onChange={(e) => setSearch(e.target.value)} className="outline-none" />
                    </div>
                    <div onClick={() => handleReset()} className="cross cursor-pointer">
                        <img src={cross} width="28px" />
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="all-data flex flex-col md:flex-row flex-wrap">
                    {searchData.map( (e: user, index: number) => {
                        return <div key={index}><Cart username={e.username} email={e.email} address={e.address} hobby={e.hobby} key={index} /></div>
                    } )}
                </div>
            </div>
        </div>
        </>
    )   
}


// authmiddleware chage
// navbar