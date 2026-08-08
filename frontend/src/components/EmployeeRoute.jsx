import { Navigate } from "react-router-dom";


export default function EmployeeRoute({

  children

}) {

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");


  if(!token) {

    return <Navigate to="/login" />;
  }

  if(role !== "employee") {

    return <Navigate to="/login" />;
  }

  return children;
}