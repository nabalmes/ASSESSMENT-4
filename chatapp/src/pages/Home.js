import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

function Home() {
    return (
        <Row>
        <div className="Home-bg">
            <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
                <div>
                    <h1>Greetings!</h1>
                    <p style={{fontStyle: "italic"}}>"We deliver your message"</p>
                    <LinkContainer to="/login">
                        <Button variant="primary">
                            Get Started <i className="fa-brands fa-rocketchat home-message-icon"></i>
                        </Button>
                    </LinkContainer>
                </div>
            </Col>
            </div>
            <Col md={6} className="home__bg"></Col>
        </Row>
  
    );
}

export default Home;
