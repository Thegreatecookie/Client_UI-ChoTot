import { Icon } from "@mui/material";
import React from "react";

function Header() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div className="d-flex justify-content-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Logo_STU.png"
            style={{ float: "left", marginRight: "7px" }}
            height="50"
          ></img>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav  mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Trang chủ
                </a>
              </li>
              {/* <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li> */}
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Danh mục
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="a">
                      Laptop
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="b">
                      Điện thoại
                    </a>
                  </li>
                  {/* <li>
                  <hr class="dropdown-divider" />
                </li> */}
                  {/* <li>
                  <a class="dropdown-item" href="c">
                    
                  </a>
                </li> */}
                </ul>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success"
                type="submit"
                style={{ width: "130px" }}
              >
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>

        <div class="d-flex justify-content-end">
          <div class="p-2 bd-highlight">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav  mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Thông báo
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Trò chuyện
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Đơn hàng
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="a">
                        Đơn mua
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="b">
                        Đơn bán
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hồ sơ
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="a">
                        Cài đặt tài khoản
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="b">
                        Nạp xu
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" href="b">
                        Đăng xuất
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="c"></a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Đăng nhập/Đăng ký
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Đăng tin
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
