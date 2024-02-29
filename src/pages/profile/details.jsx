import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ROUTE_PATH } from "../../constants";
import Pagination from "@mui/material/Pagination";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import { checkToken } from "../../utils";
import { toast } from "react-toastify";
function ProfileDetails() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [post, setPost] = useState([]);
  const [total, setTotal] = useState([]);
  const [hide, setHide] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const handleChangePagination = (value) => {
    setPage(value);
  };

  const {
    state: { id },
  } = useLocation();

  const handleFollow = async () => {
    if (!localStorage.getItem("id")) {
      return toast.error("Yêu cầu đăng nhập", {
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
    } else {
      try {
        await axios
          .post(
            `http://localhost:3003/followes/create`,
            {
              followedID: id,
            },
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            setHide(!hide);
          })
          .catch((err) => {
            console.log(err.response.data.message, "ERR");
          });
      } catch (error) {
        console.error("Error hiding post:", error);
      }
    }
  };
  const handleUnfollow = async () => {
    try {
      await axios
        .delete(`http://localhost:3003/followes/delete?followedID=${id}`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setHide(!hide);
        })
        .catch((err) => {
          console.log(err.response.data.message, "ERR");
        });
    } catch (error) {
      console.error("Error hiding post:", error);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3003/users/id/?id=${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res?.data);
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
      });
    axios
      .get(`http://localhost:3003/posts/total1?userID=${id}`)
      .then((res) => {
        console.log(res.data);
        setTotal(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
      });
    axios
      .get(
        `http://localhost:3003/posts/find-status1?userID=${id}&status=approved&page=${
          page || 1
        }&pageSize=6`
      )
      .then((res) => {
        console.log("psots", res.data);
        setPost(res.data.posts);
        setCount(res.data.totalPage);
      })
      .catch((err) => {
        console.log(err.response.data?.message, "ERR");
      });
    axios
      .get(`http://localhost:3003/followes/check-follow?id=${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setHide(res.data);
      })
      .catch((err) => {
        console.log(err.response.data?.message, "ERR");
      });
  }, [page]);
  console.log(post);
  const ListOfPosts = ({ posts }) => {
    return (
      <>
        {posts?.map((post, index) => (
          <div
            key={index}
            className="col-3 border rounded cursor-pointer text-center"
          >
            <div
              className="card border-0 mx-auto text-center"
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
              }}
              onClick={() =>
                navigate(ROUTE_PATH.POST_DETAILS, {
                  state: { id: post._id },
                })
              }
            >
              <img
                src={"http://localhost:3003/uploads/" + post.image_path[0]}
                className="card-img-top"
                style={{
                  width: "5rem",
                  objectFit: "cover",
                  objectPosition: "center",
                  height: "5rem",
                }}
              />
            </div>
            <div>
              <div className="card-body my-2">
                <p className="card-text fw-bold fs-6">{post?.title}</p>
                <p className="card-text fw-bold text-danger fs-6">
                  {formatCurrency(post?.price)}
                </p>
                {/* {formatDate(post?.approvedAt)} */}
                <p className="card-text">
                  {" "}
                  <LocationOnIcon fontSize="small" color="primary" />
                  <small> {post?.address.city}</small>{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(value);
  };
  return (
    <div
      className="container text-center"
      style={{
        marginTop: "10px",
        width: "80%",
      }}
    >
      <div className="row">
        <div className="col-4">
          <div className="card">
            <ul className="list-group list-group-flush text-start">
              <li className="list-group-item">
                <div className="d-flex gap-2 align-items-center">
                  <AccountCircleIcon />
                  <div class="col-10">
                    <span>
                      <span>{user?.firstName + " " + user?.lastName}</span>
                    </span>
                  </div>
                  <div class="col-2">
                    {" "}
                    <FavoriteBorderIcon
                      hidden={hide}
                      sx={{ color: pink[500] }}
                      onClick={() => {
                        handleFollow();
                      }}
                    />
                    <FavoriteIcon
                      hidden={!hide}
                      sx={{ color: pink[500] }}
                      onClick={() => {
                        handleUnfollow();
                      }}
                    />
                  </div>
                </div>

                {/* <div className="d-flex gap-3 align-items-center">
                  <span>
                    <span>Theo dõi</span>
                    <span style={{ position: "" }}>
                      <FavoriteBorderIcon />
                    </span>
                  </span>
                </div> */}
              </li>

              <li className="list-group-item">
                <div className="d-flex gap-2 align-items-center">
                  <EmailIcon />
                  <span>{user?.email}</span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex gap-2 align-items-center">
                  <PhoneAndroidIcon />
                  <span>{user?.phone}</span>
                </div>
              </li>

              <li className="list-group-item">
                <div className="d-flex gap-2 align-items-center">
                  <LocationOnIcon />
                  <span>
                    {user?.address.street +
                      " " +
                      user?.address.district +
                      " " +
                      user?.address.city}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="col-12">
              <ul className="nav nav-pills nav-fill">
                <li className="col nav-item">
                  <a className="nav-link active">
                    {`Đang hiển thị (${total[0]})`}
                  </a>
                </li>
              </ul>
              <ul>
                {" "}
                <div className="row gap-3 my-3">
                  <ListOfPosts posts={post} />
                </div>
                <Pagination
                  count={count}
                  page={page}
                  onChange={handleChangePagination}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
