import React, { useEffect, useState } from "react";
import { API_PATH, ROUTE_PATH } from "../../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { CATEGORYAPI } from "../../../services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PhoneSchema } from "../../../schemas/phone.schema";
function Phone() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  
  const {
    state: { id },
  } = useLocation();
  const idlayduoc = id;

  useEffect(() => {
    CATEGORYAPI.getCategory().then((res) => {
      const categories =
        res?.map((categoryItem) => {
          const id = categoryItem._id;
          const name = categoryItem.name;
          return { ...categoryItem, id, name };
        }) ?? [];
      setCategory(categories);
    });
  }, []);

  const handleSelect = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedValue = selectedOption.value;
    const id = selectedOption.getAttribute("data-extra-info");
    navigate(ROUTE_PATH.CREATE_MAIN + selectedValue, { state: { id:id,value:selectedValue } });
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PhoneSchema),
    defaultValues: {
      category: id,
    },
  });

  const onSubmit = (data) => {
    data.userID = localStorage.getItem("id");
    console.log("444", data);
  };
  return (
    <div className="container">
      <form
        className="row g-3"
        style={{ margin: "auto", width: "60%" }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="col-12">
          <label
            style={{ marginBottom: "5px", fontWeight: "bold", color: "black" }}
            className="form-label"
          >
            Nhập thông tin bài đăng
          </label>
          <div className="col-12">
            <label htmlFor="inputCategory" className="form-label">
              Danh mục
            </label>
            <select
              id="inputCategory"
              className="form-select"
              name="categoryID"
              defaultValue={id}
              {...register("categoryID")}
              onChange={handleSelect}
            >
              <option selected hidden value={idlayduoc}>
                Điện thoại
              </option>
              {category.map((i) => (
                <option key={i._id} value={i.slug} data-extra-info={i._id}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputCondition" className="form-label">
              Hiện trạng
            </label>
            <select
              id="inputCondition"
              className="form-select"
              name="condition"
              {...register("condition")}
            >
              <option selected=""></option>
              <option value="new">Mới</option>
              <option value="">Đã qua sử dụng (chưa sửa chữa)</option>
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
            <div className="input-group mb-3">
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
              className="form-control"
              placeholder="Nhập mô tả chỉ tiết"
              id="Textarea"
            ></textarea>
          </div>
        </div>
        <div className="col-12">
          <label
            style={{ fontWeight: "bold", color: "black" }}
            className="form-label"
          >
            Nơi bán hàng
          </label>
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
        <div className="col-4">
          <label htmlFor="inputCity">Thành phố</label>
          <select id="inputCity" className="form-control">
            <option selected>Chọn thành phố</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-4">
          <label htmlFor="inputDistrict">Quận</label>
          <select id="inputDistrict" className="form-control">
            <option selected="">Chọn quận</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-4">
          <label htmlFor="inputWard">Phường</label>
          <select id="inputWard" className="form-control">
            <option selected="">Chọn phường</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-12" style={{ marginBottom: "20px" }}>
          <button type="submit" className="btn btn-primary">
            Đăng tin
          </button>
        </div>
      </form>
    </div>
  );
}

export default Phone;
