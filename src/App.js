import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ROUTE_PATH } from "./constants/route-path";
import Notification from "./notification";
import FollowIndex from "./pages/follow";
import FollowOther from "./pages/follow/other";
import FollowUser from "./pages/follow/user";
import { Template } from "./pages/global/template";
import Home from "./pages/home/index";
import Main from "./pages/post-create";
import Motorbike from "./pages/post-create/motorbike";
import Phone from "./pages/post-create/phone";
import PostDetails from "./pages/post-details/index";
import SelfPostDetails from "./pages/post-details/self";
import EditMotorbike from "./pages/post-edit/motorbike";
import PostList from "./pages/post-list";
import PostIndex from "./pages/post-management";
import Approved from "./pages/post-management/approved";
import Expired from "./pages/post-management/expired";
import Hidden from "./pages/post-management/hidden";
import Pending from "./pages/post-management/pending";
import Rejected from "./pages/post-management/rejected";
import ChangePass from "./pages/profile/change-pass";
import ProfileDetails from "./pages/profile/details";
import EditProfile from "./pages/profile/edit";
import Register from "./pages/register/index";
import Signin from "./pages/signin/index";
import PrivateRoutes from "./utils/PrivateRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchResult from "./pages/search-result";
import TopUp from "./pages/top-up";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Role from "./pages/role";
import Chat from "./chat";
import TopUpHistory from "./pages/top-up/history";
import { useEffect, useState } from "react";
import { socket } from "./socket";
function App() {
  useEffect(() => {
    socket.on("receivedNotify", (data) => {
      toast.info(data, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path={ROUTE_PATH.REGISTER} element={<Register />} />
        <Route path={ROUTE_PATH.SIGNIN} element={<Signin />} />

        <Route path="/" element={<Template />}>
          <Route index element={<Navigate to={ROUTE_PATH.HOME} />} />
          <Route
            path={ROUTE_PATH.DETAILS_PROFILE}
            element={<ProfileDetails />}
          />
          <Route path={ROUTE_PATH.HOME} element={<Home />} />
          <Route path={ROUTE_PATH.POST_DETAILS} element={<PostDetails />} />
          <Route path={ROUTE_PATH.MOTORBIKE} element={<PostList />} />
          <Route path={ROUTE_PATH.PHONE} element={<PostList />} />
          <Route path={ROUTE_PATH.SEARCH_RESULT} element={<SearchResult />} />
          <Route element={<PrivateRoutes />}>
            <Route path={ROUTE_PATH.CREATE_MAIN} element={<Main />} />
            <Route path={ROUTE_PATH.CREATE_MOTORBIKE} element={<Motorbike />} />
            <Route path={ROUTE_PATH.CREATE_PHONE} element={<Phone />} />
            <Route path={ROUTE_PATH.POST_APPROVED} element={<Approved />} />
            <Route path={ROUTE_PATH.POST_EXPIRED} element={<Expired />} />
            <Route path={ROUTE_PATH.POST_HIDDEN} element={<Hidden />} />
            <Route path={ROUTE_PATH.POST_PENDING} element={<Pending />} />
            <Route path={ROUTE_PATH.POST_REJECTED} element={<Rejected />} />
            <Route path={ROUTE_PATH.POST_INDEX} element={<PostIndex />} />

            <Route
              path={ROUTE_PATH.SELF_POST_DETAILS}
              element={<SelfPostDetails />}
            />

            <Route path={ROUTE_PATH.EDIT_PROFILE} element={<EditProfile />} />
            <Route path={ROUTE_PATH.CHANGEPASS} element={<ChangePass />} />
          </Route>
          <Route path={ROUTE_PATH.FOLLOW_INDEX} element={<FollowIndex />} />
          <Route path={ROUTE_PATH.FOLLOW_OTHER} element={<FollowOther />} />
          <Route path={ROUTE_PATH.FOLLOW_USER} element={<FollowUser />} />
          <Route path={ROUTE_PATH.EDIT_MOTORBIKE} element={<EditMotorbike />} />
          <Route path={ROUTE_PATH.NOTIFICATION} element={<Notification />} />

          <Route path={ROUTE_PATH.TOP_UP} element={<TopUp />} />
          <Route path={ROUTE_PATH.ROLE} element={<Role />} />
          <Route path={ROUTE_PATH.CHAT} element={<Chat />} />
          <Route path={ROUTE_PATH.TOP_UP_HISTORY} element={<TopUpHistory />} />
          {/* <Route path={}element={< />}/> */}
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
