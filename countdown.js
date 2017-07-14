// JavaScript Document
var can;
var ctx;
var w=1024;
var h=768;
var r=8;
var MarginTop=60;
var MarginLeft=30;
var curShowTimeSecond=0;

var ball=[];

window.onload=function(){
	w=document.body.clientWidth;
	h=document.body.clientHeight;
	MarginLeft=w/10;
	r=Math.round(w*4/5/108)-1;
	MarginTop=Math.round(h/5);
	can=document.getElementById("canvas");
	ctx=can.getContext("2d");
	can.width=w;
	can.height=h;
	
	curShowTimeSecond=getCurrentShowTimeSecond()//把getCurrentShowTimeSecond()函数时间差的秒数赋值给curShowTimeSecond
	render()
	setInterval(
	   function(){
		   render();
		   update();
		   },50
	)
	
	}//每隔50毫秒调用一次
function getCurrentShowTimeSecond(){
	var cutTime=new Date();//获取现在的时间
	var ret=cutTime.getHours()*3600+cutTime.getMinutes()*60+cutTime.getSeconds();
	return ret
	//如果ret》=0那么ret=ret否则ret=0；
	}
	

function update(){/*负责了时间的改变，如果当前需要产生小球*/
	//下一次要出现的时间数
	var nextShowTimeSecond=getCurrentShowTimeSecond();
	var nextHour=Math.floor(nextShowTimeSecond/3600);
	//parseInt()把字符串转换成数字
	var nextMinute=parseInt((nextShowTimeSecond-nextHour*3600)/60);
	var nextSecond=nextShowTimeSecond%60;
	
	var curHour=parseInt(curShowTimeSecond/3600);
	var curMinute=parseInt((curShowTimeSecond-curHour*3600)/60);
	var curSecond=curShowTimeSecond%60;
     
	if(nextSecond!=curSecond){
		/*时间小时*/
		if(parseInt(curHour/10)!=parseInt(nextHour/10)){
			addballs(MarginLeft+0,MarginTop,parseInt(curHour/10))
			                                  //当前显示的数字
			}
		if(parseInt(curHour%10)!=parseInt(nextHour%10)){
			addballs(MarginLeft+15*(r+1),MarginTop,parseInt(curHour%10))
			}
		/*时间分钟*/
		if(parseInt(curMinute/10)!=parseInt(nextMinute/10)){
			addballs(MarginLeft+39*(r+1),MarginTop,parseInt(curMinute/10))
			                                  //当前显示的数字
			}
		if(parseInt(curMinute%10)!=parseInt(nextMinute%10)){
			addballs(MarginLeft+54*(r+1),MarginTop,parseInt(curMinute%10))
			}
		/*时间秒钟*/
		if(parseInt(curSecond/10)!=parseInt(nextSecond/10)){
			addballs(MarginLeft+78*(r+1),MarginTop,parseInt(curSecond/10))
			}
		if(parseInt(curSecond%10)!=parseInt(nextSecond%10)){
			addballs(MarginLeft+93*(r+1),MarginTop,parseInt(curSecond%10))
			}	
		curShowTimeSecond=nextShowTimeSecond
		
		}
	updateBalls();
	}
function updateBalls(){
	for(var i=0;i<ball.length;i++){
		ball[i].x+=ball[i].vx;
		ball[i].y+=ball[i].vy;
		ball[i].vy+=ball[i].g
		
		if(ball[i].y>h-r){
			ball[i].y=h-r;
			ball[i].vy=-ball[i].vy*0.75;
			}		
		}
	//判断每个小球是否在画布中,性能优化
	var cnt=0
	for(var i=0;i<ball.length;i++){
		if(ball[i].x+r>0&&ball[i].x-r<w){
		ball[cnt++]=ball[i]
		   }		 
		}
		//i的索引一定大于cnt  
		  while(ball.length>Math.min(300,cnt)){
			ball.pop();
			//pop将数组后面的元素删掉
			}
	}
function addballs(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		  for(var j=0;j<digit[num][i].length;j++){
			  if(digit[num][i][j]==1){
				  var R=Math.floor(Math.random()*255);
                  var G=Math.floor(Math.random()*255);
                  var B=Math.floor(Math.random()*255);
				  
				  var aball={x:x+j*2*(r+1)+(r+1),y:y+i*2*(r+1)+(r+1),
				             g:1.5+Math.random(),
							 vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4 , //-1的几次方
							 vy:-5,//会有一个向上的动作
							 color:"rgb("+R+","+G+","+B+")"
				             }
				ball.push(aball);
				  }
			  }
		}
	
	
	}


	
//开始时的状态
function render(){
	ctx.clearRect(0,0,w,h);
	var hour=parseInt(curShowTimeSecond/3600);
	var minutes=parseInt((curShowTimeSecond-hour*3600)/60);
	var seconds=curShowTimeSecond%60;
	
	renderDigit(MarginLeft,MarginTop,parseInt(hour/10))
	renderDigit(MarginLeft+15*(r+1),MarginTop,parseInt(hour%10))
	renderDigit(MarginLeft+30*(r+1),MarginTop,10)
	renderDigit(MarginLeft+39*(r+1),MarginTop,parseInt(minutes/10))
	renderDigit(MarginLeft+54*(r+1),MarginTop,parseInt(minutes%10))
	renderDigit(MarginLeft+69*(r+1),MarginTop,10)
	renderDigit(MarginLeft+78*(r+1),MarginTop,parseInt(seconds/10))
	renderDigit(MarginLeft+93*(r+1),MarginTop,parseInt(seconds%10))
	
	  
	for(var i=0;i<ball.length;i++){
		ctx.fillStyle=ball[i].color;
		ctx.beginPath();
		ctx.arc(ball[i].x,ball[i].y,r,0,Math.PI*2);
		ctx.closePath;
		ctx.fill();
		
		}
	
}
//开始时的数字小球
function renderDigit(x,y,num){
	ctx.fillStyle="blue";
	for(var i=0;i<digit[num].length;i++)
		  for(var j=0;j<digit[num][i].length;j++)
			  if(digit[num][i][j]==1){
				  ctx.beginPath();
				  ctx.arc(x+j*2*(r+1)+(r+1),y+i*2*(r+1)+(r+1),r,0,Math.PI*2);
				  ctx.closePath();
				  ctx.fill();
			  }
	
	}