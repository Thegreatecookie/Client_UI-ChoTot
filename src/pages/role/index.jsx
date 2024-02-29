import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PostSchema } from "../../schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function Role() {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [time, setTime] = useState();
  const [balance, setBalance] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PostSchema),
  });

  const formatDate = (time) => {
    const formattedSentDate = new Date(time).toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Use 12-hour clock
    });

    return (
      <>
        {" "}
        <small className="text-body-secondary">{formattedSentDate}</small>
      </>
    );
  };
  useEffect(() => {
    axios
      .get("http://localhost:3003/users/one", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTime(res.data?.partnerExpiredAt);
        setBalance(res.data?.balance);
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
      });
  }, []);
  const onSubmit = async (data) => {
    data.time = value;
    if (data) {
      try {
        await axios
          .put("http://localhost:3003/users/changeToPartner", data, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            return toast.success("Gia hạn thành công", {
              position: "top-center",
              autoClose: 3000,
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
          })
          .catch((err) => {
            console.log(err.response.data.message);
            return toast.error(err.response.data?.message, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              toastId: "new_notification",
            });
          });
      } catch {}
    } else {
      return toast.error("Vui lòng chọn gói", {
        position: "top-center",
        autoClose: 1000,
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
    <div
      className="container"
      style={{
        width: "60%",
      }}
    >
      <h5 style={{ marginTop: "20px" }}>Chọn gói tháng bạn muốn mua</h5>
      <p> Số xu hiện có: {balance}</p>
      <p> Thời gian hết hạn gói: {formatDate(time)}</p>
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
                onChange={() => {
                  setValue(2592000000); 
                }}
              />
              <label class="form-check-label" for="flexRadioDefault1">
                1 tháng 100 xu
              </label>
            </div>
          </div>

          <div class="form-check">
            <input
              {...register("value")}
              class="form-check-input"
              type="radio"
              name="value"
              id="flexRadioDefault1"
              value={200}
              onChange={() => {
                setValue(7776000000); 
              }}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              3 tháng 200 xu
            </label>
          </div>
          <div class="form-check">
            <input
              {...register("value")}
              class="form-check-input"
              type="radio"
              name="value"
              id="flexRadioDefault1"
              value={500}
              onChange={() => {
                setValue(15552000000); 
              }}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              6 tháng 500 xu
            </label>
          </div>
          <div class="form-check">
            <input
              {...register("value")}
              class="form-check-input"
              type="radio"
              name="value"
              id="flexRadioDefault1"
              value={900}
              onChange={() => {
                setValue(31536000000); 
              }}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              1 năm 900 xu
            </label>
          </div>
          <button type="submit">Chọn</button>
        </form>
      </div>
    </div>
  );
}

export default Role;
