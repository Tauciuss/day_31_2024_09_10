const result = document.querySelector('.result');
var value = null;

const searchCocktails = (e) => {
    e.preventDefault();

    if(value === null)
        value = e.target.querySelector('input').value;
    else if(value != e.target.querySelector('input').value)
        value = e.target.querySelector('input').value;

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + value)
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        const data = resp.drinks.map(data => `
            <div class="col-4 mb-4" onclick="getCocktail(${data.idDrink})">
                <div class="image">
                    <img src="${data.strDrinkThumb}">
                </div>
                <h4 class="mt-2">${data.strDrink}</h4>
            </div>
        `);
        
        result.innerHTML = `<div class="row">${data.join('')}</div>`;
    });
}

 function filterCategory(category_name){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=${category_name}`)
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        const data = resp.drinks.map(data => `
            <div class="col-4 mb-4" onclick="getCocktail(${data.idDrink})">
                <div class="image">
                    <img src="${data.strDrinkThumb}">
                </div>
                <h4 class="mt-2">${data.strDrink}</h4>
            </div>
        `);
        
        result.innerHTML = `<div class="row">${data.join('')}</div>`;
    });
}

const Alcoholic = (e) => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        const data = resp.drinks.map(data => `
            <div class="col-4 mb-4" onclick="getCocktail(${data.idDrink})">
                <div class="image">
                    <img src="${data.strDrinkThumb}">
                </div>
                <h4 class="mt-2">${data.strDrink}</h4>
            </div>
        `);
        
        result.innerHTML = `<div class="row">${data.join('')}</div>`;
    });
}

const nonAlcoholic = (e) => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        const data = resp.drinks.map(data => `
            <div class="col-4 mb-4" onclick="getCocktail(${data.idDrink})">
                <div class="image">
                    <img src="${data.strDrinkThumb}">
                </div>
                <h4 class="mt-2">${data.strDrink}</h4>
            </div>
        `);
        
        result.innerHTML = `<div class="row">${data.join('')}</div>`;
    });
}

const getCocktail = (id) => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id)
    .then(resp => resp.json())
    .then(resp => {
        console.log(value);
        var ing_mes = "";
        for(var i = 1; i <= 15; i++){
            var ing = "strIngredient"+i //Ingredient key
            var mea = "strMeasure"+i //Measurements key
            if(resp.drinks[0][ing] != null)
                ing_mes += `<h4>${resp.drinks[0][ing]} - ${resp.drinks[0][mea]}</h4>`
        }
        var alcohol_type = ""
        if(resp.drinks[0].strAlcoholic === "Alcoholic"){
            alcohol_type = `<h4 onclick="Alcoholic(event)">${resp.drinks[0].strAlcoholic}</h4>`
        } else{
            alcohol_type = `<h4 onclick="nonAlcoholic(event)">${resp.drinks[0].strAlcoholic}</h4>`
        }

        var category = resp.drinks[0].strCategory.split(' ').join('_').toString();

        result.innerHTML = `
        <button class="btn btn-secondary" onclick="searchCocktails(event)">Back</button>
        <div>
            <img src="${resp.drinks[0].strDrinkThumb}">                    
            <h3>${resp.drinks[0].strDrink}</h3>
            <h4>${resp.drinks[0].strInstructions}</h4>
            <h4 onclick="filterCategory(${category})">Category: ${resp.drinks[0].strCategory}</h4>
            ${alcohol_type}
            <h4>${resp.drinks[0].strGlass}</h4>
            <hr>
            ${ing_mes}
        </div>
        `;
    });
}

