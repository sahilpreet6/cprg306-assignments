"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

type ItemData = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem: { name: string; quantity: number; category: string }) => {
    const itemWithId = {
      id: Math.random().toString(36).substr(2, 9),
      ...newItem,
    };
    setItems([...items, itemWithId]);
  };

  const handleItemSelect = (item: ItemData) => {
    // Clean up the item name by removing emojis and size information
    let cleanedName = item.name;
    
    // Remove emojis
    cleanedName = cleanedName.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u0080-\u009F]|[\u2000-\u206F])/g,
      ""
    );
    
    // Remove content in parentheses and after comma (e.g., ", 1 kg")
    cleanedName = cleanedName.split(",")[0];
    
    // Trim whitespace
    cleanedName = cleanedName.trim();
    
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping List</h1>
        
        <div className="flex gap-8">
          {/* Left side: Add item and shopping list */}
          <div className="flex-1">
            <NewItem onAddItem={handleAddItem} />
            <div className="mt-8">
              <ItemList items={items} onItemSelect={handleItemSelect} />
            </div>
          </div>
          
          {/* Right side: Meal ideas */}
          <div className="flex-1">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}
