import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { DateUtil } from "../../utils/date.util";

function CouponTable({ data, setPage }) {
  const navigate = useNavigate();
  const linkToDetail = (id) => {
    navigate(`/management/coupons/${id}`);
  };

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Hình thức</th>
            <th>Bắt đầu từ</th>
            <th>Hết hạn vào</th>
            <th>Số tiền giảm giá</th>
            <th>Giá tối thiểu khi mua</th>
            <th>Số lần sử dụng tối đa</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.coupons.rows &&
            data.coupons.rows.map((item) => {
              return (
                <tr
                  key={item.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    linkToDetail(item.id);
                  }}
                >
                  <td>{item.code}</td>
                  <td>
                    {item.type === "fixed"
                      ? "Giảm theo tiền"
                      : "Giảm theo phần trăm"}
                  </td>
                  <td>{DateUtil.toString(item.effect_at)}</td>
                  <td>{DateUtil.toString(item.expire_at)}</td>
                  <td>{item.discount_amount.toLocaleString()}</td>
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
            count={Math.ceil(data.coupons.count / data.limit)}
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
