'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

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
      prev.map((item) => {
        if (item.id === id) {
          const updated = !item.enabled;
          toast.success(`Notification setting ${updated ? 'enabled' : 'disabled'}`);
          return { ...item, enabled: updated };
        }
        return item;
      })
    );
  };

  return (
    <div className="w-full max-w-[980px] bg-white rounded-[16px] p-6 sm:p-7 flex flex-col gap-6 shadow-xs border border-[#EFEFEF]/60 select-none">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="font-rubik font-semibold text-[20px] sm:text-[22px] leading-[26px] text-[#121111]">
          Notification Settings
        </h2>
        <p className="font-rubik font-normal text-[14px] leading-[18px] text-[#565656]">
          Manage Your Notifications
        </p>
      </div>

      {/* Notification items list */}
      <div className="flex flex-col gap-3 w-full">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="w-full h-[56px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[12px] px-5 flex items-center justify-between transition hover:border-[#F36922]/40"
          >
            <span className="font-rubik font-normal text-[15px] text-[#121111]">
              {item.title}
            </span>

            {/* Switch Toggle (Active #046C4E / Inactive #E4E4E7) */}
            <button
              type="button"
              role="switch"
              aria-checked={item.enabled}
              onClick={() => toggleNotification(item.id)}
              className={`relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full p-[2px] transition-colors duration-200 ease-in-out border-none outline-none ${
                item.enabled ? 'bg-[#046C4E]' : 'bg-[#E4E4E7]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
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
