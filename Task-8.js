
const prompt = require('prompt-sync')();

const person = {
  name: '',
  email: '',
  phone: '',
 }

 const delivery = {
     delivery_price: 10,
     from: "15, Soroky street",
     to: '',
 }


 const order = {
     ...person,
     ...delivery,
     dishes: [],
     finalPrice: '',
     status: 'Procesing', 
   };


   chooseProduct();
function chooseProduct() {
  let enterAs;

  do {
    enterAs = prompt('Chose 1 - User, 2 - Admin, 3 - Close program: ');

    if (enterAs === '1') {
      Usermain();
    } 
    if (enterAs === '2') {
      adminMain();
    } 
    if (enterAs === '3') {
      console.log('Do widzenia');
    } 
  } while (enterAs !== '3');
}




  function Usermain() {
const menu = [
    {
        ID: '1',
        title:'Box-1',
        price: 70,
        category: 'Boxes',
        descriprion: ['Bracelet', 'Pen', 'cup']
    },
    {
        ID: '2',
        title:'Box-2',
        price: 90,
        category: 'Boxes',
        ingredients: ['T-shirt', 'hearphones', 'Power-bank', 'knife']
    },
    {
        ID: '3',
        title:'Box-3',
        price: 110,
        category: 'Boxes',
        ingredients: ['laser', 'binoculars', 'charger', 'tripod']
    },{
        ID: '4',
        title:'Box-4(Vip)',
        price: 200,
        category: 'Vip-Box',
        ingredients: ['laptop', 'guitar', 'backpack', 'flash drive', 'tuner']
    },
    {
        ID: '5',
        title:'Box-5(Vip)',
        price: 350,
        category: 'Vip-Boxes',
        ingredients: ['PC', 'laptop', 'phone', 'hearphones', 'mystery-box',]
    },
    {
        ID: '6',
        title:'Box-6(Vip)',
        price: 500,
        category: 'Vip-Boxes',
        ingredients: ['mystery-box (30 kg)']
    }
]
for (const item of menu) {
    console.log(`ID: ${item.ID}`);
    console.log(`Title: ${item.title}`);
    console.log(`Price: ${item.price}`);
    console.log(`Category: ${item.category}`);
    console.log(`Ingredients: ${item.ingredients.join(', ')}`);
    console.log('\n'); 
  }

  function chooseDishes() {
    let userInputdish;
    let words;
    let anotherOrder = '1';
    do {
      userInputdish = prompt('Select the box you want to order, if you want to order several different ones, enter the ID with a space, if you want to order several of the same, enter the ID more than 1 time.  ');
      words = userInputdish.split(' ');

      for (const word of words) {
        let found = false;

        for (const item of menu) {
          if (item.ID === word) {
            console.log(`You ordered${item.title}`);
            order.dishes.push(item);
            found = true;
          }
        }

        if (!found) {
          console.log(`Error: Product with ID ${word} not found in the menu.`);
        }
      }
      anotherOrder = prompt('Do you want to add more products to the order? Enter 1 -- if yes or 2 -- if no');
    } while (anotherOrder === '1');
  }

  function enterPersonalInfo() {
    const userInputName = prompt("Enter your last name and first name with a space: ");
    const userInputemail = prompt("Enter your email: ");
    const userInputadress = prompt("Enter your shipping address: ");

    const [lastName, firstName] = userInputName.split(' ');
    person.name = `${firstName} ${lastName}`;
    person.email = userInputemail;
    delivery.to = userInputadress;
    let userInputNumber;
    do {
      userInputNumber = prompt("Enter your phone number (format +38...)");
    } while (userInputNumber.length !== 13 || userInputNumber[0] !== '+');

    person.phone = userInputNumber;
    Object.assign(order, person, delivery);
  }

  function pricecalculator(){
    let totalcost = 0
    for (const dish of order.dishes){
      totalcost += dish.price;
    }
    order.price = totalcost + delivery.delivery_price;
  }

  chooseDishes();
  enterPersonalInfo();
  pricecalculator()
  showOrderSummary();

}

function showOrderSummary(){
  console.log("\nYour surname and first name: " + order.name);
  console.log("Your e-mail: " + order.email);
  console.log("Your number: " + order.phone);
  console.log("Shipping address: " + order.from);
  console.log("Your shipping address: " + order.to);

  console.log("Your order:");
  for (const dish of order.dishes) {
    console.log(`Name: ${dish.title}`);
  }

  console.log('Order price:' + order.price);
  console.log("Order status: " + order.status);
}
function adminMain(){

  function appealToAdministrator(){
    let chooseaction;

    do {
      chooseaction = prompt('If you want to view the order, click -- 1, if you want to change the status of the order -- 2, if you want to exit the administrator role -- 3:');

      if (chooseaction == '1') {
        showOrderSummary();
      } 
      if (chooseaction == '2') {
        changeOrderStatus();
      }
    } while (chooseaction !== '3' );

  }

  function changeOrderStatus() {
    const newStatus = prompt("Update the order status: 1 -- order in processing, 2 -- order on the way, 3 -- order delivered, 4 -- looks like something went wrong, \n5 -- don't change anything:");

 do{
    if (newStatus == '1') {
      order.status = 'the order is being prepared';
    }
    if (newStatus == '2') {
      order.status = 'order on the way';
    }
    if (newStatus == '3') {
      order.status = 'the order has been delivered';
    }
    if (newStatus == '4') {
      order.status = 'something seems to have gone wrong there';
    }
  } while (newStatus !== '5');
  console.log('The current status of the order for:' + order.status);

}
appealToAdministrator()
}