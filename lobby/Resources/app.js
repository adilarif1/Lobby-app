postBtn = Titanium.UI.createButton({
    backgroundColor: 'black',
    width: '100%',
    height: '10%',
    title: 'Post',
    bottom: '0%'

});

postField = Titanium.UI.createTextField({
    backgroundColor: '#E0E0E0',
    width: '100%',
    height: '20%',
    bottom: '10%'

});



var userLogin = {};
user = {};
userLogin.page = function() {
    //local variables

    var logo = Titanium.UI.createImageView({
        image: '/images/logo.png',
        top: '5%',
        layout: 'horizontal',
        left: '25%',


    });

    var loginUserBox = Titanium.UI.createTextField({
        top: '5%',
        left: '7%',
        layout: 'horizontal',
        width: '80%',
        color: 'black',
        backgroundColor: 'white',
        opacity: 0.5,
        height: '10%',
        value: "Username"



    });
    
 loginUserBox.addEventListener('click', function() {
 	
 	if(loginUserBox.value == "Username"){
 		
 		loginUserBox.value = "";
 		
 	}
 	
 });

var loginPassBox = Titanium.UI.createTextField({
        top: '5%',
        left: '7%',
        layout: 'horizontal',
        color: 'black',
        width: '80%',
        height: '10%',
        backgroundColor: 'white',
        opacity: 0.5,
        value: "Password"


    });
    
    
loginPassBox.addEventListener('click', function() {
 	
 	if(loginPassBox.value == "Password"){
 		
 		loginPassBox.value = "";
 		
 	}
 	
 });


    loginWin = Titanium.UI.createWindow({
        layout: 'horizontal',
        backgroundImage: '/images/lobby6.jpg',
        width: '100%',
        height: '100%',
        titleControl: false


    });

    var signupBtn = Titanium.UI.createButton({
        backgroundColor: '#3366FF',
        opacity: 0.5,
        color: 'white',
        width: '80%',
        height: '10%',
        left: '7%',
        title: 'Sign up',
        top: '5%',
        layout: 'horizontal'

    });

    loginBtn = Titanium.UI.createButton({
        backgroundColor: '#00FFCC',
        color: 'white',
        opacity: 0.5,
        width: '80%',
        height: '10%',
        left: '7%',
        title: 'Log In',
        top: '5%',
        layout: 'horizontal'

    });

    loginWin.add(logo);
    loginWin.add(loginUserBox);
    loginWin.add(loginPassBox);
    //loginWin.add(imgView);
    loginWin.add(loginBtn);
    loginWin.add(signupBtn);

    loginWin.open();
    /*
    if(loginUserBox != "" && loginPassBox !== ""){

    userLogin.login();

    }else{

    loginUserBox.value = "Username";
    loginPasswordBox.value ="Password";
    alert("please login");

    }

    */

    loginBtn.addEventListener('click', function() {

        if (loginUserBox.value == "" && loginPassBox.value == "") {

            alert("please check login details");

        } else {
            user.username = loginUserBox.value;
            user.password = loginPassBox.value;

            var loginUrl = "http://postmediax.appspot.com/login";
            var loginHttp = Titanium.Network.createHTTPClient();

            loginHttp.onload = function(e) {
                //handle response, which at minimum will be an HTTP status code

                if (this.responseText == '({"response":"login Password success"})') {
                    alert("success");
                    //loginWin.close();

                    lobby.createLobby();

                } else {


                    alert(this.responseText);

                }

            };

            loginHttp.onerror = function(e) {

                Ti.API.debug(e.error);
                alert('error');
            };



            loginHttp.open('POST', loginUrl);
            //loginHttp.setRequestHeader( 'Content-type', 'application/json' );

            loginHttp.send({

                user: loginUserBox.value,
                pass: loginPassBox.value

            });
        }
    }); //end of login event

    signupBtn.addEventListener('click', function() {

        var children = loginWin.getChildren();

        //remove childern nodes from window
        for (objects in children) {

            loginWin.remove(children[objects]);


        }

        var logo = Titanium.UI.createImageView({
            image: '/images/logo.png',
            left: '20%',
            top: "5%",
            layout: 'horizontal',
            center: true


        });
        


        var signupUsername = Titanium.UI.createTextField({
            left: '7%',
            top: '5%',
            layout: 'horizontal',
            backgroundColor: 'black',
            opacity: 0.5,
            width: '80%',
            height: '10%',
            color: 'white',
            value: "Username"



        });
        
signupUsername.addEventListener('click', function() {
 	
 	if(signupUsername.value == "Username"){
 		
 		signupUsername.value = "";
 		
 	}
 	
 });

        var signupPass = Titanium.UI.createTextField({
            left: '7%',
            top: '2%',
            layout: 'horizontal',
            color: 'white',
            value: "Password",
            backgroundColor: 'black',
            opacity: 0.5,
            width: '80%',
            height: '10%'
            

        });
        
signupPass.addEventListener('click', function() {
 	
 	if(signupPass.value == "Password"){
 		
 		signupPass.value = "";
 		
 	}
 	
 });


        signupEmail = Titanium.UI.createTextField({
            left: '7%',
            top: '2%',
            layout: 'horizontal',
            color: 'white',
            value: 'Email',
            backgroundColor: 'black',
            opacity: 0.5,
            width: '80%',
            height: '10%'

        });
        
signupEmail.addEventListener('click', function() {
 	
 	if(signupEmail.value == "Email"){
 		
 		signupEmail.value = "";
 		
 	}
 	
 });


        var picBtn = Titanium.UI.createButton({
            left: '7%',
            backgroundColor: 'black',
            opacity: 0.5,
            width: '80%',
            height: '10%',
            color: 'white',
            title: 'Picture',
            top: '2%',
            layout: 'horizontal'

        });


        var signup2Btn = Titanium.UI.createButton({
            left: '7%',
            backgroundColor: '#0099FF',
            opacity: 0.5,
            width: '80%',
            height: '10%',
            color: 'white',
            title: 'Sign up',
            top: '2%',
            layout: 'horizontal'

        });


        var loginBtn = Titanium.UI.createButton({
            backgroundColor: 'white',
            opacity: 0.5,
            color: 'black',
            fontSize: 16,
            width: '80%',
            height: '10%',
            title: 'Log In',
            top: '2%',
            left: '7%',
            layout: 'horizontal'


        });

        picBtn.addEventListener('click', function() {

            Titanium.Media.showCamera({
                success: function(event) {
                    // called when media returned from the camera
                    Ti.API.debug('Our type was: ' + event.mediaType);
                    if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

                        cameraImage = event.media;


                    } else {
                        alert("got the wrong type back =" + event.mediaType);
                    }
                },
                cancel: function() {
                    // called when user cancels taking a picture
                },
                error: function(error) {
                    // called when there's an error
                    var a = Titanium.UI.createAlertDialog({
                        title: 'Camera'
                    });
                    if (error.code == Titanium.Media.NO_CAMERA) {
                        a.setMessage('Please run this test on device');
                    } else {
                        a.setMessage('Unexpected error: ' + error.code);
                    }
                    a.show();
                },
                saveToPhotoGallery: true,
                // allowEditing and mediaTypes are iOS-only settings
                allowEditing: true,
                mediaTypes: [Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO]
            });

        });


        signup2Btn.addEventListener('click', function() {

            if (signupUsername.value == "" && signupPass.value == "" && signupEmail.value == "") {

                alert("please fill in all fields");

            } else {

                var newUserUrl = "http://postmediax.appspot.com/usr";

                var postHttp = Titanium.Network.createHTTPClient();

                postHttp.onload = function(e) {
                    //handle response, which at minimum will be an HTTP status code

                    if (this.responseText == '({"response":"Image Added"})') {

                        alert("success");

                        lobby.createLobby();

                    } else {


                        alert(this.responseText);

                    }

                };

                postHttp.onerror = function(e) {

                    Ti.API.debug(e.error);
                    alert('error');
                };



                postHttp.open('POST', newUserUrl);
                //loginHttp.setRequestHeader( 'Content-type', 'application/json' );

                postHttp.send({
                    file: cameraImage,
                    user: signupUsername.value,
                    pass: signupPass.value,
                    email: signupEmail.value
                });

            }

        });



        loginBtn.addEventListener('click', function() {

            var children = loginWin.getChildren();

            //remove childern nodes from window
            for (objects in children) {

                loginWin.remove(children[objects]);

                userLogin.page();

            }

        });

        loginWin.add(logo);
        loginWin.add(signupUsername);
        loginWin.add(signupPass);
        loginWin.add(signupEmail);
        loginWin.add(signup2Btn);
        loginWin.add(picBtn);
        loginWin.add(loginBtn);

    });



}; //end of login func

