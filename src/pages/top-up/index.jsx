import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostSchema } from "../../schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function TopUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PostSchema),
  });
  const getUser = () => {
    axios
      .get("http://localhost:3003/users/one", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  const onSubmit = async (data) => {
    if (data.value !== null) {
      await axios
        .post("http://localhost:3003/transactions/create", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          return toast.success("Tạo đơn nạp xu thành công", {
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
                window.location.reload();
              }, 10),
            toastId: "new_notification",
          });
          getUser();
        })
        .catch((err) => {
         
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
    } else {
      return toast.error("Vui lòng chọn gói", {
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
    }
  };
  return (
    <div className="container">
      <h5 style={{ marginTop: "20px" }}>Chọn số xu bạn muốn nạp</h5>
      <h5>{`Xu hiện có: ${user?.balance} xu`}</h5>
      <div class="card">
        <div class="card-top" style={{ marginLeft: "20px" }}>
          <h5>Nạp thông qua hình thức chuyển khoản</h5>
          <div>
            <label style={{ fontWeight: "bold" }}>Ngân hàng:</label>{" "}
            <label>Vietinbank</label>
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Số tài khoản:</label>{" "}
            <label>8191238123123</label>
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Tên chủ thẻ:</label>{" "}
            <label>Nguyễn Văn B </label>
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Nội dung nạp:</label>{" "}
            <label>Nạp xu + Số điện thoại </label>
          </div>
        </div>
        <div
          class="card-body"
          style={{
            width: "60%",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div class="form-check">
                <div style={{ margin: "auto", height: "20px" }}>
                  <input
                    {...register("value")}
                    class="form-check-input"
                    type="radio"
                    name="value"
                    id="flexRadioDefault1"
                    value={100}
                  />
                  <span>
                    <label
                      style={{ fontWeight: "bold" }}
                      class="form-check-label"
                      for="flexRadioDefault1"
                    >
                      Nạp 100 xu
                    </label>{" "}
                    <label style={{ color: "red" }}> Giá: 100.000 VND</label>
                  </span>
                </div>
              </div>

              <div class="form-check">
                <input
                  {...register("value")}
                  class="form-check-input"
                  type="radio"
                  name="value"
                  id="flexRadioDefault1"
                  value={300}
                />
                <span>
                  <label
                    style={{ fontWeight: "bold" }}
                    class="form-check-label"
                    for="flexRadioDefault1"
                  >
                    Nạp 300 xu
                  </label>{" "}
                  <label style={{ color: "red" }}> Giá: 200.000 VND</label>
                </span>
              </div>
              <div class="form-check">
                <input
                  {...register("value")}
                  class="form-check-input"
                  type="radio"
                  name="value"
                  id="flexRadioDefault1"
                  value={500}
                />
                <span>
                  <label
                    style={{ fontWeight: "bold" }}
                    class="form-check-label"
                    for="flexRadioDefault1"
                  >
                    Nạp 500 xu
                  </label>{" "}
                  <label style={{ color: "red" }}> Giá: 300.000 VND</label>
                </span>
              </div>
              <div class="form-check">
                <input
                  {...register("value")}
                  class="form-check-input"
                  type="radio"
                  name="value"
                  id="flexRadioDefault1"
                  value={1000}
                />
                <span>
                  <label
                    style={{ fontWeight: "bold" }}
                    class="form-check-label"
                    for="flexRadioDefault1"
                  >
                    Nạp 1000 xu
                  </label>{" "}
                  <label style={{ color: "red" }}> Giá: 500.000 VND</label>
                </span>
              </div>
              <button type="submit">Chọn</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopUp;
