/* 解析data数据 */
/* data -> {'item' : [{'url': string, 'img': url, 'title': string, 'describe': string} ...]} */
function create_html_objs_in_main(data){

    //创建localstorage中用户新建的网页
    let page_count = localStorage.getItem("page-count")
    if(page_count != null){
        page_count = parseInt(page_count);
        data["用户自定义"] = [];
        for(let i = 0; i < page_count; ++i){
            data["用户自定义"].push({'url': './detail.html?res=localstorage&index=' + (i + 1).toString(), 
            'title': localStorage.getItem("title" + (i + 1).toString()),
            'img': 'res/images/logo.jpg' });
        }
    }

    let main_wrapper = document.createElement("div");
    main_wrapper.setAttribute("class", "content_wrapper");
    //创建所有预定义的json文件对应的首页内容
    for(let key in data){
        let item_wrapper = document.createElement("div");
        let title = document.createElement("h1");
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
            let mTitle = document.createElement("h2");
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
            document.getElementById("main_body").appendChild(create_html_objs_in_main(data));
        }else{
            alert("读取数据时出错");
        }
    }
}

window.onload = ()=>{
    //如果不存在本地存储，产生一个默认的数据
    if(localStorage.getItem('page-count') == null || localStorage.getItem('page-count') == '0'){
        localStorage.setItem('page-count', '1');
        let request = new XMLHttpRequest();
        request.open('get', 'res/json/cnn.json');
        request.send(null);
        request.onload = () =>{
            if(request.status == 200){
                let data = JSON.parse(request.responseText);
                localStorage.setItem('preview-content1', JSON.stringify(data));
                localStorage.setItem('title1', data.basic_info[0].detail);     
                load_content_from_server();      
            }else{
                alert("读取数据时出错");
            }   
        }  
    }else{
        load_content_from_server();
    }
    document.getElementById("add_icon").onclick = ()=>{
        location.href = '/form.html#/';
    }
}
