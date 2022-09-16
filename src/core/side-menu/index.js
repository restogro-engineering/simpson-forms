/** @format */

import * as React from "react";
import { NESTED_MENU_LIST } from "./config";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export default function NestedList() {
  const [open, setOpen] = React.useState("Complaint Handling");
  const [activeMenu, setActiveMenu] = React.useState({
    heading: "Complaint Handling",
  });
  const [activeSubMenu, setActiveSubMenu] = React.useState("/");
  const navigate = useNavigate();
  const handleClick = (item) => {
    setOpen(item.heading);
  };

  return (
    <div className="side-menu-container">
      {NESTED_MENU_LIST.map((item) => {
        return (
          <div className="menu-items">
            <span
              className={
                item.isCommingSoon
                  ? "menu-heading menu-comming-soon"
                  : "menu-heading"
              }
            >
              {item.heading}
            </span>
            <ul>
              {item.isCommingSoon && (
                <div className="comming-soon">Coming soon</div>
              )}
              {item.menuItems.map((menuItem) => {
                return (
                  <li
                    className={
                      item.isCommingSoon
                        ? "menu-name menu-comming-soon"
                        : "menu-name"
                    }
                    onClick={() => {
                      if (!menuItem.menuItems) {
                        navigate(menuItem.url);
                        setActiveSubMenu({});
                      } else {
                        setActiveSubMenu(menuItem);
                      }
                      setActiveMenu(menuItem);
                    }}
                  >
                    {menuItem.label}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
