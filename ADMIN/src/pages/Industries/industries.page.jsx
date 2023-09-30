/** @format */
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import {
  getAllIndustries,
  createIndustry,
} from "../../redux/slices/industries.slice";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SmallLoading from "./../../components/Loading/SmallLoading";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import UploadService from "../../services/upload.service";

function IndustriesPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const industriesData = useSelector((state) => state.industries.data);
  const { loading, error } = useSelector((state) => state.industries);

  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Thêm ngành hàng mới start
  const [newIndustry, setNewIndustry] = useState({
    name: "",
    icon: "",
    status: 1,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIndustry({
      ...newIndustry,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const img = await UploadService.singleFile({ file });
    setNewIndustry({
      ...newIndustry,
      icon: img,
    });
  };

  const handleCreateIndustry = async () => {
    console.log("newIndustry: ", newIndustry);
    try {
      // Gọi API để tạo ngành hàng mới
      // const formData = new FormData();
      // formData.append("name", newIndustry.name);
      // formData.append("status", newIndustry.status);
      // formData.append("icon", newIndustry.icon);
      dispatch(createIndustry(newIndustry));
      handleClose();
    } catch (error) {
      console.error("Error creating industry:", error);
    }
  };

  useEffect(() => {
    dispatch(getAllIndustries());
    // console.log("Industry data: ", industriesData);
  }, [dispatch, page]);

  if (loading) {
    return <SmallLoading />;
  }
  if (error) {
    return (
      <div className="container text-center">
        <h1>Đã có lỗi xảy ra...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {/* {loading && <SmallLoading />} */}
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

      {/* Table */}
      <Table className="industry-table" bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Ngành Hàng</th>
            <th>Icon</th>
            <th>Tổng số sản phẩm</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {industriesData?.map((column) => (
            <tr key={column.id}>
              <td>{column.id}</td>
              <td>
                <Link to={`/dashboard/industries/${column.id}`}>
                  {column.name}
                </Link>
              </td>
              <td>
                <Link to={`/dashboard/industries/${column.id}`}>
                  <img
                    src={column.icon}
                    alt={`Icon của ${column.name}`}
                    width="50"
                    height="50"
                  />
                </Link>
              </td>
              <td>
                <i>Tính toán sau</i>
              </td>
              <td>{column.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>

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
        <Modal.Body>
          <form action="">
            <div className="form-group">
              <label htmlFor="">Tên ngành hàng</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên ngành hàng"
                name="name"
                value={newIndustry.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Icon</label>
              <input
                type="file"
                className="form-control"
                name="icon"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Trạng thái</label>
              <select
                className="form-control"
                name="status"
                value={newIndustry.status}
                onChange={handleInputChange}
              >
                <option value="1">Đang sử dụng</option>
                <option value="0">Ngừng sử dụng</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleCreateIndustry}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default IndustriesPage;
