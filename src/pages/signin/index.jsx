import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect } from "react";
import { ROUTE_PATH } from "../../constants/route-path";
import { SignInSchema } from "../../schemas/signin.schema";
import { toast } from "react-toastify";
const Signin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3003/auth/signin", data)
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem("token", response.data.access_token);
          axios
            .get("http://localhost:3003/auth/profile", {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((response) => {
              localStorage.setItem("id", response.data.id);
              
              return toast.success("Đăng nhập thành công", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () =>
                  setTimeout(function () {
                  navigate(ROUTE_PATH.HOME);
                  }, 10),
                toastId: "new_notification",
              });
            })
            .catch((err) => {
              console.log(err.response.data.message, "ERR");
            });
        }
      })
      .catch((err) => {
        console.log(err.response.data.message, "1ERR");
        return toast.error(err.response.data?.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          toastId: "new_notification",
        });
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(-1);
    }
  }, []);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="card"
        style={{
          marginTop: "10px",
          width: "60%",
        }}
      >
        <div className="card-body">
          <form
            className="row g-3"
            style={{ margin: "auto" }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <h4 style={{ marginBottom: "15px" }}>Đăng nhập</h4>
            <div data-mdb-input-init className="form mb-4">
              <label className="form-label" for="email">
                Email
              </label>
              <input
                {...register("email")}
                type="text"
                id="email"
                name="email"
                className="form-control"
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div data-mdb-input-init className="form mb-4">
              <label className="form-label" for="password">
                Mật khẩu
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                name="password"
                className="form-control"
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
                <a href={ROUTE_PATH.REGISTER}>Đăng ký</a>
              </div>
            </div>
            <button
              // data-mdb-ripple-init
              type="submit"
              className="btn btn-primary btn-block"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
