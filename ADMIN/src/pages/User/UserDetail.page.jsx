import { useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();

  return (
    <>
      <h1>{id}</h1>
    </>
  );
}

export default UserDetail;
