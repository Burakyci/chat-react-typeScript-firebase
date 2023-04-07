import { OperationResult } from "../models/commonModel";
import { db } from "../config/FirebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";

class ChatService {
  refCol = collection(db, "users");
  sendMail = async (to: string, from: string, message: string) => {
    try {
      return new OperationResult({
        success: true,
      });
    } catch (error: any) {
      return new OperationResult({
        success: true,
        message: error.message,
      });
    }
  };
  getMail = (to: string, from: string) => {
    try {
      return new OperationResult({
        success: true,
      });
    } catch (error: any) {
      return new OperationResult({
        success: true,
        message: error.message,
      });
    }
  };
}
export default new ChatService();
