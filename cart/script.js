//Cart page 

//chceking user if not exit then redrict to login page
var currentitem = JSON.parse(localStorage.getItem("currentUser")); // getting curent Item Obj
if (!currentitem) {
    window.location.href = "../login.html";
}
