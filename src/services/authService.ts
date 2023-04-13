import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { fireAuth } from "../config/FirebaseConfig";
import { IOperationResult, OperationResult } from "../models/commonModel";

class AuthService {
  login = async (
    email: string,
    password: string
  ): Promise<IOperationResult<any>> => {
    try {
      const { user } = await signInWithEmailAndPassword(
        fireAuth,
        email,
        password
      );
      return new OperationResult({ success: true, data: user });
    } catch (error: any) {
      return new OperationResult({
        success: false,
        message: error.message,
      });
    }
  };

  signup = async (
    email: string,
    password: string
  ): Promise<IOperationResult<any>> => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        fireAuth,
        email,
        password
      );
      return new OperationResult({
        success: true,
        data: [user],
      });
    } catch (error: any) {
      return new OperationResult({
        success: false,
        message: error.message,
      });
    }
  };

  logout = async (): Promise<IOperationResult<undefined>> => {
    try {
      await signOut(fireAuth);
      return new OperationResult({
        success: true,
      });
    } catch (error: any) {
      return new OperationResult({
        success: false,
        message: error.message,
      });
    }
  };
}

export default new AuthService();
