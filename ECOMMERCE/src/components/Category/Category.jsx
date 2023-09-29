import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SmallLoading from "../Loading/SmallLoading";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getAllCategories } from "./../../redux/slices/category.slice";
import SystemAlert from "./../Alert/Alert";
import { CategoryService } from "./../../services/category.service";

function Category() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const [categoryParams, setCategoryParams] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status: "",
  });

  const { data, loading, error } = useSelector((state) => state.category);

  const handeCreate = async () => {
    await CategoryService.addCategory({
      name,
      status: 1,
    });
    initData();
    handleClose();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCategoryParams({ ...categoryParams, keyword, status });
  };

  const initData = () => {
    dispatch(getAllCategories(categoryParams));
  };

  useEffect(() => {
    initData();
  }, [categoryParams, dispatch]);

  return (
    <>
      {error && <SystemAlert type={"error"} message={error} />}
      <div className="category-page">
        <div className="category-control">
          <form onSubmit={handleSearch}>
            <div className="row">
              <div className="col-sm-12 col-md-3 col-xl-3">
                <div className="form-group">
                  <input
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                    }}
                    className="form-control"
                    type="text"
                    placeholder="Tìm kiếm danh mục sản phẩm..."
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-3 col-xl-3">
                <div className="form-group">
                  <select
                    defaultValue={status}
                    className="form-control"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="1">Đang sử dụng</option>
                    <option value="0">Ngưng sử dụng</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-12 col-md-3 col-xl-3">
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Tìm kiếm
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleShow}
                  >
                    Thêm mới
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="category-table mt-2">
          {data && data.categories?.rows && (
            <>
              {data.categories.rows.map((item) => (
                <BasicAccordion key={item.id} item={item} />
              ))}

              <Stack spacing={2}>
                <Pagination
                  color="primary"
                  count={Math.ceil(
                    Number(data.categories.count) / Number(data.limit)
                  )}
                  page={data.page}
                  siblingCount={0}
                  onChange={(event, newPage) => {
                    setCategoryParams({ ...categoryParams, page: newPage });
                  }}
                />
              </Stack>
            </>
          )}
          {loading && <SmallLoading />}
        </div>
      </div>
      {show && (
        <ModalCreateCategory
          show={show}
          handleClose={handleClose}
          name={name}
          setName={setName}
          handeCreate={handeCreate}
        />
      )}
    </>
  );
}

function ModalCreateCategory({
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

// eslint-disable-next-line react/prop-types
function BasicAccordion({ item }) {
  return (
    <div className="mt-2">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{item.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="container">
            <div className="row">
              <div className="form-group col-4">
                <input type="text" className="form-control" />
              </div>
              <div className="form-group col-4">
                <select className="form-control">
                  <option value="1">Đang sử dụng</option>
                  <option value="0">Ngưng sử dụng</option>
                </select>
              </div>
              <div className="form-group col-4">
                <button className="btn btn-success">Cập nhật</button>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
export default Category;
