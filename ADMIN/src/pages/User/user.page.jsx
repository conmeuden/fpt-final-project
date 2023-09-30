import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./../../redux/slices/user.slice";
import { useEffect, useState } from "react";
import SystemAlert from "./../../components/Alert/Alert";
import SmallLoading from "./../../components/Loading/SmallLoading";
import AutoTable from "./../../components/Table/Table";

function UserPage() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      getAllUsers({
        page,
        limit: 10,
        keyword,
      })
    );
  }, [dispatch, keyword, page]);

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
              <div className="col-5">
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
              <button className="btn btn-primary col-2">Tìm kiếm</button>
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
