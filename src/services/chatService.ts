import { OperationResult } from "../models/commonModel";
import { db } from "../config/FirebaseConfig";
import {
  collection,
  setDoc,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  query,
  where,
  onSnapshot,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { MessageModel, IMessageModel, RoomModel } from "../models/chatModel";
import { IRoomData } from "../types";
import { Unsubscribe } from "firebase/auth";

class ChatService {
  private userColRef = collection(db, "users");
  private chatsColRef = collection(db, "chatsRooms");

  createRoom = async (
    to: string,
    from: string
  ): Promise<OperationResult<string>> => {
    try {
      const userDocFrom = doc(this.userColRef, from);
      const userDocSnapFrom = await getDoc(userDocFrom);
      const userDocTo = doc(this.userColRef, to);
      const userDocSnapTo = await getDoc(userDocTo);
      const toName = userDocSnapTo.data()?.firstName;
      const toLastName = userDocSnapTo.data()?.lastName;
      const fromName = userDocSnapFrom.data()?.firstName;
      const fromLastName = userDocSnapFrom.data()?.lastName;

      const newChatRoom = await addDoc(this.chatsColRef, {
        members: [to, from],
        membersName: [
          `${toName} ${toLastName} `,
          `${fromName} ${fromLastName} `,
        ],
      });
      if (userDocSnapTo.exists()) {
        const chatRooms = userDocSnapTo.data()?.chatRooms;
        const roomIdArray = chatRooms.roomId;
        await setDoc(
          userDocTo,
          { chatRooms: { roomId: roomIdArray } },
          { merge: true }
        );
      }
      if (userDocSnapFrom.exists()) {
        const chatRooms = userDocSnapFrom.data()?.chatRooms;
        const roomIdArray = chatRooms.roomId;
        await setDoc(
          userDocFrom,
          { chatRooms: { roomId: roomIdArray } },
          { merge: true }
        );
      }

      return new OperationResult({
        success: true,
        data: newChatRoom.id,
      });
    } catch (error: any) {
      return new OperationResult({
        success: false,
        message: error.message,
      });
    }
  };

  sendMessage = async (
    fromUserId: string,
    roomId: string | undefined,
    message: string
  ): Promise<OperationResult<IMessageModel>> => {
    const newMessage = new MessageModel({
      date: Timestamp.now(),
      message: message,
      fromUserId: fromUserId,
      read: false,
    });

    try {
      const docRef = doc(this.chatsColRef, roomId || "");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const chats = docSnap.data()?.messages || [];
        chats.push(newMessage.toJSON());
        await updateDoc(docRef, { messages: chats });
      } else {
        await setDoc(docRef, { messages: [newMessage.toJSON()] });
      }

      return new OperationResult({
        success: true,
        data: newMessage,
      });
    } catch (error: any) {
      return new OperationResult({
        success: false,
        message: error.message,
      });
    }
  };

  getChatRoomSub = (userId: string, cb: (room: IRoomData[]) => void): any => {
    const q = query(
      this.chatsColRef,
      where("members", "array-contains", userId)
    );
    let rooms: IRoomData[] = [];
    const subs: Unsubscribe = onSnapshot(q, (qss) => {
      const data = qss.docs.map((d) => {
        return new RoomModel(d.id, d.data());
      });
      if (Object.isFrozen(rooms) || Object.isSealed(rooms)) {
        rooms = [...data];
      } else {
        rooms.push(...data);
      }
      cb(rooms);
      return subs;
    });
    return new OperationResult({
      success: true,
      data: subs,
    });
  };
  getChatRoom = async (userId: string): Promise<OperationResult<any>> => {
    try {
      const q = query(
        this.chatsColRef,
        where("members", "array-contains", userId)
      );
      const qss = await getDocs(q);
      const data = qss.docs.map((d) => new RoomModel(d.id, d.data()));
      return new OperationResult({
        success: true,
        data: data,
      });
    } catch (error: any) {
      return new OperationResult({
        success: false,
        message: error.message,
      });
    }
  };
}

export default new ChatService();
