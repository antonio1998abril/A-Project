import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function RestorePassWordButton({ show, onHide }) {
    const [newPasswordModalShow, setNewPasswordModalShow] = useState(false);
  const handleClose = () => {
    setNewPasswordModalShow(false)
  };
  return (
    <>
      <p onClick={()=> setNewPasswordModalShow(true)} type="button" className="bold">
        or Restore your password
      </p>
      <Modal show={newPasswordModalShow} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Woohoo, you're reading this text in a modal!
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Restore my password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RestorePassWordButton;
