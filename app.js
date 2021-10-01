const buttons = document.querySelectorAll('.search-btn')
const storeItems = document.querySelectorAll('.store-item')

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    const filter = e.target.dataset.filter

    storeItems.forEach((item) => {
      if (filter === 'all') {
        item.style.display = 'block'
      } else {
        if (item.classList.contains(filter)) {
          item.style.display = 'block'
        } else {
          item.style.display = 'none'
        }
      }
    })
  })
})



let searchBox = document.querySelector('#search-item')
// let storeItems = document.querySelectorAll('.store-item')

searchBox.addEventListener('keyup', (e) => {
  e.preventDefault()
  const searchFilter = e.target.dataset.filter
  //display only items that contain filter input
  let a = searchBox.value
  storeItems.forEach((item) => {
    if (item.classList.contains(a)) {
      item.style.display = 'block'
    } else {
      item.style.display = 'none'
    }
  })
})



// const searchBox = document.querySelector('#search-item')

// searchBox.addEventListener('keyup', (e) => {

//     const searchFilter = e.target.value.toLowerCase().trim()
//     //display only items that contain filter input

//     storeItems.forEach((item) => {
//         if (item.classList.contains(searchFilter)){
//             item.style.display = 'block'
//         } else {
//             item.style.display = 'none'
//         }
//     })
// })




const modal_container = document.querySelector('.modal-container');
const close = document.getElementById('close');
let imgBG = document.querySelector('.bg-img');
const images = document.querySelectorAll('.store-img');
const modal = document.querySelector('.modal-1')


let imageList = [];

let imageCounter = 0;
images.forEach(function (image) {
  imageList.push(image.src);
})

images.forEach(function (item) {

  item.addEventListener('click', (e) => {
    let image = e.target.src;
    modal.style.backgroundImage = `url(${image})`;
    modal_container.classList.add('show');
    imageCounter = imageList.indexOf(image);

  });
  close.addEventListener('click', () => {
    modal_container.classList.remove('show');
  });
});


let btnLeft = document.querySelector('.prevBtn');
btnLeft.addEventListener('click', function () {
  imageCounter--;
  if (imageCounter < 0) {
    imageCounter = imageList.length - 1;
  }
  modal.style.backgroundImage = `url(${imageList[imageCounter]})`
});
//select left button from the DOM
let btnRight = document.querySelector('.nxtBtn');
btnRight.addEventListener('click', function () {
  imageCounter++;
  if (imageCounter >= imageList.length) {
    imageCounter = 0;
  }
  modal.style.backgroundImage = `url(${imageList[imageCounter]})`;
});




//cart

let modalBody = document.querySelector('.modal-body');
let cartItemBtn = document.querySelectorAll('.cart-item-btn');

cartItemBtn.forEach(function (btn) {
  btn.addEventListener('click', function (event) {
    if (event.target.parentElement.classList.contains('cart-item-btn')) {
      let fullPath = event.target.parentElement.parentElement.previousElementSibling.src;
      console.log(fullPath)
      let item = {};
      item.img = fullPath;
      let name = event.target.parentElement.previousElementSibling.previousElementSibling.textContent;
      console.log(name);
      item.name = name;
      let price = event.target.parentElement.previousElementSibling.children[1].textContent;
      console.log(price)
      item.price = price;
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item', 'd-flix', 'justify-content-between', 'text-capitalize', 'my-3');

      cartItem.innerHTML = `<div class="cart-item d-flex justify-content-between text-capitalize my-3">
                               <img src="${item.img}" class="img-fluid rounded-circle" style="width: 50px;" id="item-img" alt="">
                               <div class="item-text">
                                 <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                                 <span>$</span>
                                 <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                               </div>
                               <a href="#" id='cart-item-remove' class="cart-item-remove"><i class="fas fa-trash"></i></a>
                            </div>`;
                            

modalBody.appendChild(cartItem);



const cart = document.getElementById('cart');
const total = document.querySelector('.cart-total-container');

// cart.insertBefore(cartItem, total);
alert('item added to the cart');

showTotals();
    }
  })
})

function showTotals(){

  const total = [];
  const items = document.querySelectorAll('.cart-item-price');
  items.forEach(function(item){
      total.push(parseFloat(item.textContent));
  })
  
  const totalMoney = total.reduce(function(total, item){
      total += item;
      return total;
  },0);

  const finalMoney = totalMoney.toFixed(2);
  
  document.getElementById('cart-total').textContent = finalMoney;
  // document.querySelector('.item-total').textContent = finalMoney;
  //document.getElementById('item-count').textContent = total.length;
}

modalBody.addEventListener('click', deleteCheck);
function deleteCheck(e){
  
  const item = e.target;
  // delete cat item
  if (item.parentElement.classList[0] === "cart-item-remove"){
      const todo = item.parentElement.parentElement;
      todo.remove();
      showTotals();
  }
}
