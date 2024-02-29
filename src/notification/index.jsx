import React, { useContext, useEffect, useState } from "react";
import instance, { NOTIFICATION_API } from "../services";
import axios from "axios";
import CircleIcon from "@mui/icons-material/Circle";
import "moment/locale/vi";
import moment from "moment";
function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [hideArray, setHideArray] = useState([]);
  moment.locale("vi");
  const time = (date) => {
    return <td>{moment(date).fromNow()}</td>;
  };
  const changeStatus = (index) => {
    const newHideArray = [...hideArray];
    newHideArray[index] = newHideArray[index] = true;
    setHideArray(newHideArray);
  };
  const markRead = async (id) => {
    try {
      await axios
        .put(
          `http://localhost:3003/notifications/read-one`,
          {
            notificationID: id,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {})
        .catch((err) => {
         
        });
    } catch (error) {
      console.error("Error hiding post:", error);
    }
  };

  const NotificationDisplay = (data) => {
    const itemsPerPage = 30;
    const [visibleItems, setVisibleItems] = useState(itemsPerPage);

    const loadMore = () => {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
    };

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (windowHeight + scrollTop >= documentHeight - 20) {
        // Load more items when scrolling near the bottom (adjust threshold as needed)
        loadMore();
      }
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []); // Add an empty dependency array to run this effect only once

    return (
      <>
        {data?.length ? (
          <table className="table table-hover ">
            <thead>
              <tr>
                <th scope="col">Thông báo </th>
                <th scope="col">Thời gian</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data?.slice(0, visibleItems).map((item, index) => (
                <tr
                  key={item._id}
                  onClick={() => {
                    changeStatus(index);
                    markRead(item._id);
                  }}
                >
                  <th scope="row" className="col-7 ">
                    {item.message}
                  </th>
                  <td className="col-4">{time(item.createdAt)}</td>
                  <td className="col-1">
                    <div hidden={hideArray[index]}>
                      {" "}
                      <CircleIcon color="primary" fontSize="small" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Chưa có thông báo</div>
        )}
      </>
    );
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchNotifications() {
      const notiResponse = await NOTIFICATION_API.GetAll(signal);

      setNotifications(notiResponse);
      setHideArray(notiResponse?.map((item) => item?.status));
    }

    fetchNotifications();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        width: "60%",
      }}
    >
      {NotificationDisplay(notifications)}
      {/* {notifications.map((notification) => (
        <div className="row">{notification.message}</div>
      ))} */}
    </div>
  );
}

export default Notification;
