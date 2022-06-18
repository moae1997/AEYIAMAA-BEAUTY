const show_rev = document.querySelector("#show_rev");
const add_rev = document.querySelector("#add_rev");
const show = document.querySelector("#show");
const add = document.querySelector("#add");


show.addEventListener("click", e => {
    e.preventDefault();
    add_rev.classList.add("hide");
    show_rev.classList.remove("hide");
});
add.addEventListener("click", e => {
    e.preventDefault();
    add_rev.classList.remove("hide");
    show_rev.classList.add("hide");
});



