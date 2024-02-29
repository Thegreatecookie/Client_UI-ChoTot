import React, { useEffect, useState } from "react";
import { ROUTE_PATH } from "../../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { ADDRESSAPI, CATEGORYAPI, MOTORBIKEAPI } from "../../../services";
import axios from "axios";
import { useForm } from "react-hook-form";
import { PostSchema } from "../../../schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";

function EditMotorbike() {
  const navigate = useNavigate();
  const [money, setMoney] = useState();
  const [selected, setSelected] = useState(true);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [post, setPost] = useState();
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [images, setImages] = useState([]);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const [inputValue, setInputValue] = useState(0);
  const [formattedCurrency, setFormattedCurrency] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
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
  const handleInputChange = (value) => {
    const inputValue = value.replace(/[^\d]/g, "").substring(0, 9);
    setInputValue(inputValue);
    convertToCurrency(inputValue);
  };
  const convertToCurrency = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });

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
  };
  const currentYear = moment().year();
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
    newFormData.append("postID", id);
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
      .put("http://localhost:3003/posts/update", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res);
        setTimeout(function () {
          window.location.reload();
        }, 10);
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
      });
  };
  const chooseBrand = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedcity = selectedOption.value;
    const brand_id = selectedOption.getAttribute("data-extra-info");
    // console.log(brand_id);
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
    // console.log(city_id);
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
const getPost=()=>[
  axios
      .get(`http://localhost:3003/posts/id?postID=${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const defaultPrice = res?.data?.post.price;
        setPost(res.data.post);
        setValue("categoryID", res.data.post.categoryID);
        setValue("detailsPost.condition", res.data.post.detailsPost.condition);
        setValue("detailsPost.brand", res.data.post.detailsPost?.brand);
        setValue("detailsPost.condition", res.data.post.detailsPost?.condition);
        setValue("detailsPost.model", res.data.post.detailsPost?.model);
        setValue("detailsPost.origin", res.data.post.detailsPost?.origin);
        setValue(
          "detailsPost.registerYear",
          res.data.post.detailsPost?.registerYear
        );
        setValue("detailsPost.type", res.data.post.detailsPost?.type);
        setValue("address.street", res.data.post.address?.street);
        setValue("address.district", res.data.post.address?.district);
        setValue("address.city", res.data.post.address?.city);
        setValue("price", res.data.post.price);
        setInputValue(defaultPrice);
        setValue("title", res.data.post.title);
        setValue("description", res.data.post.description);
        axios
          .get("http://localhost:3003/district", {
            params: {
              name: res.data.post.address.city,
            },
          })
          .then((res) => {
            fetchDistricts(res.data[0]?.id);
          })
          .catch((err) => {
            console.log(err.response.data.message, "ERR");
          });
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
      })
]
  useEffect(() => {
    MOTORBIKEAPI.Brand().then((res) => {
      setBrand(res);
      ADDRESSAPI.Province().then((res) => {
        setProvince(res);
      });
    });
    getPost()
    
  }, []);

  return (
    <div className="container">
      <form
        className="row g-3"
        style={{ margin: "auto" }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
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
              Cập nhập thông tin bài đăng
            </label>
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
              onChange={(x) => setSelected(x.target.value === "true")}
            >
              <option selected hidden value={null}>
                Chọn hiện trạng của xe
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
                <option selected hidden value={null}>
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
                {...register("detailsPost.model")}
                id="inputModel"
                className="form-select"
                name="detailsPost.model"
              >
                {model.map((i) => {
                  let flag = false;
                  if (post?.detailsPost.model === i.label) {
                    flag = true;
                    return (
                      <option selected value={i.label}>
                        {i.label}
                      </option>
                    );
                  }
                  return (
                    <>
                      {!flag && <option selected hidden></option>}
                      <option hidden></option>
                      <option
                        key={i.label}
                        value={i.label}
                        data-extra-info={i.value}
                      >
                        {i.label}
                      </option>
                    </>
                  );
                })}
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
              <option selected hidden value={null}>
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
              <option selected hidden value={null}>
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
                disabled={selected}
              ></input>
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
                {...register("price")}
                name="price"
                type="text"
                value={inputValue}
                onChange={(x) => handleInputChange(x.target.value)}
              />
              <span className="input-group-text"> đ</span>
            </div>
            <p>Tổng tiền:{formattedCurrency}</p>
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
                onChange={chooseCity}
              >
                <option selected hidden value={post?.address.city}>
                  {post?.address.city}
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
                {...register("address.district")}
                id="inputDistrict"
                className="form-select"
                name="address.district"
              >
                {district.map((i) => {
                  let flag = false;
                  if (post?.address.district === i.label) {
                    flag = true;
                    return (
                      <option selected value={i.label}>
                        {i.label}
                      </option>
                    );
                  }
                  return (
                    <>
                      <option hidden></option>
                      <option
                        key={i.label}
                        value={i.label}
                        data-extra-info={i.value}
                      >
                        {i.label}
                      </option>
                    </>
                  );
                })}
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

export default EditMotorbike;
