//connect to server
const socket=io("http://localhost:3000");
var randomStranger;
var activeStranger=false;
var canTalk=false;
var senderId;
function go(){
    const userName=document.getElementById("text-1542372332072").value;
    senderId=socket.id;
    console.log(userName);
    socket.emit("newStranger",{name:userName,socketId:socket.id})
    $('#myModal').modal('hide'); 
}
$("#go").click(function(){
   go();
})

function send(){
  
    const message=document.getElementById("input-message").value;
    var messagePacket=randomStranger;
    messagePacket.message=message;
    messagePacket.senderid=senderId;
    

    messagePacket.activeStranger=activeStranger;
    if(messagePacket.senderId!=socket.id||messagePacket.recieverId!=socket.id){
        console.log("U can't sending message to this user anymore")
    }
    socket.emit("newMessage",messagePacket);
    console.log("sending ....",messagePacket);
    
    $("#input-message").val("");
}
$("#send-btn").click(function(){
   send();
})


socket.on("newMessage",(data)=>{
    
    $("#input-message").prop("disabled",false)
    console.log(data)
    activeStranger=true;
    //store the data in golable varaible to use that data in submitMessage function 
    randomStranger=data;
    console.log("server",data.recieverId);
    console.log("client",socket.id)
    if(data.senderid==senderId){
        $("#msg").append(`<li class="mar-btm">
        <div class="media-left">
            <!-- <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="img-circle img-sm" alt="Profile Picture"> -->
            <img src="/images/test1.jpg" class="img-circle img-sm" alt="Profile Picture">
        </div>
        <div class="media-body pad-hor">
            <div class="speech">
                <a href="#" class="media-heading">${data.senderName}</a>
                <p>${data.message}</p>
                <p class="speech-time">
                <i class="fa fa-clock-o fa-fw"></i>09:23AM
                </p>
            </div>
        </div>
    </li>`)
    }
    else {
        $("#msg").append(`<li class="mar-btm">
        <div class="media-right">
            <img src="/images/test3.jpg" class="img-circle img-sm" alt="Profile Picture">
        </div>
        <div class="media-body pad-hor speech-right">
            <div class="speech">
                <a href="#" class="media-heading">${data.senderName}</a>
                <p>${data.message}</p>
                <p class="speech-time">
                    <i class="fa fa-clock-o fa-fw"></i> 09:23AM
                </p>
            </div>
        </div>
    </li>`)
    }
    
    })


$("#find-btn").click(function(){
    socket.emit("findRandomStrangerServer",{senderId:socket.id});
    $("#input-message").prop("disabled",false)
    console.log("clicked")
})




socket.on("findRandomStrangerClient",(data)=>{
    // data =>obj {  senderName , recieverName , senderId , recieverId }
    //check in the server that the number of active users is greater that 1 user 
    // we need more that one user to talk 
    if(!data.valid)
    {
        console.log("sorry there's no one to talk");
        canTalk=false;
    }
    else {
        console.log(data);
        randomStranger=data;
        canTalk=true;
    }
})




