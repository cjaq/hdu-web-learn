function setMsg(msg){
    $("#error_msg_wrapper").text(msg);
    $("#error_msg_wrapper").css({
        "opacity": "100%"
    });
    setTimeout(()=>{
        $("#error_msg_wrapper").css({
            "opacity": "0%"
        });  
    }, 1000);
}
window.onload = ()=>{
    $("#login").click(
        ()=>{
            let users = [{'account': 'root', 'password': '123', 'name': 'root'}];
            let account = $("input[name='account']").val();
            let password = $("input[name='password']").val();
            if(account == ''){
                setMsg("账号不能为空");
            }
            else if(password == ''){
                setMsg("密码不能为空");
            }
            else{
                for(let i = 0; i < users.length; ++i){
                    if(users[i].account == account && users[i].password == password){
                        Cookies.set("login_user", users[i].name);
                        $(location).attr('href', '/form.html');
                    }else{
                        setMsg("账号或密码错误");
                    }
                }
            }  
        }
    );
}