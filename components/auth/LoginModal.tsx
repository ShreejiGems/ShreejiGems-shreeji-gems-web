'use client';

import React, { useState } from 'react';
import { Modal } from 'antd';
import { garamond } from '@/src/common/helper';
import LoginForm from './LoginForm';
import ForgotPasswordModal from './ForgotPasswordModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleCancel = () => {
    onClose();
    setShowForgotPassword(false);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <Modal
      title={
        <div className="text-center">
          <h2 className="text-2xl font-bold" style={{ color: '#f97316', fontFamily: garamond.style.fontFamily }}>
            {showForgotPassword ? 'Forgot Password' : 'Welcome Back!'}
          </h2>
        </div>
      }
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={showForgotPassword ? 480 : 400}
      centered
      styles={{
        header: { borderBottom: '1px solid #f0f0f0' },
        body: { padding: '24px' }
      }}
    >
      {showForgotPassword ? (
        <ForgotPasswordModal
          isOpen={isOpen}
          onClose={handleCancel}
          onBackToLogin={handleBackToLogin}
          verificationType="FORGET_PASSWORD"
        />
      ) : (
        <LoginForm
          onSuccess={onClose}
          onSwitchToRegister={onSwitchToRegister}
          onForgotPassword={handleForgotPassword}
          showRegisterLink={true}
          buttonText="Login"
          buttonBlock={true}
        />
      )}
    </Modal>
  );
};

export default LoginModal;
