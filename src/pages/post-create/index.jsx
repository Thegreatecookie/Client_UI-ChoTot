import React, { useEffect, useState } from "react";
import { API_PATH, ROUTE_PATH } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { CATEGORYAPI } from "../../services";
function Main() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const handleSelectChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedValue = selectedOption.value;
    const id = selectedOption.getAttribute("data-extra-info");
    navigate(ROUTE_PATH.CREATE_MAIN + selectedValue, { state: { id } });
  };
  useEffect(() => {
    CATEGORYAPI.getCategory().then((res) => {
      const categories =
        res?.map((categoryItem) => {
          const id = categoryItem._id;
          const name = categoryItem.name;
          return { ...categoryItem, id, name };
        }) ?? [];
      setCategory(categories);
    });
  }, []);
  console.log(category);
  return (
    <div className="container">
      <form className="row g-3" style={{ margin: "auto", width: "60%" }}>
        <div className="col-12">
          <label
            style={{ marginBottom: "5px", fontWeight: "bold", color: "black" }}
            className="form-label"
          >
            Chọn danh mục bạn muốn đăng
          </label>
          <div className="col-12">
            <select
              id="Category"
              className="form-select"
              onChange={handleSelectChange}
            >
              <option selected hidden>
                Danh mục tin đăng
              </option>
              {category.map((i) => (
                <option key={i._id} value={i.slug} data-extra-info={i._id}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Main;
