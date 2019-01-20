//var database = firebase.database().ref;
//var myDataRef = new Firebase('https://sigellabs.firebaseio.com');
var db = firebase.database();
//var myDataRef = new Firebase('https://sigellabs.firebaseio.com/');

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

//$('#sendMsgButton').keypress(function (e) {
//    if (e.keyCode == 13) {
////        myDataRef.push({
////            username: username,
////            email: email,
////            message: message,
////            created: dateTime
////        });
//        
//    }
//});

$('#sendMsgButton').on("click", function () {
    var username = $("#username").val();
    var childname = $("#childname").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var message = $("#message").val();

    //    db.push({
    //            username: username,
    //            email: email,
    //            message: message,
    //            created: dateTime
    //        });
    writeUserData(username, childname, email, phone, message, dateTime);
    //        myDataRef.push({
    //            username: username,
    //            email: email,
    //            message: message,
    //            created: dateTime
    //        });

    //    alert(1)
});


function writeUserData(name, child, email, mobile, msg, created) {
    var newPostKey = firebase.database().ref().child('posts').push().key;
//    firebase.database().ref('users/' + newPostKey).set({
    db.ref('users/' + newPostKey).set({
            username: name,
            childname: child,
            email: email,
            phone: mobile,
            message: msg,
            created: created
        })
        .then(function () {
            alert('報名成功！')
            console.log("username=" + name + " / email=" + email + "/ message=" + msg + " / today=" + created + " key = " + newPostKey);
        })
        .catch(function (error) {
            alert('失敗了');
            console.log("失敗了");
        });
}

//myDataRef.on('child_added', function (snapshot) {
//    var message = snapshot.val();
//    displayChatMessage(message.name, message.text);
//});
//
//$('button').on("click",function () {
//        var email = $('#email').val();
//        if(email.length > 0){
//        myDataRef2.push({
//            email: email
//        });
//        $('#email').val('');
//            }
//});
function getData() {
    db.ref("users").once('value', function (snapshot) {
        var data = snapshot.val();
        console.log(data);
    });
}

function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

function displayJoinMember(email) {
    $('ul').prepend($('<li/>').text(email)).appendTo($('#sign_up'));
    $('#sign_up')[0].scrollTop = $('#sign_up')[0].scrollHeight;
};
