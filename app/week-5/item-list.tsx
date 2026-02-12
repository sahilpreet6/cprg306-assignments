"use client";

import { useState } from "react";
import itemsData from "./items.json";
import Item from "./item";

type ItemData = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function ItemList() {
  const [items] = useState<ItemData[]>(itemsData as ItemData[]);
  const [sortBy, setSortBy] = useState("name");
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }

    return a.name.localeCompare(b.name);
  });
  const groupedItems = [...items]
    .sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
    )
    .reduce<Record<string, ItemData[]>>((groups, item) => {
      const categoryItems = groups[item.category] ?? [];
      categoryItems.push(item);
      groups[item.category] = categoryItems;
      return groups;
    }, {});
  const groupedCategories = Object.keys(groupedItems).sort((a, b) =>
    a.localeCompare(b),
  );

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          className={
            sortBy === "name"
              ? "rounded bg-blue-600 px-3 py-1 text-white"
              : "rounded bg-gray-200 px-3 py-1 text-gray-800"
          }
          onClick={() => setSortBy("name")}
          type="button"
        >
          Name
        </button>
        <button
          className={
            sortBy === "category"
              ? "rounded bg-blue-600 px-3 py-1 text-white"
              : "rounded bg-gray-200 px-3 py-1 text-gray-800"
          }
          onClick={() => setSortBy("category")}
          type="button"
        >
          Category
        </button>
        <button
          className={
            sortBy === "grouped"
              ? "rounded bg-blue-600 px-3 py-1 text-white"
              : "rounded bg-gray-200 px-3 py-1 text-gray-800"
          }
          onClick={() => setSortBy("grouped")}
          type="button"
        >
          Grouped
        </button>
      </div>
      {sortBy === "grouped" ? (
        <div className="space-y-6">
          {groupedCategories.map((category) => (
            <div key={category}>
              <h3 className="mb-2 text-lg font-semibold capitalize">
                {category}
              </h3>
              <ul className="space-y-2">
                {groupedItems[category].map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
