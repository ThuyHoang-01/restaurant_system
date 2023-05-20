import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import login from "../../api/login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import "./Login.scss";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [roleLogin, setRoleLogin] = useState(0);
  useEffect(() => {
    if (props?.is_login_admin === true) {
      setRoleLogin(() => 3);
    }
    if (props?.is_login_staff === true) {
      setRoleLogin(() => 2);
    } else {
      setRoleLogin(() => 1);
    }
  }, [props]);
  return (
    <div>
      <div
        className={"c-flex-center"}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 999,
          width: "100%",
          height: "100%",
          backgroundImage:
            "url(https://appetizer-client.vercel.app/static/media/bg-login.59c329f0.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <main className="main">
          {(parseInt(roleLogin) === 3 || props?.is_login_admin === true) && (
            <>
              <div className="container">
                <section className="wrapper">
                  <div className="heading">
                    <h1 className="text text-large">Đăng nhập admin</h1>
                    <div name="signin" className="form">
                      <div className="input-control">
                        <label htmlFor="email" className="input-label" hidden>
                          Tài khoản
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          name="email"
                          id="email"
                          className="input-field"
                          placeholder="Email"
                        />
                      </div>
                      <div className="input-control">
                        <label
                          htmlFor="password"
                          className="input-label"
                          hidden
                        >
                          Mật khẩu
                        </label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          name="password"
                          id="password"
                          className="input-field"
                          placeholder="Password"
                        />
                      </div>
                      <div className="input-control">
                        <a
                          href
                          onClick={() => setOpen(() => true)}
                          className="text text-links"
                        >
                          Quên mật khẩu
                        </a>
                        <input
                          onClick={async (e) => {
                            e.preventDefault();
                            const result = await login(email, password);
                            if (result?.login === false) {
                              return swal(
                                "Thông báo",
                                "Đăng nhập thất bại, Email hoặc mật khẩu không chính xác",
                                "error"
                              );
                            } else if (
                              result?.login === true &&
                              result?.isAdmin === true
                            ) {
                              return swal(
                                "Thông báo",
                                "Đăng nhập thành công",
                                "success"
                              )
                                .then(() => Cookies.set("uid", result.id_user))
                                .then(() => navigate("/admin"))
                                .then(() => window.location.reload());
                            } else if (result?.isAdmin !== true) {
                              return swal(
                                "Thông báo",
                                "Đăng nhập thất bại, bạn không có quyền vào trang này",
                                "error"
                              );
                            } else {
                              return swal("Thông báo", "Error");
                            }
                          }}
                          type="submit"
                          name="submit"
                          value={"Login"}
                          className="input-submit"
                          defaultValue="Đăng nhập"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </>
          )}
          {/*  */}
          {parseInt(roleLogin) === 2 && (
            <>
              {open === false && (
                <div className="container">
                  <section className="wrapper">
                    <div className="heading">
                      <h1 className="text text-large">Đăng nhập nhân viên</h1>
                    </div>
                    <div name="signin" className="form">
                      <div className="input-control">
                        <label htmlFor="email" className="input-label" hidden>
                          Địa chỉ email
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          name="email"
                          id="email"
                          className="input-field"
                          placeholder="Email"
                        />
                      </div>
                      <div className="input-control">
                        <label
                          htmlFor="password"
                          className="input-label"
                          hidden
                        >
                          Mật khẩu
                        </label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          name="password"
                          id="password"
                          className="input-field"
                          placeholder="Password"
                        />
                      </div>
                      <div className="input-control">
                        <a
                          href
                          onClick={() => setOpen(() => true)}
                          className="text text-links"
                        >
                          Quên mật khẩu
                        </a>
                        <input
                          onClick={async (e) => {
                            e.preventDefault();
                            const result = await login(email, password);
                            if (result?.login === false) {
                              swal(
                                "Thông báo",
                                "Đăng nhập thất bại, Email hoặc mật khẩu không chính xác",
                                "error"
                              );
                            } else if (
                              result?.login === true &&
                              result?.isEmployee === true
                            ) {
                              swal(
                                "Thông báo",
                                "Đăng nhập thành công",
                                "success"
                              )
                                .then(() => Cookies.set("uid", result.id_user))
                                .then(() => navigate("/staff"))
                                .then(() => window.location.reload());
                            } else if (result?.isEmployee !== true) {
                              return swal(
                                "Thông báo",
                                "Đăng nhập thất bại, bạn không có quyền vào trang này",
                                "error"
                              );
                            } else {
                              swal("Thông báo", "Error");
                            }
                          }}
                          type="submit"
                          name="submit"
                          value={"Login"}
                          className="input-submit"
                          defaultValue="Đăng nhập"
                        />
                      </div>
                    </div>
                    <div className="striped">
                      <span className="striped-line" />
                      <span className="striped-text">Hoặc</span>
                      <span className="striped-line" />
                    </div>
                    <div className="method">
                      <div className="method-control">
                        {/* // eslint-disable-next-line */}
                        <a href="/" className="method-action">
                          <i className="ion ion-logo-google" />
                          <span>Đăng nhập với Google</span>
                        </a>
                      </div>
                      <div className="method-control">
                        <a href="/" className="method-action">
                          <i className="ion ion-logo-facebook" />
                          <span>Đăng nhập với Facebook</span>
                        </a>
                      </div>
                      <div className="method-control">
                        <a href="/" className="method-action">
                          <i className="ion ion-logo-apple" />
                          <span>Đăng nhập với Apple</span>
                        </a>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </>
          )}
          {parseInt(roleLogin) === 1 && props?.is_login_admin !== true && (
            <>
              {open === false && (
                <div className="container">
                  <section className="wrapper">
                    <div className="heading">
                      <h1 className="text text-large">Đăng nhập</h1>
                      <p className="text text-normal">
                        Bạn là người mới?{" "}
                        <span>
                          <Link to={"/signup"} className="text text-links">
                            Tạo tài khoản
                          </Link>
                        </span>
                      </p>
                    </div>
                    <div name="signin" className="form">
                      <div className="input-control">
                        <label htmlFor="email" className="input-label" hidden>
                          Địa chỉ email
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          name="email"
                          id="email"
                          className="input-field"
                          placeholder="Email"
                        />
                      </div>
                      <div className="input-control">
                        <label
                          htmlFor="password"
                          className="input-label"
                          hidden
                        >
                          Mật khẩu
                        </label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          name="password"
                          id="password"
                          className="input-field"
                          placeholder="Password"
                        />
                      </div>
                      <div className="input-control">
                        <a
                          href
                          onClick={() => setOpen(() => true)}
                          className="text text-links"
                        >
                          Quên mật khẩu
                        </a>
                        <input
                          onClick={async (e) => {
                            e.preventDefault();
                            const result = await login(email, password);
                            if (result?.login === false) {
                              swal(
                                "Thông báo",
                                "Đăng nhập thất bại, Email hoặc mật khẩu không chính xác",
                                "error"
                              );
                            } else if (result?.isAdmin === true) {
                              swal(
                                "Thông báo",
                                "Đăng nhập thành công",
                                "success"
                              )
                                .then(() => Cookies.set("uid", result.id_user))
                                .then(() => navigate("/admin"))
                                .then(() => window.location.reload());
                            } else if (result?.login === true) {
                              swal(
                                "Thông báo",
                                "Đăng nhập thành công",
                                "success"
                              )
                                .then(() => Cookies.set("uid", result.id_user))
                                .then(() => navigate("/"))
                                .then(() => window.location.reload());
                            } else {
                              swal("Thông báo", "Error");
                            }
                          }}
                          type="submit"
                          name="submit"
                          value={"Login"}
                          className="input-submit"
                          defaultValue="Đăng nhập"
                        />
                      </div>
                    </div>
                    <div className="striped">
                      <span className="striped-line" />
                      <span className="striped-text">Hoặc</span>
                      <span className="striped-line" />
                    </div>
                    <div className="method">
                      <div className="method-control">
                        <a href="/" className="method-action">
                          <i className="ion ion-logo-google" />
                          <span>Đăng nhập với Google</span>
                        </a>
                      </div>
                      <div className="method-control">
                        <a href="/" className="method-action">
                          <i className="ion ion-logo-facebook" />
                          <span>Đăng nhập với Facebook</span>
                        </a>
                      </div>
                      <div className="method-control">
                        <a href="/" className="method-action">
                          <i className="ion ion-logo-apple" />
                          <span>Đăng nhập với Apple</span>
                        </a>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </>
          )}
          {open === true && <ForgotPassword setOpen={setOpen} />}
        </main>
      </div>
    </div>
  );
};

export default Login;
