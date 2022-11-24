import Image from "next/image";

export const Navbar = () => {
    return (
        <div className="flex flex-row items-center w-full p-[5px] shadow-md">
            <span className="font-bold text-[42px] mx-[15px]">Doc-Ock</span>
            <Image src="/docock.svg" alt="logo" height="70" width="70" />
        </div>
    )
}
