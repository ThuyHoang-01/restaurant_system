import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import authUser from '../../api/auth'
import Login from './Component/Login'
import IndexAdmin from './Index'

const Admin = () => {
    // eslint-disable-next-line
    const [admin, setAdmin]= useState()
    const [auth, setAuth]= useState()

    useEffect(()=> {
        (async ()=> {
            const result= await authUser()
            if(result?.isAdmin=== true) {
                setAuth(()=> true)
            }
            else {
                setAuth(()=> false)
            }
            return setAdmin(result)
        })()
    }, [])

    return (
        <Routes>
            {
                auth=== true && 
                <>
                    <Route path={"/login"} element={<Navigate to={"/admin"} />} />
                    <Route path={"/*"} element={<IndexAdmin {...admin} />}  />
                </>
            }
            {
                auth=== false && 
                <>
                    <Route path={"/*"} element={<Navigate to={"/admin/login"} replace={true} />} />
                    <Route path={"/login"} element={<Login />} />
                </>
            }
        </Routes>
  )
}

export default Admin