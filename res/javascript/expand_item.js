/* 解析data数据 */
/* data -> {'item' : [{'url': string, 'title': string} ...]} */
function decode_list_item(data){
    let list_nav_viewer = document.createElement("ul");
    list_nav_viewer.setAttribute("class", "list_nav_viewer");
    for(let key in data){
        let tmp_li = document.createElement("li");
        let list_nav_item_wrapper = document.createElement("div");
        list_nav_item_wrapper.setAttribute("class", "list_nav_item_wrapper_hidden");
        tmp_li.appendChild(list_nav_item_wrapper);
        let tmp_span = document.createElement("span");
        tmp_span.textContent = key;
        list_nav_item_wrapper.appendChild(tmp_span);
        list_nav_viewer.appendChild(tmp_li);

        let list_nav_item_detail = document.createElement("ul");
        list_nav_item_detail.setAttribute("class", "list_nav_item_detail");
        for(let i = 0; i < data[key].length; ++i){
            let _tmp_li = document.createElement("li");
            let a = document.createElement("a");
            _tmp_li.appendChild(a);
            a.textContent = data[key][i]['title'];
            a.href = data[key][i]['url'];
            list_nav_item_detail.appendChild(_tmp_li);
        }

        list_nav_item_wrapper.appendChild(list_nav_item_detail);
    }
    return list_nav_viewer;
}

/*
    为每一个列表赋予相应的展开函数
 */
function attach_expand_func(){
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
}

function load_content_from_server(){
    let url = './res/json/homepage.json';
    let request = new XMLHttpRequest();
    request.open('get', url);
    request.send(null);
    request.onload = () =>{
        if(request.status == 200){
            let data = JSON.parse(request.responseText);
            document.getElementsByClassName("list_nav flex-d flex-col")[0].appendChild(decode_list_item(data));
            attach_expand_func();
        }else{
            alert("读取数据时出错");
        }
    }
}


let nickname = document.getElementById("form_nickname");
let checkbox = document.getElementById("form_checkbox");
checkbox.onclick = () => {
    if(checkbox.checked){
        nickname.disabled = true;
    }else{
        nickname.disabled = false;
    }
}
console.log(checkbox);
load_content_from_server();