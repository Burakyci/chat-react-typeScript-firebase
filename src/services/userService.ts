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
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getMetadata,
} from "firebase/storage";
import { UserModel } from "../models/userModel";
import { db, storage } from "../config/FirebaseConfig";
import { IOperationResult, OperationResult } from "../models/commonModel";
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
      await this.deleteProfilePhotoIfExists(userId);
      const imageRef = ref(storage, `images/profileImages/${userId}.png`); // file name user uzerinede yaz
      await uploadBytes(imageRef, file);
      let url: string;
      url = await getDownloadURL(imageRef);
      const userRef = doc(this.usersColRef, userId);
      const snapShat = await getDoc(userRef);
      if (snapShat.exists()) {
        await updateDoc(userRef, { profilePhoto: url });
      } else {
        throw new Error("don't found doc");
      }

      return new OperationResult({ success: false, data: url });
    } catch (error: any) {
      console.log(error.message);
      return new OperationResult({ success: false, message: error.message });
    }
  };

  deleteProfilePhotoIfExists = async (
    userId: string
  ): Promise<IOperationResult<any>> => {
    try {
      const imageRef = ref(storage, `images/profileImages/${userId}.png`);

      const exists = await getMetadata(imageRef);

      if (exists) {
        await deleteObject(imageRef);
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

  getSearchUser = async (
    searchText: string
  ): Promise<OperationResult<IUserData[]>> => {
    try {
      const q1 = query(
        this.usersColRef,
        where("firstName", ">=", searchText),
        where("firstName", "<=", searchText)
      );
      const q2 = query(
        this.usersColRef,
        where("lastName", ">=", searchText),
        where("lastName", "<=", searchText)
      );

      const [querySnapshot1, querySnapshot2] = await Promise.all([
        getDocs(q1),
        getDocs(q2),
      ]);

      const users: IUserData[] = [];

      querySnapshot1.forEach((doc) => {
        const user = doc.data();
        user.id = doc.id;
        const data = { ...user, ...user } as IUserData;
        users.push(data);
      });

      querySnapshot2.forEach((doc) => {
        const user = doc.data() as IUserData;
        users.push(user);
      });

      return new OperationResult({ success: true, data: users });
    } catch (error: any) {
      console.log(error.message);
      return new OperationResult({ success: false, message: error.message });
    }
  };
}

export default new UserService();
