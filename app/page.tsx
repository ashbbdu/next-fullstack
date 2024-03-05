import axios from "axios";
async function getUserDetails() {
  const response = await axios.get(
    "http://localhost:3000/api/user"
  );
  return response.data;
}


// async component to make api call
export default async function Home() {
  const data = await getUserDetails();
  return (
    <div>
      <h1> First Page</h1>
      <div>{data.username}</div>
      <div>{data.email}</div>
    </div>
  );
}
