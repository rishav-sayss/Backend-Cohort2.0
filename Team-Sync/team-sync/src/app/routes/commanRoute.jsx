import Chat from "../../features/chat/ui/component/Chat";
import Home from "../../features/dashboard/ui/components/pages/Home";
import Setting from "../../features/setting/ui/component/Setting";

export let commanRoute = [
    {
     path:"",
     element:  <Home/> 
    },
    {
     path:"chat",
     element: <Chat/>
    },
        {
     path:"setting",
     element: <Setting/>
    }

]