function create_fieldset_with_class_and_childs(describe, className, childs, father){
    let fieldset = document.createElement("fieldset");
    let legend = document.createElement("legend");
    legend.textContent = describe;
    fieldset.appendChild(legend);
    fieldset.setAttribute("class", className);
    for(let i = 0; i < childs.length; ++i){
        fieldset.appendChild(childs[i]);
    }
    let button = document.createElement("button");
    button.type = "button";
    button.textContent = "移除";
    button.onclick = () => {
        father.removeChild(fieldset);
    }
    fieldset.appendChild(button);
    return fieldset;
}

function create_table_with_textarea(row, col, row_title, col_title){
    let table = document.createElement("table");
    for(let i = 0; i < row + 2; ++i){
        let tr = document.createElement("tr");
        for(let j = 0; j < col + 2; ++j){
            let td = document.createElement("td");
            if(i == 0 && j == 0 || i == row + 1 || j == col + 1){
                //最后一列
                if(i == row + 1 && j != col + 1 && j != 0){
                    let button = document.createElement("button");
                    button.textContent = "删除列";
                    button.setAttribute("type", "button");
                    button.onclick = () => {
                        let trs =  table.querySelectorAll("tr");
                        for(var t = 0; t < trs.length; ++t){
                            trs[t].removeChild(trs[t].querySelectorAll("td")[1]);
                        }
                    }
                    td.appendChild(button);
                }else if(j == col + 1 && i != row + 1 && i != 0){
                    let button = document.createElement("button");
                    button.textContent = "删除行";
                    button.setAttribute("type", "button");
                    button.onclick = () => {
                        table.removeChild(tr);
                    }
                    td.appendChild(button);
                }
            }else{
                let textarea = document.createElement("textarea");
                if(j >= 1 && i == 0){
                    textarea.textContent = col_title[j - 1];        
                }else if(j == 0 && i >= 1){
                    textarea.textContent = row_title[i - 1];
                }
                td.appendChild(textarea);
            }
            
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

function attach(){
    let objs = document.querySelectorAll("fieldset");
    for(let i = 1; i < objs.length; ++i){
        let button = objs[i].querySelector("button");
        let inputs = objs[i].querySelectorAll("input");

        let m = objs[i];
        button.onclick = () => {
           let select = m.querySelector("select");
           let type = select.options[select.selectedIndex].text;
           if(type == "文本"){
                let textarea = document.createElement("textarea");
                let fieldset = create_fieldset_with_class_and_childs("文本", "form_text_wrapper", [textarea], m);
                m.appendChild(fieldset);
           }else if(type=="公式"){
                let textarea = document.createElement("textarea");
                let fieldset = create_fieldset_with_class_and_childs("公式", "form_formula_wrapper", [textarea], m);
                m.appendChild(fieldset);
           }else if(type=="代码"){
                let textarea = document.createElement("textarea");
                let fieldset = create_fieldset_with_class_and_childs("代码", "form_code_wrapper", [textarea], m);
                m.appendChild(fieldset);
           }else if(type=="图片"){
                let div = document.createElement("div");
                div.setAttribute("class", "img_upload")
                let img = document.createElement("img");
                img.setAttribute("class", "upload_img_display");
                let img_upload = document.createElement("input");
                img_upload.type = "file";
                img_upload.accept = "image/*"
                img_upload.onchange = ()=> {
                    console.log(img_upload);
                    if(img_upload.files.length){
                        let file = img_upload.files[0];
                        let reader = new FileReader();
                        reader.onload = function(){
                          img.src = this.result;
                        };
                        reader.readAsDataURL(file);
                       }                
                }
                div.appendChild(img);
                div.appendChild(img_upload);
                m.appendChild(div);
           }else if(type=="表格"){
                let table = create_table_with_textarea(1, 1, ["item1"], ["title1"]);
                let add_row_button = document.createElement("button");
                let add_col_button = document.createElement("button");
                add_row_button.setAttribute("type", "button");
                add_col_button.setAttribute("type", "button");
                add_row_button.textContent = "新增行";
                add_col_button.textContent = "新增列";
                add_row_button.onclick = () => {
                    let length = table.querySelector("tr").querySelectorAll("td").length;
                    let tr = document.createElement("tr");
                    for(let i = 0; i < length - 1; ++i){
                        let td = document.createElement("td");
                        let textarea = document.createElement("textarea");
                        td.appendChild(textarea);
                        tr.appendChild(td);
                    }
                    let td = document.createElement("td");
                    let button = document.createElement("button");
                    button.setAttribute("type", "button");
                    button.textContent = "删除行";
                    button.onclick = ()=>{
                        table.removeChild(tr);
                    }
                    td.appendChild(button);
                    tr.appendChild(td);
                    table.insertBefore(tr, table.querySelectorAll("tr")[table.querySelectorAll("tr").length - 1]);
                }
                add_col_button.onclick = () => {
                    let tr = table.querySelectorAll("tr");
                    
                    mIndex = tr[0].querySelectorAll("td").length - 1;
                    for(let i = 0; i < tr.length - 1; ++i){
                        let td = document.createElement("td");
                        let textarea = document.createElement("textarea");
                        td.appendChild(textarea);
                        tr[i].insertBefore(td, tr[i].querySelectorAll("td")[mIndex]);
                    }
                    let td = document.createElement("td");
                    let button = document.createElement("button");
                    button.setAttribute("type", "button");
                    button.textContent = "删除列";
                    button.onclick = (e)=>{
                        let target_node = e.target.parentNode;
                        let trs = table.querySelectorAll("tr");
                        let tds = trs[trs.length - 1].querySelectorAll("td");
                        let mIndex = 0;
                        for(; mIndex < tds.length; ++mIndex){
                            if(tds[mIndex] == target_node){
                                break;
                            }
                        }
                        for(let i = 0; i < trs.length; ++i){
                            trs[i].removeChild(trs[i].querySelectorAll("td")[mIndex]);
                        }
                    }
                    td.appendChild(button);
                    tr[tr.length - 1].insertBefore(td, tr[tr.length - 1].querySelectorAll("td")[tr[tr.length - 1].querySelectorAll("td").length - 1]);
                }
                let fieldset = create_fieldset_with_class_and_childs("表格", "form_table_wrapper", [table, add_col_button, add_row_button], m);
                m.appendChild(fieldset);
           }
        }
    }
}


document.getElementsByTagName("form")[0].onsubmit = ()=>{
    let div = document.getElementById("form_basic_info");
    let infos = div.getElementsByTagName("input");
    for(let i = 0; i < infos.length; ++i){
        if(infos[i].value == ""){
            alert("基本内容不能有空项目");
            return false;
        }
    }
    return true;
}

attach();