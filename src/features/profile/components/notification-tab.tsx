'use client';

import React, { useState } from 'react';

interface NotificationSetting {
  id: string;
  title: string;
  enabled: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationSetting[] = [
  { id: '1', title: 'Notification title', enabled: true },
  { id: '2', title: 'Notification title', enabled: false },
  { id: '3', title: 'Notification title', enabled: false },
  { id: '4', title: 'Notification title', enabled: false },
];

export default function NotificationTab() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>(INITIAL_NOTIFICATIONS);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  return (
    <div className="w-full bg-white rounded-[16px] p-[20px] flex flex-col gap-[20px] shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-[6px]">
        <h2 className="font-rubik font-medium text-[18px] leading-[21px] text-[#121111]">
          Notification Settings
        </h2>
        <p className="font-rubik font-light text-[14px] leading-[17px] text-[#3D3D3D]">
          Manage Your Notifications
        </p>
      </div>

      {/* Notification items list */}
      <div className="flex flex-col gap-[12px] w-full">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="w-full h-[52px] bg-[#F8F9FF] rounded-[12px] px-[20px] flex items-center justify-between transition hover:bg-[#f1f3fd]"
          >
            <span className="font-rubik font-medium text-[15px] text-[#121111]">
              {item.title}
            </span>

            {/* Switch Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={item.enabled}
              onClick={() => toggleNotification(item.id)}
              className={`w-[44px] h-[24px] rounded-full transition-colors p-[2px] cursor-pointer border-none flex items-center ${
                item.enabled ? 'bg-[#F36922]' : 'bg-[#E2E8F0]'
              }`}
            >
              <div
                className={`w-[20px] h-[20px] bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                  item.enabled ? 'translate-x-[20px]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
