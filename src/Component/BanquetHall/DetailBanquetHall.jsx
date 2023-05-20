import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { useEffect } from 'react';
import get_banquet_detail from '../../api/banquet/detail_banquet';
import { Button } from 'antd'
import { List, ListItem } from '@mui/material';
import {AiFillLock, AiFillUnlock } from "react-icons/ai"
import numberWithCommas from '../util/numberThousandSeparator';
import { AppContext } from '../../App';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailBanquetHall(props) {
  const {user }= React.useContext(AppContext)
  const [data, setData]= useState()
  const fetchData= React.useCallback(async ()=> {
    const result= await get_banquet_detail(props?.banquet_id)
    return setData(result)
  }, [props?.banquet_id])
  useEffect(()=> {
    fetchData()
    const intervalId= setInterval(()=> {
      fetchData()
    }, 4000)
    
    return ()=> clearInterval(intervalId)

  }, [fetchData])
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type={"default"} variant="outlined" onClick={handleClickOpen}>
        Chi tiết
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thông tin sảnh tiệc"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <List>
                <ListItem>
                    <div style={{width: "150px"}}>Tên sảnh tiệc:</div>
                    <div>{data?.banquet_hall_name}</div>
                </ListItem>
                <ListItem>
                    <div style={{width: "150px"}}>Thời gian mở:</div>
                    <div>{data?.time_start}</div>
                </ListItem>
                <ListItem>
                    <div style={{width: "150px"}}>Thời gian đóng:</div>
                    <div>{data?.time_end}</div>
                </ListItem>
                <ListItem>
                    <div style={{width: "150px"}}>Số khách phục vụ:</div>
                    <div>{data?.service_guest}</div>
                </ListItem>
                <ListItem>
                    <div style={{width: "150px"}}>Giá sảnh:</div>
                    <div>{data?.price&& numberWithCommas(parseInt(data?.price))}VNĐ</div>
                </ListItem>
                <>
                    {
                        <ListItem>
                            {
                                data?.is_locked=== 0 && <div className={"c-flex-center"} style={{justifyContent: "flex-start"}}>
                                    <AiFillUnlock style={{color: "#2dc275"}} />
                                    <span style={{color: "#2dc275"}}>Đang mở</span>
                                </div>

                                }
                                {
                                data?.is_locked=== 1 && <div className={"c-flex-center"} style={{justifyContent: "flex-start"}}>
                                    <AiFillLock style={{color: "red"}} />
                                    <span style={{color: "red"}}>Đã khóa</span>
                                </div>
                                }
                        </ListItem>
                    }
                </>
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <>
            {
              parseInt(user?.role)=== 2 && <>
                {
                  data?.is_locked=== 0 && 
                  <Button type={"primary"} onClick={handleClose}>Đặt sảnh</Button>
                }
              </>
            }
          </>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}