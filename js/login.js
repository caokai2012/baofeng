// @charset"UTF-8";
//登录的js
//登录的正则表达式

window.onload = function (ev) {
//  获取表单
    var oform = document.getElementsByTagName('form')[0];
    var otips = document.getElementsByClassName('tips')[0];
    var flag = true;
//    点击事件登录
    oform.do_login.onclick = function (e) {
        var ev = event || e;
        var username = oform.username.value.trim();
        var password = oform.password.value.trim();
        if (username == '' || password == '') {
            otips.innerText = '账号或密码不能为空！';
            otips.style.display = 'block';
        } else {
            if (flag) {
                //登录成功页面跳转
                location.href = './index.html';
            } else {
                otips.innerText = '账号或密码错误！';
                otips.style.display = 'block';
                // oform.reset();
            }
        }
        return false;
    }
//    输入账号失去焦点触发验证
    oform.username.onblur = function (e) {
        var ev = e || event;
        var username = oform.username.value.trim();
        //手机、邮箱皆可
        // 帐号是否合法(字母开头，允许5-16个，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$
        var regUser = /(^[a-zA-Z][a-zA-Z0-9_]{4,15}$)|((^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$))|(^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$)/;
        if (!regUser.test(username) && username != '') {
            otips.innerText = '输入账号格式不正确！';
            otips.style.display = 'block';
            flag = false;
        }
    }
    //    输入密码失去焦点触发验证
    oform.password.onblur = function (e) {
        var ev = e || event;
        var password = oform.password.value.trim();
        //密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
        var regPsw = /^[a-zA-Z]\w{5,17}$/;
        if (!regPsw.test(password) && password != '') {
            otips.innerText = '输入密码错误！';
            otips.style.display = 'block';
            flag = false;
        }
    }
}


