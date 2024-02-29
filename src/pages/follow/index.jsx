import React, { useEffect, useState } from "react";
import { ROUTE_PATH } from "../../constants";
import axios from "axios";

function FollowIndex() {
  const [total, setTotal] = useState([]);
  useEffect(() => {
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
                <a className="nav-link" href={ROUTE_PATH.FOLLOW_USER}>
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
      </div>
    </div>
  );
}

export default FollowIndex;
