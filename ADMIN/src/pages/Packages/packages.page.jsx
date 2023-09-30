import { useDispatch, useSelector } from "react-redux";
import {  getAllPackages } from "../../redux/slices/packages.slice";
import { useEffect, useState } from "react";
import SystemAlert from "../../components/Alert/Alert";
import SmallLoading from "../../components/Loading/SmallLoading";
import AutoTable from "../../components/Table/Table";

import {  Button } from "@mui/material";
function PackagePage() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [keyword, setKeyword] = useState("");
  const { data, loading, error } = useSelector((state) => state.packages);

 

  
  const dispatch = useDispatch();
 
  useEffect(() => {
      dispatch(getAllPackages({ page,  keyword }));
   
  }, [ dispatch, keyword, page]);

 
  useEffect(() => {
    dispatch(
      getAllPackages({
        page,
        keyword
      })
    );
  }, [dispatch, keyword, page]);

  return (
    <>
      {error && <SystemAlert type={"error"} message={error} />}
      
      <div className="container">
        {loading && <SmallLoading />}
        <div className="packages-table">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setKeyword(searchText);
            }}
          >
            <div className="package-control row mb-3">
              <div className="col-5">
                <input
                  onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                    type="text"
                    placeholder="Tìm kiếm gói..."
                    value={searchText}
                    className="form-control"
                />
              </div>
              <Button variant="contained" color="primary" className="btn btn-primary col-2">
                Tìm kiếm
              </Button>
            </div>
          </form>
          {data && (
            <AutoTable data={data.packages.rows} limit={10} count={data.packages.count} page={page} setPage={setPage} link={"/dashboard/packages"} />
          )}
        </div>
      </div>
    </>
  );
}

export default PackagePage;
