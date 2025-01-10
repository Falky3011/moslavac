import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";
import Cookies from "js-cookie";
import { useValidateAdminPassword } from "../hooks/useValidateAdminPassword";
import { useNavigate } from "react-router-dom";

const COOKIE_NAME = "isAdmin";
const COOKIE_EXPIRATION_DAYS = 3;

export const setAdminAuth = () => {
  Cookies.set(COOKIE_NAME, "true", {
    expires: COOKIE_EXPIRATION_DAYS,
    path: "/",
  });
};

export const isAdmin = () => {
  const adminStatus = Cookies.get("isAdmin") === "true";
  return adminStatus;
};

export const clearAdminAuth = () => {
  Cookies.remove(COOKIE_NAME, { path: "/" });
};

const AdminModal = React.memo(({ isVisible, onClose, onSuccess }) => {
  const [adminPassword, setAdminPassword] = useState("");

  const { mutate: validatePassword, isLoading } = useValidateAdminPassword();

  const handleLogin = () => {
    validatePassword(adminPassword, {
      onSuccess: (data) => {
        if (data.isValid) {
          setAdminAuth();
          onClose();
          message.success("Prijavljeni ste kao admin!");
          onSuccess(); // Preusmjeravanje nakon prijave
        } else {
          message.error("Neispravna administratorska šifra.");
        }
      },
      onError: () => {
        message.error("Došlo je do greške prilikom provjere šifre.");
      },
    });
  };

  return (
    <Modal
      title="Admin Prijava"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Zatvori
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleLogin}
          loading={isLoading}
        >
          Prijavi se
        </Button>,
      ]}
    >
      <Input.Password
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
        placeholder="Unesite administratorsku šifru"
      />
    </Modal>
  );
});

export const useAdminModal = (onSuccess = () => {}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminRoute = window.location.pathname.endsWith("/admin");
    if (isAdminRoute && !isAdmin()) {
      setIsModalVisible(true);
    }
  }, []);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleSuccess = () => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/admin$/, ""); // Uklanja "/admin" s kraja
    navigate(newPath); // Preusmjerava na novi URL
    onSuccess();
  };

  return {
    AdminModal: () => (
      <AdminModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onSuccess={handleSuccess} // Poziv funkcije za preusmjeravanje
      />
    ),
    isAdmin: isAdmin(),
  };
};
