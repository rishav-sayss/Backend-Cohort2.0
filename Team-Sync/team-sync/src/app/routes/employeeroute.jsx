import Department from "../../features/Adminmodule/Department/ui/component/Department";
import Attendence from "../../features/Employemodule/Attendence/ui/component/Attendence";
import Mytask from "../../features/Employemodule/mytask/ui/component/Mytask";
import Profile from "../../features/Employemodule/profile/ui/component/Profile";


export let AdminRoute = [
    
    {
     path:"/home/mytask",
     element: <Mytask/>
    },
        {
     path:"/home/attendance",
     element: <Attendence/>
    },
        {
     path:"/home/profile",
     element: <Profile/>
    },

]