import Header from "../Header/Header";
import {Outlet} from "react-router-dom";
import {useState} from "react";

export default function PageLayout() {
  const [menu, setMenu] = useState()

  return (
    <div className="page__content">
      <Header menu={menu}/>
      <Outlet context={{ setMenu }}/>
    </div>
  )
}