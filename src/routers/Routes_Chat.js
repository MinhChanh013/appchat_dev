import React, { useEffect } from "react";

import Mess from "../modules/chat/pages/Mess/Mess";
import Todo from "../modules/chat/pages/Todo/Todo";
import Contact from "../modules/chat/pages/Contact/Contact";
import Setting from "../modules/chat/pages/Setting/Setting";

// api
import { getAllFriend } from "@/apis/friend.api";
import { useQuery } from "@tanstack/react-query";
import { useRoutes } from "react-router-dom";
import { onlineUser } from "../apis/auth.api";


const Routes_Chat = ({ myUser, socket }) => {
  const [friendActive, setFriendActive] = React.useState([]);

  const { data: dataFriend } = useQuery(["getMyFriend"], () => {
    return getAllFriend();
  });

  myUser && socket.emit("join_room", myUser.data.phone);

  useEffect(() => {
    onlineUser();
    socket.emit("active_account", {
      data: {
        list_friend: dataFriend && dataFriend.data.list_friend,
        myActive: myUser && myUser.data.phone,
      },
    });

    socket.emit("connection", {
      data: {
        myPhone: myUser && myUser.data.phone,
      },
    });
  }, [dataFriend, myUser, socket]);

  useEffect(() => {
    socket.on("receive_friendActive", (dataSocket) => {
      dataSocket.list_friend.forEach((course) => {
        if (myUser && course.phone === myUser.data.phone) {
          let dem = 0;
          friendActive.forEach((phoneActive) => {
            phoneActive === dataSocket.myActive && dem++;
          });
          dem === 0 && setFriendActive([...friendActive, dataSocket.myActive]);
        }
      });
    });

    socket.on("receive_removeActive", (dataSocket) => {
      dataSocket.list_friend.forEach((course) => {
        if (myUser && course.phone === myUser.data.phone) {
          const newFriendActive = friendActive.filter(function (e) {
            return e !== dataSocket.myActive;
          });
          setFriendActive(newFriendActive);
        }
      });
    });
  }, [friendActive, myUser, socket]);

  return useRoutes([
    {
      path: "/message",
      element: (
        <Mess socket={socket} friendActive={friendActive} myUser={myUser} />
      ),
    },
    { path: "/notification", element: <Todo  myUser={myUser} socket={socket}/> },
    {
      path: "/contact",
      element: <Contact socket={socket} friendActive={friendActive} myUser={myUser} />,
    },
    { path: "/setting", element: <Setting /> },
  ]);
};

export default Routes_Chat;
