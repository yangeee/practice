$(document).ready(function(){
        var box  = document.getElementById('header_beijing');
        var ul = box.children[0].children[0]; 
        var ulLis = ul.children; 
        //插入 ol 
        var ol = box.children[1];
        // 创建dot
        for(var i=0;i<ulLis.length-1;i++) {//-1是因为放了一张重复
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
            //控制dot亮
            olLis[i].onmouseover = function() {
                for(var j=0;j<olLis.length;j++) {
                    olLis[j].className = "";
                }
                this.className = 'current';
                //
                animate(ul,-this.index*ulLis[0].offsetWidth);// width + padding + border
                key=dot=this.index; // key square等于当前的索引号
            }
        }
       // 4. 定时器部分
        var timer = null;  // 定时器
        var key = 0; // 控制图片的播放
        var dot = 0;  // 用来控制dot
        timer = setInterval(autoplay,4000);
        function autoplay() {
            key++;   // key == 1  先 ++
            if(key > ulLis.length-1 )
            {
                ul.style.left = 0;
                key = 1;  // 因为第6张就是第一张，已经播放完毕，下一次播放第2张
            }
            animate(ul,-key*ulLis[0].offsetWidth);
            // dot显示
            dot++;  // dot跟着变
            dot = dot>olLis.length-1 ? 0 : dot;
            for(var i=0;i<olLis.length;i++) {
                olLis[i].className = "";
            }
            olLis[dot].className = "current";   // 留下当前自己的

        }


        // 鼠标经过和停止定时器
        ol.onmouseover= function() {
            clearInterval(timer);
        }
        box.onmousover=function(){
            clearInterval(timer);
        }
        ol.onmouseout = function() {
            timer = setInterval(autoplay,4000); 
        }

        // animate
        function animate(obj,target) {
            clearInterval(obj.timer);  // 先清除以前定时器
            // 如果 offsetLeft大于了target目标位置就应该反方向
            var speed= obj.offsetLeft < target ? 90 : -70;//控制图片移动速度
            obj.timer = setInterval(function() {
                var result = target - obj.offsetLeft;  //  他们的值 等于 0 说明完全相等
                // 动画的原理
                obj.style.left = obj.offsetLeft + speed  + "px";
                if(Math.abs(result) <= Math.abs(speed)) {
                    obj.style.left = target + "px"; 
                    clearInterval(obj.timer);
                }
            },10);//每一次动画的时间
        }
        
    });