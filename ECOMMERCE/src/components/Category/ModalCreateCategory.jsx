import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ModalCreateCategory({
  show,
  handleClose,
  name,
  setName,
  handeCreate,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tạo một danh mục</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="form-gourp">
            <label>Tên danh mục:</label>
            <input
              required
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handeCreate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
