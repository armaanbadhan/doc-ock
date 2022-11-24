import {Button, Dialog, DialogContent, DialogProps, DialogTitle} from "@mui/material";

export const ApprovedDialog = ({open, onClose}: DialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                File has been uploaded and approved
            </DialogTitle>
            <DialogContent>
                <Button
                    variant="outlined"
                    onClick={() => {
                        // @ts-ignore
                        onClose()
                    }}
                >
                    Ok
                </Button>
            </DialogContent>
        </Dialog>
    )
}