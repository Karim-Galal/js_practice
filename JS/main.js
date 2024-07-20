//         ===>==>> Local Storage  <<==<=== 
// ==> colors in local storage
let storageColor = localStorage.getItem("opted_color");

let background_option = true;

let background_storage = localStorage.getItem("background_option");

if (background_storage != null) {

  let Yes_NO = document.querySelectorAll(".change-back span");

  Yes_NO.forEach((ele) => {
    ele.classList.remove("active");
  })

  if (background_storage === "yes") {
    background_option = true;
    Yes_NO[0].classList.add("active");
  }
  else { 
    background_option = false;
    Yes_NO[1].classList.add("active");
  }

}

if (storageColor !== null) {
  document.documentElement.style.setProperty("--main-color", storageColor);

  // > add  active class to stored
  
  document.querySelectorAll(".color-list li").forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === storageColor) {
      li.classList.add("active");
    }
  })

}


// Toggle spin on icon
let open_gear = document.querySelector(".gear").onclick = function () {
  let settings = document.querySelector(".settings-box");
  this.classList.toggle("fa-spin");
  settings.classList.toggle("open");
}
// Change Colors

const colorsLi = document.querySelectorAll(".color-list li");

colorsLi.forEach( (li) => {
  li.addEventListener("click", (event) => {
    console.log(event.target.dataset.color);
    document.documentElement.style.setProperty("--main-color",event.target.dataset.color);
    
    // set item in local storage 

    localStorage.setItem("opted_color", event.target.dataset.color);

    colorsLi.forEach((li) => {
      li.classList.remove("active");
    })
    let actLi = li.classList.add("active");
  })
})

// => => Changing background option 


// Select Landing page element 
let Landing = document.querySelector(".landing");

// Create the array of selected imgs
// ==>  we can name the entire path of img or just name or name with extension 
let landing_imgs = ["landing_02.jpg","landing_01.jpg", "landing_03.jfif", "landing_04.jfif", "landing_05.jfif"];

// Change landing background img url 
// Landing.style.cssText = `background-image: url("${landing_imgs[1]}")`;
Landing.style.cssText = `background-image: url("imgs/landing_01.jpg")`;

// let background_option = true;

const background_switch = document.querySelectorAll(".change-back span");


background_switch.forEach( (span) => {
  span.addEventListener("click", (event) => {
    let choise = event.target.dataset.background;

    localStorage.setItem("background_option", choise);

    if (choise === "yes") {
      background_option = true;
      randomize_imgs();
    }
    else {
      clearInterval(background_intervel);
      background_option = false;
      // localStorage.setItem("background_option", choise)
    }

    background_switch.forEach((span) => {
      span.classList.remove("active");
    })
    let actLi = span.classList.add("active");
  })
})



/// Bullets Storage

let bullets_switch = document.querySelectorAll(".bullet-control span");

let bulletContainer = document.querySelector(".nav-bullets");

let bullet_storage = localStorage.getItem("bullet_display");

if(bullet_storage != null) {

  bullets_switch.forEach(bul => {
    bul.classList.remove("active")
  })


    
    if (bullet_storage === "show") {
      bulletContainer.style.display = "block";
      document.querySelector(".bullet-control .yes").classList.add("active");
    }
    else {
      bulletContainer.style.display = "none";
      document.querySelector(".bullet-control .no").classList.add("active");
    }

}


// The Display of Bullets 

bullets_switch.forEach( (bullet) => {

  bullet.addEventListener("click", (eve)=> {

    bullets_switch.forEach(span => {
      span.classList.remove("active")
    })

    localStorage.setItem("bullet_display", eve.target.dataset.show);

    console.log(`======>>> ${bullet_storage}`)
    
    if (bullet.dataset.show === "show") {
      
      bullet.classList.add("active");
  
      bulletContainer.style.display = "block";

    }
    else {
        bullet.classList.add("active");
    
        bulletContainer.style.display = "none";

      }
    })
  })


let background_intervel;
// Change background by time
// background_option = false;
function randomize_imgs () {

  if (background_option === true) {

    background_intervel = setInterval(() => {
      // Get a random number 
      let randNum = Math.floor(Math.random() * landing_imgs.length);
      
      Landing.style.cssText = `background-image: url("imgs/${landing_imgs[randNum]}")`;
      
    }, 7000);
  }
}
randomize_imgs();

// Select our skills selector 
let ourskills = document.querySelector(".our-skills");
console.log(ourskills);

