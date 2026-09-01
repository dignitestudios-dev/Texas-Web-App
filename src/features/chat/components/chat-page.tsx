'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Search,
  Phone,
  Paperclip,
  Smile,
  Send,
  Star,
  Trash2,
  X,
  Check,
} from 'lucide-react';
import { Conversation, Message } from '../types/chat.types';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'nandi_bolard',
    name: 'Nandi Bolard',
    avatar: '/images/avatar.webp',
    lastMessage: 'Hello i think you are the best fit for the..',
    time: '6:28 pm',
    online: true,
    rating: 5.0,
    reviewsCount: 48,
    servicesCount: 98,
    messages: [
      {
        id: 'msg_1',
        senderId: 'nandi_bolard',
        senderName: 'Nandi Bolard',
        senderAvatar: '/images/avatar.webp',
        text: 'Hello i think you are the best fit for the job',
        time: '6:28 pm',
        isMe: false,
      },
      {
        id: 'msg_2',
        senderId: 'me',
        senderName: 'You',
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
    lastMessage: 'I appreciate the opportunity and I\'m e..',
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
    lastMessage: 'Looking forward to collaborating on th..',
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
    lastMessage: 'Thanks for considering me for this role..',
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
    lastMessage: 'I\'m eager to bring my expertise to you..',
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
    lastMessage: 'I believe my skills align well with your..',
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
    lastMessage: 'Excited about the possibility of workin..',
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
    lastMessage: 'I would love to share my portfolio with..',
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
  const [activeConvId, setActiveConvId] = useState<string>('nandi_bolard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');

  // Dialog Overlay States
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter conversations based on search
  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto scroll to bottom of active message list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeConv) return;

    const newMessage: Message = {
      id: `msg_user_${Date.now()}`,
      senderId: 'me',
      senderName: 'You',
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

  const handleBlockUser = () => {
    setShowBlockDialog(false);
  };

  const handleDeleteChat = () => {
    const remaining = conversations.filter((c) => c.id !== activeConv.id);
    setConversations(remaining);
    setShowDeleteDialog(false);
    if (remaining.length > 0) {
      setActiveConvId(remaining[0].id);
    }
  };

  const handleReportChat = () => {
    setShowReportDialog(false);
  };

  return (
    <div className="w-full flex justify-center py-6 px-4 sm:px-6 lg:px-[25px] select-none">
      
      {/* 3-Column Chat Wrapper (Frame 2147227267: 1440px wide, 803px height) */}
      <div className="w-full max-w-[1440px] h-auto lg:h-[803px] flex flex-col lg:flex-row gap-5 items-start">
        
        {/* ================= LEFT COLUMN: CONVERSATION LIST (Frame 2147227197: 350px x 803px) ================= */}
        <div className="w-full lg:w-[350px] h-[803px] bg-white border border-[#EFEFEF]/85 rounded-[12px] flex flex-col overflow-hidden shadow-xs shrink-0">
          
          {/* Header Panel (Frame 2147227423: 78px height) */}
          <div className="h-[78px] px-4 flex items-center border-b border-[#EFEFEF]/85 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-10 h-10 flex items-center justify-center text-[#121111] hover:text-[#F36922] transition cursor-pointer border-none bg-transparent p-0 shrink-0"
                aria-label="Back"
              >
                <ArrowLeft className="w-6 h-6 stroke-[2]" />
              </button>
              <h2 className="font-rubik font-medium text-[24px] leading-[28px] tracking-[-0.005em] text-[#121111]">
                Messages
              </h2>
            </div>
          </div>

          {/* Search Box (Frame 2147227056: 48px height) */}
          <div className="p-3.5 pb-2 shrink-0">
            <div className="w-full h-[48px] bg-white border border-[#EFEFEF]/85 rounded-[12px] pl-3.5 pr-1.5 flex items-center justify-between gap-2 shadow-2xs">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] text-[#1A2E35] placeholder:text-[#8E8E93] outline-none border-none"
              />
              <div className="w-[38px] h-[38px] bg-[#F36922] rounded-[8px] flex items-center justify-center text-white shrink-0">
                <Search className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Conversation List (Frame 2147227404) */}
          <div className="flex-1 overflow-y-auto px-2.5 py-1.5 flex flex-col gap-1 [scrollbar-width:thin]">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConv?.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full h-[69px] p-3 rounded-[12px] flex items-center gap-2.5 transition cursor-pointer relative ${
                    isActive ? 'bg-[#F1F5F9]' : 'bg-transparent hover:bg-neutral-50/80'
                  }`}
                >
                  {/* Contact Avatar + Online Dot */}
                  <div className="relative w-[43px] h-[43px] shrink-0 rounded-full">
                    <Image
                      src={conv.avatar}
                      alt={conv.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    {conv.online && (
                      <span className="absolute top-0 right-0 w-2 h-2 bg-[#046C4E] border-2 border-white rounded-full" />
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <div className="flex justify-between items-center w-full mb-0.5">
                      <span className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111] truncate">
                        {conv.name}
                      </span>
                      <span className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111] shrink-0">
                        {conv.time}
                      </span>
                    </div>
                    <p className="font-rubik font-light text-[14px] leading-[18px] tracking-[-0.005em] text-[#121111] truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ================= MIDDLE COLUMN: ACTIVE CHAT CONVERSATION (Frame 2147227199: 680px x 803px) ================= */}
        <div className="flex-1 w-full lg:w-[680px] h-[803px] bg-white border border-[#EFEFEF]/85 rounded-[12px] flex flex-col overflow-hidden shadow-xs">
          
          {/* Header Contact Bar (Frame 2147227423: 73px height) */}
          {activeConv && (
            <div className="h-[73px] px-4 flex items-center justify-between border-b border-[#EFEFEF]/85 shrink-0">
              {/* Left Contact Info */}
              <div className="flex items-center gap-3">
                <div className="relative w-[43px] h-[43px] shrink-0 rounded-full">
                  <Image
                    src={activeConv.avatar}
                    alt={activeConv.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-rubik font-medium text-[18px] leading-[21px] tracking-[-0.005em] text-[#121111]">
                    {activeConv.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#046C4E] border border-[#F8F9FF]" />
                    <span className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111]">
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Phone Call Button */}
              <button
                type="button"
                className="w-[43px] h-[43px] rounded-full bg-[#F8F9FF] hover:bg-neutral-100 transition flex items-center justify-center text-[#121111] border-none cursor-pointer"
                aria-label="Call"
              >
                <Phone className="w-5 h-5 text-[#121111]" />
              </button>
            </div>
          )}

          {/* Messages Scroll Area (Frame 2147227404) */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-end gap-5 bg-white [scrollbar-width:thin]">
            
            {/* 'New' Divider Line (Frame 2147227439) */}
            <div className="flex items-center justify-center gap-2.5 w-full my-1 shrink-0">
              <div className="flex-1 h-[1px] bg-[#EFEFEF]/85" />
              <span className="font-rubik font-normal text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                New
              </span>
              <div className="flex-1 h-[1px] bg-[#EFEFEF]/85" />
            </div>

            {/* Message History */}
            {activeConv?.messages.map((msg) => {
              if (msg.isMe) {
                // Outgoing Bubble: You (Frame 2147227438)
                return (
                  <div key={msg.id} className="flex justify-end w-full">
                    <div className="bg-[#FEF0E9] rounded-[8px_8px_0px_8px] p-[12px_12px_12px_25px] flex flex-col gap-1 max-w-[540px] shadow-2xs">
                      <div className="flex items-center justify-end gap-2.5">
                        <span className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111]">
                          {msg.time}
                        </span>
                        <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em] text-[#121111]">
                          You
                        </span>
                      </div>
                      <p className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111] text-right">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                );
              }

              // Incoming Bubble: Contact (Frame 2147227437)
              return (
                <div key={msg.id} className="flex items-end gap-2.5 w-full">
                  <div className="w-6 h-6 rounded-full relative overflow-hidden shrink-0">
                    <Image
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-[#F8F9FF] rounded-[8px_8px_8px_0px] p-3 flex flex-col gap-1 max-w-[540px] shadow-2xs">
                    <div className="flex items-center gap-3">
                      <span className="font-rubik font-medium text-[15px] leading-[18px] tracking-[-0.005em] text-[#121111]">
                        {msg.senderName}
                      </span>
                      <span className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111]">
                        {msg.time}
                      </span>
                    </div>
                    <p className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111]">
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Container (Frame 2147227424: 70px height) */}
          <div className="p-3 shrink-0">
            <form
              onSubmit={handleSendMessage}
              className="w-full h-[70px] bg-[#F1F5F9] border border-[#E4E4E7] rounded-[12px] p-3 flex flex-col justify-between"
            >
              {/* Top Text Input */}
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Send a message"
                className="w-full bg-transparent font-rubik font-light text-[15px] leading-[18px] tracking-[-0.005em] text-[#121111] placeholder:text-[#8E8E93] outline-none border-none"
              />

              {/* Bottom Actions Row */}
              <div className="flex items-center justify-between w-full">
                {/* Left: Attachment & Emoji */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    className="w-5 h-5 flex items-center justify-center text-[#121111] hover:text-[#F36922] transition cursor-pointer border-none bg-transparent p-0"
                    aria-label="Attach file"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="w-5 h-5 flex items-center justify-center text-[#121111] hover:text-[#F36922] transition cursor-pointer border-none bg-transparent p-0"
                    aria-label="Add emoji"
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                </div>

                {/* Right: Send Plane Arrow Icon */}
                <button
                  type="submit"
                  className="w-6 h-6 flex items-center justify-center text-[#121111] hover:text-[#F36922] transition cursor-pointer border-none bg-transparent p-0"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 fill-current" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: USER PROFILE & ACTIONS (Frame 2147227200: 320px) ================= */}
        {activeConv && (
          <div className="w-full lg:w-[320px] bg-[#F8F9FF] border border-[#EFEFEF]/85 rounded-[12px] flex flex-col p-4 gap-4 shadow-xs shrink-0">
            
            {/* Profile Info Header (Frame 2147227423) */}
            <div className="flex flex-col items-center gap-2.5 pb-4 border-b border-white">
              
              {/* Avatar + Name + Verified Badge */}
              <div className="flex items-center gap-3">
                <div className="w-[43px] h-[43px] rounded-full relative overflow-hidden shrink-0">
                  <Image
                    src={activeConv.avatar}
                    alt={activeConv.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                    {activeConv.name}
                  </h3>
                  {/* Verified Checkmark (material-symbols:verified) */}
                  <div className="w-4 h-4 rounded-full bg-[#4253F0] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* Star Rating & Services count (Frame 2147227246) */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 pr-2 border-r border-[#121111]">
                  <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                  <span className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111]">
                    {activeConv.rating.toFixed(1)} ({activeConv.reviewsCount})
                  </span>
                </div>
                <span className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111]">
                  {activeConv.servicesCount} Services
                </span>
              </div>

            </div>

            {/* Block User CTA Button (Frame 2147227455: 36px height) */}
            <button
              type="button"
              onClick={() => setShowBlockDialog(true)}
              className="w-full h-[36px] bg-[#C81E1E] hover:bg-[#b01717] text-white font-rubik font-normal text-[15px] leading-[18px] tracking-[-0.005em] rounded-[8px] flex items-center justify-center transition cursor-pointer border-none shadow-2xs"
            >
              Block User
            </button>

            {/* Secondary Actions (Frame 2147227424) */}
            <div className="flex flex-col gap-2.5">
              {/* Delete Chat Button (Frame 2147227453: 44px height) */}
              <button
                type="button"
                onClick={() => setShowDeleteDialog(true)}
                className="w-full h-[44px] bg-white hover:bg-neutral-50 text-[#3D3D3D] font-rubik font-normal text-[15px] leading-[18px] tracking-[-0.005em] border border-[#E4E4E7] rounded-[8px] flex items-center justify-center transition cursor-pointer shadow-2xs"
              >
                Delete Chat
              </button>

              {/* Report Chat Button (Frame 2147227454: 44px height) */}
              <button
                type="button"
                onClick={() => setShowReportDialog(true)}
                className="w-full h-[44px] bg-white hover:bg-neutral-50 text-[#3D3D3D] font-rubik font-normal text-[15px] leading-[18px] tracking-[-0.005em] border border-[#E4E4E7] rounded-[8px] flex items-center justify-center transition cursor-pointer shadow-2xs"
              >
                Report Chat
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Confirmation Dialogs */}

      {/* Block Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent showCloseButton={false} className="w-[370px] p-6 flex flex-col items-center bg-white border border-[#EFEFEF] rounded-[20px] shadow-xl select-none">
          <div className="w-[42px] h-[42px] bg-[#C81E1E] rounded-[10px] flex items-center justify-center mb-3">
            <X className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <h3 className="font-rubik font-semibold text-[20px] text-[#121111] mb-1">
            Block User?
          </h3>
          <p className="font-rubik font-normal text-[14px] text-[#565656] text-center mb-6">
            Are you sure you want to block {activeConv?.name}?
          </p>
          <div className="flex gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setShowBlockDialog(false)}
              className="flex-1 h-[44px] bg-[#FEF0E9] hover:bg-[#FDE4D5] text-[#F36922] font-rubik font-medium text-[15px] rounded-[10px] transition cursor-pointer border-none flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleBlockUser}
              className="flex-1 h-[44px] bg-[#C81E1E] hover:bg-[#b01717] text-white font-rubik font-medium text-[15px] rounded-[10px] transition cursor-pointer border-none flex items-center justify-center"
            >
              Block
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Chat Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent showCloseButton={false} className="w-[370px] p-6 flex flex-col items-center bg-white border border-[#EFEFEF] rounded-[20px] shadow-xl select-none">
          <div className="w-[42px] h-[42px] bg-[#C81E1E] rounded-[10px] flex items-center justify-center mb-3">
            <Trash2 className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-rubik font-semibold text-[20px] text-[#121111] mb-1">
            Delete Chat?
          </h3>
          <p className="font-rubik font-normal text-[14px] text-[#565656] text-center mb-6">
            Are you sure you want to delete this chat history?
          </p>
          <div className="flex gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setShowDeleteDialog(false)}
              className="flex-1 h-[44px] bg-[#FEF0E9] hover:bg-[#FDE4D5] text-[#F36922] font-rubik font-medium text-[15px] rounded-[10px] transition cursor-pointer border-none flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteChat}
              className="flex-1 h-[44px] bg-[#C81E1E] hover:bg-[#b01717] text-white font-rubik font-medium text-[15px] rounded-[10px] transition cursor-pointer border-none flex items-center justify-center"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Chat Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent showCloseButton={false} className="w-[370px] p-6 flex flex-col items-center bg-white border border-[#EFEFEF] rounded-[20px] shadow-xl select-none">
          <div className="w-[42px] h-[42px] bg-[#F36922] rounded-[10px] flex items-center justify-center mb-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V14M12 18H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="font-rubik font-semibold text-[20px] text-[#121111] mb-1">
            Report Chat?
          </h3>
          <p className="font-rubik font-normal text-[14px] text-[#565656] text-center mb-6">
            Are you sure you want to report this chat?
          </p>
          <div className="flex gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setShowReportDialog(false)}
              className="flex-1 h-[44px] bg-[#FEF0E9] hover:bg-[#FDE4D5] text-[#F36922] font-rubik font-medium text-[15px] rounded-[10px] transition cursor-pointer border-none flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReportChat}
              className="flex-1 h-[44px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[15px] rounded-[10px] transition cursor-pointer border-none flex items-center justify-center"
            >
              Report
            </button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
