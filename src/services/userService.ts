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
import { db, storage } from "../config/FirebaseConfig";
import { IOperationResult, OperationResult } from "../models/commonModel";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getMetadata,
  FullMetadata,
} from "firebase/storage";
import { v4 } from "uuid";
import { IUserData } from "../types";
class UserService {
  private storage = getStorage();
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
        profilePhoto:
          "https://firebasestorage.googleapis.com/v0/b/chat-3b279.appspot.com/o/defaultPhoto.jpg?alt=media&token=6899741d-81a6-4ae7-a53c-b6190cbd38c5",
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
          profilePhoto: doc.data().profilePhoto,
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
            profilePhoto: doc.data().profilePhoto,
          }) as UserModel;
          users.push(user);
        });
        update(users);

        return unSubGetUser;
      });
    } catch (error: any) {
      return new OperationResult({ success: false, message: error.message });
    }
  };
  uploadProfilePhoto = async (
    file: File,
    userId: string
  ): Promise<IOperationResult<string | null>> => {
    try {
      const imageRef = ref(
        storage,
        `images/profileImages/${userId}/${file.name}+${v4()}`
      );
      const upload = await uploadBytes(imageRef, file);
      let url: string;
      url = await getDownloadURL(imageRef);
      const userRef = doc(this.usersColRef, userId);
      const snapShat = await getDoc(userRef);
      if (snapShat.exists()) {
        await updateDoc(userRef, { profilePhoto: url });
      } else {
        throw new Error("don't found doc");
      }
      const desertRef = ref(storage, "images/desert.jpg");

      return new OperationResult({ success: false, data: url });
    } catch (error: any) {
      console.log(error.message);
      return new OperationResult({ success: false, message: error.message });
    }
  };
  deletedBeforePhoto = async (
    userId: string
  ): Promise<IOperationResult<any>> => {
    try {
      let metaData: FullMetadata;
      const beforeRef = ref(storage, `images/profileImages/${userId}`);
      const exists = await getMetadata(beforeRef);

      if (exists) {
        console.log(exists);
        metaData = await getMetadata(beforeRef);
        if (metaData.size > 0) {
          const deletedBefore = await deleteObject(beforeRef);
        }
        return new OperationResult({ success: true });
      } else {
        throw new Error("Depolama referansı mevcut değil.");
      }
    } catch (error: any) {
      console.log(error.message);
      return new OperationResult({ success: false, message: error.message });
    }
  };
  getUser = async (
    userId: string
  ): Promise<IOperationResult<IUserData | undefined>> => {
    try {
      const userRef = doc(this.usersColRef, userId);
      const userOnSnap = await getDoc(userRef);
      let userData: IUserData | undefined = undefined;
      if (userOnSnap.exists()) {
        userData = userOnSnap.data() as IUserData;
      }
      return new OperationResult({ success: false, data: userData });
    } catch (error: any) {
      return new OperationResult({ success: false, message: error.message });
    }
  };
}

export default new UserService();
