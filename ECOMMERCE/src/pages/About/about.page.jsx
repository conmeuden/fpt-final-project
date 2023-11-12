import "./style.css";
import { CheckCircleOutline } from "@mui/icons-material";
function AboutPage() {
  return (
    <div className="container-fluid p-0 login-page mb-5" id="about-page">
      <div className="home-banner">
        <img
          src="/public/images/banner-about.jpg"
          alt="banner"
          className="w-100"
          style={{ height: "350px", objectFit: "cover" }}
        />
      </div>
      <div className="container mt-5">
        <div className="title text-center">
          <h4 className=" text-dark fw-bold" style={{ lineHeight: "1.5" }}>
            DALAPHAecommerce là nền tảng thương mại điện tử hàng đầu tại Việt Nam.
          </h4>
          <div>
            <p
              className="desctiption h6 mt-3 text-secondary"
              style={{ lineHeight: "1.5" }}
            >
              {" "}
              Ra mắt năm 2023, nền tảng thương mại DALAPHAecommerce được xây dựng nhằm cung cấp cho người dùng những trải nghiệm dễ dàng,
              an toàn và nhanh chóng khi mua sắm trực tuyến thông qua hệ thống hỗ trợ thanh toán và vận hành vững mạnh.


            </p>
            <p
              className="desctiption h6 mt-3 text-secondary"
              style={{ lineHeight: "1.5" }}
            >
              {" "}
              Chúng tôi có niềm tin mạnh mẽ rằng trải nghiệm mua sắm trực tuyến phải đơn giản,
              dễ dàng và mang đến cảm xúc vui thích. Niềm tin này truyền cảm hứng và thúc đẩy chúng tôi mỗi ngày tại DALAPHAecommerce.
            </p>
          </div>
          <button className="mt-3 btn btn-success rounded-4 p-2">
            Tìm hiểu DALAPHAecommerce
          </button>
        </div>
        <div className="box-text d-flex text-center mt-5">
          <div className="box-col shadow p-2 rounded-3">
            <h5 className="fw-bold">Mục tiêu của chúng tôi</h5>
            <p
              className="description text-secondary"
              style={{ lineHeight: "1.5" }}
            >
              Chúng tôi tin tưởng vào sức mạnh khai triển của công nghệ và
              mong muốn góp phần làm cho thế giới trở nên tốt đẹp hơn bằng việc
              kết nối cộng đồng người mua và người bán thông qua việc cung cấp một nền tảng thương mại điện tử.
            </p>
          </div>
          <div className="box-col shadow p-2 rounded-3">
            <h5 className="title fw-bold">Định vị của chúng tôi</h5>
            <p
              className="description text-secondary"
              style={{ lineHeight: "1.5" }}
            >
              Đối với người dùng trên toàn khu vực,
              DALAPHAecommerce mang đến trải nghiệm mua sắm trực tuyến tích hợp với vô số sản phẩm đa dạng chủng loại,
              cộng đồng người dùng năng động và chuỗi dịch vụ liền mạch.
            </p>
          </div>
          <div className="box-col-2 shadow p-2 rounded-3">
            <h5 className="title fw-bold">Đặc điểm về con người của chúng tôi</h5>
            <p
              className="description text-secondary"
              style={{ lineHeight: "1.5" }}
            >
              Để định nghĩa chúng tôi là ai - thông qua lời nói hay cách ứng xử trong nhiều trường hợp khác nhau - thì thực chất,
              chúng tôi Gần gũi, Vui vẻ và Đồng lòng.
              Đây là những đặc tính chính và nổi bật trong từng bước đường phát triển của DALAPHAecommerce.
            </p>
          </div>
        </div>

        <div className="mt-5 staus-desctipiton-tw">
          <h3 className="tx text-center fw-bold">Quy trình hoạt động</h3>
          <div className="list-status d-flex">
            <div className="list-status-item">
              <h5 className="title">
                <CheckCircleOutline
                  style={{ marginRight: "5px", color: "#008847" }}
                />
                DALAPHAecommerce ra mắt tại thị trường Việt Nam
              </h5>
              <p className="descitpiton">
                Năm 2023, DALAPHAecommerce ra mắt tại thị trường trong khu vực Việt Nam
              </p>
            </div>
            <div className="list-status-item">
              <h5 className="title">
                <CheckCircleOutline
                  style={{ marginRight: "5px", color: "#008847" }}
                />
                Ra mắt trang web
              </h5>
              <p className="descitpiton">
                Chúng tôi khai thác cả công nghệ hiện có và công nghệ mới nổi để định nghĩa lại trải nghiệm bán lẻ.
                Tận dụng dữ liệu trong thời gian thực cho phép chúng tôi nhanh chóng thích ứng với nhu cầu
                và điều kiện thay đổi. Chúng tôi kết nối người tiêu dùng với các thương hiệu,
                tạo ra trải nghiệm tùy chỉnh và phát triển thành điểm đến bán lẻ mà khách hàng đến để mua sắm và giải trí.
              </p>
            </div>
            <div className="list-status-item">
              <h5 className="title">
                <CheckCircleOutline
                  style={{ marginRight: "5px", color: "#008847" }}
                />
                Thị trường khu vực
              </h5>
              <p className="descitpiton">
                Hiểu rõ về đặc điểm địa phương, nhu cầu tiêu dùng, và quy định pháp lý là chìa khóa quan trọng
                để doanh nghiệp phát triển chiến lược linh hoạt, tối ưu hóa cơ hội thị trường,
                và xây dựng mối quan hệ vững chắc trong cộng đồng kinh doanh đang ngày càng toàn cầu hóa.
              </p>
            </div>
            <div className="list-status-item">
              <h5 className="title">
                <CheckCircleOutline
                  style={{ marginRight: "5px", color: "#008847" }}
                />
                Đảm bảo chất lượng
              </h5>
              <p className="descitpiton">
                Chúng tôi hiểu rõ rằng sự tin cậy của khách hàng xây dựng dựa trên chất lượng, và chính vì vậy,
                mọi sản phẩm và dịch vụ đều được đảm bảo đáp ứng hoặc vượt qua các tiêu chuẩn cao nhất.
                Đối với chúng tôi, đảm bảo chất lượng không chỉ là nghệ thuật,
                mà còn là sứ mệnh, đồng hành cùng sự thành công và sự hài lòng của khách hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
