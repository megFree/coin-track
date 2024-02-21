'use client';

import Modal from '@/components/_base/Modal/Modal';
import { AddConsumptionPopup, AddIncomePopup, CreateAccountPopup, TestPopup } from '@/components/_popups';
import { popupClose, resetPopupTitle } from '@/redux/features/popups/popupsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';

export default function PopupManager() {
  const activePopup = useAppSelector((state) => state.popups.activePopup);
  const popupTitle = useAppSelector((state) => state.popups.popupTitle);
  const dispatch = useAppDispatch();

  if (!activePopup) {
    return null;
  }

  const popups = {
    TestPopup,
    CreateAccountPopup,
    AddConsumptionPopup,
    AddIncomePopup,
  }

  const popup = React.createElement(popups[activePopup]);

  const onClose = () => {
    dispatch(popupClose());
    dispatch(resetPopupTitle());
  }

  return (
    <Modal 
      onClose={() => onClose()}
      title={popupTitle || undefined}
    >
      {popup}
    </Modal>
  );
};
