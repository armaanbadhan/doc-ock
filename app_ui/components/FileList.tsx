import {UploadedFile} from "../public/types";
import {Grid} from "@mui/material";
import {FileCard} from "./FileCard";

export const FileList = ({files, admin = false}: {files: UploadedFile[], admin?: boolean}) => {
    return (
        <Grid container spacing={2}>
            {
                files.map((file,i)=> {
                    return (
                        <Grid item md={2} sm={4} xs={12} key={i}>
                            <FileCard admin={admin} file={file} />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}