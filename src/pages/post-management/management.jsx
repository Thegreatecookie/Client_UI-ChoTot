import { auto } from "@popperjs/core";
import React from "react";

function Management() {
  return (
    <div class="container">
      <div style={{ margin: "auto", width: "80%" }}>
        <div class="row">
          <h3>Quản lý tin đăng</h3>
          <div class="col-12">
            <ul class="nav nav-pills nav-fill">
              <li class="col nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Đang hiển thị
                </a>
              </li>
              <li class="col nav-item">
                <a class="nav-link" href="#">
                  Chờ duyệt
                </a>
              </li>
              <li class="col nav-item">
                <a class="nav-link" href="#">
                  Tin ẩn
                </a>
              </li>
              <li class="col nav-item">
                <a class="nav-link" href="#">
                  Hết hạn
                </a>
              </li>
              <li class="col nav-item">
                <a class="nav-link" href="#">
                  Bị từ chối
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div className="card mb-3" style={{ maxWidth: "100%" }}>
              <div className="row g-0">
                <div className="col-md-3">
                  <div style={{ height: "10rem" }}>
                    <img
                      src="https://xdcs.cdnchinhphu.vn/446259493575335936/2023/2/24/chinh-sach-moi-anh-huong-den-thi-truong-bat-dong-san1602162451-16772104701281575851658.png"
                      className="img-fluid rounded-start"
                      alt="..."
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <div class="d-flex justify-content-between">
                      <h5 class="card-title text-truncate w-50">
                        {" "}
                        111111111111111111111111111111111111111111
                      </h5>
                      <div class="d-flex gap-2">
                        <a class="btn btn-info">Xem</a>
                        <button
                          class="btn btn-outline-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Ẩn tin
                        </button>
                        <button
                          class="btn btn-outline-success"
                          data-bs-toggle="modal"
                          data-bs-target="#promote"
                        >
                          Đẩy tin
                        </button>
                      </div>
                    </div>
                    <p class="card-text text-danger">2000000vnđ</p>
                    <p class="card-text">
                      <small class="text-body-secondary">Thời gian đăng</small>
                    </p>
                    <p class="card-text">
                      <small class="text-body-secondary">
                        Tin đang được đẩy ngày hết hạn
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div className="card mb-3" style={{ maxWidth: "100%" }}>
              <div className="row g-0">
                <div className="col-md-3">
                  <div style={{ height: "10rem" }}>
                    <img
                      src="https://xdcs.cdnchinhphu.vn/446259493575335936/2023/2/24/chinh-sach-moi-anh-huong-den-thi-truong-bat-dong-san1602162451-16772104701281575851658.png"
                      className="img-fluid rounded-start"
                      alt="..."
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <div class="d-flex justify-content-between">
                      <h5 class="card-title text-truncate w-50">
                        1111111111111111111111111111111111111111111111
                      </h5>
                      <div class="d-flex gap-2">
                        <a class="btn btn-info">Xem</a>
                        <button
                          class="btn btn-outline-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Ẩn tin
                        </button>
                        <button
                          class="btn btn-outline-success"
                          data-bs-toggle="modal"
                          data-bs-target="#promote"
                        >
                          Đẩy tin
                        </button>
                      </div>
                    </div>
                    <p class="card-text text-danger">2000000vnđ</p>
                    <p class="card-text">
                      <small class="text-body-secondary">Thời gian đăng</small>
                    </p>
                    <p class="card-text">
                      <small class="text-body-secondary">
                        Tin đang được đẩy ngày hết hạn
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Management;
