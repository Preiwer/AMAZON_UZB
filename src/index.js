import "bootstrap";
import "./index.html";
import "./index.scss";
import { list, parse } from "postcss";

import code1 from "./images/img-1.jpg";
import code2 from "./images/img-2.jpg";
import code3 from "./images/img-3.jpg";
import code4 from "./images/img-4.jpg";
import code5 from "./images/img-5.png";
import code6 from "./images/img-6.png";
import code9 from "./images/img-9.png";
import code10 from "./images/img-10.png";
import code11 from "./images/img-11.png";
import code12 from "./images/img-12.png";
import { render } from "sass";

let shopItemsData = [
  {
    id: "jfhgbvnscs",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-1.jpg",
  },
  {
    id: "ioytrhndcv",
    name: "Office Shirt",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg",
  },
  {
    id: "wuefbncxbsn",
    name: "T Shirt",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-3.jpg",
  },
  {
    id: "thyfhcbcv",
    name: "Mens Suit",
    price: 300,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-4.jpg",
  },
  {
    id: "thiecbawdjksadjk",
    name: "Mens Tie",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-5.png",
  },
  {
    id: "iuertrywebncdjksadjk",
    name: "Casual shoes",
    price: 200,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-6.png",
  },
  {
    id: "thierytbvcbvzdhadjk",
    name: "black suit",
    price: 450,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-7.png",
  },
  {
    id: "trfoiwfcnbcawdjksadjk",
    name: "polo shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-8.png",
  },
  {
    id: "cbvxbcvsceldk",
    name: "denim shirt",
    price: 85,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-9.png",
  },
  {
    id: "oiopijmjkhuihb",
    name: "denim pants",
    price: 120,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-10.png",
  },
  {
    id: "oiopijewyiohbjhib",
    name: "basic cap",
    price: 35,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-11.png",
  },
  {
    id: "rtytytuyuytyytbvncv",
    name: "leather boots",
    price: 350,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-12.png",
  },
];

const search_btn = document.querySelector("#search_btn");
const search_txt = document.querySelector("#search");

const basket = document.querySelector(".cardbtn_container");
const count = document.querySelector(".count");

const dial = document.querySelector(".dialog");
const dial_list = document.querySelector(".dialog .box .content");
const dial_close = document.querySelector(".close");
const dial_total = document.querySelector(".dialog .total");
const total_price = document.querySelector(".total_price");

const card_container = document.querySelector("#card_container");

const lists = [];
let data = shopItemsData;

basket.addEventListener("click", (e) => {
  dial.classList.toggle("active");
});

dial_close.addEventListener("click", (e) => {
  dial.classList.toggle("active");
});

function renderCards() {
  data = shopItemsData.filter((elem) => elem.name.includes(search_txt.value));
  data.forEach((item) => {
    card_container.innerHTML += `<div class='card' style='width: 18rem;'> <div class='card-body'> <h4>${item.name}</h4> <hr> <img src='${item.img}' alt='${item.name}'> <small class='card-text'>${item.desc}</small> <hr> <div class='card-bott'> <h4 class='prices'>${item.price}</h4> <div class="indic"> <button class='plus'>➕</button> <p class='num'>0</p> <button class='minus'>➖</button> </div> </div> </div> </div>`;
  });
  const updateCart = () => {
    count.innerHTML = lists.length;

    dial_list.innerHTML = "";
    for (let i = 0; i < lists.length; i++) {
      dial_list.innerHTML += `
      <div class="item">
        <p>${lists[i][1]}</p>
        <p>$${lists[i][2]}</p>
        <button id='del' data-index='${i}'>❎</button>
      </div>
    `;
    }

    if (lists.length == 0) {
      dial_list.innerHTML =
        "<h2 class='emptbusk' style='font-weight:900'>Basket is empty</h2>";
    }

    // calculateTotalPrice();
  };

  const plus = document.querySelectorAll(".plus");
  const minus = document.querySelectorAll(".minus");
  const num = document.querySelectorAll(".num");

  function calculateTotalPrice() {
    let total = 0;
  
    for (let i = 0; i < lists.length; i++) {
      total += lists[i][2];
    }
  
    dial_total.innerHTML = `$ ${total}`;
  }
  document.addEventListener("click", (e) => {
    if (e.target.id == "del") {
      let index = e.target.dataset.index;
      lists.splice(index, 1);
      console.log(lists);
      console.log(num);
  
      num[index].innerHTML = 0;

  
      count.innerHTML = parseInt(count.innerHTML) - 1;
      updateCart();
      calculateTotalPrice()
    }
  }); 
  plus.forEach((elm, index) => {
    elm.addEventListener("click", () => {
      let itemExists = false;

      for (let i = 0; i < lists.length; i++) {
        if (lists[i][0] == index) {
          lists[i][2] += data[index].price;
          itemExists = true;
          break;
        }
      }

      if (!itemExists) {
        lists.push([index, data[index].name, data[index].price]);
      }
      console.log(lists);
      num[index].innerHTML = parseInt(num[index].innerHTML) + 1;
      updateCart();
      calculateTotalPrice()
    });
  });

  minus.forEach((el, index) => {
    el.addEventListener("click", () => {
      if (parseInt(num[index].innerHTML) !== 0) {
        num[index].innerHTML = parseInt(num[index].innerText) - 1;
        for (let i = 0; i < lists.length; i++) {
          if (lists[i][0] == index) {
            if (lists[i][2] > data[index].price) {
              lists[i][2] -= data[index].price;
              calculateTotalPrice()
            } else {
              lists.splice(i, 1);
              updateCart();
              calculateTotalPrice()
            }
            break;
          }
        }
      }
    });
  });
}

renderCards();

search_btn.addEventListener("click", (e) => {
  card_container.innerHTML = "";
  renderCards();
});
