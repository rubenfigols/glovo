class Cocktail {
    constructor(id, name, alcoholic) {
        this.id = id
        this.name = name;
        this.alcoholic = alcoholic;
        this.ingredients = [];
        this.ingredientsQtt = []
    }

    getIngredients(ingredients) {
        ingredients.forEach(element => {
            if (element !== null) {
                this.ingredients.push(element)
            }
        })
    }

    getIngredientsAndQtt(ingredients) {
        ingredients.forEach(element => {
            if (element.ing !== null) {
                this.ingredientsQtt.push({ ingredient: element.ing, qtt: element.qtt })
            }
        })
    };
}

module.exports = { Cocktail };