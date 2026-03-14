window.onload = function(){

const splash = document.getElementById("splash")

if(!sessionStorage.getItem("splashSeen")){

sessionStorage.setItem("splashSeen","true")

setTimeout(()=>{
splash.style.opacity="0"

setTimeout(()=>{
splash.style.display="none"
},1500)

},2000)

}else{

splash.style.display="none"

}

}
