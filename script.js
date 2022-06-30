const category = document.querySelector('#category');
const product = document.querySelector('#product');
const customProduct = document.querySelector('#custom-product');
const addBtn = document.querySelector('#add-btn');
const shoppingList = document.querySelector('#shopping-list');
const quantity = document.querySelector('#quantity');



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
    'Grape'
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
    other: other
}

const showProduct = () => {
product.innerHTML = '';
   itemsList[category.value].forEach(element => {
        product.innerHTML += `<option value=${element.toLowerCase().replaceAll(' ', '-')}>${element}</option>`;
    });
}

const addProduct = () => {
    shoppingItem = document.createElement('div');
    shoppingItem.classList.add('shopping-list-item');
    if(customProduct.value === ''){
        shoppingItem.textContent = quantity.value + 'x ' + product.options[product.selectedIndex].textContent;
    } else{
        shoppingItemt.extContent = quantity.value + 'x ' + customProduct.value;
        customProduct.value = '';
    }

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

showProduct();


category.addEventListener('change', showProduct);
addBtn.addEventListener('click', checkCategory);