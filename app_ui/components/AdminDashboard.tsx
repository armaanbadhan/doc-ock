import {useEffect, useState} from "react";
import {UploadedFile} from "../public/types";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {FileList} from "./FileList";

export const AdminDashboard = ()=> {

    const [pendingFiles, setPendingFiles] = useState<UploadedFile[]>([])
    const [approvedFiles, setApprovedFiles] = useState<UploadedFile[]>([])

    useEffect(()=> {
        axios({
            method: "GET",
            url: `${process.env.NEXTAUTH_URL}/fetch-admin`
        })
            .then(response => {
                const files = response.data as UploadedFile[]
                let pending: UploadedFile[] = []
                let approved: UploadedFile[] = []
                files.forEach((file) => {
                    if(file.status == 1) {
                        approved.push(file)
                    }
                    else {
                        pending.push(file)
                    }
                })
                setPendingFiles(pending)
                setApprovedFiles(approved)
            })
            .catch(error => {
                console.error(error)
                toast(error.message)
            })
    },[])

    return (
        <div className="p-[20px] overflow-y-auto">
            <div className="text-[20px] font-bold mb-[20px]">Pending Files</div>
            {
                pendingFiles.length > 0 && <FileList admin files={pendingFiles} />
            }
            <div className="text-[20px] font-bold my-[20px]">Approved Files</div>
            {
                approvedFiles.length > 0 && <FileList files={approvedFiles} />
            }
            <ToastContainer position="top-right" />
        </div>
    )
}