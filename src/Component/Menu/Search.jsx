import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
const DetailDish = React.lazy(() => import('./DetailDish'));

export default function SearchItemMenu(props) {
  const [open, setOpen]= React.useState(false) // ktra popup có hiển thị ko
  const [dishId, setDishId]= React.useState(undefined) // khơi tạo vs gtri ban đâu undefind
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete // nếu xử lý ko có trả lỗi
        onChange={(e, value)=> {
          setOpen(()=> true)
          setDishId(value.dish_id)
        }}
        
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        getOptionLabel={(option) => option.dish_name} //hiển thị tên món ăn theo tùy chọn
        options={props?.data} // truyền ds các món ăn vào component
        renderInput={(params) => (
          <div>
            <TextField
              {...params}
              label={<><SearchIcon /> Tìm kiếm món ăn</>}
              InputProps={{
                ...params.InputProps, // input value search
                type: 'search',
              }}
          />
          </div>
        )}
      />
        <React.Suspense fallback={<></>}>
            <DetailDish open={open} setOpen={setOpen} dishId={dishId} /> 
            {/* show popup */}
        </React.Suspense>
    </Stack>
  );
}
