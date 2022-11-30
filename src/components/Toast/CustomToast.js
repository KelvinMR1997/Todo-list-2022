import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { convertDate, today } from "../helpers/helpers";
import ToastContainer from "react-bootstrap/ToastContainer";
function CustomToast({ show, onHide, message, title, warning }) {
  return (
    <Row>
      <Col xs={6}>
        <ToastContainer
          position="bottom-end"
          className="pb-3 mr-3"
          style={{
            marginRight: "2rem",
          }}
        >
          <Toast
            onClose={onHide}
            show={show}
            delay={5000}
            autohide
            animation={true}
            bg={warning ? "warning" : "success"}
            className={warning ? "text-dark" : "text-light"}
          >
            <Toast.Header>
              <strong className="me-auto">{title ?? "Mensaje"}</strong>
              <small>{convertDate(today())}</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
}

export default CustomToast;
