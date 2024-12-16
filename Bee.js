/*  I checked the APIs provided in the link https://www.themealdb.com/api.php
and found three possible APIs that can be used to get all meals. Also, there
were no meals that start with the letter 'g', so instead, I changed the letter to 'a'.
*/

console.log("Welcome to Humble Bee technical question \n");

// Define the API URL
const apiUrl1 = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";
const apiUrl2 = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";
const apiUrl3 = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772";
let allMeals = [];
let mealsWithA = [];
const firstLetter = 'A'

// Function to fetch data from the API
async function fetchMealData() {
    try {
        const [response1, response2, response3] = await Promise.all([
            fetch(apiUrl1),
            fetch(apiUrl2),
            fetch(apiUrl3)
        ]); // Make the API request

        if (!response1.ok || !response2.ok || !response3.ok) {
            throw new Error(`HTTP error! Status: ${response1.status}, or ${response2.status}, or ${response3.status}`);
        }

        const data1 = await response1.json();
        const data2 = await response2.json();
        const data3 = await response3.json();
        
        //Speading the meal object into into the allMeals
        allMeals = [
            ...data1.meals,
            ...data2.meals,
            ...data3.meals
        ] 

        for (let meal of allMeals) {
            if (meal.strMeal[0].toUpperCase() === firstLetter) {    //If the first letter to the meal name "strMeal" equal to A
                let ingredientList = [];

                for (let i = 1; i <= 20; i++){      //The maximum number of ingredients for each meal is 20
                    const ingredient = meal[`strIngredient${i}`];   //retreive the each ingredient
                    const quantity = meal[`strMeasure${i}`];    //retreive the quantity of each ingredient

                    // Check if the ingredient or its quantity is neither null nor empty string
                    if (ingredient && ingredient !== "" && quantity && quantity !== "") {
                        ingredientList.push({ ingredient: ingredient, quantity: quantity });
                    }
                }
                // Add the meal title with its ingredients list
                mealsWithA.push({
                    mealTitle: meal.strMeal,
                    ingredients: ingredientList
                });

            }
        }
        
    } catch (error) {
        console.error("Error fetching the meal data:", error); // Log any errors
    }
}

// Call the function to fetch and display the data

await fetchMealData();  // Wait for fetchMealData1 to finish    

if (mealsWithA.length === 0) {
            console.log("Sorry, there are no meals in the list that start with the letter " + firstLetter)
} else {
    // Print the meal title and ingredients with their quantities
    mealsWithA.forEach(meal => {
        console.log(`Meal: ${meal.mealTitle}`);
        meal.ingredients.forEach(ingredient => {
            console.log(`${ingredient.quantity} of ${ingredient.ingredient}`);
        });
            console.log('-------'); // Separator for better readability
    });
}



