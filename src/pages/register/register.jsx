import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
function Register() {
  return (
    <div class="container">
      <form className="row g-3" style={{ margin: "auto", width: "60%" }}>
        <div className="col">
          <label htmlFor="inputFirstName">Họ</label>
          <input
            type="text"
            className="form-control"
            id="inputFirstName"
            placeholder="Họ"
          ></input>
        </div>
        <div className="col">
          <label htmlFor="inputLastName">Tên</label>
          <input
            type="text"
            className="form-control"
            id="inputLastName"
            placeholder="Tên"
          ></input>
        </div>

        <div className="col-12">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Email"
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputPassword4">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Password"
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputPhoneNumber">Số điện thoại</label>
          <input
            type="text"
            className="form-control"
            id="inputPhoneNumber"
            placeholder="Số điện thoại"
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputCCID">Căn cước công dân</label>
          <input
            type="text"
            className="form-control"
            id="inputCCID"
            placeholder="Căn cước công dân"
          />
        </div>
        <div className="col-12">
          <label>Ngày sinh</label>
        </div>
        <div className="col-12">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress">Địa chỉ nhà</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="inputCity">Thành phố</label>
          <select id="inputCity" className="form-control">
            <option selected>Chọn thành phố</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputDistrict">Quận</label>
          <select id="inputDistrict" className="form-control">
            <option selected="">Chọn quận</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="inputWard">Phường</label>
          <select id="inputWard" className="form-control">
            <option selected="">Chọn phường</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-md-2">
          <button
            style={{ marginTop: "10px" }}
            type="submit"
            className="btn btn-primary"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
