import {Button, Dialog, DialogContent, DialogProps, DialogTitle} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {documentTypes} from "../public/staticstuff";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import {LoadingDialog} from "./LoadingDialog";
import {ApprovedDialog} from "./ApprovedDialog";
import {PendingDialog} from "./PendingDialog";

export const UploadDialog = ({open, onClose}: DialogProps) => {

    const [file, setFile] = useState<File>()
    const [category, setCategory] = useState(documentTypes[0])
    const [loading, setLoading] = useState(false)
    const [approved, setApproved] = useState(false)
    const [pending, setPending] = useState(false)

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setFile(event.target.files[0])
    }

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value)
    }

    const getBase64 = (file: File) => new Promise((resolve, reject)=> {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })

    const uploadFile = async (file: File)=> {
        const encodedFile = await getBase64(file) as string
        const temp = encodedFile.split(",")
        const encoding = temp[temp.length - 1]
        const extension = file.name.split(".")[0]
        const response = await axios({
            method: "POST",
            url: `${process.env.NEXTAUTH_URL}/doc-upload`,
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                username: localStorage.getItem("docuser"),
                filecat: documentTypes.indexOf(category) + 1,
                extension: extension,
                data: encoding
            }
        })
        return response.data
    }

    const handleUpload = () => {
        if(!file) {
            toast("Please upload a file")
            return
        }
        setLoading(true)
        uploadFile(file)
            .then((status)=> {
                if(status === 0) {
                    setPending(true)
                }
                else {
                    setApproved(true)
                }
                // @ts-ignore
                onClose()
            })
            .catch(error => {
                toast(error.message)
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle className="font-bold text-[40px] text-center">
                    Upload file
                </DialogTitle>
                <DialogContent className="flex flex-col">
                    <input
                        type="file"
                        onChange={handleFileUpload}
                    />
                    <div className="font-bold mt-[15px] text-[20px]">Select category of your file</div>
                    <select className="shadow-md p-[5px] my-[15px]" onChange={handleCategoryChange}>
                        {
                            documentTypes.map((type, i)=> {
                                return (
                                    <option key={i} className="text-[18px]">{type}</option>
                                )
                            })
                        }
                    </select>
                    <Button
                        style={{
                            margin: "10px 0"
                        }}
                        onClick={handleUpload}
                        variant="outlined">
                        Upload file
                    </Button>
                </DialogContent>
                <ToastContainer />
                <LoadingDialog open={loading} onClose={()=> {}} />
            </Dialog>
            <ApprovedDialog open={approved} onClose={()=> setApproved(false)} />
            <PendingDialog open={pending} onClose={()=> setPending(false)} />
        </>
    )
}