/** @format */
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { getAllIndustries } from "../../redux/slices/industries.slice";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function IndustriesPage() {
  const dispatch = useDispatch();
  const industriesData = useSelector((state) => state.industries.data);
  const { loading, error } = useSelector((state) => state.industries);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Industry Name", width: 160 },
    { field: "icon", headerName: "Icon", width: 80 },
    { field: "status", headerName: "Status", width: 80 },
    { field: "totalProducts", headerName: "Total Products", width: 160 },
  ];

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getAllIndustries());
    console.log("Industry data: ", industriesData);
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...!</h1>;
  }
  if (error) {
    return (
      <div className="container text-center">
        <h1>Đã có lỗi xảy ra...</h1>
      </div>
    );
  }

  const gridData = industriesData?.map((industry) => ({
    id: industry.id,
    name: industry.name,
    icon: industry.icon,
    status: industry.status,
    totalProducts: "...",
  }));

  return (
    <>
      <div className="row">
        <div className="col-8">
          <h2>Các ngành hàng trong hệ thống</h2>
        </div>
        <div
          className="col-4"
          style={{ display: "flew", justifyContent: "end" }}
        >
          <button className="btn btn-primary" onClick={handleShow}>
            Thêm ngành hàng
          </button>
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <DataGrid
          className="data-grid"
          rows={gridData}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>

      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo Ngành Hàng Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>🦖🦖🦖🦖🦖🦖🦖🦖🦖🦖🦖🦖🦖</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success">Create</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default IndustriesPage;
