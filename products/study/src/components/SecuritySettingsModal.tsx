import React from 'react';
import { AccountSettingsModal } from './AccountSettingsModal';
import { UserProfile } from '../types';

export interface SecuritySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
}

export const SecuritySettingsModal: React.FC<SecuritySettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  return (
    <AccountSettingsModal
      isOpen={isOpen}
      onClose={onClose}
      currentUser={currentUser}
      initialTab="security"
    />
  );
};
