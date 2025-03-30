
import { openDB } from 'idb';
import { Chat, ChatMessage } from '@/types';

const DB_NAME = 'ghibli_chat_db';
const DB_VERSION = 1;

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create chats store
      if (!db.objectStoreNames.contains('chats')) {
        const chatStore = db.createObjectStore('chats', { keyPath: 'id' });
        chatStore.createIndex('by-date', 'createdAt');
      }
    },
  });
}

export async function saveChat(chat: Chat): Promise<string> {
  const db = await initDB();
  await db.put('chats', chat);
  return chat.id;
}

export async function getChat(id: string): Promise<Chat | undefined> {
  const db = await initDB();
  return db.get('chats', id);
}

export async function getAllChats(): Promise<Chat[]> {
  const db = await initDB();
  return db.getAllFromIndex('chats', 'by-date');
}

export async function deleteChat(id: string): Promise<void> {
  const db = await initDB();
  await db.delete('chats', id);
}

export async function addMessageToChat(chatId: string, message: ChatMessage): Promise<void> {
  const db = await initDB();
  const tx = db.transaction('chats', 'readwrite');
  const chat = await tx.store.get(chatId);
  
  if (chat) {
    chat.messages.push(message);
    await tx.store.put(chat);
  }
  
  await tx.done;
}
