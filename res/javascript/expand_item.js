var expand_buttons = document.getElementsByClassName("list_nav_item_wrapper_hidden");
for(let i = 0; i < expand_buttons.length; ++i){
    let obj = expand_buttons[i];
    obj.querySelector("span").onclick = () => {
        if(obj.getAttribute("class") == "list_nav_item_wrapper_hidden"){
            obj.setAttribute("class", "list_nav_item_wrapper");
        }else{
            obj.setAttribute("class", "list_nav_item_wrapper_hidden");
        }
    }
}