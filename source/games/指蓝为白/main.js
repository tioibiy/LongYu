const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");

let size=50;
let blockColumnCount=4;
let blockRowCount=10;
let blocks=[];
let pad_color=0;
let pts=0;
let end=false;
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
    ctx.fillText("D",20,540);
    ctx.fillText("F",70,540);
    ctx.fillText("J",120,540);
    ctx.fillText("K",170,540);
    ctx.fillText(pts,10,15);
    ctx.fillText("按S切换颜色",60,515);
}
function init(){
    blocks=[];
    pts=0;
    end=false;
    pad_color=0;
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
                ctx.beginPath();
                ctx.rect(x,y,size,size);
                ctx.fillStyle="#000000";
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.rect(x+1,y+1,size-2,size-2);
                if(blocks[c][r].color==0)ctx.fillStyle="#0095DD";
                if(blocks[c][r].color==1)ctx.fillStyle="#FFFFFF";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawPad(){
    ctx.beginPath();
    ctx.rect(0,500,canvas.width,25);
    if(pad_color==0) ctx.fillStyle="#0095DD";
    if(pad_color==1) ctx.fillStyle="#FFFFFF";
    ctx.fill();
    ctx.closePath();
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBlock();
    drawPad();
    drawText();
    requestAnimationFrame(draw);
    if(end){
        alert("是蓝还是白你给我看清楚喳\n本次得分"+pts);
        init();
    }
}
document.addEventListener("keydown",keyDownHandler,false);
function keyDownHandler(e){
    if(e.key=="d"){
        if(blocks[0][0].status==0) end=true;
        else if(blocks[0][0].color!=pad_color) end=true;
        else{
            blockFall();
            pts++;
        }
    }
    if(e.key=="f"){
        if(blocks[1][0].status==0) end=true;
        else if(blocks[1][0].color!=pad_color) end=true;
        else{
            blockFall();
            pts++;
        }
    }
    if(e.key=="j"){
        if(blocks[2][0].status==0) end=true;
        else if(blocks[2][0].color!=pad_color) end=true;
        else{
            blockFall();
            pts++;
        }
    }
    if(e.key=="k"){
        if(blocks[3][0].status==0) end=true;
        else if(blocks[3][0].color!=pad_color) end=true;
        else{
            blockFall();
            pts++;
        }
    }
    if(e.key=="s") pad_color=1-pad_color;
}
init();
draw();