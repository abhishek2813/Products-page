//chceking user if not exit then redrict to login page
var currentitem = JSON.parse(localStorage.getItem("currentUser")); // getting curent Item Obj
if (!currentitem) {
    window.location.href = "../login.html";
}
let cartData = JSON.parse(localStorage.getItem('cart')) || [];
async function main() {
  let apiUrl = "https://fakestoreapi.com/products"
  async function getProducts(url) {
      let response = await fetch(url);
      let data = await response.json()
      return data;
  }
  updatedData = await getProducts(apiUrl)
  // console.log(jsondata);
  let data1 = "";
 
 const proData= updatedData.map((values) => {
    var size =["S","M","L","XL"];
    var colours =["Red","Blue","Black","White","Green"];
    const randomColor = colours[Math.floor(Math.random() * colours.length)];
    const randomSize = size[Math.floor(Math.random() * size.length)];
    return { ...values, colours: randomColor, size: randomSize ,Abhi:2};
  })
  // Store the updated data in local storage
  localStorage.setItem("products", JSON.stringify(proData));
  
 // Getting the value of Updated Products
 var products = JSON.parse(localStorage.getItem("products"));
 products.map((value)=>{

    var classNameCat ="";
    if(value.category=="men's clothing"){
      classNameCat ="mens";
    }else if(value.category=="women's clothing"){
      classNameCat ="womens";
    }else if(value.category=="jewelery"){
      classNameCat ="jewelery";
    }else if(value.category=="electronics"){
      classNameCat ="electronics";
    }
      //Showing Menu of Burgers
      data1 += `<div class="col-lg-4 col-md-12 mb-4 ${classNameCat} item">
      <div class="card">
        <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
          data-mdb-ripple-color="light">
          <img src="${value.image}"
            class="card-img-top" />
            <div class="hover-overlay">
              <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </div>
        </div>
        <div class="card-body">
            <h5 class="card-title mb-3">${value.title}</h5>
           
            <div class="row">
              <div class="col-8">
                <p><b>Category </b>${value.category}</p>
              </div>
              <div class="col-4">
                <p><b>Colour</b>  ${value.colours}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p><b>Size </b>${value.size}</p>
              </div>
              <div class="col-6">
                <p><b>Rating </b>${value.rating.rate}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p><b>Stock </b>${value.rating.count}</p>
              </div>
              <div class="col-6">
                <h6 class="mb-3"><b>Price </b>$${value.price}</h6>
              </div>
            </div>
        </div>
        <div class="card-footer">
          <div class="row">
            <button class="btn btn-dark add-to-cart-button" data-id="${value.id}" type="submit">Add cart</button>
          </div>
        </div>
      </div>
    </div>`;
  })
  
  document.getElementById("items").innerHTML = data1;
 
  
  async function addCart(){
   
    // Get all the "Add to Cart" buttons on the page
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        console.log("clicked");
        const id = button.getAttribute('data-id');
        addToCart(id);
      });
    });
  }
  // Add a product to the cart
  function addToCart(id) {
    // Check if the item is already in the cart
    const itemIndex = cartData.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      // If the item is not in the cart, add it with a quantity of 1
      const item = {
        id: id,
        quantity: 1
      };
      cartData.push(item);
    } else {
      // If the item is already in the cart, increase its quantity by 1
      cartData[itemIndex].quantity++;
    }
    // Save the cart data to local storage
    localStorage.setItem('cart', JSON.stringify(cartData));
  }
  
  addCart(); 
}


  async function filterproduct(value) {
 
    var buttons = document.querySelectorAll(".filter");
    buttons.forEach((button)=>{
      if(value.toUpperCase()==button.innerText.toUpperCase()){
        button.classList.add("active");
      }else{
        button.classList.remove("active");
      }
    });
  
  var elements = document.querySelectorAll(".item");
  // console.log(elements.length)
    elements.forEach((element)=>{
    if(value=="All"){
      element.classList.remove("hide");
    }else{
      if(element.classList.contains(value)){
        element.classList.remove("hide")
      }else{
        element.classList.add("hide")
      }
    }
  })
  }
  
  async function searchFilter() {
   await main()
    let input = document.getElementById('filterserach').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('card-title');
    var elements = document.querySelectorAll(".item");
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerText.toLowerCase().includes(input)) {
          elements[i].style.display="none";
        }
        else {
          elements[i].style.display="intial";
           elements[i].classList.remove("hide")           
        }
    }
  }
  

  
  


//filter


// Call the addCart function to add the event listener

window.onload =async ()=>{
   await main();
  filterproduct("All");
}