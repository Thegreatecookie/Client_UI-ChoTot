import React, { useEffect, useState } from "react";
import { ROUTE_PATH } from "../../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { ADDRESSAPI, CATEGORYAPI, MOTORBIKEAPI } from "../../../services";
import axios from "axios";
import { useForm } from "react-hook-form";
import { PostSchema } from "../../../schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import moment from "moment";

function Motorbike() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(true);
  const [category, setCategory] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [images, setImages] = useState([]);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const [inputValue, setInputValue] = useState("");
  const [formattedCurrency, setFormattedCurrency] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PostSchema),
  });
  const {
    state: { id },
  } = useLocation();
  const removeAllPictures = () => {
    setImages([]);
    setFileError(false);
    setFormData(new FormData());

    document.getElementById("formFile").value = "";
  };
  const handleInputChange = (e) => {
    // Lọc chỉ số và giới hạn độ dài chuỗi nhập vào là 9
    const inputValue = e.target.value.replace(/[^\d]/g, "").substring(0, 9);
    setInputValue(inputValue);
    convertToCurrency(inputValue);
  };
  const convertToCurrency = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    // Format the numeric value as currency
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    // Update state with the formatted currency
    setFormattedCurrency(formatter.format(Number(numericValue)));
  };

  const onFileChange = (event) => {
    const files = event.target.files;
    const formDataTemp = new FormData();
    if (files.length > 0) {
      const newImages = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        newImages.push(URL.createObjectURL(file));
        formDataTemp.append("files[]", file, file.name);
      }

      setImages(newImages);
      setFileError(false);
    }
    setFormData(formDataTemp);
    console.log(formDataTemp.get("files[]"));
  };
  const currentYear = moment().year();
  // const twentyYearsAgo = moment().subtract(20, 'years').year();
  const years = generateYears(2000, currentYear);
  function generateYears(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  }

  const onSubmit = (data) => {
    data.price = inputValue;

    const newFormData = new FormData();
    newFormData.append("address", JSON.stringify(data.address));
    newFormData.append("title", data.title);
    newFormData.append("description", data.description);
    newFormData.append("price", data.price);
    newFormData.append("categoryID", data.categoryID);
    newFormData.append("userID", data.userID);
    newFormData.append("detailsPost", JSON.stringify(data.detailsPost));
    for (const [key, value] of newFormData.entries()) {
      formData.append(key, value);
    }
    setFormData(newFormData);
    axios
      .post("http://localhost:3003/posts/create", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTimeout(function () {
          window.location.reload();
        }, 10);
      })
      .catch((err) => {
        return toast.error(err.response.data?.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () =>
            setTimeout(function () {
              window.location.reload();
            }, 1),
          theme: "colored",
          toastId: "new_notification",
        });
      });
  };
  const chooseBrand = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedcity = selectedOption.value;
    const brand_id = selectedOption.getAttribute("data-extra-info");

    fetchModels(brand_id);
  };
  const fetchModels = (brandId) => {
    axios
      .get("http://localhost:3003/models?brand=" + brandId)
      .then((res) => {
        const models =
          res?.data?.map((modeltItem) => {
            const value = modeltItem.value;
            const label = modeltItem.label;
            return { ...modeltItem, label, value };
          }) ?? [];
        setModel(models);
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
      });
  };
  const chooseCity = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedcity = selectedOption.value;
    const city_id = selectedOption.getAttribute("data-extra-info");

    fetchDistricts(city_id);
  };
  const fetchDistricts = (cityId) => {
    axios
      .get("http://localhost:3003/districts?province=" + cityId)
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
    MOTORBIKEAPI.Brand().then((res) => {
      setBrand(res);
      CATEGORYAPI.getCategory().then((res) => {
        const categories =
          res?.map((categoryItem) => {
            const id = categoryItem._id;
            const name = categoryItem.name;
            return { ...categoryItem, id, name };
          }) ?? [];
        setCategory(categories);
        ADDRESSAPI.Province().then((res) => {
          setProvince(res);
        });
      });
    });
  }, []);

  const changeCategory = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedValue = selectedOption.value;
    const id = selectedOption.getAttribute("data-extra-info");
    navigate(ROUTE_PATH.CREATE_MAIN + selectedValue, { state: { id } });
  };

  return (
    <div className="container">
      <form
        className="row g-3"
        style={{ margin: "auto" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-4">
          <label htmlFor="formFile" className="form-label">
            Ảnh sản phẩm<span className="text-danger"> *</span>
          </label>
          <div className="row" style={{ marginBottom: "10px" }}>
            <button
              className="btn btn-danger"
              type="button"
              onClick={removeAllPictures}
            >
              Xóa tất cả ảnh
            </button>
          </div>
          <input
            className="form-control"
            type="file"
            id="formFile"
            name="image_path"
            multiple
            onChange={onFileChange}
          />
          <div className="row">
            {images.map((url, index) => (
              <div
                key={index}
                className="col-6"
                style={{ width: "8rem", height: "8rem" }}
              >
                <img
                  src={url}
                  alt={`image-${index}`}
                  height="100%"
                  width="100%"
                  style={{
                    margin: "3px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            ))}

            {fileError && <div className="text-danger">Vui lòng chọn hình</div>}
          </div>
        </div>

        <br />

        <div className="col-8">
          <div className="col-12">
            <label
              style={{
                marginBottom: "5px",
                fontWeight: "bold",
                color: "black",
              }}
              className="form-label"
            >
              Nhập thông tin bài đăng
            </label>
          </div>
          <div className="col-12">
            <label htmlFor="inputCategory" className="form-label">
              Danh mục
            </label>
            <select
              id="inputCategory"
              className="form-select"
              name="categoryID"
              {...register("categoryID")}
              defaultValue={id}
              onChange={changeCategory}
            >
              <option selected hidden value={id}>
                Xe máy
              </option>
              {/* {category.map((i) => (
                <option  key={i._id} value={i.slug} data-extra-info={i._id}>
                  {i.name}
                </option>
              ))} */}
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="inputCondition" className="form-label">
              Hiện trạng<span className="text-danger"> *</span>
            </label>
            <select
              id="inputCondition"
              className="form-select"
              name="detailsPost.condition"
              {...register("detailsPost.condition")}
              onChange={(x) => setSelected(x.target.value === "Mới")}
            >
              <option selected hidden value="">
                Chọn tình trạng xe
              </option>
              <option value="Mới">Mới</option>
              <option value="Đã qua sử dụng">Đã qua sử dụng</option>
            </select>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="inputBrand">
                Hãng xe <span className="text-danger"> *</span>
              </label>
              <select
                id="inputBrand"
                className="form-select"
                name="detailsPost.brand"
                {...register("detailsPost.brand")}
                defaultValue={null}
                onChange={chooseBrand}
              >
                <option selected hidden value="">
                  Chọn hãng xe
                </option>
                {brand?.map((i) => (
                  <option key={i._id} value={i.label} data-extra-info={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="inputmodel">
                Mẫu xe <span className="text-danger"> *</span>
              </label>
              <select
                id="inputModel"
                className="form-select"
                name="detailsPost.model"
                defaultValue={null}
                {...register("detailsPost.model")}
              >
                <option selected hidden value="">
                  Chọn mẫu xe
                </option>
                {model?.map((i) => (
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
          </div>

          <div className="col-12">
            <label htmlFor="inputBuyyear" className="form-label">
              Năm đăng ký<span className="text-danger"> *</span>
            </label>
            <select
              id="inputBuyyear"
              className="form-select"
              name="detailsPost.registerYear"
              {...register("detailsPost.registerYear")}
              defaultValue={null}
            >
              <option selected hidden value="">
                Chọn năm đăng ký
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputType" className="form-label">
              Loại xe<span className="text-danger"> *</span>
            </label>
            <select
              id="inputType"
              className="form-select"
              name="detailsPost.type"
              {...register("detailsPost.type")}
              defaultValue={null}
            >
              {" "}
              <option selected hidden value="">
                Chọn loại xe
              </option>
              <option value="Xe máy">Xe máy</option>
              <option value="Xe số">Xe số</option>
              <option value="Xe mô tô/Xe côn">Xe mô tô/Xe côn</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputOrigin" className="form-label">
              Xuất xứ
            </label>
            <select
              id="inputOrigin"
              className="form-select"
              name="detailsPost.origin"
              {...register("detailsPost.origin")}
              defaultValue={null}
            >
              <option selected hidden value="">
                Chọn nơi xuất xứ
              </option>
              <option value="Việt Nam"> Việt Nam</option>
              <option value="Mỹ">Mỹ</option>
              <option value="Nhật">Nhật</option>
              <option value="Khác">khác</option>
            </select>
          </div>
          <div className="col-12" hidden={selected}>
            <label htmlFor="inputLength" className="form-label">
              Số Km đã đi<span className="text-danger"> *</span>
            </label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                id="inputLength"
                name="detailsPost.traveled"
                placeholder="Nhập số km đã đi"
                defaultValue={null}
                {...register("detailsPost.traveled")}
                error={!!errors?.password?.message}
                helperText={errors?.confirm_newPassword?.message}
                disabled={selected}
              />
              <span className="input-group-text">km</span>
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="inputPrice" className="form-label">
              Giá bán<span className="text-danger"> *</span>
            </label>
            <div className="input-group mb-3">
              <input
                className="form-control"
                id="inputPrice"
                placeholder="Nhập giá tiền"
                name="price"
                type="text"
                required
                value={formattedCurrency}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="col-12">
            <label
              style={{
                marginBottom: "5px",
                fontWeight: "bold",
                color: "black",
              }}
              className="form-label"
            >
              Thông tin tiêu đề và mô tả chi tiết
            </label>
            <div className="col-12">
              <label htmlFor="Title" className="form-label">
                Nhập tên tiêu đề<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="Title"
                placeholder="Nhập tên tiêu đề"
                name="title"
                {...register("title")}
                defaultValue={null}
                maxLength={50}
              ></input>
            </div>
            <div className="col-12">
              <label htmlFor="Textarea" className="form-label">
                Mô tả chi tiết<span className="text-danger"> *</span>
              </label>
              <textarea
                className="form-control"
                placeholder="Nhập mô tả chỉ tiết"
                id="Textarea"
                name="description"
                {...register("description")}
                defaultValue={null}
                maxLength={100}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <label
              style={{ fontWeight: "bold", color: "black" }}
              className="form-label"
            >
              Nơi bán hàng
            </label>
            <div className="col-4">
              <label htmlFor="inputAddress">
                Địa chỉ nhà<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Nhập địa chỉ và tên đường"
                name="address.street"
                {...register("address.street")}
                defaultValue={null}
              />
            </div>
            <div className="col-4">
              <label htmlFor="inputCity">
                Thành phố<span className="text-danger"> *</span>
              </label>
              <select
                id="inputCity"
                className="form-select"
                name="address.city"
                {...register("address.city")}
                defaultValue={null}
                onChange={chooseCity}
              >
                <option selected hidden value="">
                  Chọn thành phố
                </option>
                {province.map((i) => (
                  <option key={i._id} value={i.label} data-extra-info={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4">
              <label htmlFor="inputDistrict">
                Quận<span className="text-danger"> *</span>
              </label>
              <select
                id="inputDistrict"
                className="form-select"
                name="address.district"
                defaultValue={district?.map[0]}
                {...register("address.district")}
              >
                <option selected hidden value="">
                  Chọn quận
                </option>
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
            <div className="col-12" style={{ marginBottom: "20px" }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: "10px" }}
              >
                Đăng tin
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Motorbike;
