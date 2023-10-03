import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SystemAlert from "./../../components/Alert/Alert";
import SmallLoading from "./../../components/Loading/SmallLoading";
import AutoTable from "./../../components/Table/Table";
import { getAllBlogs } from "../../redux/slices/blog.slice";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
function BlogPage() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [keyword, setKeyword] = useState("");
  const { data, loading, error  } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

 

  
  useEffect(() => {
    dispatch(
      getAllBlogs({
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
                <div className="col-2">
                  <button className="btn btn-primary">Tìm kiếm</button>
                </div>
              </div>
            </div>
          </form>
          <div>
          <Link to={'/dashboard/blogs/create'}>
           <Button  variant="primary">Thêm</Button>
          </Link>
          </div>
          
          {data && (
            <AutoTable
              data={data.blogs.rows}
              limit={10}
              count={data.blogs.count}
              page={page}
              setPage={setPage}
              link={"/dashboard/blogs"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default BlogPage;
