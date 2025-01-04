"use client";

import React, { useState } from "react";
import { List, Pagination, Typography, Spin, Alert } from "antd";
import { Link } from "react-router-dom";
import NewsItem from "./NewsItem";
import grb from "../../assets/grb.png";
import useGetNewsPaginated from "../../hooks/useGetNewsPaginated";
import { isAdmin } from "../../utils/adminUtils";

const { Title } = Typography;

export default function NewsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, error, isLoading } = useGetNewsPaginated(currentPage, pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={
          error instanceof Error ? error.message : "An unknown error occurred"
        }
        type="error"
        showIcon
        className="max-w-4xl mx-auto mt-4"
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className=" flex justify-end">
        {isAdmin() && ( // Provjera admin statusa
          <Link
            to="/admin/manage-news"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Uredi vijesti
          </Link>
        )}
      </div>

      <Title
        level={2}
        className="mb-6 text-center text-2xl font-bold text-gray-800"
      >
        Vijesti
      </Title>
      <List
        dataSource={data?.content || []}
        renderItem={(item) => (
          <List.Item className="p-0 mb-4">
            <NewsItem item={item} grb={grb} />
          </List.Item>
        )}
      />

      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          total={data?.totalElements || 0}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="text-sm"
        />
      </div>
    </div>
  );
}
