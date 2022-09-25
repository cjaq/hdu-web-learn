/* 解析data数据 */
/* data -> {'item' : [{'url': string, 'img': url, 'title': string, 'describe': string} ...]} */
function create_html_objs_in_main(data){
    let main_wrapper = document.createElement("div");
    main_wrapper.setAttribute("class", "content_wrapper");
    for(let key in data){
        let item_wrapper = document.createElement("div");
        let title = document.createElement("h2");
        let wrapper = document.createElement("div")
        item_wrapper.setAttribute("class", "main_items_wrapper");
        title.textContent = key;
        wrapper.setAttribute("class", "flex-d flex-wrap");
        item_wrapper.appendChild(title);
        for(let i = 0; i < data[key].length; ++i){
            let a = document.createElement("a");
            a.href = data[key][i]["url"];
            a.setAttribute("class", "flex-d flex-row");
            let img = document.createElement("img");
            img.src = data[key][i]['img'];
            let des = document.createElement("div");
            des.setAttribute("class", "flex-d flex-col");
            let mTitle = document.createElement("h4");
            mTitle.textContent = data[key][i]["title"];
            let describe = document.createElement("p");
            describe.textContent = data[key][i]["describe"];
            des.appendChild(mTitle);
            des.appendChild(describe);
            a.appendChild(img);
            a.appendChild(des);
            wrapper.appendChild(a);
        }
        item_wrapper.appendChild(wrapper);
        main_wrapper.appendChild(item_wrapper);
    }
    return main_wrapper;
}

function load_content_from_server(){
    let url = './res/json/homepage.json';
    let request = new XMLHttpRequest();
    request.open('get', url);
    request.send(null);
    request.onload = () =>{
        if(request.status == 200){
            let data = JSON.parse(request.responseText);
            document.getElementsByClassName("main_body")[0].appendChild(create_html_objs_in_main(data));
        }else{
            alert("读取数据时出错");
        }
    }
}

load_content_from_server();