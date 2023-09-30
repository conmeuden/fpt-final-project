import Spinner from "react-bootstrap/Spinner";

function SmallLoading() {
  return (
    <>
      <div
        className="spinner"
        style={{ position: "relative", zIndex: 9999, textAlign: "center" }}
      >
        <Spinner style={{ margin: 2 }} animation="grow" variant="primary" />
        <Spinner style={{ margin: 2 }} animation="grow" variant="success" />
        <Spinner style={{ margin: 2 }} animation="grow" variant="danger" />
        <Spinner style={{ margin: 2 }} animation="grow" variant="warning" />
        <Spinner style={{ margin: 2 }} animation="grow" variant="info" />
      </div>
    </>
  );
}

export default SmallLoading;
