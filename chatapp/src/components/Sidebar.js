import React, { useContext, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice";
import "./Sidebar.css";

function Sidebar() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, setPrivateMemberMsg, currentRoom } = useContext(AppContext);

    function joinRoom(room, isPublic = true) {
        if (!user) {
            return alert("Please login");
        }
        socket.emit("join-room", room, currentRoom);
        setCurrentRoom(room);

        if (isPublic) {
            setPrivateMemberMsg(null);
        }
        // dispatch for notifications
        dispatch(resetNotifications(room));
    }

    socket.off("notifications").on("notifications", (room) => {
        if (currentRoom != room) dispatch(addNotifications(room));
    });

    useEffect(() => {
        if (user) {
            setCurrentRoom("general");
            getRooms();
            socket.emit("join-room", "general");
            socket.emit("new-user");
        }
    }, []);

    socket.off("new-user").on("new-user", (payload) => {
        setMembers(payload);
    });

    function getRooms() {
        fetch("http://localhost:9000/rooms")
            .then((res) => res.json())
            .then((data) => setRooms(data));
    }

    function orderIds(id1, id2) {
        if (id1 > id2) {
            return id1 + "-" + id2;
        } else {
            return id2 + "-" + id1;
        }
    }

    function handlePrivateMemberMsg(member) {
        setPrivateMemberMsg(member);
        const roomId = orderIds(user._id, member._id);
        joinRoom(roomId, false);

        let ChatList = document.querySelectorAll('.list-group-item');
        let SideNav = document.getElementById("SideNav");
        ChatList.forEach((e) => {
            e.addEventListener('click', () => {
                SideNav.classList.toggle("show")
            })
        })
    }

  
    


    if (!user) {
        return <></>;
    }
    return (
        <>
            <h2 className="chats">Contacts</h2>
            <h2 className="recent-chats">Recent chats</h2>
            {members.map((member) => (
                <ListGroup.Item key={member.id} style={{ cursor: "pointer" }} active={privateMemberMsg?._id == member?._id} onClick={() => handlePrivateMemberMsg(member)}>
                    <Row className="hover-chat">
                        <Col xs={2} className="member-status">
                            {member.status == "online" ? <i className="fas fa-circle sidebar-online-status"></i> : <i className="fas fa-circle sidebar-offline-status"></i>}
                        </Col>
                        <Col xs={9}>
                            {member.name}
                            {member._id === user?._id && " (You)"}
                            {member.status == "offline" && " (Offline)"}
                        </Col>
                        <Col xs={1}>
                            <span className="badge rounded-pill bg-primary">{user.newMessages[orderIds(member._id, user._id)]}</span>
                        </Col>
                       
                    </Row>
                </ListGroup.Item>
            ))}
        </>
    );
}

export default Sidebar;
