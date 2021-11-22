import { atom } from 'recoil';
import chats from '../data/Chats.json'

export const chatsState = atom({
  key: "chatsState",
  default: {...chats},
});