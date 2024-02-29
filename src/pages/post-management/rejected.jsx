import React, { useEffect, useState } from "react";
import { ROUTE_PATH } from "../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import "moment/locale/vi";
import moment from "moment";
function Rejected() {
  moment.locale("vi");
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const handleChangePagination = (event, value) => {
    setPage(value);
  };
  const time = (date) => {
    return <>{moment(date).fromNow()}</>;
  };

  const changeStatus1 = async (categoryID, id) => {
    try {
      await axios
        .get(`http://localhost:3003/categories/id?id=${categoryID}`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          navigate(ROUTE_PATH.EDIT + res.data.slug, { state: { id: id } });
        })
        .catch((err) => {
          console.log(err.response.data.message, "ERR");
        });
    } catch (error) {
      console.error("Error hiding post:", error);
    }
  };
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(value);
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost:3003/posts/find-status?status=rejected&page=${
          page || 1
        }&pageSize=10`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setPost(res.data.posts);
        setCount(res.data.totalPage);
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
      });
    axios
      .get("http://localhost:3003/posts/total", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTotal(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
      });
  }, [page]);

  return (
    <div className="container">
      <div style={{ margin: "auto", width: "80%" }}>
        <div className="row">
          <h3>Quản lý tin đăng</h3>
          <div className="col-12">
            <ul className="nav nav-pills nav-fill">
              <li className="col nav-item">
                <button
                  className="nav-link"
                  onClick={() => navigate(ROUTE_PATH.POST_APPROVED)}
                >
                  {`Đang hiển thị (${total[0]})`}
                </button>
              </li>
              <li className="col nav-item">
                <button
                  className="nav-link"
                  onClick={() => navigate(ROUTE_PATH.POST_PENDING)}
                >
                  {`Chờ duyệt (${total[1]})`}
                </button>
              </li>
              <li className="col nav-item">
                <button
                  className="nav-link "
                  onClick={() => navigate(ROUTE_PATH.POST_HIDDEN)}
                >
                  {`Ẩn (${total[2]})`}
                </button>
              </li>
              <li className="col nav-item">
                <button
                  className="nav-link"
                  onClick={() => navigate(ROUTE_PATH.POST_EXPIRED)}
                >
                  {`Hết hạn (${total[3]})`}
                </button>
              </li>
              <li className="col nav-item">
                <button
                  className="nav-link active"
                  onClick={() => navigate(ROUTE_PATH.POST_REJECTED)}
                >
                  {`Bị từ chối (${total[4]})`}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {post?.map((i) => (
          <div className="row">
            <div className="col-12">
              <div className="card mb-3" style={{ maxWidth: "100%" }}>
                <div className="row g-0">
                  <div className="col-md-3">
                    <div style={{ height: "10rem" }}>
                      <img
                        src={"http://localhost:3003/uploads/" + i.image_path[0]}
                        className="http://localhost:3000/uploads/"
                        alt="..."
                        style={{
                          objectFit: "scale-down",
                          objectPosition: "center",
                          height: "100%",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title text-truncate w-50">
                          {i.title}
                        </h5>
                        <div className="d-flex gap-2">
                          <a
                            className="btn btn-info"
                            onClick={() =>
                              navigate(ROUTE_PATH.SELF_POST_DETAILS, {
                                state: { id: i?._id },
                              })
                            }
                          >
                            Xem chi tiết
                          </a>
                          <a
                            className="btn btn-primary"
                            onClick={() => changeStatus1(i?.categoryID, i?._id)}
                          >
                            Sửa bài viết
                          </a>
                        </div>
                      </div>
                      <p className="card-text text-danger">
                        {formatCurrency(i.price)}
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          Thời gian bị từ chối: {time(i.rejectedAt)}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Pagination
          count={count}
          page={page}
          onChange={handleChangePagination}
        />
      </div>
    </div>
  );
}

export default Rejected;
