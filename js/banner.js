// @charset"UTF-8";
//轮播图的js
function getStyle(obj, attr) {
    return getComputedStyle(obj)[attr];
}


function ajax(method, url, data, success) {
    var xhr = new XMLHttpRequest();

    // 根据请求方法的区别  做不同处理
    if (method == "get") {
        // 根据参数是否存在在做不同处理
        if (data) {
            xhr.open("get", url + "?" + data);
        } else {
            xhr.open("get", url);
        }

        xhr.send();
    } else if (method == "post") {
        xhr.open("post", url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencode");
        if (data) {
            xhr.send(data);
        } else {
            xhr.send();
        }
    }
    xhr.onreadystatechange = function () {
        // 确保请求数据成功获取
        if (xhr.status == 200 && xhr.readyState == 4) {
            success(xhr.responseText)
        }
    }
}

function bMove(obj, json, cb) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 假设值：先假设本次运动已经到达了终点
        var flag = true;

        for (var key in json) {
            if (key == "opacity") {
                var pos = parseFloat(getStyle(obj, key)) * 100; //
            } else {
                var pos = parseInt(getStyle(obj, key));
            }

            var speed = (json[key] - pos) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            pos += speed;

            // 只有有一个属性还没有到达终点，假设就不成立                    
            if ((speed > 0 && pos < json[key]) || (speed < 0 && pos > json[key])) {
                flag = false;
            }
            if (key == "opacity") {
                obj.style[key] = pos / 100;
            } else {
                obj.style[key] = pos + "px";
            }
        }
        // 假设成立，停止定时器
        if (flag) {
            clearInterval(obj.timer);
            // 执行回到函数
            cb && cb();
        }
    }, 30);
}

//电影列表首页的
function showFilmsList(films, obj) {
    var filmsHtml = '';
    for (var i = 0; i < films.length; i++) {
        var grade1 = films[i]['grade'].toString().split('.')[0];
        var grade2 = films[i]['grade'].toString().split('.')[1];
        grade2 = grade2 ? grade2 : 0;
        var type = (films[i]['type'] == 1) ? 'vip_type_3' : (films[i]['type'] == 2) ? 'vip_type_2' : 'vip_type_1';

        filmsHtml += '<div>\n' +
            '                    <a href="' + films[i]['http'] + '"> ' +
            '<img src="' + films[i]['url'] + '" alt="">\n' +
            '                        <span class="vip_type ' + type + '"></span>\n' +
            '                        <span class="vip_txt">' + films[i]['txt'] + '</span>\n' +
            '                    </a>\n' +
            '                    <p>\n' +
            '                        <a class="introduce_title">' + films[i]['title'] + '</a>\n' +
            '                        <a class="introduce_con">' + films[i]['message'] + '</a>\n' +
            '                    </p>\n' +
            '                    <a class="introduce_score">' + grade1 + '.<i>' + grade2 + '</i></a>\n' +
            '                </div>';
    }
    obj.innerHTML = filmsHtml;
}

// 切换tab
function switchTab(objParent, child, className) {
    objParent.onclick = function (e) {
        var ev = event || e;
        if ((ev.target.nodeName) == child.toUpperCase()) {
            var objChild = objParent.getElementsByTagName(child);
            for (var i = 0; i < objChild.length; i++) {
                objChild[i].className = '';
            }
            ev.target.className = className;
        }
    }
}