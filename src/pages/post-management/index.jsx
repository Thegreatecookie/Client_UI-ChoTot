import React, { useEffect, useState } from "react";
import { ROUTE_PATH } from "../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Postindex() {
  const [total, setTotal] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3003/posts/total", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTotal(res?.data);
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
      });
  }, []);

  return (
    <div className="container">
      <div style={{ margin: "auto", width: "80%" }}>
        <div className="row">
          <h3>Quản lý tin đăng</h3>
          <div className="col-12">
            <ul className="nav nav-pills nav-fill">
              <li className="col nav-item">
                <button className="nav-link" onClick={()=>navigate(ROUTE_PATH.POST_APPROVED)}>
                  {`Đang hiển thị (${total[0]})`}
                </button>
              </li>
              <li className="col nav-item">
                <button className="nav-link" onClick={()=>navigate(ROUTE_PATH.POST_PENDING)} >
                  {`Chờ duyệt (${total[1]})`}
                </button>
              </li>
              <li className="col nav-item">
                <button className="nav-link" onClick={()=>navigate(ROUTE_PATH.POST_HIDDEN)}>
                  {`Ẩn (${total[2]})`}
                </button>
              </li>
              <li className="col nav-item">
                <button className="nav-link" onClick={()=>navigate(ROUTE_PATH.POST_EXPIRED)}>
                  {`Hết hạn (${total[3]})`}
                </button>
              </li>
              <li className="col nav-item">
                <button className="nav-link" onClick={()=>navigate(ROUTE_PATH.POST_REJECTED)}>
                  {`Bị từ chối (${total[4]})`}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Postindex;
