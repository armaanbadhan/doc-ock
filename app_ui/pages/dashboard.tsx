import {NextPage} from "next";
import {Navbar} from "../components/Navbar";
import Head from "next/head";
import {UserDashboard} from "../components/UserDashboard";
import {useEffect, useState} from "react";
import {router} from "next/client";
import {AdminDashboard} from "../components/AdminDashboard";

const Dashboard: NextPage = ()=> {

    const [username,setUsername] = useState<string>("")
    const [type, setType] = useState<string>("user")
    useEffect(()=>{
        setUsername(localStorage.getItem("docuser") || "")
        setType(localStorage.getItem("doctype") || "user")
    },[])

    return (
        <div className="h-full m-0 flex flex-col fixed">
            <Head>
                <title>Dashboard</title>
            </Head>
            <Navbar />
            {
                type === "user" ? (
                    <UserDashboard username={username} />
                ) : (
                    <AdminDashboard username={username} />
                )
            }
        </div>
    )
}

export default Dashboard;