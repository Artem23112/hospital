import clsx from "clsx";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import s from "./Tabs.module.scss";

type TabsPropsT = {
  tabsConfig: TabConfigT[];
};

export const Tabs = ({ tabsConfig }: TabsPropsT) => {
  const { pathname } = useLocation();

  function isActive(link: string): boolean {
    return pathname.includes(link);
  }

  return (
    <>
      <ul className={s["tab-list"]}>
        {tabsConfig.map((tab) => {
          if (tab?.default) return;
          return (
            <li
              className={clsx(s["tab"], {
                [s["active"]]: isActive(tab.linkPath),
              })}
              key={tab.id}
            >
              <Link to={tab.linkPath}>{tab?.tabText}</Link>
            </li>
          );
        })}
      </ul>
      <div className={s["shadow"]}>
        <Routes>
          {tabsConfig.map((tab) => {
            return (
              <Route
                path={tab?.routePath}
                element={tab.component}
                key={tab.id}
              />
            );
          })}
        </Routes>
      </div>
    </>
  );
};

type TabConfigT = {
  id: number;
  default?: boolean;
  tabText?: string;
  linkPath: string;
  routePath: string;
  component: JSX.Element;
};