window.onscroll = function () {
  // offset top 
  let skillsOffsetTop = ourskills.offsetTop;
  // outer height >> returns the height of ourskills section
  let skillsOffsetHeight = ourskills.offsetHeight;

  // widow height 
  let windowHeight = window.innerHeight;

  if ( window.scrollY > ( ourskills.offsetTop + skillsOffsetHeight - windowHeight  ) ) {
    
    let skills = document.querySelectorAll(".our-skills .prog span");

    skills.forEach((skill) => {
      skill.style.width = skill.dataset.prog;
    })
  }
}

// ==> >> ==>> Gallery Popup img  <<== << <==

let gallerImgs = document.querySelectorAll(".our-gallery img");

let imgsArr = [];

for (let i = 0 ; i < gallerImgs.length; i++) {
  imgsArr.push(gallerImgs[i].src);
}

gallerImgs.forEach((img) => {
  img.addEventListener("click", (eve) =>{
    
    // creating element with overlay class over the body 
    let overlay = document.createElement("div");

    overlay.classList.add("popup-overlay");

    document.body.appendChild(overlay);
    
    // Creating popup box 
    let popup_box = document.createElement("div");
    
    popup_box.className = "popup-box";
    
    document.body.appendChild(popup_box);
    
    // creating img inside popup-box 

    let popupImg = document.createElement("img");

    popupImg.src = img.src;

    // console.log(popupImg);
    
    popup_box.appendChild(popupImg);

    // Adding img heading if any 
    if (img.alt != null) {

      // create a heading element 
      imgH = document.createElement("h3");

      imgText = document.createTextNode(img.alt);

      imgH.appendChild(imgText)

      popup_box.prepend(imgH);

    }

    // Create the Close button
    let close = document.createElement("div");

    close.appendChild(document.createTextNode("x"));

    close.className = "closing-button rad-half";

    popup_box.appendChild(close);

    // close on click 

    close.onclick = function () {
      popup_box.style.display = "none";
      overlay.style.display = "none";
    }
    overlay.onclick = function () {
      popup_box.style.display = "none";
      overlay.style.display = "none";
    }

    // shifting between imgs

    nextIcon = document.createElement("span");
    prevIcon = document.createElement("span");

    nextIcon.className = "next"
    prevIcon.className = "prev"

    popup_box.appendChild(nextIcon);
    popup_box.appendChild(prevIcon);

    nextIcon.onclick = function () {

      if (imgsArr.indexOf(popupImg.src) < gallerImgs.length -1 ) {
        
        let nextImg = imgsArr[imgsArr.indexOf(popupImg.src) + 1];

        popupImg.src = nextImg;
        
      }
      else if (imgsArr.indexOf(popupImg.src) <= gallerImgs.length ) {
        
        popupImg.src = imgsArr[0];
      }
    }
    prevIcon.onclick = function () {

      if (imgsArr.indexOf(popupImg.src) > 0 ) {
        
        let nextImg = imgsArr[imgsArr.indexOf(popupImg.src) - 1];

        popupImg.src = nextImg;
      }
    }
  })
})

//      ===>> >> Nav Bullets << <<===

let bullets = document.querySelectorAll(".nav-bullets .bullet");

bullets.forEach( (bul) => {
  bul.addEventListener("click", (e) => {

    document.querySelector(e.target.dataset.section).scrollIntoView(true);

  })
})

//  >>>>>>>>>>> Reset All Options <<<<<<<<<<<<<<

let reset_btn = document.querySelector(".reset-btn");

reset_btn.onclick = () => {

  // localStorage.clear();
  localStorage.removeItem("opted_color")
  localStorage.removeItem("background_option")
  localStorage.removeItem("bullet_display")

  // widnow.location.reload();
  window.location.reload();
}
/////
// document.onclick = () => {

//   if (menu_btn.classList.contains("open-menu")) {
//     console.log("from outside")
    
//       console.log("here I'm");
//     }
//   }
/////
let toggle_button = document.querySelector(".toggle-menu");


let menu_btn = document.querySelector(".header-area ul"); 

toggle_button.onclick = (ele) => {

  menu_btn.classList.toggle("open-menu");
  
}

document.addEventListener("click",(eve) => {
  
  if(eve.target != menu_btn && eve.target != toggle_button  && ( menu_btn.classList.contains("open-menu") ) ) {
    
    menu_btn.classList.remove("open-menu");
  }

});
// stoping propagation on links in li 
menu_btn.onclick = (ele) => {
  ele.stopPropagation();
}

