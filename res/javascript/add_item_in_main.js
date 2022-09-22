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

data = {'数学基础': [
                    {
                        'url': 'detail.html?resource_url=./res/html/MNIST.html',
                        'img': 'res/images/logo.jpg',
                        'title': '梯度下降',
                        'describe': '梯度下降是神经网络的基础'
                    }, 
                    {
                        'url': 'detail.html',
                        'img': 'res/images/logo.jpg',
                        'title': '导数和偏导数',
                        'describe': '求导是数学优化的基础'
                    }
                ],
        'python基础': [
                    {
                        'url': 'detail.html',
                        'img': 'res/images/logo.jpg',
                        'title': 'python语法',
                        'describe': '学习一门语言的语法是最基础的'
                    }, 
                    {
                        'url': 'detail.html',
                        'img': 'res/images/logo.jpg',
                        'title': '使用numpy',
                        'describe': 'numpy是高度优化的python科学运算库'
                    }
                ]
            };