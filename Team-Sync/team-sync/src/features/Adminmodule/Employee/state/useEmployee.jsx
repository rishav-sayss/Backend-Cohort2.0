import {  useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../api/employee.api";
 
export let useEmployee = () => {
  let { data, ispending } =  useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
    staleTime: 100000,
  });

  return {
    data,
    ispending,
  };
};
