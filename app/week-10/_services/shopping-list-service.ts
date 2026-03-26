import { db } from "../_utils/firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

type ShoppingItem = {
  name: string;
  quantity: number;
  category: string;
};

export async function getItems(userId: string) {
  const itemsCollectionRef = collection(db, "users", userId, "items");
  const itemsQuery = query(itemsCollectionRef);
  const querySnapshot = await getDocs(itemsQuery);

  const items: Array<ShoppingItem & { id: string }> = [];
  querySnapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      ...(doc.data() as ShoppingItem),
    });
  });

  return items;
}

export async function addItem(userId: string, item: ShoppingItem) {
  const itemsCollectionRef = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsCollectionRef, item);
  return docRef.id;
}
