/** @format */
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import IndustriesService from "../../services/industries.service";
import SmallLoading from "./../../components/Loading/SmallLoading";
import UploadService from "../../services/upload.service";
import Toastify from "../../components/Toastify/Toastify";

function IndustryDetail() {
  const { id } = useParams();
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [file, setFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [toast, setToast] = useState({ type: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIndustry((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const img = await UploadService.singleFile({ file });
    setIndustry({
      ...industry,
      icon: img,
    });
  };

  const handleUpdate = async (e) => {
    console.log("update count");
    e.preventDefault();
    try {
      setLoading(true);
      await IndustriesService.updateIndustry({
        id,
        industry,
      });
      setIsUpdating(false);
      setLoading(false);
      setToast({ type: "success", message: "Update thành công" });
    } catch (error) {
      setToast({ type: "error", message: error.message });
      setLoading(false);
    }
  };

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
      {error && setToast({ type: "error", message: error.message })}
      <h2>Chi tiết ngành hàng</h2>
      {industry && (
        <div className="row detail-industry">
          {isUpdating ? (
            <form className="row">
              <div className="col-md-6">
                <div className="form-group m-3">
                  <label>Tên ngành hàng</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={industry.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group m-3">
                  <label>Trạng thái</label>
                  <select
                    name="status"
                    className="form-control select-status"
                    value={industry.status}
                    onChange={handleInputChange}
                    style={{
                      color: industry.status === 1 ? "green" : "red",
                      fontWeight: "500",
                    }}
                  >
                    <option value="1">Đang sử dụng</option>
                    <option value="2">Không sử dụng</option>
                  </select>
                </div>
                <div
                  className="form-group m-3 row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    className="btn btn-outline-success col-5"
                    onClick={handleUpdate}
                  >
                    Lưu
                  </button>
                  <button
                    className="btn btn-outline-danger col-5"
                    type="reset"
                    onClick={() => setIsUpdating(false)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="col-md-6">
              <div className="form-group m-3">
                <label>Tên ngành hàng</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={industry.name}
                  readOnly
                />
              </div>
              <div className="form-group m-3">
                <label>Trạng thái</label>
                <select
                  name="status"
                  className="form-control select-status"
                  value={industry.status}
                  readOnly
                  style={{
                    color: industry.status === 1 ? "green" : "red",
                    fontWeight: "500",
                  }}
                >
                  <option value="1">Đang sử dụng</option>
                  <option value="2">Không sử dụng</option>
                </select>
              </div>
              <div className="m-3">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setIsUpdating(true)} // Bấm vào để bật chế độ chỉnh sửa
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
          )}
          {isUpdating ? (
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
                <input
                  type="file"
                  className="form-control"
                  name="icon"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          ) : (
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
                <input
                  type="file"
                  className="form-control"
                  name="icon"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          )}
        </div>
      )}
      <Toastify type={toast.type} message={toast.message} />
    </>
  );
}

export default IndustryDetail;
