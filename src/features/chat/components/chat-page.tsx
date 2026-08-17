'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MoreHorizontal,
  Phone,
  Paperclip,
  Smile,
  Send,
  Star,
  Trash2,
  Edit2,
  X,
} from 'lucide-react';
import { Conversation, Message } from '../types/chat.types';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'john_doe',
    name: 'John Doe',
    avatar: '/images/avatar.webp',
    lastMessage: 'Hello i think you are the best fit for the...',
    time: '6:28 pm',
    online: true,
    rating: 5.0,
    reviewsCount: 48,
    servicesCount: 98,
    messages: [
      {
        id: 'msg_1',
        senderId: 'john_doe',
        senderName: 'John Doe',
        senderAvatar: '/images/avatar.webp',
        text: 'Hello i think you are the best fit for the job',
        time: '6:28 pm',
        isMe: false,
      },
      {
        id: 'msg_2',
        senderId: 'me',
        senderName: 'Nandi Bloard',
        senderAvatar: '/images/avatar.webp',
        text: 'Sure!',
        time: '6:28 pm',
        isMe: true,
      },
    ],
  },
  {
    id: 'ravi_kumar',
    name: 'Ravi Kumar',
    avatar: '/images/giver.webp',
    lastMessage: 'I appreciate the opportunity and I\'m e...',
    time: '7:15 pm',
    online: true,
    rating: 4.8,
    reviewsCount: 32,
    servicesCount: 45,
    messages: [
      {
        id: 'msg_1',
        senderId: 'ravi_kumar',
        senderName: 'Ravi Kumar',
        senderAvatar: '/images/giver.webp',
        text: 'I appreciate the opportunity and I\'m excited to help out.',
        time: '7:15 pm',
        isMe: false,
      },
    ],
  },
  {
    id: 'sara_lee',
    name: 'Sara Lee',
    avatar: '/images/seeker.webp',
    lastMessage: 'Looking forward to collaborating on th...',
    time: '6:45 pm',
    online: true,
    rating: 4.9,
    reviewsCount: 28,
    servicesCount: 62,
    messages: [
      {
        id: 'msg_1',
        senderId: 'sara_lee',
        senderName: 'Sara Lee',
        senderAvatar: '/images/seeker.webp',
        text: 'Looking forward to collaborating on this request.',
        time: '6:45 pm',
        isMe: false,
      },
    ],
  },
  {
    id: 'jamal_edwards',
    name: 'Jamal Edwards',
    avatar: '/images/avatar.webp',
    lastMessage: 'Thanks for considering me for this role...',
    time: '8:02 pm',
    online: true,
    rating: 4.7,
    reviewsCount: 19,
    servicesCount: 30,
    messages: [
      {
        id: 'msg_1',
        senderId: 'jamal_edwards',
        senderName: 'Jamal Edwards',
        senderAvatar: '/images/avatar.webp',
        text: 'Thanks for considering me for this role. I have open availability.',
        time: '8:02 pm',
        isMe: false,
      },
    ],
  },
  {
    id: 'maya_singh',
    name: 'Maya Singh',
    avatar: '/images/giver.webp',
    lastMessage: 'I\'m eager to bring my expertise to you...',
    time: '6:50 pm',
    online: true,
    rating: 5.0,
    reviewsCount: 54,
    servicesCount: 110,
    messages: [
      {
        id: 'msg_1',
        senderId: 'maya_singh',
        senderName: 'Maya Singh',
        senderAvatar: '/images/giver.webp',
        text: 'I\'m eager to bring my expertise to your homecare needs.',
        time: '6:50 pm',
        isMe: false,
      },
    ],
  },
  {
    id: 'lucas_grant',
    name: 'Lucas Grant',
    avatar: '/images/seeker.webp',
    lastMessage: 'I believe my skills align well with your...',
    time: '7:35 pm',
    online: true,
    rating: 4.6,
    reviewsCount: 15,
    servicesCount: 22,
    messages: [
      {
        id: 'msg_1',
        senderId: 'lucas_grant',
        senderName: 'Lucas Grant',
        senderAvatar: '/images/seeker.webp',
        text: 'I believe my skills align well with your care requirements.',
        time: '7:35 pm',
        isMe: false,
      },
    ],
  },
  {
    id: 'elena_torres',
    name: 'Elena Torres',
    avatar: '/images/avatar.webp',
    lastMessage: 'Excited about the possibility of workin...',
    time: '8:20 pm',
    online: true,
    rating: 4.9,
    reviewsCount: 40,
    servicesCount: 88,
    messages: [
      {
        id: 'msg_1',
        senderId: 'elena_torres',
        senderName: 'Elena Torres',
        senderAvatar: '/images/avatar.webp',
        text: 'Excited about the possibility of working with you.',
        time: '8:20 pm',
        isMe: false,
      },
    ],
  },
  {
    id: 'james_liao',
    name: 'James Liao',
    avatar: '/images/giver.webp',
    lastMessage: 'I would love to share my portfolio with...',
    time: '7:55 pm',
    online: true,
    rating: 4.8,
    reviewsCount: 25,
    servicesCount: 50,
    messages: [
      {
        id: 'msg_1',
        senderId: 'james_liao',
        senderName: 'James Liao',
        senderAvatar: '/images/giver.webp',
        text: 'I would love to share my portfolio with you to showcase my work.',
        time: '7:55 pm',
        isMe: false,
      },
    ],
  },
];

