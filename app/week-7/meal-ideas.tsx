"use client";

import { useEffect, useState } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealIdeasProps {
  ingredient: string;
}

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
    );

    if (!response.ok) {
      return [];
    }

    const text = await response.text();

    if (!text) {
      return [];
    }

    const data = JSON.parse(text);
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

export default function MealIdeas({ ingredient }: MealIdeasProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMealIdeas = async () => {
      if (!ingredient) {
        setMeals([]);
        return;
      }

      setLoading(true);

      try {
        const result = await fetchMealIdeas(ingredient);
        setMeals(result);
      } finally {
        setLoading(false);
      }
    };

    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Meal Ideas</h2>

      {ingredient && (
        <p className="mb-3 text-sm text-gray-600">
          Selected ingredient: <span className="font-semibold">{ingredient}</span>
        </p>
      )}

      {!ingredient ? (
        <p className="text-gray-500">Select an item to see meal ideas.</p>
      ) : loading ? (
        <p className="text-gray-500">Loading meal ideas...</p>
      ) : meals.length === 0 ? (
        <p className="text-gray-500">
          No meal ideas found for <span className="font-semibold">{ingredient}</span>.
        </p>
      ) : (
        <ul className="max-h-96 space-y-3 overflow-y-auto">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="rounded-md border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex items-start gap-3">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{meal.strMeal}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}