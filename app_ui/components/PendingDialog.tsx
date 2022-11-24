import {Button, Dialog, DialogContent, DialogProps, DialogTitle} from "@mui/material";

export const PendingDialog = ({open, onClose}: DialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Our classifier failed to classify your file, we have sent your file to an admin for a manual review
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