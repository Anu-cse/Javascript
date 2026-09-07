let favourites=[];
const input=document.getElementById("nameInput");
const addBtn=document.getElementById("addBtn");
const list=document.getElementById("list");
const clearBtn=document.getElementById("clearBtn");
const saved=localStorage.getItem("favourites");
favourites=saved ? JSON.parse(saved):[];
function render() {
    list.innerHTML = "";
    favourites.forEach(function(name) {
        list.innerHTML += "<li>" + name + "</li>";
    });
}
addBtn.addEventListener("click", function() {
    const name=input.value.trim();
    if (name==="") {
        return;
    }
    if (favourites.includes(name)) {
        return;
    }
    favourites.push(name);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    render();
    input.value= "";
});
clearBtn.addEventListener("click", function() {
    favourites=[];
    localStorage.removeItem("favourites");
    render();
});
render();