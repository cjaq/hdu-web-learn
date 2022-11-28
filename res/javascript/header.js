$.get('/hdu-web-learn/res/tpl/header.html', (result) => {
    $("header").html(result);
    if(!Cookies.get("login_user")){
        $("#logo").attr('src', '/hdu-web-learn/res/images/3422.png_860.png');
    }else{
        document.getElementById("logout").style.display = 'block';
        document.getElementById("logout").onclick = ()=>{
            Cookies.remove('login_user');
            location.reload();
        }
    }
});
