import {Button, Dialog, DialogContent, DialogProps, DialogTitle} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {documentTypes} from "../public/staticstuff";

export const UploadDialog = ({open, onClose}: DialogProps) => {

    const [file, setFile] = useState<File>()
    const [category, setCategory] = useState(documentTypes[0])

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setFile(event.target.files[0])
    }

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value)
    }

    const uploadFile = () => {
        if(!file) {
            alert("Please upload a file")
            return
        }
        alert(file!.name + " " + file!.type + " " + file.size)
    }

    return (
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
                    onClick={uploadFile}
                    variant="outlined">
                    Upload file
                </Button>
            </DialogContent>
        </Dialog>
    )
}