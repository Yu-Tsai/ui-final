var section= 0;
var initial= 0;
var dishpage= 0;
var orderbtns;
var dish_num;
var recommend_orderbtns;
var recommend_dish_num;
var deg_record= 0;
var quantity=1;
var order_price= 0;
var cart_list=[];
var member_btn;
const item_name=[
    "SALSA PINEAPPLE",
    "MEX CHILI PEPPER",
    "CHICKEN BURGER",
    "CHEESE BURGER",
    "FRANKFURTER",
    "STIEGL BEER",
    "COLDBREW COFFEE",
    "HOUSE HOT COFFEE"
]
const item_price=[
    100,
    100,
    100,
    100,
    100,
    150,
    150,
    150
]
const recommend_item_name=[
    "SALSA PINEAPPLE",
    "CHICKEN BURGER",
    "MEX CHILI PEPPER"
]
const recommend_item_price=[
    100,
    100,
    100
]
var payment_term;

const d = new Date();
const year = d.getFullYear();
const month = d.getMonth() + 1;
const date = d.getDate();
var day = d.getDay();
const day_name = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
day = day_name[day];

function item(name, num, price){
    this.name= name;
    this.num= num;
    this.price= price;
}
function changeesection(num){
    if(section!=num){
        $("#section"+section+"").hide();
        $("#section"+num+"").show();
        if(section==1 || section==2 || section==3){
            $("#indicator"+section+"").empty();
            $("#sectionbtn"+section+"").css("background", "#bc1f33");
        }
        section=num;
        if(section==1 || section==2 || section==3){
            $("#indicator"+section+"").append( "<div class='triangle'></div>" )
            $("#sectionbtn"+section+"").css("background", "#961e23");
        }
    }
}
function checked(A){
    $("#step-indicator"+A+"").html("✔");
}

