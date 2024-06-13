import { message } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import { ErrorData } from "@firebase/util";

import { auth, db } from "../firebase";
import { IUser } from "../types/iUser";
import { USER_ROLE } from "../util/constants";

export const createUser = async (userData: IUser) => {
  return createUserWithEmailAndPassword(auth, userData.email as string, userData.password as string)
    .then(async (userCredential: any) => {
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        firstName: userData.firstName ? userData.firstName : "",
        lastName: userData.lastName ? userData.lastName : "",
        address: userData.address
          ? {
            line1: userData.address.line1 ? userData.address.line1 : "",
            city: userData.address.city ? userData.address.city : "",
            state: userData.address.state ? userData.address.state : "",
            country: userData.address.country ? userData.address.country : "",
            zipCode: userData.address.zipCode ? userData.address.zipCode : "",
          }
          : {},
        team: userData.team ? userData.team : "",
        email: userData.email ? userData.email : "",
        phoneNumber: userData.phoneNumber ? userData.phoneNumber : "",
        designation: userData.designation ? userData.designation : "",
        joiningDate: userData.joiningDate ? userData.joiningDate : "",
        officeLocation: userData.officeLocation ? userData.officeLocation : "",
        type: USER_ROLE.find((type) => type.value === "executor"),
        timestamp: serverTimestamp(),
      });
      message.success("User added successfully");
      return true;
    })
    .catch((error: ErrorData) => {
      message.error(error.message as string);
      throw new Error(error.message as string);
    });
};

export const getUserById = async (userId: string) => {
  return getDoc(doc(db, "users", userId))
    .then((docSnap) => {
      return docSnap.data();
    })
    .catch((error: ErrorData) => {
      throw new Error(error.message as string);
    });
};

export const updateUser = async (userId: string, userData: any) => {
  await updateDoc(doc(db, "users", userId), userData);
};
