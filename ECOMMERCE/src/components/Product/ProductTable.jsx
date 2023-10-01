import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function ProductTable({ data, setPage }) {
  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Sản phẩm</th>
            <th>Danh mục</th>
            <th>Tồn kho</th>
            <th>Giá nhập</th>
            <th>Giá bán</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.products?.rows &&
            data.products.rows.map((item) => {
              return (
                <tr key={item.id} style={{ cursor: "pointer" }}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category.name}</td>
                  <td>{item.stock}</td>
                  <td>{item.import_price.toLocaleString()}</td>
                  <td>{item.base_price.toLocaleString()}</td>
                  <td>
                    {item.status === 1 ? (
                      <span style={{ color: "green", fontWeight: "500" }}>
                        Đang sử dụng
                      </span>
                    ) : (
                      <span style={{ color: "#FE5000", fontWeight: "500" }}>
                        Ngưng sử dụng
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <div className="product-pagination">
        <Stack spacing={2}>
          <Pagination
            color="primary"
            count={Math.ceil(
              Number(data?.products?.count) / Number(data.limit)
            )}
            page={Number(data?.page)}
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

export default ProductTable;
