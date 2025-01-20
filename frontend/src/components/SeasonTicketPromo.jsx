import React from "react";
import { motion } from "framer-motion";
import { RightOutlined } from "@ant-design/icons";
import fans from "../../public/fans.jpg";
import { Link } from "react-router-dom";

export default function SeasonTicketPromo() {
  return (
    <motion.div
      className="max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl bg-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative overflow-hidden">
          <motion.img
            src={fans}
            alt="SNK Moslavac navijači"
            className="w-full h-64 md:h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Sezona 2024/2025</h3>
            <p className="text-sm opacity-80">Budi dio naše priče</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Postani naš 12. igrač!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Osiguraj svoje mjesto na tribinama i podržavaj svoj klub tijekom
            cijele sezone.
          </p>
          <Link
            to="/season-ticket-purchase"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-4 px-5 py-3 font-medium text-indigo-600 shadow-xl transition duration-300 ease-out hover:ring-1 hover:ring-blue-500"
          >
            <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700"></span>
            <span className="ease absolute bottom-0 right-0 mb-32 mr-4 block h-64 w-64 origin-bottom-left translate-x-24 rotate-45 transform rounded-full bg-blue-700 opacity-30 transition duration-500 group-hover:rotate-90"></span>
            <span className="relative text-white text-lg font-semibold">
              Kupi iskaznicu
            </span>
            <RightOutlined className="relative ml-2 text-white" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
