import Department from "../../features/Adminmodule/Department/ui/component/Department";
import Document from "../../features/Adminmodule/Document/ui/compoent/Document";
import AddEmployee from "../../features/Adminmodule/Employee/ui/component/addemployee/AddEmployee";
import Employee from "../../features/Adminmodule/Employee/ui/component/Employee";
import Task from "../../features/Adminmodule/Task/ui/component/Task";

export let AdminRoute = [
  {
    path: "/home/employe",
    element: <Employee />,
  },
  {
    path:"/home/add-employee",
    element: <AddEmployee/>
  },
  {
    path: "/home/document",
    element: <Document />,
  },

  {
    path: "/home/department",
    element: <Department />,
  },
  {
    path: "/home/task",
    element: <Task/>
  }
];
