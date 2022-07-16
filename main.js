// JS - Capstone Project II //

// jQuery //

// -- Accordion Drop-down Menu: Product Details (Catalogue Section)
/* A card-header class is assigned to each heading tag (allergens, dietary and ingredients of each product) 
in the Catalogue HTML file (click the view more button to find the product details page). 
The children class (content) will open/span when the user hovers over the heading when the 
icon is "+" and will collapse when the user hovers away from the heading when the icon is "-".

When the user hovers on one of the heading cards, the other cards will collapse. 
If / else statement: If the card has a class of active, the card will slide up when the user hovers over 
the heading, else the card body will slide down.*/

$(document).ready(function () {
  $('.card-header').hover(function () {
    if ($(this).next('.card-body').hasClass('active')) {
      $(this).next('.card-body').removeClass('active').slideUp();
      $(this).children('span').removeClass('fa-minus').addClass('fa-plus');
    } else {
      $('.card .card-body').removeClass('active').slideUp();
      $('.card .card-header span').removeClass('fa-minus').addClass('fa-plus');
      $(this).next('.card-body').addClass('active').slideDown();
      $(this).children('span').removeClass('fa-plus').addClass('fa-minus');
    }
  });
});

// -- Hide and Show: About Us
/*This function will hide and show paragraphs in the About Us page when the user clicks on the respective buttons.*/
$('#hide').click(function () {
  $('p').hide();
});
//show() function to show <p> for aboutus.html
$('#show').click(function () {
  $('p').show();
});

// -- Chained Effect: Review Section
/* This chained effect changes the text color of the review page to purple whilst sliding all elements 
up and down the page when the user clicks on the respective button */
$('button').click(function () {
  $('#review')
    .css('color', 'purple')
    .slideUp(2000)
    .slideDown(2000)
    .slideUp(2000)
    .slideDown(2000);
});

// -- Animation Effect: Contact Us Section
/*Here is a fun animation which allows the user to interact with the page. He/she will press any 
arrow keys to move a gif party donut left, right, up or down */
$(document).keydown(function (key) {
  switch (parseInt(key.which, 10)) {
    //Different case numbers are assigned to each key arrow
    case 37: //left key
      $('#gif').animate({
        left: '-=100px',
      });
      break;
    case 38: //up key
      $('#gif').animate({
        top: '-=100px',
      });
      break;
    case 39: //right key
      $('#gif').animate({
        left: '+=100px',
      });
      break;
    case 40: //down key
      $('#gif').animate({
        top: '+=100px',
      });
      break;
  }
});

/* -- Shopping Basket - Includes adding, removing and clearing products, calculation for total, vat and coupons, 
as well as table and form compilation for 8 products.*/

//An empty array is created to store all the products that the user will add to their basket.
let basket = [];

//Here we check (if it is true) that there are products stored in the localStorage.
function storeBasket() {
  localStorage.setItem('basket', JSON.stringify(basket));
}

/*The onLoad function ensures all rows are first emptied and will then recreate all the values stored in the 
basketArray. If any changes occur in basketArray, the changes will be reflected back through the onLoad calling. 
The basketArray key-value pairs reside in localStorage which will be stored there even after the browser is 
closed. JSON.parse() is used so that the products in the basket becomes a JavaScript object.*/
function onLoad() {
  basket = JSON.parse(localStorage.getItem('basket'));
  if (basket === null) {
    //From the catalogue section we can select products and add them to the local storage.
    basket = [];
  }
}

onLoad();

//8 Bakery Objects are created using the Constructor Function
class Bake {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.count = 1; //If the user adds the same item more than once, the count value will increase and be displayed in the basket and local storage as well.
  }
}

//We create each bakery object distinguishing them from 'bake1' to 'bake8'.
let bake1 = new Bake('LC657', 'Lemon Cake', 350, 'images/dessert/dessert1.jpg');

let bake2 = new Bake(
  'FP894',
  'Fruit Pastries',
  120,
  'images/dessert/dessert2.jpg'
);

let bake3 = new Bake(
  'SC346',
  'Strawberry Cake',
  400,
  'images/dessert/dessert3.jpg'
);

let bake4 = new Bake(
  'CB893',
  'Chocolate Bundt Cake',
  150,
  'images/dessert/dessert4.jpg'
);

let bake5 = new Bake(
  'CS906',
  'Candied Speckled Eggs',
  80,
  'images/topping/topping1.jpg'
);

let bake6 = new Bake(
  'JS476',
  'Jimmies Sprinkles',
  80,
  'images/topping/topping2.jpg'
);

let bake7 = new Bake(
  'DR568',
  'Designer Rolling Pin',
  300,
  'images/tool/tool2.jpg'
);

let bake8 = new Bake('CC782', 'Cookie Cutters', 280, 'images/tool/tool1.jpg');

//An array of bakery products is created to store the baked products objects we made above.
let myBake = [bake1, bake2, bake3, bake4, bake5, bake6, bake7, bake8];

