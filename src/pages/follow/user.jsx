import { auto } from "@popperjs/core";
import React, { useEffect, useState } from "react";
import { ROUTE_PATH } from "../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { pink } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function FollowUser() {
  const [follow, setFollow] = useState();
  const navigate = useNavigate();
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState(1);
  const [hideArray, setHideArray] = useState([]);
  const handleChangePagination = (event, value) => {
    setPage(value);
  };
  const handleFollow = async (id) => {
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
        .then((res) => {})
        .catch((err) => {
          console.log(err.response.data.message, "ERR");
          
        });
    } catch (error) {
      console.error("Error hiding post:", error);
    }
  };
  const handleUnfollow = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3003/followes/delete?followedID=${id}`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err.response.data.message, "ERR");
          
        });
    } catch (error) {
      console.error("Error hiding post:", error);
    }
  };
  const toggleHide = (index) => {
    const newHideArray = [...hideArray];
    newHideArray[index] = !newHideArray[index];
    setHideArray(newHideArray);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3003/followes/follow`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setFollow(res?.data.result);
        setHideArray(Array(res?.data.result.length).fill(true));
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
        
      });
    axios
      .get("http://localhost:3003/followes/total", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTotal(res?.data)
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
        
      });
  }, [page]);

  return (
    <div className="container">
      <div style={{ margin: "auto", width: "80%" }}>
        <div className="row">
          <h3>Quản lý theo dõi</h3>
          <div className="col-12">
            <ul className="nav nav-pills nav-fill">
              <li className="col nav-item">
                <a className="nav-link active">
                  {`Đang theo dõi (${total[0]})`}
                </a>
              </li>
              <li className="col nav-item">
                <a className="nav-link" href={ROUTE_PATH.FOLLOW_OTHER}>
                  {`Được theo dõi (${total[1]})`}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {follow?.map((i, index) => (
          <div className="row">
            <div className="col-12">
              <div className="card mb-3" style={{ maxWidth: "100%" }}>
                <div className="row g-0">
                  <div className="col-md-11">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title text-truncate w-50">
                          {i.firstName + " " + i.lastName}
                        </h5>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-info"
                            // onClick={() => handleClick(i?.categoryID)}
                            onClick={() =>
                              navigate(ROUTE_PATH.DETAILS_PROFILE, {
                                state: { id: i?.id },
                              })
                            }
                          >
                            Xem chi tiết
                          </button>
                          <FavoriteBorderIcon
                            fontSize="large"
                            key={index}
                            hidden={hideArray[index]}
                            sx={{ color: pink[500] }}
                            onClick={() => {
                              toggleHide(index);
                              handleFollow(i?.id);
                            }}
                          />
                          <FavoriteIcon
                            fontSize="large"
                            key={index}
                            hidden={!hideArray[index]}
                            sx={{ color: pink[500] }}
                            onClick={() => {
                              toggleHide(index);
                              handleUnfollow(i?.id);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FollowUser;
