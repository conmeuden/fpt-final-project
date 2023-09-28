import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./../../redux/slices/user.slice";
import { useEffect, useState } from "react";
import SystemAlert from "./../../components/Alert/Alert";
import SmallLoading from "./../../components/Loading/SmallLoading";
import AutoTable from "./../../components/Table/Table";

function UserPage() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      getAllUsers({
        page,
        limit: 10,
        keyword,
        role,
        status,
      })
    );
  }, [dispatch, keyword, page, role, status]);

  return (
    <>
      {error && <SystemAlert type={"error"} message={error} />}

      <div className="container">
        {loading && <SmallLoading />}
        <div className="users-table">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setKeyword(searchText);
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
                    placeholder="Tìm kiếm người dùng..."
                    value={searchText}
                    className="form-control"
                  />
                </div>
                <div className="col-3">
                  <select
                    defaultValue={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                    className="form-control"
                  >
                    <option value="">Chọn role</option>
                    <option value="ADMIN">Quản trị viên</option>
                    <option value="SALER">Người bán hàng</option>
                    <option value="CUSTOMER">Người tiêu dùng</option>
                  </select>
                </div>
                <div className="col-3">
                  <select
                    defaultValue={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    className="form-control"
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="1">Đang sử dụng</option>
                    <option value="0">Tài khoản bị khóa</option>
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
              data={data.users.rows}
              limit={10}
              count={data.users.count}
              page={page}
              setPage={setPage}
              link={"/dashboard/users"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default UserPage;
