import React, { useState, useEffect } from "react";
import { Button, Spin, message, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useGetNews from "../../hooks/useGetNews";
import useAddNews from "../../hooks/useAddNews";
import useUpdateNews from "../../hooks/useUpdateNews";
import useDeleteNews from "../../hooks/useDeleteNews";
import useSendNotification from "../../hooks/useSendNotification";
import useValidateToken from "../../hooks/useValidateToken";
import NewsTable from "./NewsTable";
import NewsModal from "./NewsModal";
import { isAdmin } from "../../utils/adminUtils"; // Provjera admin statusa

export default function NewsManager() {
  const [modalState, setModalState] = useState({
    visible: false,
    mode: "",
    news: null,
  });
  const navigate = useNavigate();

  const { refetch: validateToken } = useValidateToken(navigate);
  const sendNotification = useSendNotification();

  const { data: news, isLoading, error } = useGetNews();
  const addNews = useAddNews();
  const updateNews = useUpdateNews();
  const deleteNews = useDeleteNews();

  // Provjera admin statusa
  useEffect(() => {
    if (!isAdmin()) {
      message.warning("Nemate ovlasti pristupiti ovoj stranici.");
      navigate("/news"); // Redirect na /news ako korisnik nije admin
    }
  }, [navigate]);

  const showModal = (mode, newsItem = null) => {
    setModalState({ visible: true, mode, news: newsItem });
  };

  const closeModal = () => {
    setModalState({ visible: false, mode: "", news: null });
  };

  const handleAddOrUpdate = (values, files) => {
    const newsData = {
      ...values,
      thumbnail: files.thumbnail[0]?.originFileObj || files.thumbnail[0]?.url,
      files: files.additional.map((file) => file.originFileObj || file.url),
    };

    if (modalState.mode === "add") {
      addNews.mutate(newsData, {
        onSuccess: (data) => {
          closeModal();
          message.success("News added successfully!");
          const token = localStorage.getItem("firebaseToken");
          if (!token) {
            message.error(
              "Firebase token not found. Cannot send notification."
            );
            return;
          }

          sendNotification.mutate({
            token,
            title: values.title,
            body: values.content.slice(0, 100),
            icon: data.thumbnailUrl,
          });
        },
        onError: () => {
          message.error("Failed to add news. Please try again.");
        },
      });
    } else if (modalState.mode === "edit") {
      updateNews.mutate(
        { ...newsData, id: modalState.news.id },
        {
          onSuccess: () => {
            closeModal();
            message.success("News updated successfully!");
          },
          onError: () => {
            message.error("Failed to update news. Please try again.");
          },
        }
      );
    }
  };

  const handleDelete = (id) => {
    deleteNews.mutate(id, {
      onSuccess: () => {
        message.success("News deleted successfully!");
      },
      onError: () => {
        message.error("Failed to delete news. Please try again.");
      },
    });
  };

  return (
    <div className="p-4 my-12 max-w-7xl mx-auto">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal("add")}
        className="mb-4 w-full sm:w-auto"
      >
        Dodaj
      </Button>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : error ? (
        <Alert
          message="Error"
          description="Failed to load news. Please try again later."
          type="error"
          showIcon
          className="mb-4"
        />
      ) : (
        <NewsTable
          news={news}
          onView={(item) => showModal("view", item)}
          onEdit={(item) => showModal("edit", item)}
          onDelete={handleDelete}
        />
      )}

      {modalState.visible && (
        <NewsModal
          mode={modalState.mode}
          news={modalState.news}
          onClose={closeModal}
          onSubmit={handleAddOrUpdate}
        />
      )}
    </div>
  );
}
