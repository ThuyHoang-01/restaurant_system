import { Button } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import forgot_password from '../../api/forgot_password';
import OtpInput from 'react-otp-input';
import recover_password from '../../api/recover_password';
import swal from 'sweetalert';
import reset_password from '../../api/reset_password';

const ForgotPassword = (props) => {
  const {setOpen }= props
  const [email, setEmail]= useState("")
  const [open2, setOpen2]= useState(false)
  const [verifyCode, setVerifyCode]= useState(0)
  const [password, setPassword]= useState("")
  const [confirmPassword, setConfirmPassword]= useState("")

  return (
    <div className="container">
        {
        open2=== false &&
        <section className="wrapper">
            <div className="heading">
            <h1 className="text text-large"><Button onClick={()=> setOpen(false)} style={{aspectRatio: 1 / 1, borderRadius: "50%"}}><ArrowBackIcon /></Button>Quên mật khẩu</h1>
            <p className="text text-normal">Khôi phục lại mật khẩu<span></span>
            </p>
            </div>
            <div name="signin" className="form">
            <div className="input-control">
                <label htmlFor="email" className="input-label" hidden>Email</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" name="email" id="email" className="input-field" placeholder="Email" />
            </div>
            <div className={"c-flex-center"}>
                <Button variant={"contained"} onClick={async ()=> {
                    const result= await forgot_password(email)
                    if(result?.verify=== "pending") {
                        setOpen2(()=> true)
                    }
                    else {
                        swal("Thông báo", "Email không tồn tại trong hệ thống", "error")
                    }
                }}>Gửi</Button>
            </div>
            </div>
        </section>
        }
        {
            open2=== true && 
            <>
            <section className="wrapper">
                <div className="heading">

                    <div>Chúng tôi vừa gửi đến bạn một mã gồm 6 chữ số, vui lòng kiểm tra email của bạn rồi điền vào biểu mẫu bên dưới để hoàn tất quá trình khôi phục mật khẩu</div>
                        <OtpInput containerStyle={"asw"} inputStyle={"lll"} value={verifyCode} onChange={setVerifyCode} numInputs={6} separator={<span>&nbsp;&nbsp;</span>} />
                        <br />
                        <div className={"c-flex-center"}>
                            <Button onClick={async ()=> {
                                const result= await recover_password(email, verifyCode)
                                if(result?.recover=== false ) {
                                    swal("","Mã xác thực không đúng, vui lòng thử lại", "error")
                                }
                                else if(result?.recover=== true) {
                                    setOpen2(()=> undefined)
                                }
                                else {
                                    swal("Thông báo","Lỗi không xác định", "error")
                                }
                            }} variant={"contained"}>Verify</Button>
                    </div>
                </div>
            </section>
            </>
        }
        {
            open2=== undefined && <>
            <section className="wrapper">
                <div className="heading">
                    <h1 className="text text-large">Đặt lại mật khẩu</h1>
                    <form name="signin" className="form">
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden>Mật khẩu mới</label>
                            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" name="Password" id="Password" className="input-field" placeholder="Mật khẩu mới" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="Password" className="input-label" hidden>Nhập lại mật khẩu</label>
                            <input value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} type="password" name="Password" id="Password" className="input-field" placeholder="Nhập lại mật khẩu" />
                        </div>
                    </form>
                    <div className={"c-flex-center"}>
                        <Button variant={"contained"} onClick={async ()=> {
                            const result= await reset_password(email, password)
                            if(result?.reset=== true ) {
                                swal("Thông báo", "Mật khẩu mới đã được tạo", "success")
                                .then(()=> setOpen(()=> false))
                            }
                            else {
                                swal("Error")
                            }
                        }}>Lưu</Button>
                    </div>
                </div>
            </section>
            </>
        }
    </div>
  )
}

export default ForgotPassword