import Button from "react-bootstrap/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import SystemAlert from "./../../components/Alert/Alert";
import { useState } from "react";

function BaseComponent() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "age", headerName: "Age", type: "number", width: 90 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <div className="container">
      <div className="base-button">
        <h1>Các mẫu button</h1>
        <Button variant="primary">Primary</Button>{" "}
        <Button variant="secondary">Secondary</Button>{" "}
        <Button variant="success">Success</Button>{" "}
        <Button variant="warning">Warning</Button>{" "}
        <Button variant="danger">Danger</Button>{" "}
        <Button variant="info">Info</Button>{" "}
        <Button variant="light">Light</Button>{" "}
        <Button variant="dark">Dark</Button>{" "}
        <Button variant="link">Link</Button>
        <br />
        <br />
        <Button variant="outline-primary">Primary</Button>{" "}
        <Button variant="outline-secondary">Secondary</Button>{" "}
        <Button variant="outline-success">Success</Button>{" "}
        <Button variant="outline-warning">Warning</Button>{" "}
        <Button variant="outline-danger">Danger</Button>{" "}
        <Button variant="outline-info">Info</Button>{" "}
        <Button variant="outline-light">Light</Button>{" "}
        <Button variant="outline-dark">Dark</Button>
      </div>
      <div className="base-table mt-3">
        <h1>Mẫu table</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Frozen yoghurt
                </TableCell>
                <TableCell align="right">159</TableCell>
                <TableCell align="right">6.0</TableCell>
                <TableCell align="right">24</TableCell>
                <TableCell align="right">4.0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Ice cream sandwich
                </TableCell>
                <TableCell align="right">237</TableCell>
                <TableCell align="right">9.0</TableCell>
                <TableCell align="right">37</TableCell>
                <TableCell align="right">4.3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Eclair
                </TableCell>
                <TableCell align="right">262</TableCell>
                <TableCell align="right">16.0</TableCell>
                <TableCell align="right">24</TableCell>
                <TableCell align="right">6.0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Cupcake
                </TableCell>
                <TableCell align="right">305</TableCell>
                <TableCell align="right">3.7</TableCell>
                <TableCell align="right">67</TableCell>
                <TableCell align="right">4.3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Gingerbread
                </TableCell>
                <TableCell align="right">356</TableCell>
                <TableCell align="right">16.0</TableCell>
                <TableCell align="right">49</TableCell>
                <TableCell align="right">3.9</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
      </div>

      <div className="base-alert mt-3">
        <h1>Các mẫu thông báo</h1>

        <button
          className="btn btn-danger"
          onClick={() => {
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 3000);
          }}
        >
          error
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 3000);
          }}
        >
          success
        </button>
        <button
          className="btn btn-warning"
          onClick={() => {
            setWarning(true);
            setTimeout(() => {
              setWarning(false);
            }, 3000);
          }}
        >
          warning
        </button>
        <button
          className="btn btn-info"
          onClick={() => {
            setInfo(true);
            setTimeout(() => {
              setInfo(false);
            }, 3000);
          }}
        >
          info
        </button>
        {error && <SystemAlert type={"error"} message={"Thông báo lỗi"} />}
        {success && (
          <SystemAlert type={"success"} message={"Thông báo success"} />
        )}
        {warning && (
          <SystemAlert type={"warning"} message={"Thông báo warning"} />
        )}
        {info && <SystemAlert type={"info"} message={"Thông báo info"} />}
      </div>
    </div>
  );
}

export default BaseComponent;
