import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function AutoTable({ data, setPage, limit, page, count, link }) {
  // eslint-disable-next-line react/prop-types
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  // Lấy danh sách các cột từ dữ liệu đầu vào
  const columns = Object.keys(data[0]);

  return (
    <>
      <Table bordered hover responsive>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  <Link to={`${link}/${row.id}`}>{row[column]}</Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Stack spacing={2}>
          <Pagination
            color="primary"
            count={Math.ceil(Number(count) / Number(limit))}
            page={page}
            siblingCount={0}
            onChange={(event, newPage) => {
              setPage(newPage);
            }}
          />
        </Stack>
      </div>
    </>
  );
}

export default AutoTable;
