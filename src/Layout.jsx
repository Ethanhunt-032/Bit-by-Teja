import NavBar from "./NavBar";
import {Outlet} from "react-router-dom";

export default function Navbar(){
    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    )
}
