import { collection, getDocs } from "firebase/firestore";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../firebase";

export const getAllUsers = createAsyncThunk("users/getAll", async () => {
  const allUsers: any[] = [];
  const docsSnap = await getDocs(collection(db, "users"));
  docsSnap.forEach((doc) => allUsers.push({ id: doc.id, ...doc.data() }));
  return allUsers.filter((user) => !("endDate" in user));
});
