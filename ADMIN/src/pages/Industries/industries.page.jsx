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
import Toastify from "../../components/Toastify/Toastify";

function IndustriesPage() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");

  // const data = useSelector((state) => state.industries.data);
  const { data, loading, error } = useSelector((state) => state.industries);
  const [file, setFile] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [toast, setToast] = useState({ type: "", message: "" });

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
    try {
      dispatch(createIndustry(newIndustry));
      handleClose();
      setToast({ type: "success", message: "Tạo thành công" });
    } catch (error) {
      setToast({ type: "error", message: error.message });
    }
  };

  useEffect(() => {
    dispatch(
      getAllIndustries({
        page,
        limit: 10,
        keyword,
        status,
      })
    );
    console.log("data", data);
  }, [dispatch, keyword, status, page]);

  useEffect(() => {
    if (error) {
      setToast({ type: "error", message: error.message });
    }
  }, [error]);

  // if (loading) {
  //   return <SmallLoading />;
  // }
  // if (error) {
  //   return setToast({ type: "error", message: error.message });
  // }

  return (
    <>
      <div className="row mb-3">
        {loading && <SmallLoading />}
        <div className="col-7">
          <h2>Các ngành hàng trong hệ thống</h2>
        </div>
        <div
          className="col-5 row"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button className="btn btn-primary col-5" onClick={handleShow}>
            Thêm ngành hàng
          </button>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setKeyword(searchText);
          setPage(1);
        }}
      >
        <div className="user-control row mb-3">
          <div className="row">
            <div className="col-3">
              <input
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                type="text"
                placeholder="Tìm kiếm ngành hàng"
                value={searchText}
                className="form-control"
              />
            </div>
            <div className="col-3">
              <select
                defaultValue={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                className="form-control"
              >
                <option value="">Chọn trạng thái</option>
                <option value="1">Đang sử dụng</option>
                <option value="2">Ngừng sử dụng</option>
              </select>
            </div>
            <div className="col-2">
              <button className="btn btn-primary">Tìm kiếm</button>
            </div>
          </div>
        </div>
      </form>

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
          {data?.industries.rows.map((column) => (
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
              <td>
                {column.status === 1 ? (
                  <span style={{ color: "green", fontWeight: "500" }}>
                    Đang sử dụng
                  </span>
                ) : (
                  <span style={{ color: "#FE5000", fontWeight: "500" }}>
                    Ngưng sử dụng
                  </span>
                )}
              </td>
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
      <Toastify type={toast.type} message={toast.message} />
    </>
  );
}

export default IndustriesPage;
