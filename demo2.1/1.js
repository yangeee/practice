$(document).ready(function(){
        var box  = document.getElementById('header_beijing');  //   获得大盒子
        var ul = box.children[0].children[0];  // 获取ul
        var ulLis = ul.children;  //  ul 里面的所有  li
        //插入 ol 
        var ol = box.children[1];  // 获得ol
        // 创建dot
        for(var i=0;i<ulLis.length-1;i++) {//-1是因为我放了一张重复的
            // 创建节点 li
            var li = document.createElement("li");
            // a.appendChild(b);
            ol.appendChild(li);
        }
        var olLis = ol.children;  // 找到 ol 里面的li
        olLis[0].className = 'current';
        // 3. 动画部分  遍历小li ol
        for(var i=0;i<olLis.length;i++) {
            olLis[i].index = i;  // 索引
            olLis[i].onmouseover = function() {
                // 先添加dot聚焦
                for(var j=0;j<olLis.length;j++) {
                    olLis[j].className = "";
                }
                this.className = 'current';
                //传参
                animate(ul,-this.index*ulLis[0].offsetWidth);// width + padding + border
                key = square = this.index; // 鼠标经过 key square 要等于 当前的索引号
            }
        }
       // 4. 定时器部分  难点
        var timer = null;  // 定时器
        var key = 0; // 用来控制图片的播放的
        var square = 0;  // 用来控制dot的
        timer = setInterval(autoplay,4000);   // 每4s 调用一次 autoplay
        function autoplay() {
            key++;   // key == 1  先 ++
            if(key > ulLis.length-1 )
            {
               // alert('停下');
                ul.style.left = 0;
                key = 1;  // 因为第6张就是第一张，我们已经播放完毕了， 下一次播放第2张
                // 第2张的索引号是1
            }
            animate(ul,-key*ulLis[0].offsetWidth);
            // dot显示
            square++;  // dot跟着变
            square = square>olLis.length-1 ? 0 : square;
            /// 清除所有人
            for(var i=0;i<olLis.length;i++) {
                olLis[i].className = "";
            }
            olLis[square].className = "current";   // 留下当前自己的

        }


        // 鼠标经过和停止定时器
        box.onmouseover = function() {
            clearInterval(timer);
        }

        box.onmouseout = function() {
            timer = setInterval(autoplay,4000); 
        }

        // animate封装
        function animate(obj,target) {
            clearInterval(obj.timer);  // 要开启定时器，先清除以前定时器
            // 有2个参数 第一个 对象谁做动画  第二 距离 到哪里
            // 如果 offsetLeft 大于了  target 目标位置就应该反方向
            var speed= obj.offsetLeft < target ? 90 : -70;//控制图片移动速度
            obj.timer = setInterval(function() {
                var result = target - obj.offsetLeft;  //  他们的值 等于 0 说明完全相等
                // 动画的原理
                obj.style.left = obj.offsetLeft + speed  + "px";
                if(Math.abs(result) <= Math.abs(speed)) {
                    obj.style.left = target + "px";   //抖动问题
                    clearInterval(obj.timer);
                }
            },10);//完成动画的时间
        }
        
    });