/*An addBasket function is created to add and push out the products entered from the field labels 
using a for loop.*/
function addBasket(id, name, price, image) {
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].name === name) {
      basket[i].count += 1; //+= adds products to the basket whilst -= removes products from the basket.
      storeBasket();
      return;
    }
  }
  let bake = new Bake(id, name, price, image);
  basket.push(bake);
  storeBasket();
}

//To add to the quantity of a specific product, the user must click on the "+" button.
function add(bake) {
  let id = bake.getAttribute('bake-id');
  let name = bake.getAttribute('bake-name');
  let price = bake.getAttribute('bake-price');
  let image = bake.getAttribute('bake-image');
  addBasket(id, name, price, image);
  countInBasket();

  location.reload();
}

//To decrease the quantity of a specific product, the user must click on the "-" button.
function decrease(bake) {
  let name = bake.getAttribute('bake-name');
  removeBake(name, 1);
  countInBasket();

  location.reload();
}

/*Clicking on the "add to cart" button will add items to the basket. An alert message will then be displayed 
which will inform the buyer about the product they have purchased as well as their total price. */
function addToBasket(bake) {
  let id = bake.getAttribute('bake-id');
  let name = bake.getAttribute('bake-name');
  let price = bake.getAttribute('bake-price');
  let image = bake.getAttribute('bake-image');
  addBasket(id, name, price, image);
  countInBasket();
  alert(
    `You added ${name} to your basket. Your total is now R${totalBasket()}.00`
  );
}

//Removing items from the basket - similar to adding items except we use "-=" and splice.
function removeBake(name, count = 1) {
  for (let i = 0; i < basket.length; i++) {
    let bake = basket[i];
    if (bake.name === name) {
      if (bake.count > count) {
        bake.count -= count;
      } else {
        basket.splice([i], 1);
      }
    }
  }
  storeBasket();
}

/*The remove button will delete the product from the basket and an alert will inform the buyer
about this action */
function removeFromBasket(bake) {
  let name = bake.getAttribute('bake-name');
  let count = bake.getAttribute('bake-count');
  removeBake(name, count);
  countInBasket();

  location.reload();
  alert(`You removed ${name} from your basket`);
}

/*To clear the basket, the user must click on the respective button which will erase all items from the basket 
as well as the local storage.*/
function clearOrder() {
  localStorage.clear();

  location.reload();
}

//TOTAL COST, VAT & COUPON/DISCOUNT CALCULATIONS

//Here we calculate the total cost
function totalBasket() {
  let total = 0;
  for (const bake of basket) {
    total += bake.count * bake.price; //quantity * price = total. += will add onto any existing price if the user adds more products to their basket.
  }
  return total;
}

//To keep track of the number of items being added to the basket, a countBasket function is created.
function countBasket() {
  let count = 0;
  for (const bake in basket) {
    count += basket[bake].count;
  }
  return count;
}

//The basket in the navigation menu will display the number of items in the basket
function countInBasket() {
  let productNumbers = document.getElementById('navBasket');
  if (productNumbers) {
    productNumbers.innerHTML = countBasket();
  }
}
countInBasket();

/*Here we calculate the shipping cost in addition to the price of the product.
The user must choose between 2 radio buttons (collection or delivery)*/
function shippingCalcTotal() {
  let radios = document.getElementsByName('deliveryinput');
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      value = Number(radios[i].value);
      found = 0;
    }
  }
  if (found == 1) {
  }
  return value;
}

//3 coupon codes are created for each category which will modify the total amount based on the value of the coupon.
function calculateDiscount() {
  let value = totalBasket() + shippingCalcTotal();
  let couponCode = document.getElementById('discountinput').value;
  if (couponCode === 'desserts') {
    value *= 0.7;
  } else if (couponCode === 'toppings') {
    value *= 0.6;
  } else if (couponCode === 'tools') {
    value *= 0.9;
  }
  return value;
}

//VAT calculation, simply multiplying the total cost by 15%.
function VAT(total) {
  return total * 0.15;
}

//An Update button is created. This function will amend the total cost based on the coupon and vat.
function updateBasketTotal() {
  let basketTotal = calculateDiscount();
  document.getElementById('baskettotal').setAttribute('value', basketTotal);

  let vatTotal = calculateDiscount() * 0.15;
  document.getElementById('vattotal').setAttribute('value', vatTotal);
}

//Reference number using Math.floor method to round off to the nearest integer
function submitOrder() {
  let refNum = Math.floor(100000000 + Math.random() * 900000000);
  alert(
    `Your order is successful! The reference number for your purchase is ${refNum}.`
  );
}

