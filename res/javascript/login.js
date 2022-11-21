window.onload = ()=>{
    $("#login").click(
        ()=>{
            let users = [{'account': 'root', 'password': '123', 'name': 'root'}];
            let account = $("input[name='account']").val();
            let password = $("input[name='password']").val();
            for(let i = 0; i < users.length; ++i){
                if(users[i].account == account && users[i].password == password){
                    Cookies.set("login_user", users[i].name);
                    $(location).attr('href', '/form.html');
                }else{
                    $("#error_msg_wrapper").css({
                        "opacity": "100%"
                    });
                    setTimeout(()=>{
                        $("#error_msg_wrapper").css({
                            "opacity": "0%"
                        });  
                    }, 1000);
                }
            }
        }
    );
}