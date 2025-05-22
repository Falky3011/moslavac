import React, { useState } from "react";
import { Dropdown, Drawer, Button } from "antd";
import {
  MenuOutlined,
  DownOutlined,
  FacebookOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import NavLink from "./NavLink";
import grb from "../../../public/grb.png";
import { useGetCurrentSeasonCompetitions } from "../../hooks/useGetCurrentSeasonCompetitions";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 150);
  });

  const { data: competitions = [] } = useGetCurrentSeasonCompetitions();

  const dropdownProps = {
    items: competitions.map((competition) => ({
      key: competition.id,
      label: (
        <NavLink
          href={`/season/${competition.id}`}
          onClick={() => setDrawerVisible(false)}
        >
          {competition.name}
        </NavLink>
      ),
    })),
  };

  const closeDrawer = () => setDrawerVisible(false);

  return (
    <>
      <motion.nav
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-0 z-50 w-full bg-white border-b border-gray-200"
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-2 lg:px-8">
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 24 }} />}
            onClick={() => setDrawerVisible(true)}
            className="lg:hidden"
          />

          <div className={["flex", "lg:flex-1"].join(" ")}>
            <NavLink
              href="/"
              className="flex items-center gap-1 lg:gap-2 shrink-0"
              onClick={closeDrawer}
            >
              <img src={grb} alt="Logo" width={70} height={70} />
            </NavLink>
          </div>

          <div className="hidden lg:flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
            <NavLink href="/news">Vijesti</NavLink>
            <Dropdown menu={dropdownProps}>
              <span className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
                Sezona <DownOutlined />
              </span>
            </Dropdown>
            <NavLink href="/matches">Utakmice</NavLink>
            <NavLink href="/first-team">Momčad</NavLink>
            {/* <NavLink href="/staff">Stručni stožer</NavLink> */}
            <NavLink href="https://alpashrvatska.hr/snk-moslavac-popovaca/">
              Webshop
            </NavLink>
          </div>

          <div className="flex lg:flex-1 lg:justify-end gap-4 lg:gap-12">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <NavLink href="/sign-in" onClick={closeDrawer}>
                Prijavi se
              </NavLink>
            </SignedOut>
          </div>
        </div>
      </motion.nav>

      <Drawer
        title="Navigacija"
        placement="left"
        onClose={closeDrawer}
        open={drawerVisible}
        className="lg:hidden"
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col p-4">
          <NavLink
            href="/news"
            onClick={closeDrawer}
            className="py-3 border-b border-gray-100"
          >
            Vijesti
          </NavLink>
          <div className="py-3 border-b border-gray-100">
            <Dropdown menu={dropdownProps}>
              <span className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
                Sezona <DownOutlined />
              </span>
            </Dropdown>
          </div>
          <NavLink
            href="/matches"
            onClick={closeDrawer}
            className="py-3 border-b border-gray-100"
          >
            Utakmice
          </NavLink>
          <NavLink
            href="/first-team"
            onClick={closeDrawer}
            className="py-3 border-b border-gray-100"
          >
            Momčad
          </NavLink>
          <NavLink
            href="/staff"
            onClick={closeDrawer}
            className="py-3 border-b border-gray-100"
          >
            Stručni stožer
          </NavLink>
          <a
            href="https://alpashrvatska.hr/snk-moslavac-popovaca/"
            onClick={closeDrawer}
            className="py-3 border-b border-gray-100 text-sm text-gray-600 hover:text-blue-500 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Webshop
          </a>
          <div className="flex justify-center mt-6 space-x-6 p-4">
            <a
              href="https://facebook.com/SNKMoslavacPopovaca"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined className="text-2xl text-gray-700 hover:text-blue-600 transition-colors" />
            </a>
            <a
              href="https://youtube.com/@SNKMoslavacPopovaca"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeOutlined className="text-2xl text-gray-700 hover:text-red-600 transition-colors" />
            </a>
          </div>
        </div>
      </Drawer>
    </>
  );
}
