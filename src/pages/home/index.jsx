import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row gap-5 my-5">
        <div style={{ marginTop: "20px" }}>
          <h5>Hãy chọn danh mục bạn muốn xem</h5>
        </div>
        {/* <button
          className="col-2 border rounded cursor-pointer text-center"
          onClick={() => navigate("/phone", { state: { slug: "phone" } })}
        >
          <div className="card border-0 mx-auto" style={{ width: "10rem" }}>
            <img
              src="https://cdn.sforum.vn/sforum/wp-content/uploads/2021/05/dien-thoai-cu-cam-ung-smartphone-cu-cho-tot.jpg"
              className="card-img-top"
              style={{
                width: "10rem",
                objectFit: "cover",
                objectPosition: "center",
                height: "10rem",
              }}
            />
          </div>
          <div>
            <div className="card-body my-2">
              <p className="card-text fs-5">Điện thoại</p>
            </div>
          </div>
        </button> */}
        <button
          className="col-2 border rounded cursor-pointer text-center"
          onClick={() =>
            navigate("/motorbike", { state: { slug: "motorbike" } })
          }
        >
          <div className="card border-0 mx-auto" style={{ width: "10rem" }}>
            <img
              src="https://cdn.honda.com.vn/motorbikes/September2023/OLfrtqrQ13j7XpusGRl4.png"
              className="card-img-top"
              style={{
                width: "10rem",
                objectFit: "cover",
                objectPosition: "center",
                height: "10rem",
              }}
            />
          </div>
          <div>
            <div className="card-body my-2">
              <p className="card-text fs-5">Xe máy</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Home;
