import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from  'rxjs';
import { ChatManager, TokenProvider } from  '@pusher/chatkit-client';
@Injectable()
export class PusherProvider {

  AUTH_URL = 'http://192.168.1.7/Gawlah/backup/ChatTest.php';
  INSTANCE_LOCATOR = 'v1:us1:07770738-f5bb-4b58-a902-22e04e1eaf2c';
  GENERAL_ROOM_ID = '19410685';
  GENERAL_ROOM_INDEX = 0;
  chatManager: ChatManager;
  currentUser;
  messages = [];

  usersSubject = new BehaviorSubject([]);
  messagesSubject = new BehaviorSubject([]);
  constructor() { }
  async connectToChatkit(userId: string) {
    this.chatManager = new ChatManager({
      instanceLocator: this.INSTANCE_LOCATOR,
      userId: userId,
      tokenProvider: new TokenProvider({ url: this.AUTH_URL })
    })
    this.currentUser = await this.chatManager.connect();
    await this.currentUser.subscribeToRoom({
      roomId: this.GENERAL_ROOM_ID,
      hooks: {
        onMessage: message => {
          this.messages.push(message);
          this.messagesSubject.next(this.messages);
        }
      },
      messageLimit: 20
    });

    const users = this.currentUser.rooms[this.GENERAL_ROOM_INDEX].users;
    this.usersSubject.next(users);
  }

  getUsers() {
    return this.usersSubject;
  }
  getMessages() {
    return this.messagesSubject;
  }
  sendMessage(message) {
    return this.currentUser.sendMessage({
      text: message.text,
      roomId: message.roomId || this.GENERAL_ROOM_ID
    })
  }
  isUserOnline(user): boolean {
    return user.presence.state == 'online';
  }
  getCurrentUser() {
    return this.currentUser;
  }
}