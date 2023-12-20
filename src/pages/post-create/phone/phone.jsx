import React from "react";

function Phone() {
  return (
    <div className="container">
      <form className="row g-3" style={{ margin: "auto", width: "60%" }}>
        <div className="col-12">
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
              <option selected="Phone">Điện thoại</option>
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
              <option>Đã qua sử dụng (chưa sửa chữa)</option>
              <option>Đẵ qua sử dụng (đã sửa chữa)</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputBrand" className="form-label">
              Hãng
            </label>
            <select id="inputBrand" className="form-select">
              <option selected=""></option>
              <option> </option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputModel" className="form-label">
              Dòng điện thoại
            </label>
            <select id="inputModel" className="form-select">
              <option selected=""></option>
              <option>...</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputColor" className="form-label">
              Màu sắc
            </label>
            <select id="inputColor" className="form-select">
              <option selected=""></option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputStorage" className="form-label">
              Dung lượng
            </label>
            <select id="inputStorage" className="form-select">
              <option selected=""></option>
            </select>
          </div>
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
        <div className="col-12">
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

export default Phone;
