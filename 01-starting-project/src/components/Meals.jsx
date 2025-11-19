import { useEffect, useState } from "react";
import MealItem from './MealItem.jsx';

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function FetchMeals() {
      try {
        const response = await fetch('http://localhost:3000/meals');

        if (!response.ok) {
          throw new Error('Bir hata oluştu!');
        }

        const meals = await response.json();
        setLoadedMeals(meals);
      } catch (error) {
        console.error(error);
      }
    }
    FetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} /> 
      ))}
    </ul>
  );
}
