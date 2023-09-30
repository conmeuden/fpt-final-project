
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import Editor from "../../components/CKEditor/Editor";
import UploadService from "../../services/upload.service";
import { Link, useNavigate } from "react-router-dom";
import BlogService from "../../services/blog.service";
function BlogCreate() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
 
  const [newBlog, setNewBlog] = useState({
    title: "",
    thumbnail: "",
    keywords: "",
    description: "",
    content: "",
    status: 1,
  });

  

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const img = await UploadService.singleFile({ file });
    setNewBlog({
      ...newBlog,
      thumbnail: img,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async() => {
   await BlogService.createBlog(newBlog)
    navigate("/dashboard/blogs"); // Replace with your desired target page
  };
  const handleEditorChange = (editorContent) => {
    setNewBlog((prev) => ({ ...prev, content: editorContent }));
  };

 
  return (
    <>
     
      <div
        className="blog-detail container p-4"
        style={{ backgroundColor: "white", borderRadius: 20 }}
      >
        <div>
          <h2 id="create-blog"> Bài Viết</h2>
          <TextField
            fullWidth
            label="Thêm tiêu đề"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
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
              value={newBlog.description}
              onChange={handleInputChange}
              label="Miêu Tả Chủ đề "
              margin="normal"
            />
            
          </div>
          <div>
            <TextField
              fullWidth
              name="keywords"
              value={newBlog.keywords}
              onChange={handleInputChange}
              label="Từ khóa cho bài "
              margin="normal"
            />
          </div>
          <div>
            <h3>Nội dung bạn muốn viết :</h3>
            
            <Editor onDataChange={handleEditorChange} initialData={newBlog.content}  />
          
            
          </div>
          <Button variant="contained" color="primary" onClick={handleSave} className="m-3">
            Lưu Bài Viết
          </Button>
          <Link to={'/dashboard/blogs'}>
          <Button variant="contained" color="warning" className="m-1">
            Cancel
          </Button>
          </Link>
          
        </div>
      </div>
    </>
  );
}

export default BlogCreate;
