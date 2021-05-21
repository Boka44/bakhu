$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
        $("#submit").text("Sending...");
    }
});

function submitNewsletterForm() {
    var email = $("#email").val();

    $.ajax({
        method: "POST",
        url: "/hubspot/subscriber",
        data: JSON.stringify({
            email: email
        }),
        // dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success : function(data){
            if (data.success == true){
                formSuccess1();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var message = $("#message").val();
    var jobTitle = $("#jobTitle").val();
    var company = $("#company").val();
    var liquidity = $("#liquidity").val();

    $.ajax({
        method: "POST",
        url: "/contact",
        data: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            message: message,
            jobTitle: jobTitle,
            company: company,
            liquidity: liquidity
        }),
        // dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success : function(data){
            if (data.success == true){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess1(){
    submitMSG(true, "Message Submitted!")
    $("#submit").text("Sent");
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
    $("#submit").text("Sent");
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
    $("#submit").text("Failed");
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}