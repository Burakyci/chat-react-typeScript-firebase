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
} from "firebase/firestore";
import { MessageModel, IMessageModel, RoomModel } from "../models/chatModel";
import { IChatRoomData, IUserData } from "../types";
import { Unsubscribe } from "firebase/auth";
import { REPL_MODE_SLOPPY } from "repl";

class ChatService {
  private userColRef = collection(db, "users");
  private chatsColRef = collection(db, "chatsRooms");

  createRoom = async (
    to: string,
    from: string
  ): Promise<OperationResult<string>> => {
    try {
      const newChatRoom = await addDoc(this.chatsColRef, {
        members: [to, from],
      });
      const userDocTo = doc(this.userColRef, to);
      const userDocSnapTo = await getDoc(userDocTo);
      if (userDocSnapTo.exists()) {
        const chatRooms = userDocSnapTo.data()?.chatRooms || {};
        const roomIdArray = chatRooms.roomId || [];
        const newRoomIdArray = roomIdArray.concat([newChatRoom.id]);
        await setDoc(
          userDocTo,
          { chatRooms: { roomId: newRoomIdArray } },
          { merge: true }
        );
      }
      const userDocFrom = doc(this.userColRef, from);
      const userDocSnapFrom = await getDoc(userDocFrom);
      if (userDocSnapFrom.exists()) {
        const chatRooms = userDocSnapFrom.data()?.chatRooms || {};
        const roomIdArray = chatRooms.roomId || [];
        const newRoomIdArray = roomIdArray.concat([newChatRoom.id]);
        await setDoc(
          userDocFrom,
          { chatRooms: { roomId: newRoomIdArray } },
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
  getRoom = async (chatId: string): Promise<OperationResult<IChatRoomData>> => {
    try {
      const chatRoomDocRef = doc(this.chatsColRef, chatId);
      const chatRoomDocSnap = await getDoc(chatRoomDocRef);
      if (chatRoomDocSnap.exists()) {
        const chatRoomData = chatRoomDocSnap.data();
        const members = chatRoomData.members;
        const messages = chatRoomData.chats;
        const data: IChatRoomData = {
          chatId,
          members,
          messages,
        };
        return new OperationResult({
          success: false,
          data: data,
        });
      } else {
        return new OperationResult({
          success: false,
          message: "Chat room not found",
        });
      }
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
    const IChatModel = new MessageModel({
      date: Date.now(),
      message: message,
      fromUserId: fromUserId,
      read: false,
    });
    try {
      const docRef = doc(this.chatsColRef, roomId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const chats = docSnap.data()?.chats || [];
        chats.push(IChatModel.toJSON());
        await updateDoc(docRef, { chats: chats });
      } else {
        await setDoc(docRef, { ...IChatModel });
      }
      return new OperationResult({
        success: false,
        data: IChatModel,
      });
    } catch (error: any) {
      console.log(error.message);
      return new OperationResult({
        success: false,
        message: error.message,
      });
    }
  };
  getRoomIds = async (userId: string): Promise<OperationResult<string[]>> => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        return new OperationResult({
          success: true,
          message: "room yok",
        });
      }
      const userData = userDocSnap.data();
      const roomsData = userData.chatRooms.roomId;

      return new OperationResult({
        success: false,
        data: roomsData,
      });
    } catch (error: any) {
      return new OperationResult({
        success: true,
        message: error.message,
      });
    }
  };
  getRooomIdsSub = (
    userId: string,
    update: (userRoomIds: string[]) => void
  ) => {
    let userRoomIds: string[] = [];
    const q = doc(this.userColRef, `${userId}`);
    const subs: Unsubscribe = onSnapshot(q, (user) => {
      const chatRooms = user.data()?.chatRooms?.roomId || [];
      userRoomIds = [...chatRooms];

      update(userRoomIds);
    });
    return subs;
  };
  getChatRoomSub = (
    userId: string
    // cb: (rooms: IChatRoomData[]) => void
  ) => {
    // const q = query(this.chatsColRef,where(''))
    const q = query(
      this.chatsColRef,
      where("members", "array-contains", userId)
    );
    let rooms: IChatRoomData[] = [];
    const subs: Unsubscribe = onSnapshot(q, (qss) => {
      const data = qss.docs.map((d) => {
        return new RoomModel(d.id, d.data() as IChatRoomData);
      });
      rooms.push(...data);
    });
    console.log(rooms);

    return subs;
  };
}

export default new ChatService();

// class ChatService {
//   private userColRef = collection(db, "users");
//   private chatsColRef = collection(db, "chats");

//   sendMail = async (
//     to: string,
//     from: string,
//     message: string
//   ): Promise<OperationResult<[]>> => {
//     const chatModel1 = new ChatModel({
//       date: Date.now(),
//       message: message,
//       toUserId: to,
//       fromUser: from,
//       read: false,
//     });

//     try {
//       const docRef1 = doc(this.chatsColRef, `${to}-${from}`);
//       const docRef2 = doc(this.chatsColRef, `${from}-${to}`);
//       const docSnap1 = await getDoc(docRef1);
//       const docSnap2 = await getDoc(docRef2);

//       if (docSnap1.exists()) {
//         const chats = docSnap1.data()?.chats || [];
//         chats.push(chatModel1.toJSON());
//         await updateDoc(docRef1, { chats: chats });
//       } else if (docSnap2.exists()) {
//         const chats = docSnap2.data()?.chats || [];
//         chats.push(chatModel1.toJSON());

//         await updateDoc(docRef2, { chats: chats });
//       } else {
//         await setDoc(docRef1, { ...chatModel1 });
//       }
//       return new OperationResult({
//         success: false,
//       });
//     } catch (error: any) {
//       console.log(error.message);
//       return new OperationResult({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

//   userCreateChatRoom = async (
//     to: string,
//     from: string
//   ): Promise<OperationResult<[]>> => {
//     try {
//       const userDocRefTo = doc(this.userColRef, to);
//       const userDocRefFrom = doc(this.userColRef, from);
//       const docSnap1 = await getDoc(userDocRefTo);
//       const docSnap2 = await getDoc(userDocRefFrom);

//       if (
//         !docSnap1.exists() ||
//         (!docSnap1.data()?.chatRoom?.includes(`${to}-${from}`) &&
//           !docSnap2.exists()) ||
//         !docSnap2.data()?.chatRoom?.includes(`${from}-${to}`)
//       ) {
//         await updateDoc(userDocRefTo, {
//           chatRoom: arrayUnion(`${to}-${from}`),
//         });
//         await updateDoc(userDocRefFrom, {
//           chatRoom: arrayUnion(`${to}-${from}`),
//         });
//       }

//       const chatDocRef = doc(this.chatsColRef, `${to}-${from}`);
//       await setDoc(chatDocRef, { message: [] });

//       return new OperationResult({
//         success: false,
//       });
//     } catch (error: any) {
//       return new OperationResult({
//         success: false,
//         message: error.message,
//       });
//     }
//   };
//   getMail = async (
//     to: string,
//     from: string
//   ): Promise<OperationResult<IChatModel>> => {
//     try {
//       const chatDocRef1 = doc(this.chatsColRef, `${to}-${from}`);
//       const chatDocRef2 = doc(this.chatsColRef, `${from}-${to}`);

//       const chatDocSnap1 = await getDoc(chatDocRef1);
//       const chatDocSnap2 = await getDoc(chatDocRef2);

//       if (chatDocSnap1.exists()) {
//         const chatData = chatDocSnap1.data() as ChatModel;
//         return new OperationResult({
//           success: true,
//           data: chatData,
//         });
//       } else if (chatDocSnap2.exists()) {
//         const chatData = chatDocSnap2.data() as ChatModel;
//         return new OperationResult({
//           success: true,
//           data: chatData,
//         });
//       } else {
//         return new OperationResult({
//           success: true,
//           message: "Chat document not found.",
//         });
//       }
//     } catch (error: any) {
//       return new OperationResult({
//         success: false,
//         message: error.message,
//       });
//     }
//   };
//   getChatRooms = async (id: any): Promise<OperationResult<string>> => {
//     try {
//       const userDoc = doc(this.userColRef, "chatRoom");
//       const userDocSnap = await getDoc(userDoc);
//       console.log(userDocSnap);

//       return new OperationResult({
//         success: false,
//       });
//     } catch (error: any) {
//       return new OperationResult({
//         success: false,
//         message: error.message,
//       });
//     }
//   };
// }
// export default new ChatService();
