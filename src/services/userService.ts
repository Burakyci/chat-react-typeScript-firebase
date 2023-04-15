import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  getDoc,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { UserModel } from "../models/userModel";
import { db, messaging } from "../config/FirebaseConfig";
import { OperationResult } from "../models/commonModel";
import { IChatModel } from "../models/chatModel";
import { IUserData } from "../types";

class UserService {
  private usersColRef = collection(db, "users");
  initialUser = async (
    firstName: string,
    lastName: string,
    userId?: string
  ) => {
    try {
      await setDoc(doc(db, "users", userId || ""), {
        firstName: firstName,
        lastName: lastName,
        online: true,
      });
      return new OperationResult({ success: true });
    } catch (error: any) {
      return new OperationResult({
        success: false,
        message: error.message,
      });
    }
  };
  getUsers = async (): Promise<OperationResult<UserModel[]>> => {
    try {
      const querySnapShot = await getDocs(this.usersColRef);
      let users: UserModel[] = [];
      if (querySnapShot.empty) {
        return new OperationResult({
          success: false,
          data: users,
        });
      }
      querySnapShot.forEach((doc) => {
        const user = new UserModel({
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          online: doc.data().online,
        });
        users.push(user);
      });
      return new OperationResult({ success: true, data: users });
    } catch (error: any) {
      return new OperationResult({ success: false, message: error.message });
    }
  };

  isItOnline = async (
    userId: string,
    online: boolean
  ): Promise<OperationResult<UserModel[]>> => {
    try {
      const docRef = doc(this.usersColRef, `${userId}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, { online: online });
      }
      return new OperationResult({
        success: true,
      });
    } catch (error: any) {
      return new OperationResult({ success: false, message: error.message });
    }
  };
  getUserSub = (update: (users: UserModel) => void): any => {
    try {
      let users: UserModel[] = [];
      const unSub: Unsubscribe = onSnapshot(
        this.usersColRef,
        (querySnapShot) => {
          if (querySnapShot.empty) {
            return new OperationResult({
              success: false,
              message: "we dont have user",
            });
          }
          querySnapShot.forEach((doc) => {
            const user = new UserModel({
              id: doc.id,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              online: doc.data().online,
            }) as UserModel;
            users.push(user);
            update(user);
          });
          return unSub;
        }
      );
    } catch (error: any) {
      return new OperationResult({ success: false, message: error.message });
    }
  };
}

export default new UserService();

// const a: IUserData[] = [];
// const docRef = doc(this.usersColRef, `${userId}`);
// console.log(a);
// const unsub = onSnapshot(docRef, (doc) => {
//   const data = doc.data();
//   if (data) {
//     const userData = Object.assign({}, data) as IUserData;
//     a.push(userData);
//   }
// });
// const querySnapShot = await getDocs(this.usersColRef);
