import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import authUser from '../../api/auth'
import Index from './Component/Index'
import LoginComponent from './Component/Login'

const Staff = () => {
    // eslint-disable-next-line
    const [staff, setStaff] = useState()
    // eslint-disable-next-line
    const [auth, setAuth] = useState()

    useEffect(() => {
        (async () => {
            const result = await authUser()
            if (result?.isEmployee === true) {
                setAuth(() => true)
            }
            else {
                setAuth(() => false)
            }
            return setStaff(result)
        })()
    }, [])
    return (
        <Routes>
            {
                auth=== true && 
                <>
                    <Route path={"/*"} element={<Index />}  />
                    <Route path={"/login"} element={<Navigate to={"/staff"} />} />
                </>
            }
            {
                auth=== false && 
                <>
                    <Route path={"/*"} element={<Navigate to={"/staff/login"} replace={true} />} />
                    <Route path={"/login"} element={<LoginComponent />} />
                </>
            }
        </Routes>
    )
}

export default Staff