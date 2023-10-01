import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function CategoryDetail({ item, handeUpdate }) {
  const [category, setCategory] = useState(item);

  return (
    <div className="mt-2">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="col-6">
            <h5>{item.name}</h5>
          </div>
          <div className="col-6">
            <h6>
              {category.status === 1 ? (
                <span style={{ color: "green", fontWeight: "500" }}>
                  Đang sử dụng
                </span>
              ) : (
                <span style={{ color: "#FE5000", fontWeight: "500" }}>
                  Ngưng sử dụng
                </span>
              )}
            </h6>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="container">
            <div className="row">
              <div className="form-group col-sm-12 col-md-6 col-xl-4">
                <input
                  type="text"
                  onChange={(e) => {
                    setCategory({ ...category, name: e.target.value });
                  }}
                  value={category.name}
                  className="form-control"
                />
              </div>
              <div className="form-group col-sm-12 col-md-6 col-xl-4">
                <select
                  className="form-control"
                  defaultValue={category.status}
                  onChange={(e) => {
                    setCategory({ ...category, status: e.target.value });
                  }}
                >
                  <option
                    value="1"
                    style={{ color: "green", fontWeight: "500" }}
                  >
                    Đang sử dụng
                  </option>
                  <option
                    value="0"
                    style={{ color: "#FE5000", fontWeight: "500" }}
                  >
                    Ngưng sử dụng
                  </option>
                </select>
              </div>
              <div className="form-group col-sm-12 col-md-6 col-xl-4">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    handeUpdate(category.id, category);
                  }}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
