import Editor from "../../components/CKEditor/Editor";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers } from "./../../redux/slices/user.slice";
import SystemAlert from "./../../components/Alert/Alert";
import SmallLoading from "./../../components/Loading/SmallLoading";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import EmailService from "./../../services/email.service";
import { Button } from "@mui/material";

function EmailPage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [checked, setChecked] = useState([]);

  const [loadingEmail, setLoadingEmail] = useState(false);
  const [errorEmail, setErrorEmail] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDataUsers = () => {
    dispatch(
      getAllUsers({
        page: 1,
        limit: 99999,
        keyword: "",
        role: "",
        status: "",
      })
    );
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    // Check if subject and text are not empty
    if (!subject) {
      setErrorEmail("Chưa nhập tiêu đề của email.");
      setTimeout(() => {
        setErrorEmail("");
      }, 3000);
      return;
    }

    // Check if at least one recipient is selected
    if (checked.length === 0) {
      setErrorEmail("Hãy chọn ít nhất 1 user để gửi email.");
      setTimeout(() => {
        setErrorEmail("");
      }, 3000);
      return;
    }
    // Check if at least one recipient is selected
    if (!text) {
      setErrorEmail("Vui lòng soạn nội dung email đầy đủ.");
      setTimeout(() => {
        setErrorEmail("");
      }, 3000);
      return;
    }
    try {
      setLoadingEmail(true);

      // Your email sending logic here
      await EmailService.sendMultipleMail({
        listEmail: checked,
        subject,
        text,
      });

      // Reset form state
      setSubject("");
      setText("");
      setChecked([]);

      setLoadingEmail(false);
    } catch (error) {
      setErrorEmail(error.message);
      setLoadingEmail(false);
    }
  };

  useEffect(() => {
    if (!data) {
      getDataUsers();
    }
  }, [data, getDataUsers]);

  return (
    <>
      {loadingEmail && <SmallLoading />}
      {errorEmail && <SystemAlert type={"error"} message={errorEmail} />}
      {error && <SystemAlert type={"error"} message={error} />}
      {loading && <SmallLoading />}
      <div className="email-page container-fluid">
        <div className="row">
          <div className="email-form col-sm-12 col-md-7 col-xl-8">
            <form onSubmit={sendEmail}>
              <div className="form-group m-3">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Nhập tiêu đề của email..."
                />
              </div>
              <div className="form-group m-3">
                <label>Nội dung email:</label>
                <Editor initialData={text} onDataChange={setText} />
              </div>
              <div className="form-group m-3">
                <button type="submit" className="btn btn-success">
                  Gửi email
                </button>
              </div>
            </form>
          </div>
          <div className="email-listUser col-sm-12 col-md-5 col-xl-4">
            <CheckBoxList
              data={data}
              checked={checked}
              setChecked={setChecked}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// eslint-disable-next-line react/prop-types
const CheckBoxList = ({ data, checked, setChecked }) => {
  const [searchText, setSearchText] = useState("");

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const selectAllUsers = () => {
    // If all users are currently selected, unselect all; otherwise, select all
    const allUsersSelected = checked.length === data?.users.rows.length;

    if (allUsersSelected) {
      setChecked([]);
    } else {
      // Use map to extract all email addresses and set them as checked
      const allEmails = data?.users.rows.map((user) => user.email) || [];
      setChecked(allEmails);
    }
  };

  return (
    <>
      <div className="form-group m-3">
        <input
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Tìm kiếm người dùng..."
        />
      </div>
      <div className="form-group m-3">
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
          className="email-listCheckBox"
        >
          {data?.users.rows.map((item) => {
            const labelId = `checkbox-list-label-${item.email}`;
            if (
              searchText === "" ||
              item.email
                .toLowerCase()
                .indexOf(searchText.toLowerCase().trim()) !== -1
            )
              return (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(item.email)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(item.email) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={item.email} />
                  </ListItemButton>
                </ListItem>
              );
          })}
        </List>
        <Button variant="link" onClick={selectAllUsers}>
          Chọn tất cả
        </Button>
      </div>
    </>
  );
};

export default EmailPage;
