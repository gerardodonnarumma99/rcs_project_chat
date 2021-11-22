import { atom } from 'recoil';
//For test: import chats from '../data/Chats.json'

export const chatsState = atom({
  key: "chatsState",
  default: {},
});