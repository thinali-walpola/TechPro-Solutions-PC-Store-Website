function myFunction() {

  let nav = document.getElementById("myTopnav");

  if (nav.className === "nav-links") {

    nav.className += " responsive";

  } else {

    nav.className = "nav-links";
  }
}



filterSelection("all");

function filterSelection(category) {

  let cards = document.getElementsByClassName("column");

  if (category == "all") {
    category = "";
  }

  for (let i = 0; i < cards.length; i++) {

    removeClass(cards[i], "show");

    if (cards[i].className.indexOf(category) > -1) {
      addClass(cards[i], "show");
    }
  }
}

function addClass(element, name) {

  let arr1 = element.className.split(" ");
  let arr2 = name.split(" ");

  for (let i = 0; i < arr2.length; i++) {

    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function removeClass(element, name) {

  let arr1 = element.className.split(" ");
  let arr2 = name.split(" ");

  for (let i = 0; i < arr2.length; i++) {

    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }

  element.className = arr1.join(" ");
}

/* ACTIVE BUTTON */

let btnContainer = document.getElementById("myBtnContainer");
let btns = btnContainer.getElementsByClassName("btn");

for (let i = 0; i < btns.length; i++) {

  btns[i].addEventListener("click", function () {

    let current =
      document.getElementsByClassName("active");

    current[0].className =
      current[0].className.replace(" active", "");

    this.className += " active";
  });
}