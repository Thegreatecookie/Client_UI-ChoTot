import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function SelfPostDetails() {
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [image, setImage] = useState([]);
  const [user, setUser] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [objCategory, setObjCategory] = useState(null);
  const [show, setShow] = useState(true);
  const {
    state: { id },
  } = useLocation();

  const DetailPost = ({ objCategory }) => {
    return (
      <>
        {Object.keys(objCategory).map((key) => (
          <div key={key} className="col-6">
            <span>{mapCategoryToDisplayName(key)}</span>: {objCategory[key]}
          </div>
        ))}
      </>
    );
  };
  const mapCategoryToDisplayName = (category) => {
    switch (category) {
      case "typePost":
        return "Loại bài đăng ";
      case "condition":
        return "Tình trạng ";
      case "brand":
        return "Hãng ";
      case "model":
        return "Mẫu ";
      case "origin":
        return "Xuất xứ ";
      case "registerYear":
        return "Năm đăng ký ";
      case "type":
        return "Loại ";
      case "traveled":
        return "Đã di chuyển(km)";
      // case'' :
      // return '';
      // case'' :
      // return '';
      // case'' :
      // return '';
      // case'' :
      // return '';
      // case'' :
      // return '';
      default:
        return category;
    }
  };
  const Carousel = ({ items }) => {
    console.log(items)
    const handlePrev = () => {
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? items.length - 1 : prevIndex - 1
      );
    };
    const handleNext = () => {
      setActiveIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    };
    return (
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" style={{}}>
          {items?.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <img
                src={"http://localhost:3003/uploads/"+item}
                alt={`Slide ${index}`}
                style={{
                  objectFit: "scale-down",
                  objectPosition: "center",
                  height: "22rem",
                  width: "80%",
                }}
              />
            </div>
          ))}
          <a
            className="carousel-control-prev"
            role="button"
            data-slide="prev"
            style={{
              backgroundColor: "#808080",
              width: "10%",
            }}
            onClick={handlePrev}
          >
            <span className="carousel-control" aria-hidden="true"></span>
            <span className="sr-only">Trước</span>
          </a>
          <a
            className="carousel-control-next"
            role="button"
            data-slide="next"
            style={{
              backgroundColor: "#808080",
              width: "10%",
            }}
            onClick={handleNext}
          >
            <span className="carousel-control" aria-hidden="true"></span>
            <span className="sr-only">Sau</span>
          </a>
        </div>
      </div>
    );
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3003/posts/id?postID=${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setImage(res.data.post.image_path);
        setPost(res.data.post);
        setObjCategory(res.data.post.detailsPost);
        setUser(res.data.user);

        if (res.data.post.status == "rejected") {
          setShow(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
        
      });
  }, []);

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(value);
  };
  return (
    <div className="body">
      <div
        className="container text-center"
        style={{ marginTop: "10px", width: "90%" }}
      >
        <div className="row">
          <div className="col-2 ">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate(-1)}
            >
              <ChevronLeftIcon/>
              Trở về
            </button>
          </div>
          <div className="col-7">
            <div className="card">
              <Carousel items={image} />
              <div className="card-body text-start">
                <h4 className="card-title mt-3">{post?.title}</h4>
                <h5 className="card-title text-danger mb-3">
                  {formatCurrency(post?.price)}
                </h5>
                <h5>Mô tả</h5>
                <p className="card-text">{post?.description}</p>
                <div className="row gy-2">
                  <h5>Thông tin sản phẩm </h5>
                  {objCategory ? (
                    <DetailPost objCategory={objCategory} />
                  ) : (
                    <p>Loading...</p>
                  )}
                  {
                    <div className="col-6">
                      <span>
                        Địa chỉ bán: {post?.address.street},{" "}
                        {post?.address.district}, {post?.address.city}
                      </span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="col-3" hidden={show}>
            <div className="card">
              <ul className="list-group list-group-flush text-start">
                <li className="list-group-item">
                  <div className="d-flex gap-3 align-items-center">
                    <span>
                      <span>Lý do bị từ chối </span>
                    </span>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex gap-3 align-items-center">
                    <textarea
                      className="form-control"
                      disabled
                      defaultValue={post?.reason}
                    ></textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelfPostDetails;
