import React, {useState } from 'react'
import { useEffect } from 'react'
import bill from '../../api/bill'

const Bill = () => {
  const [data, setData]= useState()
  useEffect(()=> {
    (async ()=> {
        const result= await bill.getBill()
        return setData(result)
    })()
  }, [])

  return (
    <div>Bill</div>
  )
}

export default Bill