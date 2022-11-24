import Head from 'next/head'
import Image from 'next/image'
import {Fade} from "react-awesome-reveal";
import {Button} from "@mui/material";
import {useRouter} from "next/router";

export default function Home() {

    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center top-0 bottom-0 left-0 right-0 absolute overflow-hidden">
            <Head>
                <title>Doc-Ock</title>
                <meta name="description" content="Upload imp docs and get them verified for some reason idk" />
                <link rel="icon" href="/docock.svg" />
            </Head>
            <div className="flex flex-row items-center justify-center">
                <div className="text-[70px] font-bold">
                    <Fade cascade triggerOnce direction="up" duration={100}>
                        Welcome to Doc-Ock
                    </Fade>
                </div>
                <Fade
                    triggerOnce
                    direction="right"
                    delay={900}>
                    <img
                        src="/gudathink.png"
                        className="h-[130px] w-auto animate-bounce delay-1000"
                        alt=""/>
                </Fade>
            </div>
            {
                (
                    <Fade direction="up" delay={1500}>
                        <Button
                            variant="outlined"
                            style={{
                                fontSize : "22px",
                                backgroundColor : "black",
                                color : "turquoise"
                            }}
                            onClick={(e)=>{
                                e.preventDefault()
                                // router.push("/login")
                                router.push("/dashboard")
                            }}>
                            Sign up/login
                        </Button>
                    </Fade>
                )
            }
        </div>
    )
}
