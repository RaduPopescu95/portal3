"use client";

import dynamic from "next/dynamic";
import MyProperties from "@/components/dashboard/my-properties";
import { unstable_noStore as noStore } from "next/cache";
import { authentication, db } from "@/firebase";
import { collection, getDocs, orderBy } from "firebase/firestore";
import { query } from "firebase/database";

// export const metadata = {
//   title: "Portal || Portal",
//   description: "Portal",
// };

const fetchItems = async (page) => {
  const collectionPath = `Users/${authentication.currentUser?.uid}/Oferte`; // Replace with your actual path
  const ref = collection(db, collectionPath);
  let pageQuery;

  pageQuery = query(ref, orderBy("firstUploadDate", "desc"));

  if (!pageQuery) return;

  const documentSnapshots = await getDocs(pageQuery);
  const newItems = documentSnapshots.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log("newItems....", newItems);
  return newItems;
};

const index = async () => {
  noStore();
  console.log("authentication....", authentication.currentUser);
  let oferte = await fetchItems();
  return (
    <>
      <MyProperties oferte={oferte} />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
