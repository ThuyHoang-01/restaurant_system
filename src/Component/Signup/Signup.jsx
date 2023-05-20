import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../Login/Login.scss"
import swal from "sweetalert"
import signup from '../../api/signup'
import OtpInput from 'react-otp-input';
import { Button } from '@mui/material'
import verify_email from '../../api/verify_email'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import validateEmail from '../util/validateEmail'

const Signup = () => {
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [confirmPassword, setConfirmPassword]= useState("")
  const [firstName, setFirstName]= useState("")
  const [lastName, setLastName]= useState("")
  const [verifyCode, setVerifyCode]= useState(0)
  const navigate= useNavigate()
  const [open, setOpen]= useState(false)
  const validatePasswordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
  const validatePassword= (str)=> {
    return validatePasswordRegex.test(str)
  }
  return (
    <div>
        <div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 1000, width: "100%", padding: 10, marginTop: 50}}>
            <main className="main">
                <div className="container">
                {open=== false &&  <section className="wrapper">
                    <div className="heading">
                    <h1 className="text text-large">Đăng ký</h1>
                    <p className="text text-normal">Người dùng cũ? <span><Link to={"/login"} className="text text-links">Đăng nhập</Link></span>
                    </p>
                    </div>
                    <form name="signin" className="form">
                        <div className="input-control">
                            <label htmlFor="email" className="input-label" hidden>Email</label>
                            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" name="email" id="email" className="input-field" placeholder="Email" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden>Mật khẩu</label>
                            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" name="Password" id="Password" className="input-field" placeholder="Password" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="Password" className="input-label" hidden>Nhập lại mật khẩu</label>
                            <input value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} type="password" name="Password" id="Password" className="input-field" placeholder="Confirm password" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="First name" className="input-label" hidden>Họ</label>
                            <input value={firstName} onChange={(e)=> setFirstName(e.target.value)} type="text" name="surname" id="surname" className="input-field" placeholder="Firstname" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="Lastname" className="input-label" hidden>Tên</label>
                            <input value={lastName} onChange={(e)=> setLastName(e.target.value)} type="text" name="lastname" id="lastname" className="input-field" placeholder="Lastname" />
                        </div>
                        <div className="input-control">
                            <div></div>
                            <input onClick={async (e)=> {
                                e.preventDefault()
                                console.log(validatePassword(password))
                                if(validatePassword(password) === false ) {
                                    return swal("Thông báo", "Mật khẩu phải có ít nhất 8 ký tự gồm chữ hoa, chữ thường và chữ số", "error")
                                }
                                if(validateEmail(email)=== false) {
                                    return swal("Thông báo", "Email không đúng định dạng, vui lòng thử lại", "error")

                                }
                                if(firstName?.length <= 0) {
                                    return swal("Thông báo", "Họ không được để trống", "error")
                                }
                                if(lastName?.length <= 0) {
                                    return swal("Thông báo", "Tên không được để trống", "error")
                                }
                                if(password?.trim() !== confirmPassword?.trim()) {
                                    return swal("Thông báo", "Mật khẩu không khớp", "error")

                                }
                                else {

                                    const result= await signup(email, password, firstName, lastName)
                                    if(result?.verify=== "pending") {
                                        setOpen(()=> true)
                                    }
                                    else if(result?.exist=== true) {
                                        swal("Thông báo","Email đã tồn tại, vui lòng thử lại với email khác", "error")
                                    }
                                    else {
                                        swal("Thông báo", "Lỗi xuất hiện", "error")
                                    }
                                }
                            }} type="submit" name="submit" value={"Đăng ký"} className="input-submit" defaultValue="Đăng ký" />
                        </div>
                    </form>
                    <div className="striped">
                    <span className="striped-line" />
                    <span className="striped-text">Hoặc</span>
                    <span className="striped-line" />
                    </div>
                    <div className="method">
                    <div className="method-control">
                        <a href="/" className="method-action">
                        <i className="ion ion-logo-google" />
                        <span>Đăng ký với Google</span>
                        </a>
                    </div>
                    <div className="method-control">
                        <a href="/" className="method-action">
                        <i className="ion ion-logo-facebook" />
                        <span>Đăng ký với Facebook</span>
                        </a>
                    </div>
                    <div className="method-control">
                        <a href="/" className="method-action">
                        <i className="ion ion-logo-apple" />
                        <span>Đăng ký với Apple</span>
                        </a>
                    </div>
                    </div>
                </section>}
                {
                    open=== true && <section className="wrapper">
                    <div className="heading">
                            <h1 className="text text-large"><Button onClick={()=> setOpen(false)} style={{aspectRatio: 1 / 1, borderRadius: "50%"}}><ArrowBackIcon /></Button>Xác thực email</h1>

                            <div>Chúng tôi vửa gửi một mã gồm 6 chữ số đến email của bạn, vui lòng kiểm tra email của bạn và điền mã vào biểu mẫu ở dưới để hoàn tất quá trình đăng ký tài khoản</div>
                            <OtpInput containerStyle={"asw"} inputStyle={"lll"} value={verifyCode} onChange={setVerifyCode} numInputs={6} separator={<span>&nbsp;&nbsp;</span>} />
                            <br />
                            <div className={"c-flex-center"}>
                                <Button onClick={async ()=> {
                                    if(verifyCode.toString()?.length <= 0) {
                                        return swal("Thông báo", "Mã xác thực không được để trống", "error")
                                    }
                                    const result= await verify_email(email,password, firstName, lastName, verifyCode)
                                    if(result?.signup=== false ) {
                                        swal("Thông báo","Mã xác thực không đúng. Vui lòng thử lại", "error")
                                    }
                                    else if(result?.signup=== true) {
                                        swal("Thông báo", "Đăng ký thành công", "success")
                                        .then(()=> navigate(result.redirect))
                                    }
                                    else {
                                        swal("Thông báo","Lỗi xảy ra ", "error")
                                    }
                                }} variant={"contained"}>Xác thực</Button>
                            </div>
                        </div>
                    </section>
                }
                </div>
            </main>
        </div>
        <div className={"c-flex-center"} style={{position: "fixed", top: 0, left: 0, zIndex: 999, width: "100%", height: "100%", backgroundImage: "url(https://appetizer-client.vercel.app/static/media/bg-login.59c329f0.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
            
        </div>
    </div>
  )
}

export default Signup