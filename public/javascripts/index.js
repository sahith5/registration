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
        $("#not-signedin").hide();
        $("#signedin").show();
        $("#welcomeUser").html("welcome  "+userObject.getCurrentUserName());

    }
    else
    {  
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
    var username=$("#username").val();
    var password=$("#password").val();
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
)




$('#logout').on('click',function()
{
    userObject.removeCurrentUser()
    signedin(false);
})


$('#reg').on('click',function()
{

    location.href="../register.html"

})


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
            console.log(data.error)
            toastr.info(data.error);
        }


    }



    })




})

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





