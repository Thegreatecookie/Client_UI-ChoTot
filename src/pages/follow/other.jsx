import { auto } from "@popperjs/core";
import React, { useEffect, useState } from "react";
import { ROUTE_PATH } from "../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

function FollowUser() {
  const [follow, setFollow] = useState();
  const navigate = useNavigate();
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState(1);
  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3003/followes/followed`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setFollow(res.data.result);
        console.log(res.data.result);
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
        setTotal(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
        
      });
  }, []);

  return (
    <div className="container">
      <div style={{ margin: "auto", width: "80%" }}>
        <div className="row">
          <h3>Quản lý theo dõi</h3>
          <div className="col-12">
            <ul className="nav nav-pills nav-fill">
              <li className="col nav-item">
                <a className="nav-link " href={ROUTE_PATH.FOLLOW_USER}>
                  {`Đang theo dõi (${total[0]})`}
                </a>
              </li>
              <li className="col nav-item">
                <a className="nav-link active">
                  {`Được theo dõi (${total[1]})`}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {follow?.map((i) => (
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
                          <a
                            className="btn btn-info"
                            // onClick={() => handleClick(i?.categoryID)}
                            onClick={() =>
                              navigate(ROUTE_PATH.DETAILS_PROFILE, {
                                state: { id: i?.id },
                              })
                            }
                          >
                            Xem chi tiết
                          </a>
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
