/** @format */
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { getAllIndustries } from "../../redux/slices/industries.slice";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SmallLoading from "./../../components/Loading/SmallLoading";
// import AutoTable from "./../../components/Table/Table";
import Table from "react-bootstrap/Table";

function IndustriesPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const industriesData = useSelector((state) => state.industries.data);
  const { loading, error } = useSelector((state) => state.industries);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getAllIndustries());
    console.log("Industry data: ", industriesData);
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
              <td>{column.name}</td>
              <td>{column.icon}</td>
              <td>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAmxJREFUSEvN1knITWEYwPHfZyoZUmxkgSQKyYKNBRGZSaKEhWHHgg2yVWSjZMnGkKEQMpQxGykLQwkprGRhKBbG6Pl6Pp2Oe+797v1u8dSte97zvs//md/T4R9Jxz/i+q/BvTEOffAYvyqi1AsT8QPP8LNeNOt5PB+7MQl9U8lX3MMO3M216diLaeiXa9/xEDtxvZYBtcABCUXbGuR/fxq0ucG+fdiVkfiztRb4OFbnjg84jEv5vBAbMaQEe44w5GmuT8BWjMnno1hXPFMGr0FsCrmBRfhSgvTHZczM9WtYUmPfgDR4Ru5bhdNduorgKKLXGIGPGI+3FWEcmJGI1xvwuWLf8Cy0QXiBsbXAs9LLeBf5jdC1Q7ZnzYSuqbgff4oeb8GBJE3Go3ZQs9qjE0LW4lgZHC2yJzcMw7s2gUfiVerahENl8PpC3uYiiqYdshxnUlEUa2eHFEM9Ci8LlRrwdsit7IAYKkPxqQyO53NYlrTo5RM9JEdOj6SOg4g66pRyH4/GAwxGWBj9ebVFeIzcCznj3+Qcf18FjvXZuJLjsFX4PFxMaFwaofNO0YGqSyIOns+h/w1Lm/B8ThZQzPwwPMbsX4Va73YqWh3wCN3NBmEvQuMmW1zVHY0+BCLH0QpxF8fMDuur4GVoGH67ytBG4DjXHXhT0FpVXWVgwM8iLpKy501DmwHH3hU4WYKHITGJopAip3XD252qrvJ8ZQ6V+L4KzyP38YviW1C43Rq2fndyXFYSnp9CwEOa8rTeAGloLeJLJUZhV5vFPG5KWvG4CzAlvX3SFLFiVreio6UzPfG4JWBPc9wjaBz+DfUffB+fR0YAAAAAAElFTkSuQmCC" />
              </td>
              <td>{column.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* {industriesData && (
        <AutoTable
          data={industriesData}
          limit={10}
          count={industriesData.count}
          page={page}
          setPage={setPage}
          link={"/dashboard/industry"}
        />
      )} */}

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
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Icon</label>
              <input type="file" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="">Trạng thái</label>
              <select className="form-control">
                <option value="">Chọn trạng thái</option>
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
          <Button variant="success">Create</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default IndustriesPage;
