const axios = require('axios');
const { Cocktail } = require('./cocktail')

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g';

axios.get(API_URL)
    .then(response => {
        let cocktail = []
        const drinks = response.data.drinks;
        for (let i = 0; i < drinks.length; i++) {
            cocktail[i] = new Cocktail(drinks[i].idDrink, drinks[i].strDrink, drinks[i].strAlcoholic);

            cocktail[i].getIngredients([drinks[i].strIngredient1, drinks[i].strIngredient2, drinks[i].strIngredient3, drinks[i].strIngredient4, drinks[i].strIngredient5, drinks[i].strIngredient6, drinks[i].strIngredient7, drinks[i].strIngredient8, drinks[i].strIngredient9, drinks[i].strIngredient10, drinks[i].strIngredient11, drinks[i].strIngredient12, drinks[i].strIngredient13, drinks[i].strIngredient14, drinks[i].strIngredient15])

            cocktail[i].getIngredientsAndQtt([{ ing: drinks[i].strIngredient1, qtt: drinks[i].strMeasure1 }, { ing: drinks[i].strIngredient2, qtt: drinks[i].strMeasure2 }, { ing: drinks[i].strIngredient3, qtt: drinks[i].strMeasure3 }, { ing: drinks[i].strIngredient4, qtt: drinks[i].strMeasure4 }, { ing: drinks[i].strIngredient5, qtt: drinks[i].strMeasure5 }, { ing: drinks[i].strIngredient6, qtt: drinks[i].strMeasure6 }, { ing: drinks[i].strIngredient7, qtt: drinks[i].strMeasure7 }, { ing: drinks[i].strIngredient8, qtt: drinks[i].strMeasure8 }, { ing: drinks[i].strIngredient9, qtt: drinks[i].strMeasure9 }, { ing: drinks[i].strIngredient10, qtt: drinks[i].strMeasure10 }, { ing: drinks[i].strIngredient11, qtt: drinks[i].strMeasure11 }, { ing: drinks[i].strIngredient12, qtt: drinks[i].strMeasure12 }, { ing: drinks[i].strIngredient13, qtt: drinks[i].strMeasure13 }, { ing: drinks[i].strIngredient14, qtt: drinks[i].strMeasure14 }, { ing: drinks[i].strIngredient15, qtt: drinks[i].strMeasure15 }])
        }
        const names = [];
        cocktail.forEach(element => names.push(element.name));

        // Get all cocktails which have a name beginning with “G”:
        console.log('Coktails beginnig with G:');
        console.log('Total:', cocktail.length);
        console.log('Names:', names.join(', '));
        console.log("\n");

        //Keep  the cocktails that have more than 4 ingredients:
        console.log('Coktails with more the four ingredients');
        const fourOrMoreIng = cocktail.filter(element => element.ingredients.length > 4);

        fourOrMoreIng.forEach(element => console.log(element.name))

        //Show id/name/ingredients:
        console.log("\n");
        console.log('Cocktails with just id/name/ingredients:');
        fourOrMoreIng.forEach(element => console.log({ name: element.name, id: element.id, ingredients: element.ingredients }))

        //Show id/name/ingredients/qtt:
        console.log("\n");
        console.log('Cocktails with  id/name/ingredients/qtt:');
        fourOrMoreIng.forEach(element => console.log({ name: element.name, id: element.id, ingredientsQtt: element.ingredientsQtt }))

        //Get alcoholic and non-alcoholic cocktails:
        const alcoholic = [];
        const optAlcoholic = [];
        const nonAlcoholic = [];
        for (let i = 0; i < fourOrMoreIng.length; i++) {
            if (fourOrMoreIng[i].alcoholic === 'Alcoholic') {
                alcoholic.push(fourOrMoreIng[i]);
            } else if (fourOrMoreIng.alcoholic === 'Non alcoholic') {
                nonAlcoholic.push(fourOrMoreIng[i]);
            } else {
                optAlcoholic.push(fourOrMoreIng[i]);
            }
        }


        if (alcoholic.length > 0) {
            console.log('Alcoholic cocktails:');
            alcoholic.forEach(drink => console.log(drink.name))
        } else {
            console.log('Sorry, there is no alcoholic cocktail avaliable...')
        }

        console.log("\n");


        if (nonAlcoholic.length > 0) {
            console.log('Non-alcoholic cocktails:');
            nonAlcoholic.forEach(drink => console.log(drink.name))
        } else {
            console.log('Sorry, there is no non-alcoholic cocktail avaliable...')
        }

        console.log("\n");

        if (optAlcoholic.length > 0) {
            console.log('Optional alcoholic cocktails:');
            optAlcoholic.forEach(drink => console.log(drink.name))
        } else {
            console.log('Sorry, there is no optional alcohol cocktail avaliable...')
        }
    })
