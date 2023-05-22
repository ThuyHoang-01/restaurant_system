import React, {useState } from 'react'
import Header from '../../Header/Header'
import "./style.scss"
import request_booking from '../../../api/request_booking'
import swal from 'sweetalert'

const AboutUs = () => {
  return (
    <>
      <Header />
      <>
        <div style={{width: "100%", display: "flex", }}>
          <div style={{flex: "1 1 0"}}>
              <img style={{width: "100%"}} draggable={false} src="https://res.cloudinary.com/cockbook/image/upload/v1676559726/Screenshot_2023-02-16_220136_j9vqcb.png" alt="" />
          </div>
        </div>
        <Contact />
      </>
    </>
  )
}
export const isValidEmail = (email) => {
  return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
};

export  const isValidMobile = (mobileno) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(mobileno);
};
const Contact = () => {
  const [contactData, setContactData] = useState({});
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState(false);
  const [guest, setGuest]= useState("")
  const [type, setType]= useState("")
  const isValidName= (name)=> {
    return name?.length >= 6 ? true : false
  }
  

 

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContactData({
      ...contactData,
      [name]: value
    });

    if (name === "mobile") {
      setContactData({
        ...contactData,
        mobile: value.replace(/\D/, "")
      });
    }
  };

  const handleSubmit = (e) => {
    let isValided = false;
    e.preventDefault();

    if (
      contactData.name === "" ||
      contactData.name === undefined ||
      contactData.mobile === "" ||
      contactData.mobile === undefined ||
      contactData.email === "" ||
      contactData.email === undefined ||
      contactData.guest === "" ||
      contactData.guest === undefined ||
      contactData.type === "" ||
      contactData.type === undefined
    ) {
      setSuccessMsg(false);
      isValided = false;
    } else {
      setSuccessMsg(true);
      isValided = true;
    }
    return isValided;
  };

  return (
    <div id="contact">
      <div className="form">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          autoComplete="off"
        >
          {!successMsg ? (
            <>
              <div id="errormessage" className={errorMsg ? "show" : ""}>
                {errorMsg}
              </div>
              <div className="form-group">
                <input
                  required
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Họ và tên*"
                  value={contactData.name || ""}
                  onChange={(e) => handleChange(e)}
                />
                {isValidName(contactData.name)=== false && <div style={{marginTop: 6, color: "#f00"}}>Tên phải có ít nhất 6 ký tự</div>}
              </div>
              <br />
              <div className="form-group">
                <input
                  required
                  name="mobile"
                  type="text"
                  maxLength={10}
                  className="form-control"
                  placeholder="Điện thoại*"
                  value={contactData.mobile || ""}
                  onChange={(e) => handleChange(e)}
                />
                {isValidMobile(contactData.mobile)=== false && <div style={{marginTop: 6, color: "#f00"}}>Số điện thoại không hợp lệ</div>}
              </div>
              <br />
              <div className="form-group">
                <input
                  required
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email*"
                  value={contactData.email || ""}
                  onChange={(e) => handleChange(e)}
                />
                {isValidEmail(contactData.email)=== false && <div style={{marginTop: 6, color: "#f00"}}>Email không hợp lệ</div>}
              </div>
              <br />
              <div className="form-group">
                <input
                  required
                  name="message"
                  type="text"
                  className="form-control"
                  placeholder="Số lượng khách*"
                  value={guest}
                  onChange={(e) => setGuest(e.target.value)}
                />
                {guest.length <= 0 && <div style={{marginTop: 6, color: "#f00"}}>Không được để trống trường này</div>}
              </div>
              <br />
              <div className="form-group">
                <input
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder="Loại hình tiệc"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                {type.length <= 0 && <div style={{marginTop: 6, color: "#f00"}}>Không được để trống trường này</div>}
              </div>
              <br />
              <p className="text-right mb-0">
                <input
                  onClick={async ()=> {
                    if(isValidName(contactData.name)=== false ){
                      return swal("Thông báo", "Tên khách hàng phải có ít nhất 6 ký tự", "error")
                    }
                    if(isValidEmail(contactData.email)=== false) {
                      return swal("Thông báo", "Email không hợp lệ, vui lòng thử lại", "error")
                    }
                    if(isValidMobile(contactData.mobile)=== false ) {
                      return swal("Thông báo", "Số điện thoại không hợp lệ, vui lòng kiểm tra lại", "error")
                    }
                  
                    const result= await request_booking(contactData.name, contactData.email, contactData.mobile, guest, type)
                    if(result?.add=== true ) {
                      swal("Thông báo", "Đã gửi yêu cầu thành công, nhân viên sẽ sớm liên hệ lại bạn!", "success")
                      .then(()=> {
                        setContactData({name: "", email: "", mobile: ""})
                        setGuest("")
                        setType("")
                      })
                    }
                    else {
                      swal("Thông báo", "Lỗi không xác định", "error")
                    }
                  }}
                  type="submit"
                  className="btn btn-primary"
                  value="Gửi"
                />
              </p>
            </>
          ) : (
            <div className="show" id="sendmessage">
              Cảm ơn vì bạn đã gửi thông tin, Chúng tôi sẽ liên hệ bạn sau
            </div>
          )}
        </form>
      </div>
    </div>
  );
};


export default AboutUs