const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");

let size=50;
let blockColumnCount=4;
let blockRowCount=10;
let blocks=[];
let pad_color=0;
let pts=0;
let end=false;
let alerted=false;
let last_press=0;
function getRandomInt(max){
    return Math.floor(Math.random()*max);
}
function createBlock(){
    for(let c=0;c<blockColumnCount;c++) blocks[c][blockRowCount-1].status=0;
    let pos=getRandomInt(4);
    blocks[pos][blockRowCount-1].status=1;
    blocks[pos][blockRowCount-1].color=getRandomInt(2);
}
function blockFall(){
    for(let r=0;r<blockRowCount-1;r++){
        for(let c=0;c<blockColumnCount;c++){
            blocks[c][r].status=blocks[c][r+1].status;
            blocks[c][r].color=blocks[c][r+1].color;
        }
    }
    createBlock();
}
function drawText(){
    ctx.font="15px Arial";
    ctx.fillStyle="#000000";
    ctx.fillText("D",20,canvas.height-10);
    ctx.fillText("F",70,canvas.height-10);
    ctx.fillText("J",120,canvas.height-10);
    ctx.fillText("K",170,canvas.height-10);
    ctx.fillText(pts,10,15);
    ctx.fillText("按S切换颜色",60,canvas.height-35);
    ctx.fillText("按R重开",140,15);
}
function init(){
    blocks=[];
    pts=0;
    end=false;
    pad_color=0;
    last_press=0;
    alerted=false;
    for(let c=0;c<blockColumnCount;c++){
        blocks[c]=[];
        for(let r=0;r<blockRowCount;r++){
            blocks[c][r]={status:0,color:0};
        }
    }
    for(let c=0;c<blockRowCount;c++) blockFall();
}
function drawBlock(){
    for(let c=0;c<blockColumnCount;c++){
        for(let r=0;r<blockRowCount;r++){
            if(blocks[c][r].status==1){
                let x=c*size;
                let y=canvas.height-50-(r+1)*size;
                ctx.fillStyle="#000000";
                ctx.fillRect(x,y,size,size);
                if(blocks[c][r].color==0)ctx.fillStyle="#0095DD";
                if(blocks[c][r].color==1)ctx.fillStyle="#FFFFFF";
                ctx.fillRect(x+1,y+1,size-2,size-2);
            }
        }
    }
}
function drawPad(){
    if(pad_color==0) ctx.fillStyle="#0095DD";
    if(pad_color==1) ctx.fillStyle="#FFFFFF";
    ctx.fillRect(0,canvas.height-50,canvas.width,25);
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBlock();
    drawPad();
    drawText();
    if(end){    
        ctx.fillStyle="rgba(255,0,0,0.5)";
        ctx.fillRect(last_press*50,20,50,500);
    }
    requestAnimationFrame(draw);
}
document.addEventListener("keydown",keyDownHandler,false);
function keyDownHandler(e){
    if(!end){
        if(e.key=="d"){
            last_press=0;
            if(blocks[0][0].status==0) end=true;
            else if(blocks[0][0].color!=pad_color) end=true;
            if(!end){
                blockFall();
                pts++;
            }
        }
        if(e.key=="f"){
            last_press=1;
            if(blocks[1][0].status==0) end=true;
            else if(blocks[1][0].color!=pad_color) end=true;
            if(!end){
                blockFall();
                pts++;
            }
        }
        if(e.key=="j"){
            last_press=2;
            if(blocks[2][0].status==0) end=true;
            else if(blocks[2][0].color!=pad_color) end=true;
            if(!end){
                blockFall();
                pts++;
            }
        }
        if(e.key=="k"){
            last_press=3;
            if(blocks[3][0].status==0) end=true;
            else if(blocks[3][0].color!=pad_color) end=true;
            if(!end){
                blockFall();
                pts++;
            }
        }
        if(e.key=="s") pad_color=1-pad_color;
    }
    if(e.key=="r") init();
}
init();
draw();