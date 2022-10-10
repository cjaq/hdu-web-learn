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
    for(let i = 0; i < row + 1; ++i){
        let tr = document.createElement("tr");
        for(let j = 0; j < col + 1; ++j){
            let td = document.createElement("td");
            let textarea = document.createElement("textarea");
            td.appendChild(textarea);  
            if(i == 0){
                if(j > 0){
                    textarea.textContent = col_title[j - 1];
                }else{
                    td.textContent = "";
                }
            }else if(j == 0){
                textarea.textContent = row_title[i - 1];
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
        let avaiable = null;

        for(let t = 0; t < inputs.length; ++t){
            if(inputs[t].type == "checkbox"){
                avaiable = inputs[t];
                break;
            }
        }

        if(avaiable != null){
            avaiable.onclick = ()=> {
                if(avaiable.checked){
                    let controls = m.querySelectorAll("input");
                    for(let t = 0; t < controls.length; ++t){
                        if(controls[t].type != "checkbox"){
                            controls[t].disabled = false;
                        }
                    }

                    controls = m.querySelectorAll("textarea");
                    for(let t = 0; t < controls.length; ++t){
                        controls[t].disabled = false;
                    }

                    controls = m.querySelector("button");
                    controls.disabled = false;
                }else{
                    let controls = m.querySelectorAll("input");
                    for(let t = 0; t < controls.length; ++t){
                        if(controls[t].type != "checkbox"){
                            controls[t].disabled = true;
                        }
                    }

                    controls = m.querySelectorAll("textarea");
                    for(let t = 0; t < controls.length; ++t){
                        controls[t].disabled = true;
                    }

                    controls = m.querySelector("button");
                    controls.disabled = true;
                }
            }
        }

        let m = objs[i];
        button.onclick = () => {
           let select = m.querySelector("select");
           let type = select.options[select.selectedIndex].text;
           if(type == "文本"){
                let value = m.getElementsByClassName("form_text_wrapper").length;
                let textarea = document.createElement("textarea");
                textarea.name = "text_" + value;
                let fieldset = create_fieldset_with_class_and_childs("文本", "form_text_wrapper", [textarea], m);
                m.appendChild(fieldset);
           }else if(type=="公式"){
                let value = m.getElementsByClassName("form_formula_wrapper").length;
                let textarea = document.createElement("textarea");
                textarea.name = "formula_" + value;
                let fieldset = create_fieldset_with_class_and_childs("公式", "form_formula_wrapper", [textarea], m);
                m.appendChild(fieldset);
           }else if(type=="代码"){
                let value = m.getElementsByClassName("form_code_wrapper").length;
                let textarea = document.createElement("textarea");
                textarea.name = "code_" + value;
                let fieldset = create_fieldset_with_class_and_childs("代码", "form_code_wrapper", [textarea], m);
                m.appendChild(fieldset);
           }else if(type=="图片"){
                let img_upload = document.createElement("input");
                img_upload.type = "file";
                img_upload.name = m.querySelector("legend").textContent + "_info_img_" + (m.querySelectorAll("input").length - 1);
                m.appendChild(img_upload);
           }else if(type=="表格"){
                let table = create_table_with_textarea(1, 1, [""], [""]);
                let add_row_button = document.createElement("button");
                let add_col_button = document.createElement("button");
                add_row_button.setAttribute("type", "button");
                add_col_button.setAttribute("type", "button");
                add_row_button.textContent = "新增行";
                add_col_button.textContent = "新增列";
                add_row_button.onclick = () => {
                    let length = table.querySelector("tr").querySelectorAll("td").length;
                    let tr = document.createElement("tr");
                    for(let i = 0; i < length; ++i){
                        let td = document.createElement("td");
                        let textarea = document.createElement("textarea");
                        td.appendChild(textarea);
                        tr.appendChild(td);
                    }
                    table.appendChild(tr);
                }
                add_col_button.onclick = () => {
                    let tr = table.querySelectorAll("tr");
                    for(let i = 0; i < tr.length; ++i){
                        let td = document.createElement("td");
                        let textarea = document.createElement("textarea");
                        td.appendChild(textarea);
                        tr[i].appendChild(td);
                    }
                }
                let fieldset = create_fieldset_with_class_and_childs("表格", "form_table_wrapper", [table, add_col_button, add_row_button], m);
                m.appendChild(fieldset);
           }
        }
    }
}

attach();