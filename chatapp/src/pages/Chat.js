import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";
import './Chat.css'

function Chat() {
    return (
        <Container>
            <Row className="chatContainer">
                <Col md={4} id="SideNav">
                    <Sidebar />
                </Col>
                <Col md={8}>
                    <MessageForm />
                </Col>
            </Row>
        </Container>
    );
}

export default Chat;
