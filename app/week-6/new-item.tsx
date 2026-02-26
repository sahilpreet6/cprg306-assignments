"use client";

import { useState, type FormEvent } from "react";

interface NewItemProps {
  onAddItem: (item: { name: string; quantity: number; category: string }) => void;
}

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const trimmedName = name.trim();
  const nameHasError = nameTouched && trimmedName.length < 2;
  const isFormInvalid = trimmedName.length < 2;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (trimmedName.length < 2) {
      setNameTouched(true);
      alert("Name must be at least 2 characters long.");
      return;
    }

    const item = {
      name: trimmedName,
      quantity,
      category,
    };

    onAddItem(item);

    setName("");
    setNameTouched(false);
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md space-y-5 rounded-xl bg-white p-6 shadow-md"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => setNameTouched(true)}
          onFocus={() => setNameTouched(false)}
          required
          className={`w-full rounded-lg border bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:ring-2 ${
            nameHasError
              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
              : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
          }`}
          placeholder="e.g. Apples"
        />
        {nameHasError ? (
          <p className="mt-2 text-sm text-red-500">Name must be at least 2 characters long.</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Quantity</label>
          <input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen foods">Frozen Foods</option>
            <option value="canned goods">Canned Goods</option>
            <option value="dry goods">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isFormInvalid}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Add Item
      </button>
    </form>
  );
}
