"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import NewItem from "./new-item";
import { useUserAuth } from "../_utils/auth-context";
import { addItem, getItems } from "../_services/shopping-list-service";

type ItemData = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function ShoppingListPage() {
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState<ItemData[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    let isMounted = true;

    const loadItems = async () => {
      const userItems = await getItems(user.uid);
      if (isMounted) {
        setItems(userItems);
      }
    };

    loadItems();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleAddItem = async (newItem: { name: string; quantity: number; category: string }) => {
    if (!user) {
      return;
    }

    const id = await addItem(user.uid, newItem);
    setItems((currentItems) => [...currentItems, { id, ...newItem }]);
  };

  const handleItemSelect = (item: ItemData) => {
    let cleanedName = item.name;

    cleanedName = cleanedName.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u0080-\u009F]|[\u2000-\u206F])/g,
      "",
    );

    cleanedName = cleanedName.split(",")[0];
    cleanedName = cleanedName.trim();

    setSelectedItemName(cleanedName);
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
          <h1 className="mb-3 text-2xl font-bold text-slate-900">Access denied</h1>
          <p className="mb-6 text-slate-700">Please sign in from the Week 10 landing page to access your shopping list.</p>
          <Link
            href="/week-10"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            Go to Login Page
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl font-bold text-gray-800">Shopping List</h1>
          <div className="flex gap-3">
            <Link
              href="/week-10"
              className="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-900 transition hover:bg-slate-300"
            >
              Back to Home
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex gap-8 max-lg:flex-col">
          <div className="flex-1">
            <NewItem onAddItem={handleAddItem} />
            <div className="mt-8">
              <ItemList items={items} onItemSelect={handleItemSelect} />
            </div>
          </div>

          <div className="flex-1">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}
