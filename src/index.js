const axios = require('axios');


const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g';

// get all cocktails which have a name beginning with “G”:
axios.get(API_URL)
    .then(response => {
        // Total:

        const drinks = response.data.drinks;
        const allDrinks = [];
        drinks.forEach(drink => {
            allDrinks.push(drink.strDrink);
        })
        console.log('Coktails beginnig with G:');
        console.log('Total:', response.data.drinks.length);
        console.log('Names:', allDrinks.join(', '));

        //Keep  the cocktails that have more than 4 ingredients:

        const moreThanFourIngredients = [];
        drinks.forEach(drink => {
            if (drink.strIngredient5 !== null) {
                moreThanFourIngredients.push(drink);
            }
        })
        console.log("\n")
        console.log('Coktails with more then 4 ingredients:');
        moreThanFourIngredients.forEach(drink => { console.log(drink.strDrink) })

        //Show ingredients:

        const nameIdIngredients = []
        moreThanFourIngredients.forEach(drink => {
            const ingredientsArray = [];
            ingredientsArray.push(drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4, drink.strIngredient5, drink.strIngredient6, drink.strIngredient7, drink.strIngredient8, drink.strIngredient9, drink.strIngredient10, drink.strIngredient11, drink.strIngredient12, drink.strIngredient13, drink.strIngredient14, drink.strIngredient15)
            const filteredArray = ingredientsArray.filter(value => value !== null);

            nameIdIngredients.push({ name: drink.strDrink, id: drink.idDrink, ingredients: filteredArray })
        })
        console.log("\n")
        console.log('Cocktails with just id/name/ingredients:');
        console.log(nameIdIngredients)
        console.log("\n")

        //Show ingredients and quantities:

        const nameIdIngredientsQtt = []
        moreThanFourIngredients.forEach(drink => {
            const ingredientsArray = [];
            ingredientsArray.push({ ing: drink.strIngredient1, qtt: drink.strMeasure1 }, { ing: drink.strIngredient2, qtt: drink.strMeasure2 }, { ing: drink.strIngredient3, qtt: drink.strMeasure3 }, { ing: drink.strIngredient4, qtt: drink.strMeasure4 }, { ing: drink.strIngredient5, qtt: drink.strMeasure5 }, { ing: drink.strIngredient6, qtt: drink.strMeasure6 }, { ing: drink.strIngredient7, qtt: drink.strMeasure7 }, { ing: drink.strIngredient8, qtt: drink.strMeasure8 }, { ing: drink.strIngredient9, qtt: drink.strMeasure9 }, { ing: drink.strIngredient10, qtt: drink.strMeasure10 }, { ing: drink.strIngredient11, qtt: drink.strMeasure11 }, { ing: drink.strIngredient12, qtt: drink.strMeasure12 }, { ing: drink.strIngredient13, qtt: drink.strMeasure13 }, { ing: drink.strIngredient14, qtt: drink.strMeasure14 }, { ing: drink.strIngredient15, qtt: drink.strMeasure15 })

            const filteredArray = ingredientsArray.filter(ele => ele.ing !== null)
            nameIdIngredientsQtt.push({ name: drink.strDrink, id: drink.idDrink, ingredients: JSON.stringify(filteredArray), alcoholic: drink.strAlcoholic })
        })

        console.log('Cocktails with ingredient quantities:')
        console.log(nameIdIngredientsQtt)
        console.log("\n")


        //get alcoholic and non-alcoholic cocktails:

        const alcoholic = [];
        const optAlcoholic = [];
        const nonAlcoholic = [];
        for (let i = 0; i < nameIdIngredientsQtt.length; i++) {
            if (nameIdIngredientsQtt[i].alcoholic === 'Alcoholic') {
                alcoholic.push(nameIdIngredientsQtt[i])
            } else if (nameIdIngredientsQtt.alcoholic === 'Non alcoholic') {
                nonAlcoholic.push(nameIdIngredientsQtt[i])
            } else {
                optAlcoholic.push(nameIdIngredientsQtt[i])
            }
        }
        


        console.log('Alcoholic cocktails:')
        console.log(alcoholic)
        console.log("\n")

        if (nonAlcoholic.length > 1) {
            console.log('Non-alcoholic cocktails:')
            console.log(nonAlcoholic)
        } else {
            console.log('We have not found any non-alcoholic cocktail choices. But we did find cocktails with optional alcohol:')
            console.log(optAlcoholic)
        }



    })
    .catch(error => console.log('Error', error));


