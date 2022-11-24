import {NextPage} from "next";
import {Navbar} from "../components/Navbar";
import Head from "next/head";
import {UserDashboard} from "../components/UserDashboard";

const Dashboard: NextPage = ()=> {
    return (
        <div className="h-full m-0 flex flex-col fixed">
            <Head>
                <title>Dashboard</title>
            </Head>
            <Navbar />
            <UserDashboard />
        </div>
    )
}

export default Dashboard;