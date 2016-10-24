var socket = io();
function btnClick(){
    alert('clicked');
    socket.emit('clicked', {test: 'yes'});
}
