var count=0;
var msc=document.querySelector('.bottom .playpause');
document.querySelector('#v1').classList.add('visibility');
var sltrs=document.querySelectorAll('.libutt1');
var progressbar=document.querySelector('#myProgressBar');
var pointer=1;
var lis1=['1','2','3','4','5','6','7','8','9','10'];
var lis=[
    {name:'[NCS Release]', id:'1'},
    {name:'Cielo - Huma-Huma', id:'2'},
    {name:'KEV - Invincible[NCS Release]-320k', id:'3'},
    {name:'Different-Heavens & EHID - MY Hearts[NCS Release]', id:'4'},
    {name:'Janji-Heroes-Tonight-feat-Johning-NCS-Release', id:'5'},
    {name:' Cielo - Huma-Huma', id:'6'},
    {name:'Janji-Heroes-Tonight-feat-Johning-NCS-Release', id:'7'},
    {name:'Different-Heavens & EHID - MY Hearts[NCS Release]', id:'8'},
    {name:' Cielo - Huma-Huma ', id:'9'},
    {name:'KEV - Invincible[NCS Release]-320k', id:'10'}
]
var playPromise;
for( const x of sltrs){
    x.classList.add('visibility');
}
var ms=new Audio('Spotify Clone/songs/7.mp3');
msc.onclick=function(){
    if(count===0){
        play();
    }
    else{
        pause();
    }
};
document.onclick=function(e){
    var hit=e.target.id;
    hit=hit.substring(1);
    if(e.target.id=='rst'){
        ms.currentTime=0;   
    }
    if(e.target.id=='left') hit=Math.max(1,Number(pointer)-1);
    else if(e.target.id=='right') hit=Math.min(10,Number(pointer)+1);
    hit=String(hit);
    if(lis1.includes(hit)){
        if(count===0){
            pointer=hit; 
            ms=new Audio('Spotify Clone/songs/'+hit+'.mp3');
            play();
        }
        else if(hit===pointer){
            pause();
        }
        else{
            pause();
            ms=new Audio('Spotify Clone/songs/'+hit+'.mp3');
            pointer=hit;
            play();
        }
    }
}
function play(){
    ms.play();
    document.querySelector('#ttl').innerHTML=lis[pointer-1].name;
    ms.addEventListener('timeupdate',()=>{
        var progress=parseInt(ms.currentTime)/parseInt(ms.duration)*100;
        progressbar.value=progress;
        if(progressbar.value==100){
            pause();
        }
        document.querySelector('#stp').innerHTML=time(ms.currentTime);
        document.querySelector('#rn').innerHTML=running();
    });
    progressbar.addEventListener('change',()=>{
        ms.currentTime=((progressbar.value*ms.duration)/100);
    });
    document.querySelector('#p'+pointer).classList.add('visibility');
    document.querySelector('#u'+pointer).classList.remove('visibility');
    document.querySelector('#visi').classList.add('visibility');
    document.querySelector('#gif').style.opacity=10;
    document.querySelector('#v1').classList.remove('visibility');
    count++;   
}
function pause(){
    count=0;
    playPromise = ms.pause();
    document.querySelector('#visi').classList.remove('visibility');
    document.querySelector('#v1').classList.add('visibility'); 
    document.querySelector('#u'+pointer).classList.add('visibility');
    document.querySelector('#gif').style.opacity=0; 
    document.querySelector('#p'+pointer).classList.remove('visibility');
}
function running(){
    var rem=ms.duration-ms.currentTime;
    var ans='-'+String(time(Number(rem)));
    if(ans=='-NaN:NaN') return '0:00';
    return ans;
}
function time(duration){
    var min=Math.floor(duration/60),sec=Math.floor(duration%60);
    var mn=String(min),sc=String(sec);
    if(sc.length==1){
        sc='0'+sc;
    }
    return mn+':'+sc;
}