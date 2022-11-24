import Image from "next/image";
import {Button} from "@mui/material";
import {useRouter} from "next/router";

export const Navbar = () => {
    const router = useRouter()

    const logout = ()=> {
        localStorage.removeItem("docuser")
        localStorage.removeItem("doctype")
        router.push("/login")
    }

    return (
        <div className="flex flex-row items-center w-full p-[5px] shadow-md">
            <span className="font-bold text-[42px] mx-[15px]">Doc-Ock</span>
            <Image src="/docock.svg" alt="logo" height="70" width="70" />
            <Button
                variant="outlined"
                onClick={logout}
            >
                Log out
            </Button>

        </div>
    )
}
