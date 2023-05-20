import { List, ListItem } from '@mui/material'
import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import get_detail_staff from '../../../../api/staff/get_detail_staff'
import UpdateInfo from './UpdateInfo'

const Info = () => {
  const [data, setData]= useState()
  const [change, setChange]= useState(false)
  useEffect(()=> {
    (async ()=> {
        const result= await get_detail_staff(Cookies.get("uid"))
        return setData(result)
    })()
  }, [change])

  return (
    <div className="home" style={{padding: 20}}>
        <br />
        <br />
        <br />
        <br />
        <div style={{width: "100%", padding: 10, borderRadius: 10}}>
            <List>
                <ListItem>
                    <div style={{width: 150}}>Họ tên: </div>
                    <div>{data?.first_name} {data?.last_name}</div>
                </ListItem>
                <ListItem>
                    <div style={{width: 150}}>Email: </div>
                    <div>{data?.email}</div>
                </ListItem>
                <ListItem>
                    <div style={{width: 150}}>Chức vụ: </div>
                    <div>{data?.role=== 2 && "Nhân viên"}</div>
                </ListItem>
            </List>
        </div>
        <UpdateInfo firstName={data?.first_name} lastName={data?.last_name} email={data?.email} setChange={setChange} />
    </div>
  )
}

export default Info