export default function ChatPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>('john_doe');
  const [inputText, setInputText] = useState<string>('');
  
  // Message Edit State
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');

  // Dialog Overlay States
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of active message list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv.messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `msg_user_${Date.now()}`,
      senderId: 'me',
      senderName: 'Nandi Bloard',
      senderAvatar: '/images/avatar.webp',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      isMe: true,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConv.id) {
          return {
            ...c,
            lastMessage: newMessage.text,
            time: newMessage.time,
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );
    setInputText('');
  };

  const handleEditMessage = (msgId: string, currentText: string) => {
    setEditingMessageId(msgId);
    setEditText(currentText);
  };

  const handleSaveEdit = (msgId: string) => {
    if (!editText.trim()) return;
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConv.id) {
          return {
            ...c,
            messages: c.messages.map((m) =>
              m.id === msgId ? { ...m, text: editText.trim() } : m
            ),
          };
        }
        return c;
      })
    );
    setEditingMessageId(null);
  };

  const handleDeleteMessage = (msgId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConv.id) {
          const filtered = c.messages.filter((m) => m.id !== msgId);
          return {
            ...c,
            lastMessage: filtered.length > 0 ? filtered[filtered.length - 1].text : 'No messages',
            messages: filtered,
          };
        }
        return c;
      })
    );
  };

  const handleBlockUser = () => {
    alert(`${activeConv.name} has been blocked.`);
    setShowBlockDialog(false);
  };

  const handleDeleteChat = () => {
    setConversations((prev) => prev.filter((c) => c.id !== activeConv.id));
    setShowDeleteDialog(false);
    // Switch to first available conversation
    const remaining = conversations.filter((c) => c.id !== activeConv.id);
    if (remaining.length > 0) {
      setActiveConvId(remaining[0].id);
    }
  };

  const handleReportChat = () => {
    alert(`Chat with ${activeConv.name} has been reported successfully.`);
    setShowReportDialog(false);
  };

  return (
    <div className="w-full flex justify-center py-[30px] px-8 lg:px-[150px]">
      <div className="w-full max-w-[1280px] h-[735px] flex flex-col md:flex-row gap-[20px] select-none">
        
        {/* Left Column (Messages List Panel) */}
        <div className="w-full md:w-[350px] bg-white border border-neutral-100 rounded-2xl flex flex-col overflow-hidden shadow-sm shrink-0">
          {/* Header Panel */}
          <div className="h-[78px] px-5 flex items-center justify-between border-b border-[#EFEFEF]/85 shrink-0">
            <div className="flex items-center gap-[16px]">
              <button
                onClick={() => router.push('/')}
                className="w-10 h-10 rounded-full bg-[#0A0A6E] flex items-center justify-center hover:scale-105 transition cursor-pointer border-none shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <h2 className="font-rubik font-medium text-[24px] text-[#121111] tracking-[-0.005em]">
                Messages
              </h2>
            </div>
            <button className="w-[43px] h-[43px] bg-[#F8F9FF] hover:bg-neutral-100 transition rounded-full flex items-center justify-center cursor-pointer border-none">
              <MoreHorizontal className="w-5 h-5 text-[#121111]" />
            </button>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto p-[10px] flex flex-col gap-2">
            {conversations.map((conv) => {
              const isActive = conv.id === activeConv.id;
              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    setActiveConvId(conv.id);
                    setEditingMessageId(null);
                  }}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition cursor-pointer border-none text-left ${
                    isActive ? 'bg-[#F8F9FF] shadow-sm' : 'bg-transparent hover:bg-neutral-50'
                  }`}
                >
                  {/* Avatar with Status indicator */}
                  <div className="relative shrink-0 w-[43px] h-[43px] rounded-full">
                    <Image
                      src={conv.avatar}
                      alt={conv.name}
                      width={43}
                      height={43}
                      className="rounded-full object-cover w-full h-full border border-neutral-100 shadow-sm"
                    />
                    {conv.online && (
                      <span className="absolute top-[2px] right-[2px] w-[8px] h-[8px] bg-[#24CC1B] border-2 border-white rounded-full" />
                    )}
                  </div>

                  {/* Details text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="font-rubik font-medium text-[16px] leading-[19px] text-[#121111] truncate">
                        {conv.name}
                      </h4>
                      <span className="font-rubik font-light text-[14px] text-[#121111]/70 shrink-0">
                        {conv.time}
                      </span>
                    </div>
                    <p className="font-rubik font-light text-[15px] text-[#121111]/60 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Column (Active Conversation Messages Panel) */}
        <div className="flex-1 bg-white border border-neutral-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">
          {/* Header Contact Name Panel */}
          <div className="h-[73px] px-5 flex items-center justify-between border-b border-[#EFEFEF]/85 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-[43px] h-[43px]">
                <Image
                  src={activeConv.avatar}
                  alt={activeConv.name}
                  width={43}
                  height={43}
                  className="rounded-full object-cover w-full h-full border border-neutral-100 shadow-sm"
                />
                {activeConv.online && (
                  <span className="absolute top-[2px] right-[2px] w-[8px] h-[8px] bg-[#24CC1B] border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="font-rubik font-semibold text-[18px] text-[#121111] leading-tight">
                  {activeConv.name}
                </h3>
                <span className="font-rubik font-light text-[14px] text-[#565656]">Online</span>
              </div>
            </div>

            {/* Call Action Button */}
            <button className="w-[43px] h-[43px] bg-[#FEF0E9] hover:bg-[#FDE4D5] transition rounded-full flex items-center justify-center cursor-pointer border-none">
              <Phone className="w-5 h-5 text-[#0A0A6E]" />
            </button>
          </div>

          {/* Active Messages List Area */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 bg-slate-50/10">
            {/* New Separator */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex-1 h-[1px] bg-[#EFEFEF]/85" />
              <span className="font-rubik text-[16px] text-black">New</span>
              <div className="flex-1 h-[1px] bg-[#EFEFEF]/85" />
            </div>

            {activeConv.messages.map((msg) => {
              const isEditing = editingMessageId === msg.id;
              return (
                <div
                  key={msg.id}
                  className={`flex gap-[10px] w-full items-end group ${
                    msg.isMe ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* Sender Avatar */}
                  {!msg.isMe && (
                    <div className="w-6 h-6 shrink-0 relative rounded-full">
                      <Image
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        width={24}
                        height={24}
                        className="rounded-full object-cover w-full h-full border border-neutral-100"
                      />
                    </div>
                  )}

                  {/* Message Bubble Container with Action buttons on hover */}
                  <div className="relative flex flex-col max-w-[80%]">
                    {/* Hover actions buttons for editing/deleting messages */}
                    {msg.isMe && !isEditing && (
                      <div className="absolute right-0 -top-8 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 border border-neutral-100 shadow-sm rounded-full p-1 z-10">
                        <button
                          type="button"
                          onClick={() => handleEditMessage(msg.id, msg.text)}
                          className="w-6 h-6 rounded-full hover:bg-neutral-100 text-[#0A0A6E] flex items-center justify-center cursor-pointer border-none outline-none"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="w-6 h-6 rounded-full hover:bg-red-50 text-[#C81E1E] flex items-center justify-center cursor-pointer border-none outline-none"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Active Message text bubble */}
                    <div
                      className={`p-3 text-[14px] leading-relaxed relative ${
                        msg.isMe
                          ? 'bg-[#FEF0E9] text-[#121111] rounded-[8px_8px_0px_8px] text-right font-medium'
                          : 'bg-[#F8F9FF] text-[#121111] rounded-[8px_8px_8px_0px] text-left font-normal'
                      }`}
                    >
                      {isEditing ? (
                        <div className="flex flex-col gap-1 items-end">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full text-[14px] bg-white border border-neutral-200 rounded p-1 text-black outline-none font-sans"
                            rows={2}
                          />
                          <div className="flex gap-1 mt-1">
                            <button
                              type="button"
                              onClick={() => setEditingMessageId(null)}
                              className="text-[12px] bg-neutral-200 hover:bg-neutral-300 text-black px-2 py-0.5 rounded cursor-pointer border-none"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(msg.id)}
                              className="text-[12px] bg-[#F36922] hover:bg-[#e05813] text-white px-2 py-0.5 rounded cursor-pointer border-none"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span>{msg.text}</span>
                      )}
                    </div>

                    {/* Sender details and time label */}
                    <div
                      className={`flex gap-[6px] text-[12px] text-[#121111]/70 font-light mt-1 ${
                        msg.isMe ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <span>{msg.time}</span>
                      <span>•</span>
                      <span>{msg.isMe ? 'You' : msg.senderName}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Active Bottom Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="h-[70px] border-t border-[#EFEFEF]/85 p-3 flex items-center justify-between gap-3 shrink-0"
          >
            {/* Attachment & Emoji actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="w-9 h-9 hover:bg-neutral-50 transition rounded-full flex items-center justify-center cursor-pointer border-none text-[#121111]"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="w-9 h-9 hover:bg-neutral-50 transition rounded-full flex items-center justify-center cursor-pointer border-none text-[#121111]"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>

            {/* Input field */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Send a message"
              className="flex-1 h-full px-4 rounded-xl border border-[#EFEFEF]/85 bg-white text-[#121111] text-[15px] font-sans placeholder-[#121111]/60 focus:outline-none focus:border-neutral-300"
            />

            {/* Send CTA */}
            <button
              type="submit"
              className="w-10 h-10 bg-[#F36922] hover:bg-[#e05813] transition rounded-full flex items-center justify-center cursor-pointer border-none shrink-0"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </form>
        </div>

        {/* Right Column (Contact Profile details Panel) */}
        <div className="w-full md:w-[320px] bg-[#F1F5F9] border border-neutral-100 rounded-2xl flex flex-col overflow-hidden shadow-sm shrink-0">
          {/* Header Photo Details */}
          <div className="p-5 flex flex-col items-center justify-center gap-3 border-b border-white shrink-0">
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-white border border-neutral-100 shadow-sm shrink-0">
              <Image
                src={activeConv.avatar}
                alt={activeConv.name}
                width={60}
                height={60}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col items-center gap-[4px] text-center">
              <h3 className="font-rubik font-semibold text-[18px] text-black capitalize">
                {activeConv.name}
              </h3>
              <div className="flex items-center gap-1.5 font-rubik font-light text-[14px] text-black">
                <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                <span>{activeConv.rating.toFixed(1)} ({activeConv.reviewsCount})</span>
                <span>|</span>
                <span>{activeConv.servicesCount} Services</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="p-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setShowBlockDialog(true)}
              className="w-full h-[44px] bg-[#C81E1E] hover:bg-[#b01717] text-white font-rubik font-normal text-[15px] rounded-lg transition border-none cursor-pointer flex items-center justify-center outline-none shrink-0"
            >
              Block User
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteDialog(true)}
              className="w-full h-[44px] bg-white hover:bg-neutral-50 text-[#121111] font-rubik font-normal text-[15px] border border-[#E4E4E7] rounded-lg transition cursor-pointer flex items-center justify-center outline-none shrink-0"
            >
              Delete Chat
            </button>

            <button
              type="button"
              onClick={() => setShowReportDialog(true)}
              className="w-full h-[44px] bg-white hover:bg-neutral-50 text-[#121111] font-rubik font-normal text-[15px] border border-[#E4E4E7] rounded-lg transition cursor-pointer flex items-center justify-center outline-none shrink-0"
            >
              Report Chat
            </button>
          </div>
        </div>

      </div>

      {/* Confirmation Dialog overlays using shadcn Dialog */}
      
      {/* Block Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent showCloseButton={false} className="w-[370px] h-[251px] p-6 flex flex-col items-center justify-between bg-white border border-neutral-100 rounded-[16px] shadow-lg select-none">
          <div className="w-[42px] h-[42px] bg-[#C81E1E] rounded-[10px] flex items-center justify-center shrink-0">
            <X className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <div className="flex flex-col items-center gap-[8px] text-center">
            <h3 className="font-sans font-semibold text-[23.1px] leading-[31px] text-[#181818] capitalize">
              Block User?
            </h3>
            <p className="font-poppins font-normal text-[16px] leading-[24px] text-[#565656]">
              Are you sure you want to block {activeConv.name}?
            </p>
          </div>
          <div className="flex gap-[8px] w-full mt-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowBlockDialog(false)}
              className="flex-1 h-[44px] bg-[#FEF0E9] hover:bg-[#FDE4D5] text-[#F36922] rounded-[12px] font-sans font-medium text-[15px] capitalize transition cursor-pointer border-none flex items-center justify-center outline-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleBlockUser}
              className="flex-1 h-[44px] bg-[#C81E1E] hover:bg-[#b01717] text-white rounded-[12px] font-sans font-medium text-[15px] capitalize transition cursor-pointer border-none flex items-center justify-center outline-none"
            >
              Block
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Chat Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent showCloseButton={false} className="w-[370px] h-[251px] p-6 flex flex-col items-center justify-between bg-white border border-neutral-100 rounded-[16px] shadow-lg select-none">
          <div className="w-[42px] h-[42px] bg-[#C81E1E] rounded-[10px] flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col items-center gap-[8px] text-center">
            <h3 className="font-sans font-semibold text-[23.1px] leading-[31px] text-[#181818] capitalize">
              Delete Chat?
            </h3>
            <p className="font-poppins font-normal text-[16px] leading-[24px] text-[#565656]">
              Are you sure you want to delete this chat history?
            </p>
          </div>
          <div className="flex gap-[8px] w-full mt-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowDeleteDialog(false)}
              className="flex-1 h-[44px] bg-[#FEF0E9] hover:bg-[#FDE4D5] text-[#F36922] rounded-[12px] font-sans font-medium text-[15px] capitalize transition cursor-pointer border-none flex items-center justify-center outline-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteChat}
              className="flex-1 h-[44px] bg-[#C81E1E] hover:bg-[#b01717] text-white rounded-[12px] font-sans font-medium text-[15px] capitalize transition cursor-pointer border-none flex items-center justify-center outline-none"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Chat Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent showCloseButton={false} className="w-[370px] h-[251px] p-6 flex flex-col items-center justify-between bg-white border border-neutral-100 rounded-[16px] shadow-lg select-none">
          <div className="w-[42px] h-[42px] bg-[#F36922] rounded-[10px] flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V14M12 18H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col items-center gap-[8px] text-center">
            <h3 className="font-sans font-semibold text-[23.1px] leading-[31px] text-[#181818] capitalize">
              Report Chat?
            </h3>
            <p className="font-poppins font-normal text-[16px] leading-[24px] text-[#565656]">
              Are you sure you want to report this chat?
            </p>
          </div>
          <div className="flex gap-[8px] w-full mt-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowReportDialog(false)}
              className="flex-1 h-[44px] bg-[#FEF0E9] hover:bg-[#FDE4D5] text-[#F36922] rounded-[12px] font-sans font-medium text-[15px] capitalize transition cursor-pointer border-none flex items-center justify-center outline-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReportChat}
              className="flex-1 h-[44px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[12px] font-sans font-medium text-[15px] capitalize transition cursor-pointer border-none flex items-center justify-center outline-none"
            >
              Report
            </button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