userLogin.page();


var lobby = {};
lobby.messages = [];
lobby.comments = [];

lobby.createLobby = function() {



    var tabGroup = Titanium.UI.createTabGroup();

    var win1 = Titanium.UI.createWindow({
        title: 'Tab 1',
        backgroundColor: '#fff',
        navBarHidden: true,
        fullscreen: false,
    });


    var win2 = Titanium.UI.createWindow({
        title: 'Tab 2',
        backgroundColor: '#fff',
        navBarHidden: true,
        fullscreen: false,
    });

    var tab1 = Titanium.UI.createTab({
        icon: 'KS_nav_ui.png',
        window: win1,
        title: 'Lobby',
        navBarHidden: true

    });

    var tab2 = Titanium.UI.createTab({
        icon: 'KS_nav_views.png',
        title: 'Post',
        window: win2,
        navBarHidden: true
    });

    postBtn = Titanium.UI.createButton({
        backgroundColor: 'black',
        width: '100%',
        height: '10%',
        title: 'Post',
        bottom: '0%'

    });

    postField = Titanium.UI.createTextField({
        backgroundColor: '#E0E0E0',
        width: '100%',
        height: '20%',
        bottom: '10%'

    });

    var backBtn = Titanium.UI.createButton({

        title: 'back',
        top: 10,
        left: 5,
        width: 100,
        height: 50
    });


    var lobbyUrl = "http://postmediax.appspot.com/lista";
    var loginHttp = Titanium.Network.createHTTPClient();

    var closeLobby = Titanium.UI.createButton({
        backgroundColor: 'black',
        width: '50%',
        height: '10%',
        title: 'close',
        bottom: '5%'

    });

    loginHttp.onload = function(e) {



        //handle response, which at minimum will be an HTTP status code

        var orignalReq = this.responseText;
        Titanium.API.info(orignalReq);

        var modifiedReq = orignalReq.replace(new RegExp('{"user"', "g"), '"user"');

        //Titanium.API.info(modifiedReq);
        var remLasBrc = modifiedReq.slice(0, -1);

        //Titanium.API.info(remLasBrc);
        remFirBrc = modifiedReq.slice(1);

        remFirBrc = JSON.parse(modifiedReq);
        //Titanium.API.info(remFirBrc[1].user);
        Titanium.API.info(remFirBrc);
        var lastMod = remFirBrc;

        lobby.messages.push(lastMod);
        // create tab group
        //Titanium.API.info("Messages array!!!" + " " +lastMod);

        var tbl_data = [];


        lobby.size = function(obj) {

            var size = 0,
                key;

            for (key in obj) {
                // if(obj.hasOwnProperty(key))size++;
                if (obj.hasOwnProperty(key)) {


                    size++;

                    Titanium.API.info(size);

                }
            }

        };


        lobby.size(lastMod);

        for (var i = 0; i < lobby.messages.length; i++) {

            for (var objects in lobby.messages[i]) {

                //assigning each JSON object within an array an incremental number, along with a new msgid property
                lobby.messages[i][objects].msgid = objects;

                var row = Ti.UI.createTableViewRow({
                    id: objects,
                    height: 100,
                    backgroundColor: '#F8F8F8'
                        //lobby.messages[0][objects].msgid

                });


                Titanium.API.info(lobby.messages[i]);

                var label = Ti.UI.createLabel({
                    left: '80',
                    color: '#000000',
                    text: lobby.messages[i][objects].message
                        //lastMod[objects].message

                });

                var profileImage = Ti.UI.createImageView({
                    left: 5,
                    image: "http://postmediax.appspot.com/img?img_id=" + lobby.messages[i][objects].image + ""
                        //lastMod[objects].image+""


                });

                var arrowImage = Ti.UI.createImageView({
                    right: 5,
                    image: '/images/arrow.png'
                        //lastMod[objects].image+""


                });

                row.add(profileImage);
                row.add(arrowImage);
                row.add(label);
                tbl_data.push(row);



                row.addEventListener('click', function() {


                    //alert(this.id);

                    //tempArray = [];

                    for (var i = 0; i < lobby.messages.length; i++) {

                        for (var objects in lobby.messages[i]) {

                            if (this.id == lobby.messages[i][objects].msgid) {

                                var currentId = lobby.messages[i][objects].id;
                                var currentImg = lobby.messages[i][objects].image;
                                var currentMsg = lobby.messages[i][objects].message;
                                //alert("worked" + " " + this.id);

                                //var currentMsg = lobby.messages[i][this.id];
                                //Titanium.API.info(currentMsg);
                                //tempArray.push(currentMsg);

                                //Titanium.API.info(tempArray[i].message);

                                var children = win1.getChildren();

                                //alert(win1.getChildren());
                                //Titanium.API.info("xxx:" + " "+tempArray[i].id);
                                //remove childern nodes from window
                                for (o in children) {

                                    win1.remove(children[o]);


                                }




                                image = Ti.UI.createImageView({

                                    top: "5%",
                                    left: "40%",
                                    image: "http://postmediax.appspot.com/img?img_id=" + currentImg + ""
                                });


                                label = Ti.UI.createLabel({

                                    top: "15%",
                                    left: 5,
                                    color: 'black',
                                    height: Ti.UI.SIZE,
                                    backgroundColor: "#00CC66",
                                    borderRadius: 10,
                                    textAlign: 'center',
                                    text: currentMsg
                                });

                                var cmtField = Titanium.UI.createTextField({

                                    id: currentId,
                                    width: '100%',
                                    color: 'white',
                                    backgroundColor: 'black',
                                    opacity: 0.5,
                                    height: '40%',
                                    bottom: '25%'


                                });

                                cmtBtn = Titanium.UI.createButton({
                                    backgroundColor: 'black',
                                    width: '100%',
                                    height: '30%',
                                    title: 'Comment',
                                    bottom: '0%'

                                });


                                win1.add(label);

                                //view.add(button);
                                win1.add(backBtn);
                                win1.add(image);


                                win1.add(cmtBtn);
                                win1.add(cmtField);



                            } // end of if

                        } //loop end

                    } // end of loop

                    backBtn.addEventListener('click', function() {



                        //delete previous entities/child objects
                        var children = win1.getChildren();
                        for (objects in children) {

                            win1.remove(children[objects]);


                        }

                        lobby.createLobby();

                    });

                    var getCmtUrl = "http://postmediax.appspot.com/listc?msgid=" + currentId;

                    var getCmtHttp = Titanium.Network.createHTTPClient();

                    getCmtHttp.onload = function(e) {

                        alert("fetched messages");
                        cmts = this.responseText;

                        var jsonCmts = JSON.parse(cmts);

                        //cmtsArray.push(cmts);


                        for (var key in jsonCmts.Comments) {

                            //alert(jsonCmts.Comments[key].time );

                            row = Ti.UI.createTableViewRow({

                                id: key,
                                height: 'auto',
                                left: 5
                                    //lobby.messages[0][objects].msgid

                            });


                            label = Ti.UI.createLabel({
                                left: 10,
                                backgroundColor: '#0066FF',
                                width: Ti.UI.SIZE,
                                height: Ti.UI.SIZE,
                                borderRadius: 10,
                                color: 'black',
                                top: 'auto',
                                bottom: 'auto',
                                text: jsonCmts.Comments[key].comment + " " + "\n" + jsonCmts.Comments[key].user + "\n" + jsonCmts.Comments[key].time


                            });




                            row.add(label);

                            row.add(cmtField);
                            row.add(cmtBtn);

                            //lobby.comments[-1] = row.add(label2);
                            //row.add(cmtBtn);
                            //row.add(usernametf);

                            lobby.comments.push(row);

                        } //end of loop

                        row.add(cmtField);
                        row.add(cmtBtn);

                        var table = Titanium.UI.createTableView({
                            data: lobby.comments,
                            top: 150,
                        });

                        win1.add(table);


                    };

                    getCmtHttp.onerror = function(e) {

                        Ti.API.debug(e.error);
                        alert('error');
                    };


                    getCmtHttp.open('GET', getCmtUrl);


                    getCmtHttp.send();


                    cmtBtn.addEventListener('click', function() {

                        if (cmtField.value == "") {

                            alert("please add some content");
                        } else {
                            var cmtUrl = "http://postmediax.appspot.com/cmt?user=" + user.username + "&comment=" + cmtField.value + "&msgid=" + cmtField.id + "";

                            var addCmtHttp = Titanium.Network.createHTTPClient();

                            addCmtHttp.onload = function(e) {
                                //handle response, which at minimum will be an HTTP status code

                                if (this.responseText == '({"response":"comment Added"})') {

                                    alert("success");



                                } else {


                                    alert(this.responseText);

                                }

                            };

                            addCmtHttp.onerror = function(e) {

                                Ti.API.debug(e.error);
                                alert('error');
                            };



                            addCmtHttp.open('GET', cmtUrl);
                            //loginHttp.setRequestHeader( 'Content-type', 'application/json' );

                            addCmtHttp.send();
                        }

                    });


                });



            }


        }
        // now assign that array to the table's data property to add those objects as rows
        var table = Titanium.UI.createTableView({
            data: tbl_data
        });

        win1.add(table);
        win2.add(postField);
        win2.add(postBtn);
        //
        // create controls tab and root window
        ///
        tabGroup.addTab(tab1);
        tabGroup.addTab(tab2);




    };

    loginHttp.open('GET', lobbyUrl);
    //loginHttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    loginHttp.send();

    tabGroup.open();

};
//lobby.createLobby();
//};//end of function object

postBtn.addEventListener('click', function() {

    if (postField.value == "") {

        alert("please add content");
    } else {
        var postUrl = "http://postmediax.appspot.com/msg?user=" + user.username + "&message=" + postField.value + "";

        var postHttp = Titanium.Network.createHTTPClient();

        postHttp.onload = function(e) {
            //handle response, which at minimum will be an HTTP status code

            if (this.responseText == '({"response":"login Password success"})') {
                alert("success");

                lobby.createLobby();

            } else {


                alert(this.responseText);

            }

        };

        postHttp.onerror = function(e) {

            Ti.API.debug(e.error);
            alert('error');
        };



        postHttp.open('GET', postUrl);
        //loginHttp.setRequestHeader( 'Content-type', 'application/json' );

        postHttp.send();

    }

});