// const { remove } = require("../../backend/model/register");
// 









var userObject = {
    saveUserInLocalStorage : function(userJson){
        window.localStorage.setItem('currentUser', JSON.stringify(userJson));
    },
    removeCurrentUser: function(){
        window.localStorage.removeItem('currentUser');
    },
    getCurrentUser : function(){
        return window.localStorage.getItem('currentUser');
    },
    getCurrentUserName : function(){
        var curUserString = this.getCurrentUser();
        if(curUserString){
            j=JSON.parse(curUserString)
            return j.user;
        }
        return "";
    },
    getcurrentrole : function()
    {
        var curUserrole = this.getCurrentUser();
        if(curUserrole){
            j=JSON.parse(curUserrole)
            return j.role;
        }
        return ""; 
    },
    isUserLoggedIn : function(){
        if(this.getCurrentUser()==null)
            return false;
        else
        return true;
            
}
};





var signedin=function(x) {


    if(x)
    {
        console.log("signed in 11 ")
        $('#initial').hide()
        console.log(userObject.getcurrentrole());
        if(userObject.getcurrentrole()=='customer')
        {
            $('#customer').show()
            $('#owner').hide()

        }
        else{
            $('#customer').hide()
            $('#owner').show()


        }


        // $("#not-signedin").hide();
        // $("#signedin").show();
        $("#welcomecustomer").html("welcome"+"  "+userObject.getCurrentUserName());

        $("#welcomeowner").html("welcome"+"  "+userObject.getCurrentUserName());




    }
    else
    {  
        $('#customer').hide();
        $('#owner').hide();
    $('#initial').show();
    $("#not-signedin").show();
    $("#signedin").hide();
       

    }
    
}


if(userObject.isUserLoggedIn())
{
    signedin(true);
}
else{
    signedin(false);
}



$("#loginb").on("click",function()
{    
    var role=$("#role").val();
    var username=$("#username").val();
    var password=$("#password").val();
    if(role=="custumer")
    {

        console.log("custumer");
            var obj={username:username,password:password}


            $.ajax({
                type:"post",
                data:obj,
                url:"https://regiistration.herokuapp.com/login",
                success:function(data)
                {
                    if(data)
                    {
                        console.log(data);
                    userObject.saveUserInLocalStorage(data)
                    signedin(true);

                    }
                    else
                    {
                        toastr.info("invalid password or username")
                        console.log(false);
                        signedin(false);
                    }

                }
            })
    }
    else
    {
        console.log('owner login');
        var obj={name:username,password:password}
        console.log(obj);
        $.ajax({
            type:"post",
            data:obj,
            url:"https://regiistration.herokuapp.com/owner/login",
            success:function(data)
            {
                if(data)
                {
                console.log(data);
                userObject.saveUserInLocalStorage(data)
                signedin(true);

                }
                else
                {
                    toastr.info("invalid password or username")
                    console.log(false);
                    signedin(false);
                }

            }
        })

    }

}
)



$('#customerlogout').on('click',function()
{

    console.log("logged out");
    userObject.removeCurrentUser()
    gapi.auth2.getAuthInstance().signOut().then(function() {
        console.log('user signed out')
      })
      signedin(false);
   
    
})



$('#logout1').on('click',function()
{

    console.log("logged out");


    userObject.removeCurrentUser()


    gapi.auth2.getAuthInstance().signOut().then(function() {
        console.log('user signed out')
      })
      signedin(false);


    
})


$('#reg').on('click',function()
{

    location.href="../register.html"

})


$("#registerowner").on('click',function()
{
    location.href="../kiranaregister.html"
})

//////////////////////////////////////////////////////////////////////////////////////

$('#register').on('click',function()
{

    var username=$("#username").val()
    
    var email=$("#emailid").val()

    
    var role=$("#role").val()

    var password=$("#password").val()


    var r={email:email,username:username,password:password,role:role};


    $.ajax({

     type:"post",

     url:"https://regiistration.herokuapp.com/register",

     data:r,

     success:function(data)
     {

        if(data.success)
        {
            console.log(data);
            signedin(true);
            userObject.saveUserInLocalStorage(data)
            location.href="../index.html"
        }
        else
        {
            toastr.info("error");
            console.log(data.error)
            toastr.info(data.error);
        }
    }
    })
})

////////////////////////////////////////////////////////////////////////////////////////////




$('#registershop').on('click',function()
{

// /email:String,
// name:String,
// shopname:String,
// password:String,

    var name=$("#username").val()
    var email=$("#emailid").val()    
    var password=$("#password").val()
    var shopname=$("#shopname").val()

var r={email:email,name:name,password:password,shopname:shopname};

    $.ajax({

     type:"post",

     url:"https://regiistration.herokuapp.com/kirana/register",

     data:r,

     success:function(data)
     {

        if(data.success)
        {
            console.log(data);
            signedin(true);
            userObject.saveUserInLocalStorage(data)
            location.href="../index.html"
        }
        else
        {
            toastr.info("error");
            console.log(data.error)
            toastr.info(data.error);
        }
    }
    })
})








/////////////////////////////////////////////////////////////////////////////////////////////
$("#todo").on('click',function()
{
if(userObject.isUserLoggedIn())
{
    location.href="../todo.html"
}

})

$('#addtodo').on('click',function()
{
    var tasks=$('#task').val();
    $.ajax(
        {
            type:"post",
            url:"https://regiistration.herokuapp.com/addtodo",
            data:{user:userObject.getCurrentUserName(),tasks:tasks},
            success:function(success)
            {
                console.log(success);
            }
        }
    )
})



/////////////////////////////////////////////////////////////////////////////////
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var username=profile.getName();
    var email=profile.getEmail();
    console.log("call came");
    $.ajax({
        type:"post",
        data:{username:username,role:'user',email:email},
        url:"https://regiistration.herokuapp.com/google/login",
        success:function(data)
        {
  console.log(data);
            if(data.success)
            {
                toastr.info("user signed in");
                userObject.saveUserInLocalStorage({user:username,role:"customer"});
                console.log(data);
                signedin(true);

            }
            else
            {
                console.log(data.error);
            }


        }
    })

}




