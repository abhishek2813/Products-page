//Sign up Page

//chceking if user already exit then redirect to shop page..
var currentitem = JSON.parse(localStorage.getItem("currentUser")); // getting curent Item Obj
if (currentitem) {
    window.location.href = "shop/";
}
// gettting user array opr set new array null;
const users = JSON.parse(localStorage.getItem('users')) || [];

const form = document.getElementById('signup-form'); // getting form name
const errorMsg = document.getElementById('error-msg'); // set display error message
// set form submit event
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // getting all inputs from sign Up form
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const password = form.elements['password'].value;
    const confirmPassword = form.elements['confirm-password'].value;
    // validtion
    if (!name) {
        errorMsg.textContent = 'Name cannot be empty.';
        return;
    }

    if (!email || !isValidEmail(email)) {
        errorMsg.textContent = 'Please enter a valid email address.';
        return;
    }

    if (!password) {
        errorMsg.textContent = 'Password cannot be empty';
        return;
    }
    if (password !== confirmPassword) {
        errorMsg.textContent = 'Passwords do not match.';
        return;
    }
    // new user object 
    const user = {
        name,
        email,
        password
    };
    users.push(user);
    //set to local straoge
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = 'login.html';
});
// email validtion
function isValidEmail(email) {
    // A basic email validation using a regular expression
    return /\S+@\S+\.\S+/.test(email);
}