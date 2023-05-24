import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import get_list_order from "../../api/order/get_list_order";
import Header from "../Header/Header";
import Menu from "./Component/Menu";

const Order = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await get_list_order();
      return setData(result);
    })();
  }, []);

  return (
    <>
      <Header />
      <Box sx={{ padding: 1 }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            margin: 16,
            textAlign: "center",
          }}
        >
          Quản lý đặt bàn 
        </div>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ maxWidth: 1200, width: "100%" }}>
            <Grid container spacing={3}>
              {data?.map((item, key) => (
                <Menu key={key} item={item} />
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Order;
