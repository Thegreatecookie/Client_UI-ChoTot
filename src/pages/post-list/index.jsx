import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, useLocation, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Pagination from "@mui/material/Pagination";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "moment/locale/vi";
import moment from "moment";
function PostList() {
  const [post, setPost] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  moment.locale("vi");
  const time = (date) => {
    return <>{moment(date).fromNow()}</>;
  };
  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  const {
    state: { slug },
  } = useLocation();
  const checkRole = (role) => {
    console.log(role);
    if (role === "Đối tác") {
      return <StoreIcon fontSize="small" color="primary" />;
    } else {
      return <PersonIcon fontSize="small" color="primary" />;
    }
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost:3003/posts/category?slug=${slug}&page=${
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
  }, [location.pathname, page]);

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(value);
  };
  const ListOfPosts = ({ posts }) => {
    return (
      <>
        {posts.map((post, index) => (
          <div
            key={index}
            className="col-2 border rounded cursor-pointer text-center"
            style={{ marginRight: "10px", marginTop: "10px" }}
          >
            <div className="card border-0 mx-auto">
              <img
                src={"http://localhost:3003/uploads/" + post.image_path[0]}
                className="card-img-top"
                style={{
                  width: "10rem",
                  objectFit: "cover",
                  objectPosition: "center",
                  height: "10rem",
                }}
                onClick={() =>
                  navigate(ROUTE_PATH.POST_DETAILS, {
                    state: { id: post._id },
                  })
                }
              />
            </div>
            <div>
              <div className="card-body my-2">
                <p className="card-text fw-bold fs-6">{post?.title}</p>
                <p className="card-text fw-bold text-danger fs-6">
                  {formatCurrency(post?.price)}
                </p>

                <p className="card-text">
                  {checkRole(post.role)} <smal>{post?.userName}</smal>
                  <br />
                  <LocationOnIcon fontSize="small" color="primary" />
                  <small> {post?.address.city}</small>
                  <br />
                  <AccessTimeIcon fontSize="small" color="primary" />{" "}
                  <smal>{time(post?.approvedAt)}</smal>
                </p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="container" style={{ margin: "auto" }}>
      <div
        className="body"
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <div className="row gap-3 my-3" style={{}}>
          <h5 style={{ marginTop: "10px" }}>Hãy chọn bài viết bạn muốn xem</h5>
          <ListOfPosts posts={post} />
        </div>
      </div>

      <Pagination count={count} page={page} onChange={handleChangePagination} />
    </div>
  );
}

export default PostList;