// -- Creation of Shopping Cart Table
/* To easily modify the HTML content for the table summary, I used the innerHTML to display the shopping table.
Within the table, the increase and decrease count buttons as well as the remove buttons are created. */
function BasketTable() {
  let productTable = document.getElementById('ordersummary');

  let total = totalBasket().toFixed(2);
  if (addBasket && productTable) {
    Object.values(basket).map((product) => {
      productTable.innerHTML += `

<table class="products">
  <th>Image</th>
  <th>Product</th>
  <th>Price</th>
  <th>Quantity</th>
  <th>Total</th>
  <th></th>
  <tr>

    <td><img src=${product.image} class="productimage" alt="productimage"></td>
    <td>${product.name}</td>
    <td>R${product.price}</td>
    <td>

      <button class="add" bake-name="${product.name}" bake-image="${
        product.image
      }" bake-price="${product.price}" onclick="add(this)"><i>+</i></button>
      <h6 class="productcount">${
        product.count
      }</h6><button id="decreasecount" class="delete" bake-name="${
        product.name
      }" onclick="decrease(this)"><i>-</i></button>
    <td class="total">R${product.price * product.count},00</td>

    <td class="productlist"><button bake-name="${product.name}" bake-count="${
        product.count
      }" onclick="removeFromBasket(this)" id="remove"
        onclick="removeBake()">Remove</button></td>
  </tr>
</table>`;
    });

    /*This section will calculate and display the vat, coupon, delivery and overall total cost
    of the product purchased.*/
    productTable.innerHTML += `

<h1 id="ordersummary"><b>Your Order Summary<b></h1><br>
<div id="delivery">
  <h6><label>Choose a delivery method (required)</label></h6>
  <input class="radio" type="radio" name="deliveryinput" value="0">Collection (Free)<br/>
  <input class="radio" type="radio" name="deliveryinput" value="160"/>Same Day Delivery (R160.00)
</div><br>

<div id="label">
  <h6><label>Do you have a coupon? (enter desserts / tools / toppings)</label>
    <h6>
      <input id="discountinput" placeholder="Coupon code" <br />
</div><br>

<div id="vat">
  <label>VAT</label><br />
  <label>R</label>
  <input id="vattotal" value=${VAT(total).toFixed(2)}><br />
</div><br>

<div id="total">
  <label id="baskettotaltitle">TOTAL</label><br />
  <div class="totalcontainer">
    <label>R</label>
    <input id="baskettotal" value=${total}><br />
  </div><br>

  <div id="basketbuttons">
    <button id="update" type="button "onclick="updateBasketTotal()">Update</button>
    <button id="clear" type="button" onclick="clearOrder()">Clear</button>
    <button id="confirm" type="button" onclick="submitOrder()">Confirm Order</button>
  </div>`;
  }
}

BasketTable();

/*References:
(The knowledge I gained in tasks 12 and 13 were applied in the JS file of this Capstone Project.) 
1. Kuvashnee Naidoo. 2022. HyperionDev Task 12: JavaScript V. Retrieved 9 July 2022, from https://www.dropbox.com/sh/go99qpq9u5789ze/AADSOMcUp4zGEbdbSjGF8l7ia?dl=0
2. Kuvashnee Naidoo. 2022. HyperionDev Task 13: JavaScript VI. Retrieved 9 July 2022, from https://www.dropbox.com/sh/9k12jwquosx6ur3/AABN9I0TiS8sPAFLH6zxF8Jsa?dl=0
3. Section. 2021. How to Use Local Storage with JavaScript - by Michael Barasa. Retrieved 9 July 2022, from https://www.section.io/engineering-education/how-to-use-localstorage-with-javascript/
4. StackOverFlow. 2011. Questions - JavaScript, Generate a Random Number that is 9 numbers in length. Retrieved 9 July 2022, from stackoverflow.com/questions/3437133/javascript-generate-a-random-number-that-is-9-numbers-in-length
5. Telmo Sampaio. 2020. JavaScript Shopping Cart Tutorial - Part 1/5. Retrieved 8 July 2022, from https://youtu.be/B20Getj_Zk4
6. Telmo Sampaio. 2020. JavaScript Shopping Cart Tutorial - Part 2/5. Retrieved 8 July 2022, from https://youtu.be/PoTGs38DR9E
7. Telmo Sampaio. 2020. JavaScript Shopping Cart Tutorial - Part 3/5. Retrieved 8 July 2022, from https://youtu.be/tEAl7L62GEw
8. Telmo Sampaio. 2020. JavaScript Shopping Cart Tutorial - Part 4/5. Retrieved 8 July 2022, from https://youtu.be/QNXQfdgIXLw
9. Telmo Sampaio. 2020. JavaScript Shopping Cart Tutorial - Part 5/5. Retrieved 8 July 2022, from https://youtu.be/IY5UN82FZ2Q
10. W3Schools. n.d. jQuery Effects - Sliding. Retrieved 9 July 2022, from //www.w3schools.com/jquery/jquery_slide.asp
11. W3Schools. n.d. jQuery Effects - Animation. Retrieved 9 July 2022, from https://www.w3schools.com/jquery/jquery_animate.asp
12. Web Dev Simplified. 2019. JavaScript Shopping Cart Tutorial for Beginners. Retrieved 8 July 2022, from https://youtu.be/YeFzkC2awTM
*/
