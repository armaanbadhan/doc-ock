import {AiFillCheckCircle} from "react-icons/ai";

export const FileCard = () => {
    return (
        <div className="flex flex-col shadow-md rounded-[15px]">
            <img src="/docock.svg" className="h-[150px] w-full object-cover" alt="doc" />
            <div className="flex flex-row p-[10px] w-full items-center">
                <div className="flex-auto">
                    <div className="font-bold text-[15px]">MyAddressProof</div>
                    <div>Address Proof</div>
                </div>
                <AiFillCheckCircle className="text-green-500" size={30}/>
            </div>
        </div>
    )
}