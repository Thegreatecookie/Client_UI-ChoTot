import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "moment/locale/vi";
function TopUpHistory() {
  const [trans, setTrans] = useState();
  const navigate = useNavigate();
  moment.locale("vi");
  const status = (status) => {
    if (status === "Thành công")
      return <td style={{ fontWeight: "bold", color: "green" }}>{status}</td>;
    else if (status === "Từ chối") {
      return <td style={{ fontWeight: "bold", color: "red" }}>{status}</td>;
    } else {
      return <td style={{ fontWeight: "bold" }}>{status}</td>;
    }
  };

  const time = (date) => {
    return <td>{moment(date).fromNow()}</td>;
  };
  useEffect(() => {
    axios
      .get("http://localhost:3003/transactions/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTrans(res.data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error:", error);
      });
  }, []);
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="col-12" style={{ marginTop: "10px", width: "80%" }}>
        <h5>Danh sách đơn nạp xu</h5>
        <table class="table">
          <thead>
            <tr>
              <th style={{ width: "5%" }} scope="col">
                Mã đơn
              </th>
              <th style={{ width: "5%" }} scope="col">
                Số xu
              </th>
              <th style={{ width: "5%" }} scope="col">
                Trạng thái
              </th>
              <th style={{ width: "5%" }} scope="col">
                Thời gian tạo
              </th>
              <th style={{ width: "5%" }} scope="col">
                Thời gian duyệt
              </th>
            </tr>
          </thead>
          <tbody>
            {trans?.map((i) => (
              <tr>
                {" "}
                <th key={i._id}>{i._id}</th>
                <td>{i.value}</td>
                {status(i.status)}
                {time(i.createdAt)}
                {time(i.updatedAt)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopUpHistory;
