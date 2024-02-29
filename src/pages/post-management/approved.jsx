import { auto } from "@popperjs/core";
import React, { useEffect, useState } from "react";
import { ROUTE_PATH } from "../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { Button, Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { PostSchema } from "../../schemas";
import "moment/locale/vi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import moment from "moment";
function Approved() {
  moment.locale("vi");
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [ID, setID] = useState();
  const [value, setValue] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PostSchema),
  });

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setID(id);
  };

  const handleChangePagination = (event, value) => {
    setPage(value);
  };
  const onSubmit = async (data) => {
    data.date = value;
    data.id = ID;
    console.log(data);
    if (data.value !== null) {
      await axios
        .post("http://localhost:3003/posts/promote", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          return toast.success("Mua gói thành công", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () =>
              setTimeout(function () {
                getItems();
              }, 10),
            theme: "colored",
            toastId: "new_notification",
          });
        })
        .catch((err) => {
          console.log(err.response.data?.message);
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
  const formatDate = (approved, expired, promoted) => {
    if (!promoted) {
      return (
        <>
          {" "}
          <small className="text-body-secondary">
            Thời gian được duyệt: {moment(approved).fromNow()}
          </small>
          <br />
          <small className="text-body-secondary">
            Thời gian hết hạn: {moment(expired).fromNow()}
          </small>{" "}
        </>
      );
    } else {
      return (
        <>
          {" "}
          <small className="text-body-secondary">
            Thời gian được duyệt: {moment(approved).fromNow()}
          </small>
          <br />
          <small className="text-body-secondary">
            Thời gian hết hạn: {moment(expired).fromNow()}
          </small>
          <br />
          <small
            className="text-body-secondary"
            style={{ fontWeight: "bold"}}
          >
            Thời gian hết hạn đẩy tin: {moment(promoted).diff(moment(), "days")}{" "}
            ngày
          </small>
        </>
      );
    }
  };
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(value);
  };
  const changeStatus = async (postId, value) => {
    try {
      await axios
        .put(
          `http://localhost:3003/posts/change-status/`,
          {
            postID: postId,
            status: value,
          },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          getItems();
        })
        .catch((err) => {
          console.log(err.response.data.message, "ERR");
        });
    } catch (error) {
      console.error("Error hiding post:", error);
    }
  };
  const update = async (categoryID, id) => {
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

  const getItems = () => {
    axios
      .get(
        `http://localhost:3003/posts/find-status?status=approved&page=${
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
  };
  useEffect(() => {
    getItems();
  }, [page]);

  return (
    <div className="container">
      <div style={{ margin: "auto", width: "80%" }}>
        <div className="row">
          <h3>Quản lý tin đăng</h3>
          <div className="col-12">
            <ul className="nav nav-pills nav-fill">
              <li className="col nav-item active">
                <button
                  className="nav-link active"
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
                  className="nav-link"
                  onClick={() => navigate(ROUTE_PATH.POST_HIDDEN)}
                >
                  {`Ẩn (${total[2]})`}
                </button>
              </li>
              <li className="col nav-item">
                <button
                  className="nav-link "
                  onClick={() => navigate(ROUTE_PATH.POST_EXPIRED)}
                >
                  {`Hết hạn (${total[3]})`}
                </button>
              </li>
              <li className="col nav-item">
                <button
                  className="nav-link"
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
                            // onClick={() => handleClick(i?.categoryID)}
                            onClick={() =>
                              navigate(ROUTE_PATH.SELF_POST_DETAILS, {
                                state: { id: i?._id },
                              })
                            }
                          >
                            Xem chi tiết
                          </a>

                          <button
                            className="btn btn-primary"
                            onClick={() => changeStatus(i?._id, "hidden")}
                          >
                            Ẩn tin
                          </button>

                          {
                            <button
                              className="btn btn-success"
                              onClick={() => update(i?.categoryID, i?._id)}
                            >
                              Cập nhật
                            </button>
                          }
                          {
                            <>
                              {" "}
                              <button
                                className="btn btn-warning"
                                onClick={() => handleShow(i._id)}
                              >
                                Đẩy tin
                              </button>
                            </>
                          }
                        </div>
                      </div>
                      <p className="card-text text-danger">
                        {formatCurrency(i.price)}
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          {formatDate(
                            i.approvedAt,
                            i.expiredAt,
                            i.promotedEndAt
                          )}
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
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Chọn gói đẩy tin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div class="form-check">
                  <div
                    style={{
                      margin: "auto",
                      height: "20px",
                    }}
                  >
                    <input
                      {...register("value")}
                      class="form-check-input"
                      type="radio"
                      name="value"
                      id="flexRadioDefault1"
                      value={5}
                      onChange={() => {
                        setValue(86400000);
                      }}
                    />
                    <span>
                      <label
                        style={{ fontWeight: "bold" }}
                        class="form-check-label"
                        for="flexRadioDefault1"
                      >
                        1 ngày
                      </label>{" "}
                      <label style={{ color: "red" }}> Giá: 5 xu</label>
                    </span>
                  </div>
                </div>

                <div class="form-check">
                  <input
                    {...register("value")}
                    class="form-check-input"
                    type="radio"
                    name="value"
                    id="flexRadioDefault1"
                    value={7}
                    onChange={() => {
                      setValue(172800000);
                    }}
                  />
                  <span>
                    <label
                      style={{ fontWeight: "bold" }}
                      class="form-check-label"
                      for="flexRadioDefault1"
                    >
                      2 ngày
                    </label>{" "}
                    <label style={{ color: "red" }}> Giá: 7 xu</label>
                  </span>
                </div>
                <div class="form-check">
                  <input
                    {...register("value")}
                    class="form-check-input"
                    type="radio"
                    name="value"
                    id="flexRadioDefault1"
                    value={10}
                    onChange={() => {
                      setValue(259200000);
                    }}
                  />
                  <span>
                    <label
                      style={{ fontWeight: "bold" }}
                      class="form-check-label"
                      for="flexRadioDefault1"
                    >
                      3 ngày
                    </label>{" "}
                    <label style={{ color: "red" }}> Giá: 10 xu</label>
                  </span>
                </div>

                <Button type="submit">Chọn</Button>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default Approved;
