import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function CouponTable({ data, setPage }) {
  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Shop ID</th>
            <th>Code</th>
            <th>Type</th>
            <th>Effect At</th>
            <th>Expire At</th>
            <th>Discount Amount</th>
            <th>Min Purchase Amount</th>
            <th>Max Usage Count</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.coupons.rows &&
            data.coupons.rows.map((item) => {
              return (
                <tr key={item.id} style={{ cursor: "pointer" }}>
                  <td>{item.id}</td>
                  <td>{item.shop_id}</td>
                  <td>{item.code}</td>
                  <td>{item.type}</td>
                  <td>{item.effect_at}</td>
                  <td>{item.expire_at}</td>
                  <td>{item.discount_amount}</td>
                  <td>{item.minimum_purchase_amount}</td>
                  <td>{item.max_usage_count}</td>
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

      <div className="coupon-pagination">
        <Stack spacing={2}>
          <Pagination
            color="primary"
            count={Math.ceil(data.count / data.limit)}
            page={Number(data.page)}
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

export default CouponTable;
