import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// eslint-disable-next-line
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { AppContext } from '../../App';
import { Box } from '@mui/system';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, TextField } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import update_info_user from '../../api/update_info_user';
import swal from 'sweetalert';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function InfoUser(props) {
    const [openUpdate, setOpenUpdate]= React.useState(false)
    const [open, setOpen] = React.useState(false);
    const { user, setChange } = React.useContext(AppContext)
    // eslint-disable-next-line
    const [firstName, setFirstName]= React.useState(user?.firstName)
    // eslint-disable-next-line
    const [lastName, setLastName]= React.useState(user?.lastName)
    // eslint-disable-next-line
    const [email, setEmail]= React.useState(user?.email)

    const [newFirstName, setNewFirstName]= React.useState(user?.firstName)
    const [newLastName, setNewLastName]= React.useState(user?.lastName)
    const [newEmail, setNewEmail]= React.useState(user?.email)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div variant="outlined" onClick={handleClickOpen}>
                Thông tin cá nhân
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => {
                    handleClose()
                    props?.handleClose()
                }}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ textAlign: 'center', fontSize: 18, fontWeight: 600 }}>{"Thông tin cá nhân"}</DialogTitle>
                <DialogContent>
                    <Box sx={{ width: 600, maxWidth: "100%", bgcolor: 'background.paper' }}>
                        <nav aria-label="main mailbox folders">
                            {
                                openUpdate=== false && 
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon style={{width: 100}}>
                                                First name: 
                                            </ListItemIcon>
                                            <ListItemText primary={firstName} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon style={{width: 100}}>
                                                Last name: 
                                            </ListItemIcon>
                                            <ListItemText primary={lastName} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon style={{width: 100}}>
                                                Email: 
                                            </ListItemIcon>
                                            <ListItemText primary={email} />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            }
                            {
                                openUpdate=== true && <>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <TextField value={newFirstName} onChange={(e)=> setNewFirstName(e.target.value)} id="outlined-basic" label="First name" variant="outlined" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <TextField value={newLastName} onChange={(e)=> setNewLastName(e.target.value)} id="outlined-basic" label="First name" variant="outlined" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <TextField value={newEmail} onChange={(e)=> setNewEmail(e.target.value)} id="outlined-basic" label="First name" variant="outlined" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                                </>
                            }
                        </nav>
                        <Divider />
                        
                    </Box>
                </DialogContent>
                <DialogActions>
                    {
                        openUpdate=== false && 
                        <Button variant={"contained"} onClick={()=> setOpenUpdate(()=> true)}>Cập nhật</Button>
                    }
                    {
                        openUpdate=== true &&
                        <>
                            <Button variant={"contained"} onClick={async ()=> {
                                const result= await update_info_user(newFirstName, newLastName, newEmail)
                                if(result?.update=== true) {
                                    swal("Thông báo", "Cập nhật thông tin cá nhân thành công", "success")
                                    .then(()=> {
                                        handleClose()
                                        props?.handleClose()
                                        setChange(prev=> !prev)
                                    })
                                }
                                else {
                                    swal("Thông báo", "Error", "error")
                                }
                            }}>Lưu</Button>
                        </>
                    }
                    <Button onClick={()=> {
                        setOpenUpdate(()=> true)
                        handleClose()

                    }}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}