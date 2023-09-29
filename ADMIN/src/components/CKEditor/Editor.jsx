import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// eslint-disable-next-line react/prop-types
function Editor({ initialData, onDataChange }) {
  const API_URL = import.meta.env.VITE_REACT_API_URL;
  const UPLOAD_ENDPOINT = "api/upload/single";

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          console.log(`${API_URL}${UPLOAD_ENDPOINT}`);

          const token = localStorage.getItem("access_token");
          const body = new FormData();
          loader.file.then((file) => {
            body.append("file", file);
            let headers = new Headers();
            headers.append("Authorization", `Bearer ${token}`);
            fetch(`${API_URL}${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
              headers,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${API_URL.slice(0, -1)}${res.filePath}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  return (
    <CKEditor
      onError={(error, info) => {
        console.error("CKEditor Error:", error);
        console.error("Error Info:", info);
      }}
      config={{
        extraPlugins: [uploadPlugin],
      }}
      editor={ClassicEditor}
      data={initialData}
      onChange={(event, editor) => {
        const data = editor.getData();
        if (onDataChange) {
          onDataChange(data);
        }
      }}
    />
  );
}

export default Editor;
