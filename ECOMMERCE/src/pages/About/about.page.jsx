import "./style.css";
import CallIcon from '@mui/icons-material/Call';
import WorkIcon from '@mui/icons-material/Work';
import CellTowerIcon from '@mui/icons-material/CellTower';
function AboutPage() {
  return (
    <>
      <>
        <section
          id="hero-animated"
          className="hero-animated d-flex align-items-center"
        >
          <div
            className="container d-flex flex-column justify-content-center align-items-center text-center position-relative"
            data-aos="zoom-out"
          >
            <img
              src="https://bootstrapmade.com/demo/templates/HeroBiz/assets/img/hero-carousel/hero-carousel-3.svg"
              className="img-fluid animated"
            />
            <h2>
              Welcome to <span>DALAPHA</span>
            </h2>
            <p>
              Được xây dựng nhằm cung cấp cho người dùng những trải nghiệm dễ dàng,
              an toàn và nhanh chóng khi mua sắm trực tuyến thông qua hệ thống hỗ trợ thanh toán và vận hành vững mạnh.
            </p>


          </div>
        </section>
        <main id="main">
          {/* ======= Featured Services Section ======= */}
          <section id="featured-services" className="featured-services">
            <div className="container">

            </div>
          </section>
          {/* End Featured Services Section */}
          {/* ======= About Section ======= */}
          <section id="about" className="about">
            <div className="container" data-aos="fade-up">
              <div className="section-header">
                <h6>NHIỆM VỤ CỦA CHÚNG TÔI</h6>
                <h2>Làm cho thương mại tốt hơn cho mọi người</h2>
                <h5>
                  Chúng tôi giúp mọi người đạt được sự độc lập bằng cách giúp việc thành lập,
                  điều hành và phát triển doanh nghiệp trở nên dễ dàng hơn.
                  Chúng tôi tin rằng tương lai của thương mại sẽ có nhiều tiếng nói hơn chứ không phải ít hơn,
                  vì vậy, chúng tôi đang giảm bớt các rào cản đối với quyền sở hữu doanh nghiệp để giúp thương mại trở nên tốt hơn cho mọi người.
                </h5>
              </div>

              <div className="row g-4 g-lg-5" data-aos="fade-up" data-aos-delay={200}>
                <div className="col-lg-5">
                  <div className="about-img">
                    <img src="https://cdn.shopify.com/shopifycloud/brochure/assets/about/video-poster-small-16931e5b1c29b169a9e7eb71a79d1ac0a655ebdc9e0053fc959eaa05cfd50bd7.jpg" className="img-fluid" alt="" />
                  </div>
                </div>
                <div className="col-lg-7">

                  <h3 className="pt-0 pt-lg-5">
                    Tạo một cộng đồng để tác động
                  </h3>

                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="tab1">

                      <div className="d-flex align-items-center mt-4">
                        <i className="bi bi-check2" />
                        <h4>DALAPHA đã phát triển từ 5 người trong một quán cà phê lên hơn 10.000 người trên toàn cầu.
                          Với hàng triệu doanh nghiệp được hỗ trợ bởi DALAPHA, chúng tôi đầu tư vào con người và
                          cộng đồng của mình. Các sáng kiến ​​Tác động xã hội của chúng tôi tập trung vào việc tạo
                          dựng một tương lai công bằng bằng cách xây dựng các sản phẩm và chương trình để hỗ trợ
                          đội ngũ và người bán của chúng tôi.
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ======= end task 1 ======= */}

              <div className="row g-4 g-lg-5" data-aos="fade-up" data-aos-delay={200}>
                <div className="col-lg-5">
                  <div className="about-img">
                    <img src="https://cdn.shopify.com/shopifycloud/brochure/assets/about/sustainability-small-9082b3c33fc96c720d3534c0908c622c1ca835cdfccb307ba6c30db8d9c41cc0.jpg" className="img-fluid" alt="" />
                  </div>
                </div>
                <div className="col-lg-7">

                  <h3 className="pt-0 pt-lg-5">
                    Chúng tôi đang xây dựng một công ty 100 năm
                  </h3>

                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="tab1">

                      <div className="d-flex align-items-center mt-4">
                        <i className="bi bi-check2" />
                        <h4>
                          DALAPHA xây dựng lâu dài và điều đó có nghĩa là đầu tư vào hành tinh của chúng ta để chúng ta
                          có thể chứng minh DALAPHA trong tương lai cũng như giúp người bán chứng minh hoạt động kinh
                          doanh của họ trong tương lai. Quỹ bền vững của chúng tôi bao gồm việc khởi động thị trường
                          loại bỏ carbon và lựa chọn năng lượng tái tạo, giảm và loại bỏ lượng khí thải carbon,
                          đồng thời tạo ra các giải pháp để các thương nhân của chúng tôi làm điều tương tự.
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* End About Section */}
          {/* ======= Clients Section ======= */}

          {/* End Clients Section */}
          {/* ======= Call To Action Section ======= */}

          <section id="services" className="services">
            <div className="container" data-aos="fade-up">
              <div className="section-header">
                <h2>Tìm hiểu thêm về DALAPHA</h2>

              </div>
              <div className="row gy-5">
                <div
                  className="col-xl-4 col-md-6"
                  data-aos="zoom-in"
                  data-aos-delay={200}
                >
                  <div className="service-item">
                    <div className="img">
                      <img
                        src="public/images/ho-tro.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="details position-relative">
                      <div className="icon">
                        <CallIcon />
                      </div>

                      <h3>Hỗ trợ tận tình</h3>

                      <p>
                        Nhận tư vấn và hỗ trợ các vấn đề bạn thắc mắc với sự hỗ trợ 24/7 trước, trong và sau khi sử dụng.
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Service Item */}
                <div
                  className="col-xl-4 col-md-6"
                  data-aos="zoom-in"
                  data-aos-delay={300}
                >
                  <div className="service-item">
                    <div className="img">
                      <img
                        src="public/images/viec-lam.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="details">
                      <div className="icon">
                        <WorkIcon />
                      </div>

                      <h3>Các cơ hội nghề nghiệp</h3>

                      <p>
                        Sản phẩm của chúng tôi cho phép người dùng tạo ra
                        giá trị mới cho thế giới và mở ra cơ hội phát triển cho những người xây dựng nó.
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Service Item */}
                <div
                  className="col-xl-4 col-md-6"
                  data-aos="zoom-in"
                  data-aos-delay={400}
                >
                  <div className="service-item">
                    <div className="img">
                      <img
                        src="public/images/bao-chi.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="details position-relative">
                      <div className="icon">
                        <CellTowerIcon />
                      </div>
                      <a href="#" className="stretched-link">
                        <h3>báo chí và truyền thông</h3>
                      </a>
                      <p>
                        Ut excepturi voluptatem nisi sed. Quidem fuga consequatur.
                        Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Service Item */}

              </div>
            </div>
          </section>
          {/* End Services Section */}
          {/* ======= Pricing Section ======= */}
          <section id="pricing" className="pricing">
            <div className="container" data-aos="fade-up">
              <div className="section-header">
                <h2>Giá của chúng tôi</h2>

              </div>
              <div className="row gy-4">
                <div className="col-lg-4" data-aos="zoom-in" data-aos-delay={200}>
                  <div className="pricing-item">
                    <div className="pricing-header">
                      <h3>Gói dùng thử</h3>
                      <h4>
                        Miến phí<span> / 14 Ngày</span>
                      </h4>
                    </div>
                    <ul>
                      <li>
                        <i className="bi bi-dot" />{" "}
                        <span>Miễn phí sử dụng trong 14 ngày</span>
                      </li>
                      <li>
                        <i className="bi bi-dot" />{" "}
                        <span>Sử dụng đầy dủ các chức năng</span>
                      </li>
                      <li>
                        <i className="bi bi-dot" />{" "}
                        <span>Sử dụng đầy dủ các chức năng</span>
                      </li>
                      <li className="na">
                        <i className="bi bi-x" />{" "}
                        <span>Sử dụng đầy dủ các chức năng</span>
                      </li>
                      <li className="na">
                        <i className="bi bi-x" />{" "}
                        <span>Sử dụng đầy dủ các chức năng</span>
                      </li>
                    </ul>
                    <div className="text-center mt-auto">
                      <a href="#" className="buy-btn">
                        Thử ngay
                      </a>
                    </div>
                  </div>
                </div>
                {/* End Pricing Item */}
                <div className="col-lg-4" data-aos="zoom-in" data-aos-delay={400}>
                  <div className="pricing-item featured">
                    <div className="pricing-header">
                      <h3>Gói 1 tháng</h3>
                      <h4>
                        199000<span><sup>đ</sup> / Tháng</span>
                      </h4>
                    </div>
                    <ul>

                      <li>
                        <i className="bi bi-dot" />{" "}
                        <span>Sử dụng đầy dủ các chức năng</span>
                      </li>
                      <li>
                        <i className="bi bi-dot" />{" "}
                        <span>Sử dụng đầy dủ các chức năng</span>
                      </li>
                      <li>
                        <i className="bi bi-dot" />{" "}
                        <span>Sử dụng đầy dủ các chức năng</span>
                      </li>
                      <li>
                        <i className="bi bi-dot" />{" "}
                        <span>Sử dụng đầy dủ các chức năng</span>
                      </li>
                    </ul>
                    <div className="text-center mt-auto">
                      <a href="#" className="buy-btn">
                        Mua ngay
                      </a>
                    </div>
                  </div>
                </div>
                {/* End Pricing Item */}
                <div className="col-lg-4" data-aos="zoom-in" data-aos-delay={600}>
                  <div className="pricing-item">
                    <div className="pricing-header">
                      <h3>Gói 6 tháng</h3>
                      <h4>
                        990000<span><sup>đ</sup> / 6 Tháng</span>
                      </h4>
                    </div>
                    <ul>
                      <li>
                        <i className="bi bi-dot" />{" "}
                        <span>Tiết kiệm 204k so với gói 1 tháng</span>
                      </li>
                      <li>
                        <i className="bi bi-dot" />{" "}
                        <span>Sử dụng đầy dủ các chức năng</span>
                      </li>
                      <li>
                        <i className="bi bi-dot" />{" "}
                        <span>Sử dụng đầy dủ các chức năng</span>
                      </li>
                      <li>
                        <i className="bi bi-dot" />{" "}
                        <span>Sử dụng đầy dủ các chức năng</span>
                      </li>
                      <li>
                        <i className="bi bi-dot" />{" "}
                        <span></span>
                      </li>
                    </ul>
                    <div className="text-center mt-auto">
                      <a href="#" className="buy-btn">
                        Mua ngay
                      </a>
                    </div>
                  </div>
                </div>
                {/* End Pricing Item */}
              </div>
            </div>
          </section>
          {/* End Pricing Section */}
          {/* ======= F.A.Q Section ======= */}

          {/* End F.A.Q Section */}
          {/* ======= Contact Section ======= */}
          <section id="contact" className="contact">
            <div className="container">
              <div className="section-header">
                <h2>Liên hệ với chúng tôi</h2>

              </div>
            </div>

            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1578.55008854374!2d108.06577886355659!3d12.683175733110662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3171f7c9d368e6ff%3A0x32cd2d1f5943fce9!2zMzcyLzEgSMO5bmcgVsawxqFuZywgVMOibiBM4bqtcCwgVGjDoG5oIHBo4buRIEJ1w7RuIE1hIFRodeG7mXQsIMSQ4bqvayBM4bqvayA2MzAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700072594415!5m2!1svi!2s"
                frameBorder={0}
                allowFullScreen=""
              />
            </div>
            {/* End Google Maps */}
            <div className="container">
              <div className="row gy-5 gx-lg-5">
                <div className="col-lg-4">
                  <div className="info">
                    <h3>Liên lạc</h3>
                    <p>

                    </p>
                    <div className="info-item d-flex">
                      <i className="bi bi-geo-alt flex-shrink-0" />
                      <div>
                        <h4>Vị trí:</h4>
                        <p>Số 372/1/8 đường Hùng Vương, Phường Tân Lập, Thành phố Buôn Ma Thuột, Tỉnh Đắk Lắk</p>
                      </div>
                    </div>
                    {/* End Info Item */}
                    <div className="info-item d-flex">
                      <i className="bi bi-envelope flex-shrink-0" />
                      <div>
                        <h4>Email:</h4>
                        <p>dalpha@gmail.com.com</p>
                      </div>
                    </div>
                    {/* End Info Item */}
                    <div className="info-item d-flex">
                      <i className="bi bi-phone flex-shrink-0" />
                      <div>
                        <h4>Số điện thoại:</h4>
                        <p>+84 918461936</p>
                      </div>
                    </div>
                    {/* End Info Item */}
                  </div>
                </div>
                <div className="col-lg-8">
                  <form
                    action="forms/contact.php"
                    method="post"
                    role="form"
                    className="php-email-form"
                  >
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Tên của bạn"
                          required=""
                        />
                      </div>
                      <div className="col-md-6 form-group mt-3 mt-md-0">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Email"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        id="subject"
                        placeholder="Tiêu đề"
                        required=""
                      />
                    </div>
                    <div className="form-group mt-3">
                      <textarea
                        className="form-control"
                        name="message"
                        placeholder="Nội dung"
                        required=""
                        defaultValue={""}
                      />
                    </div>
                    <div className="my-3">
                      <div className="loading">Loading</div>
                      <div className="error-message" />
                      <div className="sent-message">
                        Tin nhắn của bạn đã dduojc gửi. Cảm ơn!!
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit">Gửi tin nhắn</button>
                    </div>
                  </form>
                </div>
                {/* End Contact Form */}
              </div>
            </div>
          </section>
          {/* End Contact Section */}
        </main>
        {/* End #main */}
      </>

    </>
  );
}

export default AboutPage;
