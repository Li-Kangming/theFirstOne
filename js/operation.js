window.onload = function () {
    var navList = document.getElementById("navList");
    var liNav = navList.children;
    var videoLi = document.getElementById("videoLi");
    var arrow = document.getElementById("arrow");
    var videoDetail = document.getElementById("video-detail");
    var starDetail = document.getElementById("basketstar");
    var team = document.getElementById("team");
    var timer = null;
    // 隐藏的内容
    hide(videoDetail);
    hide(starDetail);

    // 导航栏
    // 视频内容
    videoDetail.onmouseenter = videoLi.onmouseenter= function (){
        if(starDetail.style.display === "block" || team.style.display === "block"){
            hide(starDetail);
            hide(team)
        }
        moveShow(timer, videoDetail, arrow)
        arrow.style.left = "10%";
        
    };
    videoDetail.onmouseleave= videoLi.onmouseleave = function () {
        moveHide(videoDetail, arrow)
        hide(arrow)
    };
    //球员内容
    starDetail.onmouseenter = liNav[5].onmouseenter = function () {
        if(videoDetail.style.display === "block" || team.style.display === "block"){
            hide(videoDetail);
            hide(team);
        }
        moveShow(timer, starDetail, arrow)
        arrow.style.left = "50%";
    }
    starDetail.onmouseleave = liNav[5].onmouseleave = function() {
        moveHide(starDetail, arrow)
    }

    // 球队内容：

    team.onmouseenter = liNav[6].onmouseenter =function () {
        if(videoDetail.style.display === "block" || starDetail.style.display === "block"){
            hide(videoDetail);
            hide(starDetail)
        }
        moveShow(timer, team, arrow);
        arrow.style.left = "57%";
    }

    team.onmouseleave = liNav[6].onmouseleave = function() {
        moveHide(team, arrow);
    }

    // 轮播效果
    var json = [
        {
            width: 0,
            height: 0,
            top: 40,
            left: 0,
            opacity: 0,
            z: 2
        },
        {
            width: 400,
            height: 300,
            top: 40,
            left: 0,
            opacity: 100,
            z: 3
        },
        {
            width: 600,
            height: 350,
            top: 10,
            left: 330,
            opacity: 100,
            z: 4
        },
        {
            width: 400,
            height: 300,
            top: 40,
            left: 860,
            opacity: 100,
            z: 3
        },
        {
            width: 0,
            height: 0,
            top: 40,
            left: 860,
            opacity: 0,
            z: 2
        }
    ];

    var videoList = document.getElementById("videoList");
    var liArr = videoList.getElementsByTagName("li");
    var arrowBox = videoList.children[1];
    var arrowChildren = arrowBox.children;
    var flag = true;

    videoList.onmouseover = function(){
        console.log('kaishile1')
        animate(arrowBox, { "opacity": 100});
    }

    videoList.onmouseout = function() {
        animate(arrowBox, {"opacity": 0});
    }
    move();
    for(var k in arrowChildren){
        arrowChildren[k].onclick = function() {
            if(this.className === "prev"){
                if(flag){
                    flag = false ;
                    move(true);
                }
            } else {
                if(this.className === "next") {
                    if(flag){
                        flag = false;
                        move(false);
                    }
                }
            }
        }
    }

    function move(bool) {
        if(bool !== undefined){
            if(bool){
                json.unshift(json.pop());
            }else {
                json.push(json.shift());
            }    
        }
        for(var i = 0; i < liArr.length; i++){
            animate(liArr[i], {
                "width": json[i].width,
                "height": json[i].height,
                "top": json[i].top,
                "left": json[i].left,
                "opacity": json[i].opacity,
                "zIndex": json[i].z
            }, function() {
                flag = true;
                var vL = videoList.getElementsByTagName("video");
                console.log(vL)
                for(var i = 0; i < vL.length; i++){
                    vL[i].controls = false;
                    vL[i].autoplay = false;
                }
                vL[2].controls = true;
                vL[2].autoplay = true;
            });
        }

    }
    

    /**
  * 功能：显示或延迟隐藏元素
  */

    function moveShow(timer, showEle, arrow){
        if(timer) {
            clearTimeout(timer);
            show(showEle);
            show(arrow);
        }
    }
    function moveHide(hideEle, arrow){
        timer = setTimeout(function(){
            hide(hideEle);
            hide(arrow);
        }, 1500);
    }
    
}

 