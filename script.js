/* Assign constant variables */
const category = document.querySelector('#category');
const product = document.querySelector('#product');
const customProduct = document.querySelector('#custom-product');
const addBtn = document.querySelector('#add-btn');
const shoppingList = document.querySelector('#shopping-list');
const quantity = document.querySelector('#quantity');
const customProductLimit = document.querySelector('#custom-product-limit');
const customCharMax = 25; 

/* Set a text for a custom product's limit */
customProductLimit.textContent = customProduct.value.length + '/' + customCharMax;

/* Assign products to the categories */
const dairy = [
    'Milk',
    'Eggs',
    'Cheese',
    'Cottage cheese',
    'Buttermilk'
]

const bread = [
    'Bread',
    'Roll',
    'Baguette'
]

const drinks = [
    'Water',
    'Coca-cola',
    'Beer',
    'Vodka',
    'Orange juice'
]

const fruits = [
    'Apple',
    'Banana',
    'Orange',
    'Pear',
    'Strawberry',
    'Blueberry',
    'Blackberry',
    'Cherry',
    'Grape',
    'Kiwi'
]

const meat = [
    'Chicken',
    'Pork',
    'Beef',
    'Mutton',
    'Duck',
    'Salmon'
]

const snacks = [
    'Chips',
    'French fries',
    'Peanuts',
    'Chocolate',
    'Salted sticks'
]

const vegetables = [
    'Carrot',
    'Tomatoe',
    'Onion',
    'Potato',
    'Cucumber',
    'Pepper',
]

const other = [
    'Toilet paper',
    'Shampoo',
    'Soap',
    'Garbage bags'
]

/* Gather all the categories into one object */
const itemsList = {
    dairy: dairy.sort(),
    bread: bread.sort(),
    drinks: drinks.sort(),
    fruits: fruits.sort(),
    meat: meat.sort(),
    snacks: snacks.sort(),
    vegetables: vegetables.sort(),
    other: other.sort()
}


/* Create HTML part with options basing on prepared item list */
const showProduct = () => {
    product.innerHTML = '';
    itemsList[category.value].sort().forEach(element => {
        product.innerHTML += `<option value=${element.toLowerCase().replaceAll(' ', '-')}>${element}</option>`;
    });
}

/* Create container with tools' icons */
const createToolsContainer = () => {
    checkIcon = document.createElement('img');
    removeIcon = document.createElement('img');

    checkIcon.setAttribute('src', 'icons/check.png');
    removeIcon.setAttribute('src', 'icons/remove.png');

    checkIcon.setAttribute('data-action', 'check');
    removeIcon.setAttribute('data-action', 'remove');


    toolsContainer = document.createElement('div');
    
    toolsContainer.classList.add('tools-container');
    toolsContainer.append(checkIcon, removeIcon);

    itemTools = document.querySelectorAll('[data-action]');
}

/* Add new product to the shopping list */
const addProduct = () => {
    const shoppingItem = document.createElement('div');
    shoppingItem.classList.add('shopping-list-item');
    if(customProduct.value === ''){
        shoppingItem.textContent = quantity.value + 'x ' + product.options[product.selectedIndex].textContent;
    } else{
        shoppingItem.textContent = quantity.value + 'x ' + customProduct.value;
        customProduct.value = '';
    }

    createToolsContainer();

    quantity.value = 1;
    checkCharNum();

    shoppingItem.append(toolsContainer);
    document.querySelector(`[data-category="${category.value}"]`).append(shoppingItem);   

}

/* Add new category to the shopping list */
const addCategory = () => {
    shoppingCategory = document.createElement('div');
    shoppingCategoryTitle = document.createElement('div');
    shoppingCategoryTitle.classList.add('shopping-list-bar');

    shoppingCategory.classList.add('shopping-list-container');
    shoppingCategory.setAttribute('data-category', category.value);
    shoppingCategoryTitle.textContent = category.options[category.selectedIndex].textContent;

    shoppingCategory.append(shoppingCategoryTitle);
    shoppingList.append(shoppingCategory);

    addProduct();
}

/* Check if the category is already added to the shopping list */
const checkCategory = () => {
    const shoppingListContainer = document.querySelectorAll('.shopping-list-container');

    if(shoppingListContainer !== 0){
        for(let i = 0; i < shoppingListContainer.length; i++){
            if(shoppingListContainer[i].getAttribute('data-category') == category.value){
                addProduct();
                return;
            }
        }
    }

    addCategory();

}

/* Get rid of negative sign */
const setQuantity = () => {
    if(quantity.value < 0){
        quantity.value = quantity.value * -1;
    }
}

/* Check what icon has been pressed and do a proper action */
const checkTool = (e) => {
    if(e.target.matches("[data-action='check'")){
        e.target.closest('.shopping-list-item').classList.toggle('checked');
        if(e.target.closest('img').getAttribute('src') === 'icons/check.png'){
            e.target.closest('img').setAttribute('src', 'icons/back.png');
        } else{
            e.target.closest('img').setAttribute('src', 'icons/check.png');
        }
    } else if(e.target.matches("[data-action='remove'")){
        closestContainer = e.target.closest('.shopping-list-container');
        e.target.closest('.shopping-list-item').remove();

        if(closestContainer.querySelectorAll('.shopping-list-item').length === 0){
            closestContainer.remove();
        }

    }
}

/* Show the number of chars entered in the custom product's name field */
const checkCharNum = () => {
    customProductLimit.textContent = customProduct.value.length + '/' + customCharMax;
    if(customProduct.value.length === 25){
        customProductLimit.style.color = '#ff0000';
    } else{
        customProductLimit.style.color = '#fff';
    }
}


showProduct();

/* Add event listeners */

category.addEventListener('change', showProduct);
addBtn.addEventListener('click', checkCategory);
quantity.addEventListener('keyup', setQuantity);
shoppingList.addEventListener('click', checkTool);
customProduct.addEventListener('input', checkCharNum)
