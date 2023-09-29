/** @format */
import { useParams } from "react-router";
// import { getIndustryById } from "../../redux/slices/industries.slice";
// import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import IndustriesService from "../../services/industries.service";
import SmallLoading from "./../../components/Loading/SmallLoading";
import SystemAlert from "./../../components/Alert/Alert";

function IndustryDetail() {
  const { id } = useParams();
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentIndustry = async () => {
    try {
      setLoading(true);
      const res = await IndustriesService.getById(id);
      setIndustry(res);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentIndustry();
  }, [id]);

  return (
    <>
      {loading && <SmallLoading />}
      {error && <SystemAlert type={"error"} message={error} />}
      <h2>Chi tiết ngành hàng</h2>
      {industry && (
        <div className="row detail-industry">
          <form className="row">
            <div className="col-md-6">
              <div className="form-group m-3">
                <label>Tên ngành hàng</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={industry.name}
                />
              </div>
              <div className="form-group m-3">
                <label>Trạng thái</label>
                <select
                  name="status"
                  className="form-control select-status"
                  defaultValue={industry.status}
                  style={{
                    color: industry.status === 1 ? "green" : "red",
                    fontWeight: "500",
                  }}
                >
                  <option value="1">Đang sử dụng</option>
                  <option value="2">Không sử dụng</option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group m-3">
                <label>Icon</label>
                <br />
                <img
                  src={industry.icon}
                  alt="icon"
                  style={{
                    width: 250,
                    height: 250,
                    border: "1px solid #bebebe",
                  }}
                />
                <input type="file" className="form-control" name="icon" />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default IndustryDetail;
