import * as uuid from 'uuid';
import {io, Socket} from 'socket.io-client';
import {baseURL} from '@/config';
import {IMessage, query_history_list} from '@/services/session';
import {getToken} from '@/utils/auth';
import {makeAutoObservable, observable, runInAction} from 'mobx';
import {RootStore} from '.';

let socket: Socket;
let pingTimer: NodeJS.Timer | null;

export enum CmdEnum {
  private_chat = 0,
  group_chat = 1,
}

export interface IMessagePayload {
  cmd?: CmdEnum;
  rid: number;
  suid?: number;
  content: string;
  is_group: boolean;
  type?: number;
  title?: string;
  to_nickname?: string;
  to_avatar?: string;
  from_nickname?: string;
  from_avatar?: string;
}

export class SocketStore {
  rootStore: RootStore;
  messages: IMessage[] = [];

  isConnected: boolean = false;
  isLoading: boolean = false;
  unReadInfo = {} as Record<string, number>;
  messageMap = {} as Record<string, IMessage[]>;

  constructor(store: RootStore) {
    this.rootStore = store;
    makeAutoObservable(this, {
      unReadInfo: observable,
      messageMap: observable,
      isConnected: observable,
      isLoading: observable,
    });
  }

  async queryHistoryList(args: Parameters<typeof query_history_list>[0]) {
    const res = await query_history_list(args);
    const list = res.data.list;
    console.log(`queryHistoryList`, args);
    runInAction(() => {
      this.messageMap[args.rid] = this.messageMap[args.rid] || [];
      this.messageMap[args.rid].unshift(...list.reverse());
    });
  }

  doDisConnect() {
    console.log('exec disconnect socket');
    socket && socket.disconnect();
  }

  initSocket() {
    console.log('exec init socket');

    socket = io(baseURL, {
      query: {
        token: getToken(),
      },
    });

    clearInterval(pingTimer!);
    pingTimer = setInterval(() => {
      console.log(`socket.connected ${socket.id}`, socket.connected);
    }, 10000);

    socket.on('connect', () => {
      this.isConnected = true;
      console.log('socket connect: ', socket.id);
    });

    socket.on('disconnect', () => {
      this.isConnected = false;
      console.log('socket disconnect: ', socket.id);
    });

    socket.on('message', (message: IMessagePayload) => {
      console.log('receive message: ', message);
      const {userInfo} = this.rootStore.userStore;

      runInAction(() => {
        const isMeSend = message.suid === userInfo!.id;
        const partner_id: number = isMeSend ? message.rid : message.suid!;

        this.messageMap[partner_id] = this.messageMap[partner_id] || [];
        this.messageMap[partner_id]?.push(message as IMessage);

        // 如果不存在 session 创建
        const sessionStore = this.rootStore.sessionStore;
        const sessionIndex = sessionStore.list.findIndex(
          s => s.partner_id === partner_id,
        );

        if (!isMeSend) {
          // 更新未读数
          sessionStore.updateUnReadInfo(
            partner_id,
            sessionStore.unReadInfo[partner_id] + 1,
          );
        }
        if (sessionIndex === -1) {
          const session =  {
            partner_id,
            is_group: false,
            avatar: isMeSend ? (message?.to_avatar || '') : (message?.from_avatar || ''),
            nickname: isMeSend ? (message?.to_nickname || '') : (message?.from_nickname || ''),
            last_message: message as IMessage,
          }
          sessionStore.addSession(session);
        } else {
          const session = sessionStore.list[sessionIndex];
          sessionStore.updateSessionItem(sessionIndex, {
            ...session,
            last_message: message as IMessage,
          });
        }
      });
    });
  }

  sendMessage(payload: IMessagePayload) {
    const message = {
      type: 0,
      cmd: 0,
      msg_no: uuid.v4(),
      ...payload,
    };
    console.log('send message: ', message);
    socket.emit('message', message);
  }
}
