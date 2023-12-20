import React from "react";

function Motorbike() {
  return (
    <div className="container">
      <form className="row g-3" style={{ margin: "auto", width: "60%" }}>
        <div className="row-12">
          <label
            style={{ marginBottom: "5px", fontWeight: "bold", color: "black" }}
            className="form-label"
          >
            Thông tin chi tiết sản phẩm
          </label>
          <div className="col-12">
            <label htmlFor="inputCategory" className="form-label">
              Danh mục
            </label>
            <select id="inputCategory" className="form-select">
              <option selected>Xe máy</option>
              <option>....</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputCondition" className="form-label">
              Hiện trạng
            </label>
            <select id="inputCondition" className="form-select">
              <option selected=""></option>
              <option>Mới</option>
              <option>Đã qua sử dụng</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputBrand" className="form-label">
              Hãng xe
            </label>
            <select id="inputBrand" className="form-select">
              <option selected></option>
              <option> </option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputBuyyear" className="form-label">
              Năm đăng ký
            </label>
            <select id="inputBuyyear" className="form-select">
              <option selected></option>
              <option> 2000</option>
              <option>Quốc tế</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputType" className="form-label">
              Loại xe
            </label>
            <select id="inputType" className="form-select">
              <option selected=""></option>
              <option value="xemay">Xe máy</option>
              <option value="xeso">Xe số</option>
              <option value="motor">Xe côn/motor</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputOrigin" className="form-label">
              Xuất xứ
            </label>
            <select id="inputOrigin" className="form-select">
              <option selected=""></option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputLength" className="form-label">
              Số Km đã đi
            </label>
            <div class="input-group mb-3">
              <input
                type="number"
                className="form-control"
                id="inputLength"
              ></input>
              <span className="input-group-text">km</span>
            </div>
          </div>
          <div></div>
          <div className="col-12">
            <label htmlFor="inputPrice" className="form-label">
              Giá bán
            </label>
            <div class="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="inputPrice"
                inputMode="decimal"
                placeholder="Nhập giá tiền"
              />
              <span className="input-group-text">đ</span>
            </div>
          </div>
        </div>
        <div className="row-12">
          <label
            style={{ marginBottom: "5px", fontWeight: "bold", color: "black" }}
            className="form-label"
          >
            Thông tin tiêu đề và mô tả chi tiết
          </label>
          <div className="col-12">
            <label htmlFor="Title" className="form-label">
              Nhập tên tiêu đề
            </label>
            <input type="text" className="form-control" id="Title"></input>
          </div>
          <div className="col-12">
            <label htmlFor="Textarea" className="form-label">
              Mô tả chi tiết
            </label>
            <textarea
              class="form-control"
              placeholder="Nhập mô tả chỉ tiết"
              id="Textarea"
            ></textarea>
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Đăng tin
          </button>
        </div>
      </form>
    </div>
  );
}

export default Motorbike;
