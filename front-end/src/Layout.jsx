import NavBar from "./NavBar";
import {Outlet} from "react-router-dom";
import React from "react"

export default function Layout(){
    return (
        <div>
            <NavBar/> 
            <Outlet/> 
        </div>
    )
}
