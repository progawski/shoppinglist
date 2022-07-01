const category = document.querySelector('#category');
const product = document.querySelector('#product');
const customProduct = document.querySelector('#custom-product');
const addBtn = document.querySelector('#add-btn');
const shoppingList = document.querySelector('#shopping-list');
const quantity = document.querySelector('#quantity');
//const itemTools = document.querySelectorAll('[data-action]');


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

const itemsList = {
    dairy: dairy,
    bread: bread,
    drinks: drinks,
    fruits: fruits,
    meat: meat,
    snacks: snacks,
    vegetables: vegetables,
    other: other
}

const showProduct = () => {
product.innerHTML = '';
   itemsList[category.value].forEach(element => {
        product.innerHTML += `<option value=${element.toLowerCase().replaceAll(' ', '-')}>${element}</option>`;
    });
}

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

   

    shoppingItem.append(toolsContainer);
    document.querySelector(`[data-category="${category.value}"]`).append(shoppingItem);   
    quantity.value = 1;


    
}

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

const setQuantity = () => {
    if(quantity.value < 0){
        quantity.value = quantity.value * -1;
        console.log(quantity.value);
    }
}

const setDefaultValue = () => {
    if(quantity.value === ''){
        quantity.value = 1;
    }
}

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


showProduct();


category.addEventListener('change', showProduct);
addBtn.addEventListener('click', checkCategory);
quantity.addEventListener('keyup', setQuantity);
quantity.addEventListener('focusout', setDefaultValue);
shoppingList.addEventListener('click', checkTool);
