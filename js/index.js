// 等到页面全部加载完毕在执行js代码
window.addEventListener('load',function() {
    // 1.获取元素
    var arrow1 = document.querySelector('.arrow1');
    var arrow2 = document.querySelector('.arrow2');
    var focus = document.querySelector('.focus')
    // 2.鼠标经过focus 就显示左右按钮
    focus.addEventListener('mouseenter',function() {
        arrow1.style.display = 'block';
        arrow2.style.display = 'block';
        // 当鼠标移入就关闭定时器，禁止播放轮播图
        clearInterval(timer);
        timer = null; // 清空定时器变量
    })
    focus.addEventListener('mouseleave',function() {
        arrow1.style.display = 'none';
        arrow2.style.display = 'none';
        // 当鼠标离开的时候就继续启动定时器
        timer = setInterval(function() {
            arrow2.click();
        },2000)
    })
    // console.log(arrow1);
    // console.log(arrow2);
    // 3. 动态生成小圆圈 有几张图片就生成几个小圆圈
    var ul = focus.querySelector('ul');
    // console.log(ul.children.length);
    var ol = focus.querySelector('ol');
    for(var i = 0;i < ul.children.length;i++) {
        // 创建一个小li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute('index',i);
        // 把li插入到ol里面
        ol.append(li);
        // 小圆圈排他思想
        li.addEventListener('click',function() {
            for(var i = 0;i < ol.children.length;i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圆圈，移动图片，当然移动的是ul
            // 设置一个自定义属性，如果要让图片滚动，移动的距离就为索引号x单个图片长度
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就把这个小li的索引号拿给当前的 num
            num = index;
            // 当我们点击了某个小li 就把这个小li的索引号拿给当前的 circle
            circle = index;
            // 将focus的长度赋值给一个变量
            var focusWidth = focus.offsetWidth;
            console.log(focusWidth);
            console.log(index);
            // 调用animate函数，移动ul指定的距离
            animate(ul,-index * focusWidth);
        })
    }
    
    // 把ol里面的第一个小li设置为current 也就是满圆状态
    ol.children[0].className = 'current';
    // 克隆第一张图片(li)放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 左右按钮移动
    var num = 0; // 声明一个变量num用来记录点击次数
    var circle = 0; // 声明一个变量circle控制小圆圈的播放

    // 右边箭头的轮播图逻辑
    arrow2.addEventListener('click',function() {
        if(num == 4) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul,-num * focus.offsetWidth);
        // 点击右侧按钮，小圆圈跟着一起变化，可以再声明一个变量circle控制小圆圈的播放
        circle++;
        // 如果circle == 4，说明走到最后我们克隆的这张图片了，我们就复原
        if(circle == ol.children.length) {
            circle = 0;
        }
        circleChange();
    })

    // 左箭头的轮播图成绩
    arrow1.addEventListener('click',function() {
        if(num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';
        }
        num--;
        animate(ul,-num * focus.offsetWidth);
        // 点击左侧按钮，小圆圈跟着一起变化，可以再声明一个变量circle控制小圆圈的播放
        circle--;
        // 如果circle < 0，说明走到最后我们克隆的这张图片了，我们就复原
        // if(circle < 0) {
        //     circle = ol.children.length - 1;
        // }
        circle = circle < 0 ? ol.children.length - 1 : circle;
        // 调用函数
        circleChange();
    });

    // 定义一个函数，用来实现小圆圈的排他思想
    function circleChange() {
        // 先清除其余圆圈的current样式
        for(var i = 0;i < ol.children.length;i++) {
            ol.children[i].className = '';
        }
        // 留下当前圆圈的current样式
        ol.children[circle].className = 'current';
    }

    // 自动播放轮播图
    var timer = setInterval(function() {
        arrow2.click();
    },2000)
})




