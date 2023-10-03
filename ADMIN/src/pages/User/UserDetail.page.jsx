/** @format */

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "./../../services/users.service";
import SystemAlert from "./../../components/Alert/Alert";
import SmallLoading from "./../../components/Loading/SmallLoading";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await UserService.getUserById(id);
      setUser(res);
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
      await UserService.updateUser({
        id,
        user,
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await UserService.removeUser(id);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!user.full_name || !user.email || !user.phone_number) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return false;
    }

    return true;
  };

  useEffect(() => {
    getCurrentUser();
  }, [id]);

  return (
    <>
      {loading && <SmallLoading />}
      {error && <SystemAlert type={"error"} message={error} />}

      {user && (
        <div
          className="user-detail container p-4"
          style={{ backgroundColor: "white", borderRadius: 20 }}
        >
          <div className="form-container col-5">
            <form>
              <div className="form-group m-3">
                <label>Tên người dùng</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="full_name"
                  value={user.full_name}
                />
              </div>
              <div className="form-group m-3">
                <label>Địa chỉ email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                />
              </div>
              <div className="form-group m-3">
                <label>Số điện thoại</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="phone_number"
                  value={user.phone_number}
                />
              </div>
              <div className="form-group m-3">
                <label>Địa chỉ</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="address"
                  value={user.address}
                />
              </div>
              <div className="form-group m-3">
                <label>Phân quyền</label>
                <select
                  onChange={handleChange}
                  name="role"
                  className="form-control"
                  defaultValue={user.role}
                >
                  <option value="ADMIN">Quản trị viên</option>
                  <option value="SALER">Người bán hàng</option>
                  <option value="CUSTOMER">Người tiêu dùng</option>
                </select>
              </div>
              <div className="form-group m-3">
                <label>Trạng thái</label>

                <select
                  onChange={handleChange}
                  name="status"
                  defaultValue={user.status}
                  className="form-control"
                >
                  <option value="1" style={{ color: "green" }}>
                    Đang sử dụng
                  </option>
                  <option value="0" style={{ color: "red" }}>
                    Khóa tài khoản
                  </option>
                </select>
              </div>
              <div className="form-group m-3">
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={handleUpdate}
                >
                  Cập nhật
                </button>
                <button
                  className="btn btn-danger m-1"
                  type="button"
                  onClick={handleDelete}
                >
                  Xóa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDetail;
