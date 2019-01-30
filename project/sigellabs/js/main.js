var db = firebase.database();
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

//$('#sendMsgButton').keypress(function (e) {
//    if (e.keyCode == 13) {
//        var username = $("#username").val();
//        var childname = $("#childname").val();
//        var age = $("#age").val();
//        var email = $("#email").val();
//        var phone = $("#phone").val();
//        var message = $("#message").val();
//        writeUserData(username, childname, age, email, phone, message, dateTime);
//    }
//});


$('#sendMsgButton').on("click", function () {
    var username = $("#username").val();
    var childname = $("#childname").val();
    var age = $("#age").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var message = $("#message").val();

    writeUserData(username, childname, age, email, phone, message, dateTime);
});


function writeUserData(name, child, age, email, mobile, msg, created) {

    var newPostKey = firebase.database().ref().child('posts').push().key;
    //    firebase.database().ref('users/' + newPostKey).set({
    db.ref('users/' + newPostKey).set({
            username: name,
            childname: child,
            age: age,
            email: email,
            phone: mobile,
            message: msg,
            created: created
        })
        .then(function () {
            alert('報名成功！')
            //            console.log("username=" + name + " / email=" + email + "/ message=" + msg + " / today=" + created + " key = " + newPostKey);
        })
        .catch(function (error) {
            alert('失敗了');
            console.log("失敗了");
        });
}

function getData() {
    var hello = '<table class="table table-striped"><thead class="thead-dark"><tr><th>家長</th><th>學員</th><th>年齡</th><th>email</th><th>phone</th><th>message</th><th>created</th></tr></thead><tbody>';
    db.ref("users").once('value', function (snapshot) {
        var data = snapshot.val();
        //        console.log(data);
        $.each(data, function (index, value) {
            //            console.log('My array has at position ' + index + ', user: '+ value.username+' // email :'+ value.email+ ' // ctrated:'+value.created);
            hello += '<tr><td>' + value.username + '</td><td>' + value.childname + '</td><td>' + value.age + ' </td><td>' + value.email + '</td><td>' + value.phone + '</td><td>' + value.message + '</td><td>' + value.created + '<b data-uid="' + index + '">del</b></td></tr>';
        });
        hello += '</tbody></table>';
        $(".hello").append(hello);
    });
}

$('.hello').on('click', 'b', function () {
    alert($(this).data('uid'))
});


function delUserData() {
    alert(1);
    //    alert($(this).data('uid'));
    db.ref("users/" + uid).remove();
}

function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

function displayJoinMember(email) {
    $('ul').prepend($('<li/>').text(email)).appendTo($('#sign_up'));
    $('#sign_up')[0].scrollTop = $('#sign_up')[0].scrollHeight;
};
