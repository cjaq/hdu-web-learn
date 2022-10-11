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

function load_list_content_from_server(){
    let url = './res/json/homepage.json';
    let request = new XMLHttpRequest();
    request.open('get', url);
    request.send(null);
    request.onload = () =>{
        if(request.status == 200){
            let data = JSON.parse(request.responseText);
            document.getElementsByClassName("list_nav flex-col")[0].appendChild(decode_list_item(data));
            attach_expand_func();
        }else{
            alert("读取数据时出错");
        }
    }
}
load_list_content_from_server();

document.getElementById("show_all").onclick = () => {
    let c = document.getElementsByClassName("list_nav");
    if(c.length > 0){
        c[0].setAttribute("class", "list_nav_mobile_show");
    }else{
        document.getElementsByClassName("list_nav_mobile_show")[0].setAttribute("class", "list_nav");
    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//json解码数据
function decode_content(data){
    for(let key in data){
        for(let i = 0; i < data[key].length; ++i){
            switch(data[key][i].type){
                case "text":
                    let p = document.createElement("p");
                    p.textContent = data[key][i].detail;
                    document.getElementById(key).appendChild(p);
                    break;
                case "code":
                    let div = document.createElement("div");
                    div.setAttribute("class", "code");
                    let pre = document.createElement("pre");
                    div.appendChild(pre);
                    pre.textContent = data[key][i].detail;
                    document.getElementById(key).appendChild(div);
                    break;
                case "img":
                    let img = document.createElement("img");
                    img.src = data[key][i].detail;
                    document.getElementById(key).appendChild(img);
                    break;
                case "formula":
                    let f = document.createElement("p");
                    f.setAttribute("class", "formula");
                    f.textContent = data[key][i].detail;
                    document.getElementById(key).appendChild(f);
                    break;
                case "table":
                    let table = document.createElement("table");
                    let row = data[key][i].row;
                    let col = data[key][i].col;
                    let j = 0;
                    while(j < row * col){
                        if(j % col == 0){
                            if(j != 0){
                                table.appendChild(tr);
                            }
                            tr = document.createElement("tr");
                        }
                        let td = document.createElement("td");
                        td.textContent = data[key][i].info[j];
                        tr.appendChild(td);
                        j++;
                    }
                    table.appendChild(tr);
                    document.getElementById(key).appendChild(table);
                    break;
            }
        }
    }
}


function type(ch){
    if(ch >= "0" && ch <= "9"){
        return 0;
    }
    if(ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch == "_"){
        return 1;
    }
    if(ch == '[' || ch == ']' || ch == ' ' || ch == ',' || ch == '.' || ch == '\n' || ch ==' ' || ch == '+' || ch == '-'
        || ch == '*' || ch == '/' || ch == '(' || ch == ')' || ch == '=' || ch =='\"' || ch == "\'" || ch == '{' || ch == '}'
        || ch == ':' || ch == '\\' || ch == '/'){
        return 2;
    }
}

/*
    词法分析器
    基于有限自动机
 */
function split_word(sentence){
    let state = 0;
    let index = 0;
    let buf = "";
    let words = [];
    while(index < sentence.length){
        switch(state){
            case 0:
                buf = sentence[index];
                switch(type(sentence[index])){
                    case 0:
                    case 1:
                        state = 1;
                        break;
                    case 2:
                        words.push(buf);
                        buf = "";
                        break;
                }
                break;
            case 1:
                switch(type(sentence[index])){
                    case 0:
                    case 1:
                        buf += sentence[index];
                        break;
                    case 2:
                        state = 0;
                        words.push(buf);
                        buf = "";
                        words.push(sentence[index]);
                        break;
                }
        }
        index++;
    }
    return words;
}

function isnumber(s){
    for(let i = 0; i < s.length; ++i){
        if(!(s[i] >= "0" && s[i] <= "9")){
            return false;
        }
    }
    return true;
}

function isident(s){
    return s.length > 1 || s.length == 1 && (s[0] >= "a" && s[0] <= "z" || s[0] >= "A" && s[0] <= "Z" || s[0] == "_");
}

//为代码赋予颜色
function attach_color_code(){
    let codes = document.querySelectorAll("pre");
    let keywords = ["import", "def", "class", "from", "return", "for", "in"];
    let reserve = ["enumerate", "print"]
    for(let i = 0; i < codes.length; ++i){
        let text = codes[i].textContent;
        codes[i].textContent = "";
        words = split_word(text);
        let buf = "";
        for(let j = 0; j < words.length; ++j){
            if(keywords.includes(words[j])){
                let span = document.createElement("span");
                span.textContent = buf;
                codes[i].appendChild(span);

                span = document.createElement("span");
                span.textContent = words[j];
                span.setAttribute("class", "keyword");
                codes[i].appendChild(span);
                buf = "";
            }else if(isnumber(words[j])){
                let span = document.createElement("span");
                span.textContent = buf;
                codes[i].appendChild(span);

                span = document.createElement("span");
                span.textContent = words[j];
                span.setAttribute("class", "number");
                codes[i].appendChild(span);
                buf = "";
            }else if(reserve.includes(words[j])){
                let span = document.createElement("span");
                span.textContent = buf;
                codes[i].appendChild(span);

                span = document.createElement("span");
                span.textContent = words[j];
                span.setAttribute("class", "reserve");
                codes[i].appendChild(span);
                buf = "";
            }else{
                buf += words[j];
            }
        }
        if(buf.length > 0){
            let span = document.createElement("span");
            span.textContent = buf;
            codes[i].appendChild(span);
        }
    }
}

function load_content_from_server(){
    let url = getQueryString("res");
    let request = new XMLHttpRequest();
    request.open('get', url);
    request.send(null);
    request.onload = () =>{
        if(request.status == 200){
            let data = JSON.parse(request.responseText);
            decode_content(data);
            attach_color_code();
        }else{
            alert("读取数据时出错");
        }
    }
}

load_content_from_server();