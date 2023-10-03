
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SystemAlert from "./../../components/Alert/Alert";
import SmallLoading from "./../../components/Loading/SmallLoading";
import BlogService from "../../services/blog.service";
import { TextField } from "@mui/material";
import UploadService from "../../services/upload.service";
import Editor from "../../components/CKEditor/Editor";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [file, setFile] = useState(null);
  const getCurrentBlog = async () => {
    try {
      setLoading(true);
      const res = await BlogService.getBlogById(id);
      setBlog(res);
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
      await BlogService.updateBlog({ id, blog });
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
  const handleEditorChange = (editorContent) => {
    setBlog((prev) => ({ ...prev, content: editorContent }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await BlogService.removeBlog(id);
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
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const img = await UploadService.singleFile({ file });
    setBlog({
      ...blog,
      thumbnail: img,
    });
  };
  const validateForm = () => {
    // Bạn cần cập nhật hàm này theo form package của bạn.
    if (!blog.title || !blog.thumbnail || !blog.keywords || !blog.description || !blog.slug || !blog.content || !blog.created_at) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return false;
    }

    return true;
  };

  useEffect(() => {
    getCurrentBlog();
  }, [id]);

  return (
    <>
      {loading && <SmallLoading />}
      {alertMessage && <SystemAlert type={alertType} message={alertMessage} />}
      {error && <SystemAlert type={"error"} message={error} />}

      {blog && (
        <div
          className="blog-detail container p-4"
          style={{ backgroundColor: "white", borderRadius: 20 }}
        >
         <form>

         <div>
          <h2 id="create-blog"> Bài Viết</h2>
          <TextField
            fullWidth
            label="Thêm tiêu đề"
            name="title"
            value={blog.title}
            onChange={handleChange}
            margin="normal"
          />
          <div className="blog-detail">
         
           
            <input
                type="file"
                className="form-control"
                name="thumbnail"
                onChange={handleFileChange}
              />
          </div>
          <div>
            <TextField
              fullWidth
              name="description"
              value={blog.description}
              onChange={handleChange}
              label="Miêu Tả Chủ đề "
              margin="normal"
            />
            
          </div>
          <div>
            <TextField
              fullWidth
              name="keywords"
              value={blog.keywords}
              onChange={handleChange}
              label="Từ khóa cho bài "
              margin="normal"
            />
          </div>
          <div>
            <h3>Nội dung bạn muốn viết :</h3>
            
            <Editor onDataChange={handleEditorChange} initialData={blog.content}  />
          
            
          </div>
          
        </div>
              <div className="form-group p-2">
                <label>Trạng thái</label>

                <select
                  onChange={handleChange}
                  name="status"
                  defaultValue={blog.status}
                  className="form-control"
                >
                  <option value="1" style={{ color: "green" }}>
                    Đang sử dụng
                  </option>
                  <option value="0" style={{ color: "red" }}>
                    Ngưng sử dụng
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
       
      )}
    </>
  );
}

export default BlogDetail;

