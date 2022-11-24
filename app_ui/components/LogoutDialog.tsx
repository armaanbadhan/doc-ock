import {Button, Dialog, DialogContent, DialogProps} from "@mui/material";
import Lottie from "react-lottie-player";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import logoutAnim from "../public/assets/logout.json"

export const LogoutDialog = ({open,onClose}: DialogProps)=>{
    const router = useRouter()

    const handleLogout = ()=>{
        localStorage.removeItem("docuser")
        localStorage.removeItem("doctype")
        // @ts-ignore
        onClose()
        router.push("/")
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogContent className="rounded-[30px]">
                <div className="flex flex-row items-center sm:flex-col">
                    <div className="text-[30px] font-bold flex-auto sm:text-center sm:text-[25px]">
                        Are you sure you want to logout?
                    </div>
                    <Lottie
                        play
                        loop
                        animationData={logoutAnim}
                    />
                </div>
                <div className="flex flex-row justify-evenly w-[100%] mt-[20px]">
                    <Button
                        onClick={handleLogout}
                        style={{fontSize : "20px"}}
                        variant="outlined"
                    >
                        Yes
                    </Button>
                    <Button
                        onClick={() => {
                            // @ts-ignore
                            onClose()
                        }}
                        style={{fontSize : "20px"}}
                        variant="outlined"
                    >
                        No
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}