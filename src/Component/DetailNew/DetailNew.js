import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import detail_new from '../../api/detail_new'
// import Header from '../Home/Header'
// import { Image } from 'antd'
import moment from "moment"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { NewList } from '../News/News'
import Header from '../Header/Header'
import detail_new from '../../api/detail_new';

const DetailNew = () => {
  const [data, setData]= useState() // lưu trữ state
  const {new_id }= useParams() ///`new_id` lấy giá trị từ url
  useEffect(()=> { //useEffect sẽ được gọi mỗi khi `new_id` thay đổi giá trị.
    (async ()=> {
        const result= await detail_new(new_id) //detail_new` để lấy thông tin chi tiết relevant của tin tức với `new_id`.
      //   Kết quả truy vấn được gán cho state `data` thông qua hàm `setData` 
        return setData(result)
    })()
  }, [new_id])
  return (
    <>
        <Header />
        <div className={"c-flex-center"} style={{width: "100%"}}>
          <div style={{width: "100%", maxWidth: 1200, display: "flex"}}> // Chiều rộng đoạn văn không lớn hơn 1200
            <div style={{width: "100%", padding: 20}}>
                <div style={{margin: "12px 0", fontWeight: 600, fontSize: 24, textTransform: "uppercase"}}>
                    {data?.title}  // lấy tên tiêu đề
                </div>
                <div></div>
                <br />
                <div></div>
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                        <CalendarMonthIcon /> {moment(data?.time_created).format("DD/MM/YYYY")} // 
                      </div> // Lấy ra thời gian tạo tin tức
                <br />
                <div style={{overflow: "hidden", textOverflow: "ellipsis"}} dangerouslySetInnerHTML={{__html: data?.content}}></div>
                //
            </div>
            <div style={{width: 700}}>
              <div style={{fontSize: 24, fontWeight: 600, paddingLeft: 52, marginTop: 20}}>Bài viết mới nhất</div>
              <NewList />
            </div>
          </div>
        </div>
    </>
  )
}

export default DetailNew