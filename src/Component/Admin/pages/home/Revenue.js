import React, { useState } from 'react'
import { Button, DatePicker, Space } from 'antd';
import stats_date from '../../../../api/admin/stats/stats_date';
import stats_month from '../../../../api/admin/stats/stats_month';
import stats_year from '../../../../api/admin/stats/stats_year';
import stats_range from '../../../../api/admin/stats/stats_range';
import { Box } from '@mui/material';
import _ from 'lodash';
import { DataGrid } from "@material-ui/data-grid";
import moment from 'moment';

const Revenue = () => {
  const [data, setData]= useState([])
  const [date, setDate]= useState()
  const [month, setMonth]= useState()
  const [year, setYear]= useState()
  const [range, setRange]= useState()
  const [total, setTotal]= useState(0)
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    setDate(date.format("DD/MM/YYYY"))
  };
  const onChangeMonth= (month, monthString)=> {
    console.log(month, monthString);
    setMonth(month.format("MM/YYYY"))
  }
  const onChangeYear= (year, yearString)=> {
    console.log(year, yearString);
    setYear(year.format("YYYY"))
  }
  const onChangeRange= (range, rangeString)=> {
    console.log(range, rangeString)
    setRange([range[0]?.format("DD/MM/YYYY"), range[1]?.format("DD/MM/YYYY")])
  }

  const columns= [
    {
        field: "id",
        headerName: "Id",
        width: 100, 
        flex: 1
    },
    {
        field: "user_name",
        headerName: "Người đặt",
        width: 200, 
        flex: 1
    },
    {
        field: "time_booking",
        headerName: "Thời gian đặt",
        width: 200, 
        flex: 1,
        renderCell: (params)=> {
            return <>{moment(params.row.time_created).format("HH:mm:ss DD-MM-YYYY")}</>
        }
    },
    {
        field: "time_paid",
        headerName: "Thời gian thanh toán",
        width: 200, 
        flex: 1,
        renderCell: (params)=> {
            return <>{moment(params.row.time_paid).format("HH:mm:ss DD-MM-YYYY")}</>
        }
    },
    {
        field: "revenue",
        headerName: "Doanh thu",
        width: 200, 
        flex: 1,
        
    },
    {
        field: "time_created",
        headerName: "Ngày",
        width: 200, 
        flex: 1,
        renderCell: (params)=> {
            return <>{moment(params.row.time_created).format("DD-MM-YYYY")}</>
        }
    }
  ]

  return (
    <div className="revenue" style={{width: "100%", padding: 20}}>
        <div style={{fontSize: 17, fontWeight: 600, marginBottom: 12}}>Thống kê doanh thu</div>
        <div style={{marginBottom: 12}}>
            <Space direction={"horizontal"} align={"center"}>
                <div style={{fontSize: 17, fontWeight: 600,}}>Thống kê doanh thu theo ngày</div>
                <DatePicker onChange={onChangeDate} />
                <Button onClick={async ()=> {
                    try {
                        const result= await stats_date(date)
                        // const grouped = _.groupBy(result, item => item.time_created.slice(0, 10));
                        // const result1 = _.map(grouped, (group, key) => {
                        // const revenue = _.sumBy(group, 'revenue');
                        // return { revenue, time_created: key, id: group[0].id };
                        // });
                        // console.log(result1)
                        setTotal(_.sumBy(result, function(e) {return parseInt(e.revenue)}))
                        return setData(result)

                    }
                    catch(error) {
                        console.log(error)
                    }
                }} type={"primary"}>Thống kê doanh thu theo ngày</Button>
            </Space>
        </div>
        <br />
        <div style={{marginBottom: 12}}>
            <Space direction={"horizontal"} align={"center"}>
                <div style={{fontSize: 17, fontWeight: 600,}}>Thống kê doanh thu theo tháng</div>
                <DatePicker onChange={onChangeMonth} picker="month" />
                <Button onClick={async ()=> {
                    try {
                        const result= await stats_month(month)
                        // const grouped = _.groupBy(result, item => item.time_created.slice(0, 10));
                        // const result1 = _.map(grouped, (group, key) => {
                        // const revenue = _.sumBy(group, 'revenue');
                        // return { revenue, time_created: key, id: group[0].id };
                        // });
                        // console.log(result1)
                        setTotal(_.sumBy(result, function(e) {return parseInt(e.revenue)}))
                        return setData(result)

                    }
                    catch(error) {
                        console.log(error)
                    }
                }} type={"primary"}>Thống kê doanh thu theo tháng</Button>
            </Space>
        </div>
        <br />
        <div style={{marginBottom: 12}}>
            <Space direction={"horizontal"} align={"center"}>
                <div style={{fontSize: 17, fontWeight: 600,}}>Thống kê doanh thu theo năm</div>
                <DatePicker onChange={onChangeYear} picker="year" />
                <Button onClick={async ()=> {
                    try {
                        const result= await stats_year(year)
                        // const grouped = _.groupBy(result, item => item.time_created.slice(0, 10));
                        // const result1 = _.map(grouped, (group, key) => {
                        // const revenue = _.sumBy(group, 'revenue');
                        // return { revenue, time_created: key, id: group[0].id };
                        // });
                        // console.log(result1)
                        setTotal(_.sumBy(result, function(e) {return parseInt(e.revenue)}))
                        return setData(result)

                    }
                    catch(error) {
                        console.log(error)
                    }
                }} type={"primary"}>Thống kê doanh thu theo năm</Button>
            </Space>
        </div>
        <br />
        <div style={{marginBottom: 12}}>
            <Space direction={"horizontal"} align={"center"}>
                <div style={{fontSize: 17, fontWeight: 600,}}>Thống kê theo khoảng thời gian</div>
                <DatePicker.RangePicker onChange={onChangeRange} />
                <Button onClick={async ()=> {
                    try {
                        const result= await stats_range(range[0], range[1])
                        // const grouped = _.groupBy(result, item => item.time_created.slice(0, 10));
                        // const result1 = _.map(grouped, (group, key) => {
                        // const revenue = _.sumBy(group, 'revenue');
                        // return { revenue, time_created: key, id: group[0].id };
                        // });
                        // console.log(result1)
                        setTotal(_.sumBy(result, function(e) {return parseInt(e.revenue)}))
                        return setData(result)

                    }
                    catch(error) {
                        console.log(error)
                    }
                }} type={"primary"}>Thống kê doanh thu theo khoảng thời gian</Button>
            </Space>
        </div>
        <br />
        <div style={{height: 300, width: "100%"}}>
        <Box sx={{width: "100%", height: 300}}>
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={5}
                pagination={true}
                paginationMode="client"
                autoHeight
                disableExtendRowFullWidth
                autoWidth
            />
            <br />
            <Box sx={{width: '100%', direction: "rtl"}}>Tổng doanh thu: <strong>{total+ "VNĐ" || "_"}</strong></Box>
        </Box>
        </div>
    </div>
  )
}

export default Revenue