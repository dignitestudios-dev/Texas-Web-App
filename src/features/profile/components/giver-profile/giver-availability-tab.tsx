'use client';

import React, { useState } from 'react';
import { Clock, Plus, Trash2, Copy, Sparkles, Check, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface TimeSlot {
  id: string;
  fromTime: string;
  toTime: string;
}

interface DayAvailability {
  day: string;
  short: string;
  isAvailable: boolean;
  slots: TimeSlot[];
}

const INITIAL_DAYS: DayAvailability[] = [
  {
    day: 'Monday',
    short: 'Mon',
    isAvailable: true,
    slots: [{ id: '1', fromTime: '08:00', toTime: '17:00' }],
  },
  {
    day: 'Tuesday',
    short: 'Tue',
    isAvailable: true,
    slots: [{ id: '2', fromTime: '08:00', toTime: '17:00' }],
  },
  {
    day: 'Wednesday',
    short: 'Wed',
    isAvailable: true,
    slots: [{ id: '3', fromTime: '08:00', toTime: '17:00' }],
  },
  {
    day: 'Thursday',
    short: 'Thu',
    isAvailable: true,
    slots: [{ id: '4', fromTime: '08:00', toTime: '17:00' }],
  },
  {
    day: 'Friday',
    short: 'Fri',
    isAvailable: true,
    slots: [{ id: '5', fromTime: '08:00', toTime: '17:00' }],
  },
  {
    day: 'Saturday',
    short: 'Sat',
    isAvailable: false,
    slots: [{ id: '6', fromTime: '09:00', toTime: '14:00' }],
  },
  {
    day: 'Sunday',
    short: 'Sun',
    isAvailable: false,
    slots: [{ id: '7', fromTime: '09:00', toTime: '14:00' }],
  },
];

export function GiverAvailabilityTab() {
  const [timezone, setTimezone] = useState('Central Time (US & Canada) - Texas (TX)');
  const [schedule, setSchedule] = useState<DayAvailability[]>(INITIAL_DAYS);

  const handleToggleDay = (dayName: string) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.day === dayName ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const handleTimeChange = (
    dayName: string,
    slotId: string,
    field: 'fromTime' | 'toTime',
    value: string
  ) => {
    setSchedule((prev) =>
      prev.map((item) => {
        if (item.day !== dayName) return item;
        return {
          ...item,
          slots: item.slots.map((s) =>
            s.id === slotId ? { ...s, [field]: value } : s
          ),
        };
      })
    );
  };

  const handleAddSlot = (dayName: string) => {
    setSchedule((prev) =>
      prev.map((item) => {
        if (item.day !== dayName) return item;
        const newSlot: TimeSlot = {
          id: Date.now().toString(),
          fromTime: '18:00',
          toTime: '21:00',
        };
        return {
          ...item,
          slots: [...item.slots, newSlot],
        };
      })
    );
    toast.success(`Added another time slot for ${dayName}`);
  };

  const handleRemoveSlot = (dayName: string, slotId: string) => {
    setSchedule((prev) =>
      prev.map((item) => {
        if (item.day !== dayName) return item;
        if (item.slots.length <= 1) {
          // If only 1 slot, turn day off
          return { ...item, isAvailable: false };
        }
        return {
          ...item,
          slots: item.slots.filter((s) => s.id !== slotId),
        };
      })
    );
  };

  const handleApplyToAllWeekdays = (sourceDay: string) => {
    const source = schedule.find((d) => d.day === sourceDay);
    if (!source) return;

    setSchedule((prev) =>
      prev.map((d) => {
        if (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(d.day)) {
          return {
            ...d,
            isAvailable: source.isAvailable,
            slots: source.slots.map((s) => ({ ...s, id: `${d.day}-${s.id}` })),
          };
        }
        return d;
      })
    );
    toast.success(`Copied ${sourceDay}'s schedule to all weekdays (Mon-Fri)`);
  };

  const handlePreset = (type: 'standard' | 'all' | 'weekends') => {
    if (type === 'standard') {
      setSchedule(INITIAL_DAYS);
      toast.success('Applied standard weekdays preset (Mon-Fri 8am-5pm)');
    } else if (type === 'all') {
      setSchedule((prev) =>
        prev.map((d) => ({
          ...d,
          isAvailable: true,
          slots: [{ id: d.day, fromTime: '08:00', toTime: '18:00' }],
        }))
      );
      toast.success('Applied full 7-day availability preset');
    } else if (type === 'weekends') {
      setSchedule((prev) =>
        prev.map((d) => ({
          ...d,
          isAvailable: ['Saturday', 'Sunday'].includes(d.day),
          slots: [{ id: d.day, fromTime: '09:00', toTime: '17:00' }],
        }))
      );
      toast.success('Applied weekends-only preset');
    }
  };

  const handleSave = () => {
    toast.success('Weekly availability schedule saved!');
  };

  return (
    <div className="flex flex-col gap-[30px] w-full select-none">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-[6px]">
          <h2 className="font-rubik font-medium text-[24px] leading-[28px] capitalize text-[#121111]">
            Weekly Availability Schedule
          </h2>
          <p className="font-rubik font-light text-[14px] leading-[17px] capitalize text-[#3D3D3D]">
            Set your working days and daily hours. Care seekers can book services during these slots.
          </p>
        </div>

        {/* Timezone Indicator */}
        <div className="flex items-center gap-2 bg-[#F8F9FF] border border-[#E4E4E7] rounded-[10px] px-3.5 py-2 text-[13px] font-rubik text-[#121111] shrink-0">
          <Globe className="w-4 h-4 text-[#F36922]" />
          <span>{timezone}</span>
        </div>
      </div>

      {/* Quick Presets Bar */}
      <div className="flex items-center gap-2 flex-wrap bg-[#F8F9FF] border border-[#E4E4E7]/80 rounded-[12px] p-3">
        <span className="font-rubik font-medium text-[13px] text-[#121111] mr-1 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#F36922]" />
          Quick Presets:
        </span>
        <button
          type="button"
          onClick={() => handlePreset('standard')}
          className="px-3 py-1 bg-white hover:bg-neutral-50 border border-[#E4E4E7] rounded-[8px] font-rubik text-[12px] text-[#121111] transition cursor-pointer shadow-2xs"
        >
          Weekdays (8 AM - 5 PM)
        </button>
        <button
          type="button"
          onClick={() => handlePreset('all')}
          className="px-3 py-1 bg-white hover:bg-neutral-50 border border-[#E4E4E7] rounded-[8px] font-rubik text-[12px] text-[#121111] transition cursor-pointer shadow-2xs"
        >
          7 Days Full-Time
        </button>
        <button
          type="button"
          onClick={() => handlePreset('weekends')}
          className="px-3 py-1 bg-white hover:bg-neutral-50 border border-[#E4E4E7] rounded-[8px] font-rubik text-[12px] text-[#121111] transition cursor-pointer shadow-2xs"
        >
          Weekends Only
        </button>
      </div>

      {/* Daily Schedule List */}
      <div className="flex flex-col gap-3 w-full">
        {schedule.map((item) => (
          <div
            key={item.day}
            className={`flex flex-col gap-3 p-4 rounded-[14px] border transition ${
              item.isAvailable
                ? 'bg-[#F8F9FF] border-[#E4E4E7]'
                : 'bg-white/60 border-[#E4E4E7]/60 opacity-70'
            }`}
          >
            {/* Top row: Day Toggle & Quick Actions */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Day switch + Name */}
              <div className="flex items-center gap-3 w-[160px]">
                <button
                  type="button"
                  role="switch"
                  aria-checked={item.isAvailable}
                  onClick={() => handleToggleDay(item.day)}
                  className={`relative inline-flex h-[24px] w-[42px] shrink-0 cursor-pointer rounded-full p-[2px] transition-colors duration-200 ease-in-out border-none outline-none ${
                    item.isAvailable ? 'bg-[#046C4E]' : 'bg-[#E4E4E7]'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                      item.isAvailable ? 'translate-x-[18px]' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="font-rubik font-medium text-[15px] text-[#121111]">
                  {item.day}
                </span>
              </div>

              {/* Copy to Weekdays & Add Slot actions */}
              {item.isAvailable ? (
                <div className="flex items-center gap-3">
                  {item.day === 'Monday' && (
                    <button
                      type="button"
                      onClick={() => handleApplyToAllWeekdays('Monday')}
                      className="flex items-center gap-1 text-[12px] font-rubik text-[#0A0A6E] hover:underline cursor-pointer bg-transparent border-none"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy to Mon-Fri</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleAddSlot(item.day)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-neutral-50 border border-[#E4E4E7] rounded-[8px] text-[12px] font-rubik font-medium text-[#0A0A6E] cursor-pointer transition shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Hours</span>
                  </button>
                </div>
              ) : (
                <span className="font-rubik font-normal text-[13px] text-[#727272]">
                  Unavailable / Off
                </span>
              )}
            </div>

            {/* Time Slots List */}
            {item.isAvailable && (
              <div className="flex flex-col gap-2 pt-1 border-t border-[#E4E4E7]/60">
                {item.slots.map((slot, sIdx) => (
                  <div
                    key={slot.id}
                    className="flex items-center gap-3 flex-wrap"
                  >
                    {/* From Time Input */}
                    <div className="flex items-center gap-2 bg-white border border-[#E4E4E7] rounded-[10px] px-3 py-1.5 shadow-2xs">
                      <span className="text-[12px] font-rubik text-[#565656]">From:</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#0A0A6E]" />
                        <input
                          type="time"
                          value={slot.fromTime}
                          onChange={(e) =>
                            handleTimeChange(item.day, slot.id, 'fromTime', e.target.value)
                          }
                          className="font-rubik font-medium text-[13px] text-[#121111] bg-transparent outline-none border-none cursor-pointer"
                        />
                      </div>
                    </div>

                    <span className="text-[#565656] text-[13px] font-rubik">to</span>

                    {/* To Time Input */}
                    <div className="flex items-center gap-2 bg-white border border-[#E4E4E7] rounded-[10px] px-3 py-1.5 shadow-2xs">
                      <span className="text-[12px] font-rubik text-[#565656]">To:</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#0A0A6E]" />
                        <input
                          type="time"
                          value={slot.toTime}
                          onChange={(e) =>
                            handleTimeChange(item.day, slot.id, 'toTime', e.target.value)
                          }
                          className="font-rubik font-medium text-[13px] text-[#121111] bg-transparent outline-none border-none cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Delete Slot Button (if multiple slots) */}
                    {item.slots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSlot(item.day, slot.id)}
                        className="p-1.5 hover:bg-red-50 text-[#C81E1E] rounded-[8px] cursor-pointer transition border-none bg-transparent"
                        title="Remove time slot"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Save Button Footer */}
      <div className="flex justify-end w-full pt-2">
        <button
          type="button"
          onClick={handleSave}
          className="w-[71px] h-[36px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[8px] font-rubik font-medium text-[15px] leading-[135%] capitalize flex items-center justify-center transition cursor-pointer border-none shadow-2xs"
        >
          Save
        </button>
      </div>
    </div>
  );
}
