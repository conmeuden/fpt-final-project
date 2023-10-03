import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PackageService from "./../../services/packages.service";
import SystemAlert from "./../../components/Alert/Alert";
import SmallLoading from "./../../components/Loading/SmallLoading";

function PackageDetail() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const getCurrentPackage = async () => {
    try {
      setLoading(true);
      const res = await PackageService.getPackageById(id);
      setPkg(res);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await PackageService.updatePackage({ id, pkg });
      setLoading(false);
      setAlertMessage("Cập nhật thông tin gói thành công!");
      setAlertType("success");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setAlertMessage("Cập nhật thông tin gói thất bại!");
      setAlertType("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPkg((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await PackageService.removePackage(id);
      setLoading(false);
      setAlertMessage("Xóa thành công!");
      setAlertType("success");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setAlertMessage("Xóa thất bại!");
      setAlertType("error");
    }
  };

  const validateForm = () => {
    // Bạn cần cập nhật hàm này theo form package của bạn.
    if (!pkg.name || !pkg.price || !pkg.date || !pkg.status) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return false;
    }

    return true;
  };

  useEffect(() => {
    getCurrentPackage();
  }, [id]);

  return (
    <>
      {loading && <SmallLoading />}
      {alertMessage && <SystemAlert type={alertType} message={alertMessage} />}
      {error && <SystemAlert type={"error"} message={error} />}

      {pkg && (
        <div className="package-detail container p-4" style={{ backgroundColor: "white", borderRadius: 20 }}>
          <div className="form-container col-5">
            <form>
              <div className="form-group m-3">
                <label>Tên Gói</label>
                <input onChange={handleChange} type="text" className="form-control" name="name" value={pkg.name} />
              </div>

              <div className="form-group m-3">
                <label>Giá</label>
                <input onChange={handleChange} type="number" className="form-control" name="price" value={pkg.price} />
              </div>
              <div className="form-group m-3">
                <label>Số ngày</label>
                <input onChange={handleChange} type="text" className="form-control" name="date" value={pkg.date} />
              </div>
              <div className="form-group m-3">
                <label>Trạng thái</label>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="status" value="1" checked={pkg.status == "1"} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="1">
                    Đang hoạt động
                  </label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="status" value="0" checked={pkg.status == "0"} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="0">
                    Không hoạt động
                  </label>
                </div>
              </div>

              <div className="form-group m-3">
                <button className="btn btn-success" type="submit" onClick={handleUpdate}>
                  Cập nhật
                </button>
                <button className="btn btn-danger m-1" type="button" onClick={handleDelete}>
                  Xóa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PackageDetail;
