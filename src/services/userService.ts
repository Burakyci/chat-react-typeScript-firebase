import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  getDoc,
  onSnapshot,
  Unsubscribe,
  query,
  where,
} from "firebase/firestore";
import { UserModel } from "../models/userModel";
import { db } from "../config/FirebaseConfig";
import { OperationResult } from "../models/commonModel";

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
  getUsers = async (params: {
    onlyVerified?: boolean;
    onlyOnline?: boolean;
  }): Promise<OperationResult<UserModel[]>> => {
    try {
      const c = [];
      const { onlyOnline, onlyVerified } = params;
      if (onlyVerified) {
        where("emailVerified", "==", onlyVerified);
      }
      if (onlyOnline) {
        c.push(where("isOnline", "==", onlyOnline));
      }
      const q = query(this.usersColRef, ...c);
      const querySnapShot = await getDocs(q);
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
  getUsersSub = (
    onlyOnline: boolean,
    update: (users: UserModel[]) => void
  ): any => {
    try {
      const q = query(
        collection(db, "users"),
        where("online", "==", onlyOnline)
      );
      const unSubGetUser: Unsubscribe = onSnapshot(q, (user) => {
        if (user.empty) {
          return new OperationResult({
            success: false,
            message: "we dont have user",
          });
        }
        let users: UserModel[] = [];
        user.docs.forEach((doc) => {
          const user = new UserModel({
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            online: doc.data().online,
          }) as UserModel;
          users.push(user);
        });
        // update(users);
        update(users);

        return unSubGetUser;
      });
    } catch (error: any) {
      return new OperationResult({ success: false, message: error.message });
    }
  };
}

export default new UserService();
// getUsersSub = async (
//   onlyOnline: boolean
//   // update: (users: UserModel[]) => void
// ): Promise<any> => {
//   try {
//     const q = query(
//       collection(db, "users"),
//       where("online", "==", onlyOnline)
//     );
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };
