
import  {Axiosinstance} from "../../../../config/axios.instance"
 
export let getAllEmployees = async ( ) => {
  try {
    let res = await Axiosinstance.get(
      `/employee`
    );
    return res.data.data;
  } catch (error) {
    console.log("error in all employee api", error);
  }
};

export let  CreateEmployee = async ( data ) => {
  try {
    let res = await Axiosinstance.post(
      `/employee/create`,
      data
    );
    return res.data.data;
  } catch (error) {
    console.log("error in all create employee api", error);
  }
};


export let  UpdateEmploye = async ( empId ,data ) => {
  try {
    let res = await Axiosinstance.patch(
      `/employee/update/${empId}`,
      data
    );
    return res.data.data;
  } catch (error) {
    console.log("error in all  employee  Update", error);
  }
};



getAllEmployees()