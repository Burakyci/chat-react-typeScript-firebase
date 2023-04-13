import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  getDoc,
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
}

export default new UserService();
