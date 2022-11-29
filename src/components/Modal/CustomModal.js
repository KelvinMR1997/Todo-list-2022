import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function CustomModal({
  children,
  btnYesEvent,
  btnYesName,
  btnYesDisabled,
  hideCancelButton,
  onHide,
  btnNoEvent,
  btnNoDisabled,
  show,
  size,
  title,
  btnNoName,
}) {
  const mainContent = (
    <div>
      {children}
      <div className="d-flex justify-content-end">
        {!hideCancelButton && (
          <Button
            style={{ marginRight: ".8rem" }}
            onClick={!!btnNoEvent ? btnNoEvent : onHide}
            disabled={btnNoDisabled}
            variant="secondary"
          >
            {btnNoName ?? "Cancelar"}
          </Button>
        )}
        {!!btnYesEvent ? (
          <Button
            variant={btnYesName === "Eliminar" ? "danger" : "primary"}
            onClick={btnYesEvent}
            disabled={btnYesDisabled}
          >
            {btnYesName ?? "Guardar"}
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );

  return (
    <Modal
      onHide={onHide}
      show={show}
      size={size}
      aria-labelledby="contained-modal-title-center"
      centered
    >
      <Modal.Header>
        <h2 className="m-0 m-auto text-secondary">{title}</h2>
      </Modal.Header>
      <Modal.Body>{mainContent}</Modal.Body>
    </Modal>
  );
}

export default CustomModal;
