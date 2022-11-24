import {Fab, Grid} from "@mui/material";
import {FileCard} from "./FileCard";
import {Add} from "@mui/icons-material";
import {UploadDialog} from "./UploadDialog";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {UploadedFile} from "../public/types";
import axios from "axios";

export const UserDashboard = () => {
    const [open, setOpen] = useState(false)
    const [files, setFiles] = useState<UploadedFile[]>([])

    useEffect(()=> {
        axios({
            method: "GET",
            url: `${process.env.NEXTAUTH_URL}/file/${localStorage.getItem("docuser")}`
        })
            .then(response=> setFiles(response.data))
            .catch(error => {
                console.error(error)
                toast(error.message)
            })
    },[])

    return (
        <>
            <div className="font-bold text-[25px] m-[20px]">Files</div>
            <div className="mx-[20px] pb-[30px] flex-auto overflow-y-auto">

                <Grid container spacing={2}>
                    {
                        files.length > 0 && files.map((file,i)=> {
                            return (
                                <Grid item md={2} sm={4} xs={12} key={i}>
                                    <FileCard file={file} />
                                </Grid>
                            )
                        })
                    }
                </Grid>

            </div>
            <Fab variant="extended" onClick={()=> {setOpen(true)}} size="large" sx={{
                alignItems: "center",
                display: "flex",
                position: "absolute",
                bottom: "0",
                right: "0",
                margin: "20px"
            }}>
                <Add fontSize="large" />
                <span className="font-bold text-xl">Upload File</span>
            </Fab>
            <UploadDialog open={open} onClose={()=> setOpen(false)} />
        </>
    )
}