import { OperationResult } from "../models/commonModel";

class ChatService {
  sendMail = (to: string, from: string, message: string) => {
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
