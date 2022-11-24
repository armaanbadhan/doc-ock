import {Fab, Grid} from "@mui/material";
import {FileCard} from "./FileCard";
import {Add} from "@mui/icons-material";
import {UploadDialog} from "./UploadDialog";
import {useState} from "react";

export const UserDashboard = ({username}: {username: string}) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="font-bold text-[25px] m-[20px]">Files</div>
            <div className="mx-[20px] pb-[30px] flex-auto overflow-y-auto">

                <Grid container spacing={2}>
                    {
                        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map((a,i)=> {
                            return (
                                <Grid item md={2} sm={4} xs={12} key={i}>
                                    <FileCard />
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