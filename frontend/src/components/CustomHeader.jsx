import React, { useState, useEffect, useRef } from "react";
import { Layout, Menu, Button, Drawer, Dropdown, Spin } from "antd";
import { Link } from "react-router-dom";
import {
  MenuOutlined,
  DownOutlined,
  YoutubeOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { useGetCurrentSeasonCompetitions } from "../hooks/useGetCurrentSeasonCompetitions";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import logo from "../assets/grb.png";

const { Header } = Layout;

export default function CustomHeader() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { data: competitions, isLoading } = useGetCurrentSeasonCompetitions();
  const headerRef = useRef(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    if (currentScrollY < lastScrollY.current) {
      // Scrolling up
      setIsHeaderVisible(true);
    } else if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
      // Scrolling down and past the 100px mark
      setIsHeaderVisible(false);
    }
    lastScrollY.current = currentScrollY;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setVisible(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const seasonDropdownMenu = (
    <Menu>
      {isLoading ? (
        <Menu.Item key="loading" disabled>
          <Spin size="small" /> Učitavanje natjecanja...
        </Menu.Item>
      ) : (
        competitions?.map((comp) => (
          <Menu.Item key={comp.id}>
            <Link
              to={`/season/${comp.id}/${encodeURIComponent(comp.name)}`}
              onClick={() => setVisible(false)}
            >
              {comp.name}
            </Link>
          </Menu.Item>
        ))
      )}
    </Menu>
  );

  const menuItems = [
    { key: "news", label: "Vijesti", to: "/news" },
    {
      key: "season",
      label: (
        <Dropdown overlay={seasonDropdownMenu} trigger={["click"]}>
          <span className="flex items-center cursor-pointer">
            Sezona <DownOutlined className="ml-1" />
          </span>
        </Dropdown>
      ),
    },
    { key: "matches", label: "Utakmice", to: "/matches" },
    { key: "first-team", label: "Momčad", to: "/first-team" },
    {
      key: "webshop",
      label: "Webshop",
      to: "https://alpashrvatska.hr/snk-moslavac-popovaca/",
    },
  ];

  const renderMenuItems = () =>
    menuItems.map((item) => (
      <Menu.Item key={item.key}>
        {item.to ? (
          <Link to={item.to} onClick={() => setVisible(false)}>
            {item.label}
          </Link>
        ) : (
          item.label
        )}
      </Menu.Item>
    ));

  return (
    <motion.div
      ref={headerRef}
      className="sticky top-0 z-50 w-full"
      initial={{ y: 0 }}
      animate={{ y: isHeaderVisible ? 0 : "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <Header className="h-full bg-white border-b border-gray-300 shadow-md px-4 py-2">
        <div className="max-w-screen-xl mx-auto flex items-center h-full">
          {/* Mobile menu button */}
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: "20px" }} />}
              onClick={() => setVisible(true)}
              className="absolute left-4"
            />
          )}

          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center ${
              isMobile ? "mx-auto" : "mr-8 ml-36"
            }`}
          >
            <img src={logo} alt="Klub Grb" style={{ height: 80 }} />
          </Link>

          {/* Desktop menu */}
          {!isMobile && (
            <div className="flex-grow flex justify-between items-center">
              <Menu mode="horizontal" className="border-0 space-x-3">
                {renderMenuItems()}
              </Menu>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.facebook.com/SNKMoslavacPopovaca"
                  aria-label="Facebook"
                  className="text-primary-foreground hover:text-accent"
                >
                  <FacebookOutlined className="text-2xl" />
                </a>
                <a
                  href="https://www.youtube.com/@SNKMoslavacPopovaca"
                  aria-label="YouTube"
                  className="text-primary-foreground hover:text-accent"
                >
                  <YoutubeOutlined className="text-2xl" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Mobile drawer menu */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setVisible(false)}
          visible={visible}
          bodyStyle={{ padding: 0 }}
        >
          <Menu mode="vertical" className="border-0">
            {renderMenuItems()}
          </Menu>
        </Drawer>
      </Header>
    </motion.div>
  );
}
