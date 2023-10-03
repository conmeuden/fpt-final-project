import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SmallLoading from "../Loading/SmallLoading";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getAllCategories } from "./../../redux/slices/category.slice";
import SystemAlert from "./../Alert/Alert";
import { CategoryService } from "./../../services/category.service";
import ModalCreateCategory from "./ModalCreateCategory";
import CategoryDetail from "./CategoryDetail";

function Category() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const [categoryParams, setCategoryParams] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status: "",
  });

  const { data, loading, error } = useSelector((state) => state.category);

  const handeCreate = async () => {
    if (name) {
      await CategoryService.addCategory({
        name,
        status: 1,
      });
      initData();
      handleClose();
    }
  };

  const handeUpdate = async (id, category) => {
    if (category.name) {
      await CategoryService.updateCategory({
        id,
        category,
      });
      initData();
    }
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
      {error}
      {error && <SystemAlert type={"error"} message={error} />}
      <div className="category-page col-sm-12 col-md-12 col-xl-7">
        <div className="category-control">
          <form onSubmit={handleSearch}>
            <div className="row">
              <div className="col-sm-12 col-md-4 col-xl-4">
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
              <div className="col-sm-12 col-md-4 col-xl-4">
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
              <div className="col-sm-12 col-md-4 col-xl-4">
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {
                      setCategoryParams({
                        ...categoryParams,
                        keyword,
                        status,
                      });
                    }}
                  >
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
        <div className="category-table mt-2 ">
          {!loading ? (
            <>
              {data && data.categories?.rows && (
                <>
                  {data.categories.rows.map((item) => (
                    <CategoryDetail
                      key={item.id}
                      item={item}
                      handeUpdate={handeUpdate}
                    />
                  ))}

                  <div className="category-pagination mt-3">
                    <Stack spacing={2}>
                      <Pagination
                        color="primary"
                        count={Math.ceil(
                          Number(data.categories.count) / Number(data.limit)
                        )}
                        page={data.page}
                        siblingCount={0}
                        onChange={(event, newPage) => {
                          setCategoryParams({
                            ...categoryParams,
                            page: newPage,
                          });
                        }}
                      />
                    </Stack>
                  </div>
                </>
              )}
            </>
          ) : (
            <SmallLoading />
          )}
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

export default Category;
