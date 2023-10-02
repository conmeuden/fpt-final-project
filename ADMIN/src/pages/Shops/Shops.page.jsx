import { useDispatch, useSelector } from "react-redux";
import { getAllShops } from "./../../redux/slices/shops.slice";
import { useEffect, useState } from "react";
import SystemAlert from "./../../components/Alert/Alert";
import SmallLoading from "./../../components/Loading/SmallLoading";
import AutoTable from "./../../components/Table/Table";

function ShopPage() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.shops);

  useEffect(() => {
    dispatch(
      getAllShops({
        page,
        limit: 10,
        keyword,
        status,
      })
    );
  }, [dispatch, keyword, page, status]);

  return (
    <>
      {error && <SystemAlert type={"error"} message={error} />}

      <div className="shops-page container-fluid">
        {loading ? (
          <SmallLoading />
        ) : (
          <div className="shops-table">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setKeyword(searchText);
              }}
            >
              <div className="shops-control mb-3">
                <div className="row">
                  <div className="col-sm-12 col-md-6 col-xl-3">
                    <input
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                      type="text"
                      placeholder="Tìm kiếm cửa hàng..."
                      value={searchText}
                      className="form-control"
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 col-xl-3">
                    <select
                      defaultValue={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      className="form-control"
                    >
                      <option value="">Chọn trạng thái</option>
                      <option value="1">Đang hoạt động</option>
                      <option value="0">Ngưng hoạt động</option>
                    </select>
                  </div>
                  <div className="col-2">
                    <button className="btn btn-primary">Tìm kiếm</button>
                  </div>
                </div>
              </div>
            </form>
            {data && (
              <AutoTable
                data={data.shops.rows}
                limit={10}
                count={data.shops.count}
                page={page}
                setPage={setPage}
                link={"/dashboard/shops"}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ShopPage;
