import {Dialog, DialogContent, DialogProps, DialogTitle} from "@mui/material";
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

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle className="font-bold text-[40px]">
                Upload file
            </DialogTitle>
            <DialogContent>
                <input
                    type="file"
                    onChange={handleFileUpload}
                />
                <div className="font-bold my-[10px] text-[20px]">Select category of your file</div>
                <select onChange={handleCategoryChange}>
                    {
                        documentTypes.map((type, i)=> {
                            return (
                                <option key={i} className="text-[18px]">{type}</option>
                            )
                        })
                    }
                </select>
            </DialogContent>
        </Dialog>
    )
}