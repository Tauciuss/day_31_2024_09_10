const result = document.querySelector('.result');
var value = null;
var filteredAlphabet = null;
var filteredCategory = null;
var filteredGlass = null;
var filteredIngredient = null;
var isAlcoholic = null;
var isNonAlcoholic = null;
var isLucky = null;
function fillABC(){
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var alphabet_html = ""
    for(var i = 0; i < alphabet.length; i++){
        alphabet_html += `<h4 onclick="filterAlphabet('${alphabet[i]}')" class="symbol">${alphabet[i]}</h4>`
    }
    document.querySelector(".alphabet").innerHTML = alphabet_html;
}
fillABC();

const filterAlphabet = (symbol) => {
    value = null;
    filteredAlphabet = symbol;
    filteredCategory = null;
    filteredGlass = null;
    filteredIngredient = null;
    isAlcoholic = null;
    isNonAlcoholic = null;
    isLucky = null;
    
    document.querySelector(".input-group").style.display = ""
    document.querySelector(".alphabet").style.display = ""
    displayResult('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + symbol);
}

const searchCocktails = (e) => {
    document.querySelector(".input-group").style.display = ""
    document.querySelector(".alphabet").style.display = ""

    if(e)
        e.preventDefault();

    if(!value)
        value = e.target.querySelector('input').value;

    displayResult('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + value)
}

 function filterCategory(category_name){
    value = null;
    filteredAlphabet = null;
    filteredCategory = category_name;
    filteredGlass = null;
    filteredIngredient = null;
    isAlcoholic = null;
    isNonAlcoholic = null;
    isLucky = null;

    document.querySelector(".input-group").style.display = ""
    document.querySelector(".alphabet").style.display = ""

    displayResult(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category_name}`);
}

function filterGlass(glass_name){
    value = null;
    filteredAlphabet = null;
    filteredCategory = null;
    filteredGlass = glass_name;
    filteredIngredient = null;
    isAlcoholic = null;
    isNonAlcoholic = null;
    isLucky = null;

    document.querySelector(".input-group").style.display = ""
    document.querySelector(".alphabet").style.display = ""

    displayResult(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass_name}`);
}

function filterIngredient(ingredient_name){
    value = null;
    filteredAlphabet = null;
    filteredCategory = null;
    filteredGlass = null;
    filteredIngredient = ingredient_name;
    isAlcoholic = null;
    isNonAlcoholic = null;
    isLucky = null;

    document.querySelector(".input-group").style.display = "";
    document.querySelector(".alphabet").style.display = "";
    displayResult(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient_name}`);
}

const Alcoholic = () => {
    value = null;
    filteredAlphabet = null;
    filteredCategory = null;
    filteredGlass = null;
    filteredIngredient = null;
    isAlcoholic = true;
    isNonAlcoholic = null;
    isLucky = null;

    document.querySelector(".input-group").style.display = ""
    document.querySelector(".alphabet").style.display = ""
    displayResult('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
}

const nonAlcoholic = () => {
    value = null;
    filteredAlphabet = null;
    filteredCategory = null;
    filteredGlass = null;
    filteredIngredient = null;
    isAlcoholic = null;
    isNonAlcoholic = true;
    isLucky = null;
    document.querySelector(".input-group").style.display = "";
    document.querySelector(".alphabet").style.display = "";
    displayResult('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
}

const feelingLucky = () => {
    value = null;
    filteredAlphabet = null;
    filteredCategory = null;
    filteredGlass = null;
    filteredIngredient = null;
    isAlcoholic = null;
    isNonAlcoholic = null;
    isLucky = true;

    document.querySelector(".input-group").style.display = "";
    document.querySelector(".alphabet").style.display = "";
    displayResult('https://www.thecocktaildb.com/api/json/v1/1/random.php');
}

const getCocktail = (id) => {
    document.querySelector(".input-group").style.display = "none"
    document.querySelector(".alphabet").style.display = "none"

    fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id)
    .then(resp => resp.json())
    .then(resp => {
        var ing_mes = "";
        for(var i = 1; i <= 15; i++){
            var ing = "strIngredient"+i //Ingredient key
            var mea = "strMeasure"+i //Measurements key
            if(resp.drinks[0][ing] != null){
                var ingredient_name = resp.drinks[0][ing].split(' ').join('_');
                ing_mes += `<h4 onclick=filterIngredient('${ingredient_name}') class="selected">${resp.drinks[0][ing]} - ${resp.drinks[0][mea]}</h4>`;
            }
        }
        var alcohol_type = ""
        if(resp.drinks[0].strAlcoholic === "Alcoholic"){
            alcohol_type = `<h4 onclick="Alcoholic()" class="selected">${resp.drinks[0].strAlcoholic}</h4>`
        } else{
            alcohol_type = `<h4 onclick="nonAlcoholic()" class="selected">${resp.drinks[0].strAlcoholic}</h4>`
        }

        var category = resp.drinks[0].strCategory.split(' ').join('_');
        var glass = resp.drinks[0].strGlass.split(' ').join('_');

        
        result.innerHTML = `
        <button class="btn btn-primary" onclick="back()">Back</button>
        <br><br>
        <div>
            <img src="${resp.drinks[0].strDrinkThumb}">                    
            <h3>${resp.drinks[0].strDrink}</h3>
            <h4>${resp.drinks[0].strInstructions}</h4>
            <h4 onclick="filterCategory('${category}')" class="selected">Category: ${resp.drinks[0].strCategory}</h4>
            ${alcohol_type}
            <h4 onclick="filterGlass('${glass}')" class="selected">Stiklinė: ${resp.drinks[0].strGlass}</h4>
            <hr>
            ${ing_mes}
        </div>
        `;
    });
}

const displayResult = (api_link = null) =>{
    fetch(api_link)
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

const back = () => {
    if(value != null)
        searchCocktails();
    else if(filteredAlphabet != null){
        filterAlphabet(filteredAlphabet);
    } else if(filteredCategory != null){
        filterCategory(filteredCategory);
    } else if(filteredGlass != null){
        filterGlass(filteredGlass);
    } else if(filteredIngredient != null){
        filterIngredient(filteredIngredient);
    } else if(isAlcoholic != null){
        Alcoholic();
    } else if(isNonAlcoholic != null){
        nonAlcoholic();
    } else if(isLucky != null){
        feelingLucky();
    }
}

