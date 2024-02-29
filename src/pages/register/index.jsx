import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "../../schemas/register.schema";
import { useState } from "react";
import dayjs from "dayjs";
import { ACCOUNTAPI, ADDRESSAPI } from "../../services";
import { useEffect } from "react";
import { ROUTE_PATH } from "../../constants";
import axios from "axios";
import { date } from "yup";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();
  const [valueStart, setValueStart] = useState();
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data) => {
    console.log(data.phone);

    ACCOUNTAPI.Register(data)
      .then((res) => {
        return toast.success("Tạo tài khoản thành công", {
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
            navigate(ROUTE_PATH.SIGNIN);
            }, 10),
          toastId: "new_notification",
        });
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
  };
  const HandleSelectChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedValue = selectedOption.value;
    const city_id = selectedOption.getAttribute("data-extra-info");
    fetchDistricts(city_id);
  };
  const fetchDistricts = (cityId) => {
    axios
      .get("http://localhost:3003/districts", {
        params: {
          province: cityId,
        },
      })
      .then((res) => {
        const districts =
          res?.data?.map((districtItem) => {
            const value = districtItem.value;
            const label = districtItem.label;
            return { ...districtItem, label, value };
          }) ?? [];
        setDistrict(districts);
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
      });
  };
  useEffect(() => {
    ADDRESSAPI.Province()
      .then((res) => {
        setProvince(res);
      })
      .catch((err) => {
        console.log(err.message, "ERR");
      });
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
          margin: "auto",
          width: "60%",
        }}
      >
        <div className="card-body">
          <form
            className="row g-3"
            style={{ margin: "auto", width: "90%" }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <h4 style={{ marginBottom: "15px" }}>Đăng ký tài khoản</h4>
            <div className="col">
              <label htmlFor="inputFirstName">
                Tên <span className="text-danger"> *</span>
              </label>
              <input
                {...register("firstName")}
                type="text"
                className="form-control"
                id="inputFirstName"
                placeholder="Tên"
                name="firstName"
              />{" "}
              {errors.firstName && (
                <p className="error">{errors.firstName.message}</p>
              )}
            </div>
            <div className="col">
              <label htmlFor="inputLastName">
                Họ <span className="text-danger"> *</span>
              </label>
              <input
                {...register("lastName")}
                type="text"
                className="form-control"
                id="inputLastName"
                placeholder="Họ"
                name="lastName"
              />{" "}
              {errors.lastName && (
                <p className="error">{errors.lastName.message}</p>
              )}
            </div>

            <div className="col-12">
              <label htmlFor="inputEmail">
                Email<span className="text-danger"> *</span>
              </label>
              <input
                {...register("email")}
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                name="email"
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="col-12">
              <label htmlFor="inputPassword4">
                Mật khẩu<span className="text-danger"> *</span>
              </label>
              <input
                {...register("password")}
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Mật khẩu"
                name="password"
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            <div className="col-12">
              <label htmlFor="inputPhoneNumber">
                Số điện thoại<span className="text-danger"> *</span>
              </label>
              <input
                {...register("phone")}
                type="text"
                className="form-control"
                id="inputPhoneNumber"
                placeholder="Số điện thoại"
                phone="phone"
              />
              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>
            <div className="col-12">
              <label htmlFor="inputCCID">
                Căn cước công dân<span className="text-danger"> *</span>
              </label>
              <input
                {...register("CCID")}
                type="text"
                className="form-control"
                id="inputCCID"
                placeholder="Căn cước công dân"
                name="CCID"
              />
              {errors.CCID && <p className="error">{errors.CCID.message}</p>}
            </div>
            <div className="col-6">
              <div className="col-12">
                <label htmlFor="birthday">
                  Ngày sinh <span className="text-danger"> *</span>
                </label>
              </div>
              <div className="col-12">
                <input
                  {...register("dateOfBirth")}
                  type="date"
                  id="birthday"
                  min={new Date(
                    Date.now() - 1000 * 60 * 60 * 24 * 365 * 70
                  ).toLocaleDateString("en-ca")}
                  max={new Date(
                    Date.now() - 1000 * 60 * 60 * 24 * 365 * 18
                  ).toLocaleDateString("en-ca")}
                  name="dateOfBirth"
                />
                {errors.dateOfBirth && (
                  <p className="error">{errors.dateOfBirth.message}</p>
                )}
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="inputGender">Giới tính</label>
              <select
                {...register("gender")}
                className="form-select"
                id="inputGender"
              >
                <option hidden></option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="inputCity">Thành phố</label>
              <select
                id="inputCity"
                className="form-select"
                name="address.city"
                {...register("address.city")}
                onChange={HandleSelectChange}
              >
                <option hidden></option>
                {province.map((i) => (
                  <option key={i._id} value={i.label} data-extra-info={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="inputDistrict">Quận</label>
              <select
                id="inputDistrict"
                className="form-select"
                name="address.district"
                {...register("address.district")}
              >
                <option hidden></option>
                {district.map((i) => (
                  <option
                    key={i.label}
                    value={i.label}
                    data-extra-info={i.value}
                  >
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="inputAddress">Địa chỉ nhà</label>
              <input
                {...register("address.street")}
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                name="address.street"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
