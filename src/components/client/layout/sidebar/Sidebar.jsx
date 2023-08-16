// Importing Sass file
import "../../../styles/sidebar.scss";

import React from "react";
import Link from "next/link";
import { AppLogo } from "@/components/server/Title/AppTitle";

// Importing Icons For Sidebar Tabs
import { GoHome, GoHomeFill, GoSearch } from "react-icons/go";
import { IoMdAddCircleOutline, IoMdNotifications } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

function Sidebar() {
  return (
    <div className="sidebar">
      <AppLogo />
      <section>
        <LinkButton Icon={GoHome} text={"Home"} url={"/"} />
        <LinkButton Icon={GoSearch} text={"Search"} url={"/search"} />
        <LinkButton Icon={IoMdAddCircleOutline} text={"create"} url={"/"} />
        <LinkButton Icon={IoMdNotifications} text={"notification"} url={"/"} />
        <LinkButton Icon={HiOutlineMenuAlt3} text={"menu"} url={"/"} />
      </section>
    </div>
  );
}

export default Sidebar;

function LinkButton({ url, Icon, text, active }) {
  return (
    <Link href={`${url}`} className={"link_btn_link"}>
      <button className={"link_btn_btn"}>
        <Icon className={"link_btn_btn_icon"} />
        <h3 className={"link_btn_btn_text"}>{text}</h3>
      </button>
    </Link>
  );
}
