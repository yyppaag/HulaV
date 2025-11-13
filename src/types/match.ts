import {User} from './user';

export interface Match {
  id: string;
  user: User;
  matchedAt: string;
  lastMessage?: Message;
  unreadCount: number;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'gif';
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  matchId: string;
  messages: Message[];
  isTyping: boolean;
}
