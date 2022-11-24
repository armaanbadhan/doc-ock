import Image from "next/image";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import {useState} from "react";
import {LogoutDialog} from "./LogoutDialog";

export const Navbar = () => {
    const router = useRouter()
    const [logoutOpen, setLogoutOpen] = useState(false)

    return (
        <div className="flex flex-row items-center w-full p-[5px] shadow-md">
            <span className="font-bold text-[42px] mx-[15px]">Doc-Ock</span>
            <Image src="/docock.svg" alt="logo" height="70" width="70" />
            <Button
                variant="outlined"
                onClick={() => setLogoutOpen(true)}
                style={{
                    marginLeft: "auto",
                    fontSize: "20px",
                    marginRight: "10px"
                }}
            >
                Log out
            </Button>
            <LogoutDialog open={logoutOpen} onClose={() => setLogoutOpen(false)} />
        </div>
    )
}
