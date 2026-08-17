export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  time: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  online: boolean;
  rating: number;
  reviewsCount: number;
  servicesCount: number;
  messages: Message[];
}
