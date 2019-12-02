import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalComponent({
  handleShow,
  show,
  title,
  children,
  onSave,
  showModalFooter = false
}) {
  return (
    <Modal show={show} size="lg" onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {showModalFooter && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default ModalComponent;
