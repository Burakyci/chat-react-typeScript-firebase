import { collection, doc, setDoc, getDocs, query } from "firebase/firestore";
import { UserModel } from "../models/userModel";
import { db } from "../config/FirebaseConfig";
import { OperationResult } from "../models/commonModel";

class UserService {
  initialUser = async (
    firstName: string,
    lastName: string,
    userId?: string
  ) => {
    try {
      await setDoc(doc(db, "users", userId || ""), {
        firstName: firstName,
        lastName: lastName,
      });
      return new OperationResult({ success: true });
    } catch (error: any) {
      return new OperationResult({
        success: false,
        message: error.message,
      });
    }
  };
  getUsers = async () => {
    try {
      const colRef = collection(db, "users");
      const querySnapShot = await getDocs(colRef);
      let users: any = [];
      querySnapShot.forEach((doc) => {
        const user = new UserModel({
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
        });
        users.push(user);
      });
      return new OperationResult({ success: true, data: users });
    } catch (error: any) {
      return new OperationResult({ success: false, message: error.message });
    }
  };
}

export default new UserService();
