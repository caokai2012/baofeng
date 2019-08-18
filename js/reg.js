// @charset"UTF-8";
//注册页面的js
//注册的正则表达式
window.onload = function (ev) {
    var flag = true;
    //  获取表单
    var oform = document.getElementsByTagName('form')[0];
    var otips = document.getElementsByClassName('tips')[0];
    //密码格式的实时验证
    oform.do_reg.onclick = function (e) {
        //获取有关的元素值
        var tel = oform.tel.value.trim();
        var password = oform.password.value.trim();
        var code = oform.code.value.trim();
        var message = oform.message.value.trim();
        if (tel == '' || password == '' || code == '' || message == '') {
            otips.innerText = '手机号、密码、验证码、短信验证码不能为空';
            otips.style.display = 'block';
        } else {
            //    暂时没有验证短信验证码
            if (flag) {
                //    注册成功 调到登录页面
                location.href = 'login.html';
            } else {
                otips.innerText = '手机号、密码、验证码、短信验证码错误！';
                otips.style.display = 'block';
                oform.reset();
            }
        }
        return false;
    }
//    失去焦点开始触发手机号验证
    oform.tel.onblur = function (e) {
        var tel = oform.tel.value.trim();
        var regTel = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!regTel.test(tel) && tel != '') {
            otips.innerText = '请输入正确的手机号！';
            otips.style.display = 'block';
            flag = false;
        }
    }
    //失去焦点开始触发密码验证
    oform.password.onblur = function (e) {
        var password = oform.password.value.trim();
        var regpsw = /^[a-zA-Z]\w{5,17}$/;
        if (!regpsw.test(password) && password != '') {
            otips.innerText = '请输入正确的密码！';
            otips.style.display = 'block';
            flag = false;
        } else {
            if (password.length < 12 && password.length >= 6) {
                oform.password.id = 'psw_bg';
            }
        }
    }
    //失去焦点验证码
    oform.code.onblur = function (e) {
        var regCode = /^xpw1$/;
        var code = oform.code.value.trim();
        if (!regCode.test(code) && code != '') {
            otips.innerText = '请输入正确的验证码';
            otips.style.display = 'block';
            flag = false;
        }
    }

//    随机产生短信验证码
    oform.get_message.onclick = function () {
        var code = '';
        if (oform.tel.value != '') {
            for (var i = 0; i < 4; i++) {
                code += parseInt(Math.random() * (9));
            }
            oform.message.value = code;
        }
    }
}