$(document).ready(function(){
    if(initial==0){
        /*initial setting*/
        for(i=0; i<4; i++){
            $("#section"+(i+1)+"").hide();
        }
        $(".nav-list").hide();
        
        $(".step2, .step3").hide();
        $(".method0, .method1, .method2").hide();

        $("#dish-page-trigger0").css("background", "#f1f2f7");
        $("#dish-page1, #dish-page2").hide();

        $(".member-input").hide();
        $(".sign-up-choose").hide();
        $("#my-account").hide();

        orderbtns= $(".order-btns").detach();
        recommend_orderbtns= $(".recommend-order-btns").detach();

        initial=1;
    }

    $(".btnL").hover(function(){
        $(this).css({ "background": "#961e23", "cursor": "pointer" });
    }, function(){
        $(".btnL").each(function(index){
            if((index+1)!=section){
                $(this).css("background", "#bc1f33");
            }
        });
    });
    $("#sectionbtn0").click(function(){
        changeesection(0);
    });
    $("#sectionbtn1").click(function(){
        changeesection(1);
    });
    $("#sectionbtn2").click(function(){
        changeesection(2);
    });
    $("#sectionbtn3").click(function(){
        changeesection(3);
    });
    $("#sectionbtn4").click(function(){
        changeesection(4);
    });
    
    /*--responsive nav bar start--*/
    /*
    $(window).resize(function() {
        if ($(window).innerWidth() < 1180) {
            
            $(".navbtn").css("width", "100%");
            $(".nav-list").show();
            $(".navbtn, .navleft, .navright").css({ "flex-direction": "column" });
            $(".btnL").css({ "border-left": "none", "border-top": "2px solid #961e23" });
            $(".btnR").css({ "width": "280px", "border-top": "2px solid #961e23" });
            $(".indicator").hide();
            for(i=1; i<5; i++){
                $("#sectionbtn"+i+"").click(function(){
                   
                });
            }
        }
        else {
            $(".navbar").append($(".navbtn").detach());
            $(".navbtn").css("width", "calc(100vw - 280px)");
            
            $(".nav-list").hide();
            $(".navbtn, .navleft, .navright").css({ "flex-direction": "row" });
            $(".btnL").css({ "border-top": "none", "border-left": "2px solid #961e23" });
            $(".btnR").css({ "width": "60px", "border-top": "none"});
            $(".indicator").show();
        }
    });
    $(".nav-list").click(function(){
        $(".nav-straight").animate({left: '0px'}, "fast");
    });
    $(".cross img").click(function(){
        $(".nav-straight").animate({left: '-295px'}, "fast");
    });
    */
    /*responsive nav bar end--*/

    $(".method-trigger").each(function(index){
        $("#method-trigger"+index+"").hover(function(){
            $("#method-trigger"+index+" > div").css("background", "#bc1f33");
            $("#method-trigger"+index+" > div > img").attr("src", "menu/method"+index+"h.png");
        }, function(){
            $("#method-trigger"+index+" > div").css("background", "#f3f4f8");
            $("#method-trigger"+index+" > div > img").attr("src", "menu/method"+index+".png");
        });
    });

    $(".method-trigger").click(function(){
        checked(0);
        $(".step1").hide();
        $(".step2").show();
    }).each(function(index){
        $("#method-trigger"+index+"").click(function(){
            $(".method"+index+"").show();
        });
    });
    
    $(".dish-page-trigger").hover(function(){
        $(this).css({ "background": "#f1f2f7", "cursor": "pointer" });
    }, function(){
        $(".dish-page-trigger").each(function(index){
            if(index!=dishpage){
                $("#dish-page-trigger"+index+"").css("background", "transparent");
            }
        });
    });

    $(".dish-page-trigger").each(function(index){
        $("#dish-page-trigger"+index+"").click(function(){
            if(index!=dishpage){
                $("#dish-page-trigger"+dishpage+"").css("background", "transparent");
                $("#dish-page-trigger"+index+"").css("background", "#f1f2f7");

                $("#dish-page"+dishpage+"").hide();
                $("#dish-page"+index+"").show();

                dishpage= index;
            }
        });
    });
 
    $(".dish").each(function(index){
        $("#dish"+index+"").hover(function(){
            orderbtns.show();
            if(index!=dish_num){
                $(this).append(orderbtns);
                orderbtns.show();
                dish_num= index;
            }
        }, function(){
            orderbtns.hide();
            quantity= 1;
            $("#number").html(quantity);
        });
    });
    $(".recommend-dish").each(function(index){
        $("#recommend-dish"+index+"").hover(function(){
            recommend_orderbtns.show();
            if(index!=recommend_dish_num){
                $(this).append(recommend_orderbtns);
                recommend_orderbtns.show();
                recommend_dish_num= index;
            }
        }, function(){
            recommend_orderbtns.hide();
            quantity= 1;
            $("#recommend-number").html(quantity);
        });
    });

    /*---random rotate start old---*/
    /*
    $(".random-cover > img").click(function(){
        var deg= Math.floor(Math.random()*5)*72;
        $(".random > img").css({
            transform: "rotate("+(deg_record+720+deg)+"deg)",
            transition: "transform 2.5s"
        });
        deg_record += 720+deg;
    });
    */
    /*---random ratate end old---*/

    $(".dish").on("click", "#plus", function(){
        quantity++;
        $("#number").html(quantity);
    });
    $(".dish").on("click", "#minus", function(){
        if(quantity > 1){
            quantity--; 
            $("#number").html(quantity);
        }
    });
    $(".dish").on("click", "#add-to-cart", function(){
        var merge= false;
        for(var i=0; i<cart_list.length; i++){
            if(item_name[dish_num]==cart_list[i].name){
                merge= true;
                cart_list[i].num += quantity;
                cart_list[i].price += (item_price[dish_num]*quantity);
                break;
            }
        }
        if(merge==false){
            cart_list.push(new item(item_name[dish_num], quantity, (item_price[dish_num]*quantity)));
            var last_element= cart_list[cart_list.length - 1];
            $("#cart-content").append("<div><div>"+last_element.name+" × "+last_element.num+"</div><div class='item_cancel'>×</div><div>");
        }else{
            $("#cart-content").empty();
            for(var i=0; i<cart_list.length; i++){
                $("#cart-content").append("<div><div>"+cart_list[i].name+" × "+cart_list[i].num+"</div><div class='item_cancel'>×</div><div>")
            }
        }

        quantity= 1;
        $("#number").html(quantity);
    });
    $("#cart-content").on("click", ".item_cancel", function(){
        var temp= this.parentElement;/*something strange*/
        var i= 0;
        while((temp= temp.previousSibling)!=null){
            i++;
        }
        cart_list.splice(i, 1);
        this.parentElement.remove();
    });
    $(".recommend-dish").on("click", "#recommend-plus", function(){
        quantity++;
        $("#recommend-number").html(quantity);
    });
    $(".recommend-dish").on("click", "#recommend-minus", function(){  
        if(quantity > 1){
            quantity--;
            $("#recommend-number").html(quantity);
        }
    });
    $(".recommend-dish").on("click", "#recommend-add-to-cart", function(){
        var merge= false;
        for(var i=0; i<cart_list.length; i++){
            if(recommend_item_name[recommend_dish_num]==cart_list[i].name){
                merge= true;
                cart_list[i].num += quantity;
                cart_list[i].price += (item_price[recommend_dish_num]*quantity);
                break;
            }
        }
        if(merge==false){
            cart_list.push(new item(recommend_item_name[recommend_dish_num], quantity, (item_price[recommend_dish_num]*quantity)));
            var last_element= cart_list[cart_list.length - 1];
            $("#recommend-cart-content").append("<div><div>"+last_element.name+" × "+last_element.num+"</div><div class='item_cancel'>×</div><div>");
        }else{
            $("#recommend-cart-content").empty();
            for(var i=0; i<cart_list.length; i++){
                $("#recommend-cart-content").append("<div><div>"+cart_list[i].name+" × "+cart_list[i].num+"</div><div class='item_cancel'>×</div><div>")
            }
        }
        quantity= 1;
        $("#recommend-number").html(quantity);
    });
    $("#recommend-cart-content").on("click", ".item_cancel", function(){
        var temp= this.parentElement;/*something strange*/
        var i= 0;
        while((temp= temp.previousSibling)!=null){
            i++;
        }
        cart_list.splice(i, 1);
        this.parentElement.remove();
    });
    /*---random---*/
    $(".random-dish").click(function(){
        $(this).css({ border: "2px solid #747373" });
        $(this).find("img").css({ opacity: "0.3" });
    });
    $("#random-start").hover(function(){
        $(this).css({ cursor: "pointer"});
    }).click(function(){
        deg_record += 720;
        $(".circles").find("div").css({
            transform: "rotate("+deg_record+"deg)",
            transition: "transform 3.5s ease"
        });
    });
    
    /*---random---*/
    /*---step 3 start---*/
    $(".send-order").click(function(){
        checked(1);
        $(".step2").hide();
        $(".step3").show();
        /*const d= new Date();
        const year= d.getFullYear();
        const month= d.getMonth()+1;
        const date= d.getDate();
        var day= d.getDay();
        const day_name=[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ]
        day = day_name[day];*/
        const hour= d.getHours();
        const minute= d.getMinutes();
        $("#date").html(""+day+","+date+"/"+month+"/"+year+"<br>"+hour+":"+minute+"");

        for(var i=0; i<cart_list.length; i++){
            $(".order-content").append("<div><p>"+cart_list[i].name+" × "+cart_list[i].num+"</p><p>$"+cart_list[i].price+" </p></div>");
            order_price += cart_list[i].price;
        }
        $("#order-price").html("$"+order_price+"");
    });
    $("#cancel").on('click', function () {
        location.reload();
    })
    /*---step 3 end---*/
    $(".payment-term").hover(function(){
        $(this).css({
            background: "#ffffff",
            border: "3px solid #f5bf4c",
            cursor: "pointer"
        });
    }, function(){
        $(".payment-term").each(function(index){
            if(payment_term!= index){
                $("#payment"+index+"").css({
                    background: "#f3f4f8",
                    border: "3px solid transparent"
                });
            }
        });
    }).each(function(index){
        $("#payment"+index+"").click(function(){
            $("#payment"+payment_term+" > img").attr("src", "menu/payment"+payment_term+".png");
            $("#payment"+payment_term+"").css({
                background: "#f3f4f8",
                border: "3px solid transparent"
            });
            $("#payment"+index+" > img").attr("src", "menu/payment"+index+"h.png");
            payment_term= index;
        });
    });
    $("#checkout").on('click', function () {
        $("#checkout-modal").css({
            "display": "flex",
            "justify-content": "center"
        })
    })
    $("#modal-confirm-btn").on('click', function () {
        /*$("#checkout-modal").css({
            "display": "none"
        })*/
        /*changeesection(0);*/
        location.reload();
    })
    $("#checkout-close-btn").on('click', function () {
        location.reload();
    })
    /*---login begin---*/
    $("#login-trigger").click(function(){
        $(this).css({ color: "#ad1b2e" });``
        /*member_btn= $("#phone-input, #email-input").detach();*/
        $("#new-user-trigger").css({ color: "#cdcdcd" });
        $(".login-input").show();
        $(".member-input").hide();
        $(".sign-up-choose").hide();
    });
    $("#new-user-trigger").click(function(){
        $(this).css({ color: "#ad1b2e" });
        $("#login-trigger").css({ color: "#cdcdcd" });
        /*$(".member-input").append(member_btn);*/
        $(".login-input").hide();
        $(".sign-up-choose").show();
    });
    $("#member-sign-up").on('click', function () {
        $(".sign-up-choose").hide();
        $(".member-input").show();
    })
    $("#login-btn").on('click', function () {
        $(".member-viewport").hide();
        $("#my-account").show();
    })
    /*---login end---*/
});