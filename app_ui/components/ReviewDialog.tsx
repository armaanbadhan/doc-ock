import {UploadedFile} from "../public/types";
import {Button, Dialog, DialogContent, DialogProps, DialogTitle, TextField} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";
import {LoadingDialog} from "./LoadingDialog";
import {ChangeEvent, useState} from "react";

export const ReviewDialog = ({file, open, onClose}: {file: UploadedFile} & DialogProps) => {

    const [loading, setLoading] = useState(false)
    const [confirm, setConfirm] = useState("")

    const changeConfirm = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirm(event.target.value)
    }

    const checkConfirm = (): boolean => {
        let check = confirm === "CONFIRM"
        if(!check) {
            toast("Please type CONFIRM to confirm your choice")
        }
        return check
    }

    const approveFile = () => {
        if(!checkConfirm())
            return
    }

    const rejectFile = () => {
        if(!checkConfirm())
            return
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className="font-bold text-[30px]">
                {`${file.fileid}.${file.extension}`}
            </DialogTitle>
            <DialogContent className="w-full">
                <div>Please approve or reject the given file, type CONFIRM in the given text field to confirm</div>
                <TextField
                    variant="outlined"
                    value={confirm}
                    onChange={changeConfirm}
                    style={{
                        width: "100%",
                        padding: "0",
                        fontSize: "20px",
                        marginTop: "10px"
                    }}
                    />
                <div className="w-full justify-evenly items-center my-[15px] flex flex-row">
                    <Button
                        variant="outlined"
                        onClick={approveFile}
                        style={{
                            color: "green",
                            fontSize: "20px",
                            borderColor: "green"
                        }}
                    >
                        Approve
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={rejectFile}
                        style={{
                            color: "red",
                            fontSize: "20px",
                            borderColor: "red"
                        }}
                    >
                        Reject
                    </Button>
                </div>
            </DialogContent>
            <ToastContainer position="top-right" />
            <LoadingDialog open={loading} onClose={()=> {}} />
        </Dialog>
    )
}