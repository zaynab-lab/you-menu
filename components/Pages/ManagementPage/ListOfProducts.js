import axios from "axios";
import { useEffect, useState } from "react";

export default function ListOfUsers() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/users/getAllUsers").then((res) => setProducts(res.data));
  }, []);
  return <>Hallo</>;
}
