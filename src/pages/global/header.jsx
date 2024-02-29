import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import { useForm } from "react-hook-form";
import { PostSchema } from "../../schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
function Header() {
  const navigate = useNavigate();
  const [logined, setLogined] = useState(false);
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  const [category, setCategory] = useState([]);
  const notificationSelector = useSelector((state) => state.notification);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PostSchema),
  });
  useEffect(() => {
    if (token) {
      setLogined(true);
    }
    axios
      .get("http://localhost:3003/categories")
      .then((res) => {
        setCategory(res?.data);
      })
      .catch((err) => {
        console.log(err.response?.data.message, "ERR");
      });
    axios
      .get("http://localhost:3003/users/one", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.response?.data.message, "ERR");
      });
  }, []);

  const onSubmit = (data) => {
    navigate(ROUTE_PATH.SEARCH_RESULT, { state: { name: data.name } });
  };
  console.log("123", notificationSelector);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="d-flex justify-content-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Logo_STU.png"
            style={{ float: "left", marginRight: "7px" }}
            height="50"
          ></img>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li
                className="nav-item"
                onClick={() => navigate(ROUTE_PATH.HOME)}
              >
                <a className="nav-link active">Trang chủ</a>
              </li>
              {/* <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li> */}
              <li className="nav-item">
                {" "}
                <DropdownButton id="dropdown-basic-button" title="Danh mục">
                  {category?.map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() =>
                        navigate(`/${item.slug}`, {
                          state: { slug: item?.slug },
                        })
                      }
                    >
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </li>

              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Danh mục
                </a>
                <ul className="dropdown-menu">
                  {category.map((item, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        onClick={() =>
                          navigate(`/${item.slug}`, {
                            state: { slug: item?.slug },
                          })
                        }
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li> */}
            </ul>
            <form
              noValidate
              className="d-flex"
              role="search"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("name")}
                className="form-control me-2"
                type="text"
                placeholder="Tìm kiếm trên website"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                style={{ width: "130px" }}
              >
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <div className="p-2 bd-highlight">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav  mb-2 mb-lg-0">
                <li className="nav-item" hidden={!logined}>
                  <a
                    className="nav-link active"
                    onClick={() => navigate(ROUTE_PATH.NOTIFICATION)}
                  >
                    <Badge
                      badgeContent={notificationSelector?.unreadQuantity}
                      color="primary"
                    >
                      <NotificationsIcon color="primary" />
                    </Badge>
                  </a>
                </li>
                {/* <li className="nav-item" hidden={!logined}>
                  <a className="nav-link active" href="#">
                    Trò chuyện
                  </a>
                </li> */}
                <li
                  className="nav-item"
                  hidden={!logined}
                  onClick={() => navigate(ROUTE_PATH.POST_INDEX)}
                >
                  <a className="nav-link active">Quản lý tin</a>
                </li>
                <li className="nav-item" hidden={!logined}>
                  <a
                    className="nav-link active"
                    onClick={() =>
                      navigate(ROUTE_PATH.CHAT, {
                        state: { postID1: null, otherID1: null },
                      })
                    }
                  >
                    Nhắn tin
                  </a>
                </li>
                {/* <li className="nav-item dropdown" hidden={!logined}>
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hồ sơ
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate(ROUTE_PATH.EDIT_PROFILE)}
                      >
                        Cài đặt tài khoản
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate(ROUTE_PATH.FOLLOW_INDEX)}
                      >
                        Quản lý theo dõi
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate(ROUTE_PATH.CHANGEPASS)}
                      >
                        Đổi mật khẩu
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate(ROUTE_PATH.TOP_UP)}
                      >
                        Nạp xu
                      </button>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          localStorage.removeItem("token");
                          navigate(ROUTE_PATH.SIGNIN);
                        }}
                      >
                        Đăng xuất
                      </button>
                    </li>
                    <li>
                      <a className="dropdown-item" href="c"></a>
                    </li>
                  </ul>
                </li> */}
                <DropdownButton
                  id="dropdown-basic-button"
                  title={user?.lastName || "Hồ sơ"}
                  hidden={!logined}
                >
                  <Dropdown.Item onClick={() => navigate(ROUTE_PATH.ROLE)}>
                    Vị trí: {user?.role}
                  </Dropdown.Item>
                  <hr className="dropdown-divider" />
                  <Dropdown.Item disabled>Xu: {user?.balance}</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate(ROUTE_PATH.TOP_UP)}>
                    Nạp xu
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate(ROUTE_PATH.TOP_UP_HISTORY)}
                  >
                    Quản lý đơn xu
                  </Dropdown.Item>
                  <hr className="dropdown-divider" />
                  <Dropdown.Item
                    onClick={() => navigate(ROUTE_PATH.EDIT_PROFILE)}
                  >
                    Cài đặt tài khoản
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate(ROUTE_PATH.FOLLOW_INDEX)}
                  >
                    Quản lý theo dõi
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate(ROUTE_PATH.CHANGEPASS)}
                  >
                    Đổi mật khẩu
                  </Dropdown.Item>
                  <hr className="dropdown-divider" />

                  <Dropdown.Item
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("id");
                      navigate(ROUTE_PATH.SIGNIN);
                    }}
                  >
                    Đăng xuất
                  </Dropdown.Item>
                </DropdownButton>
                <button
                  className="nav-item"
                  hidden={logined}
                  onClick={() => navigate(ROUTE_PATH.SIGNIN)}
                >
                  <a className="nav-link active">Đăng nhập</a>
                </button>
                <li
                  className="nav-item"
                  hidden={!logined}
                  onClick={() => navigate(ROUTE_PATH.CREATE_MAIN)}
                >
                  <a className="nav-link active">Đăng tin</a>
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
