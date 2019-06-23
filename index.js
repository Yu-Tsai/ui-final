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
var cart_list = [];
var rand_list = [0,1,2,3,4];
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
const random_item_name = [
    "SALSA PINEAPPLE",
    "MEX CHILI PEPPER",
    "CHICKEN BURGER",
    "CHEESE BURGER",
    "FRANKFURTER"
]
const rand_item_ch_name = [
    "鳳梨莎莎起司牛肉堡",
    "墨西香椒起司牛肉堡",
    "黑膠起司雞腿堡",
    "黑膠起司牛肉堡",
    "德意志熱狗堡"
]
const rand_item_price = [
    100,
    100,
    100,
    100,
    100
]
const rand_item_pic = [
    "./menu/burger0.png",
    "./menu/burger1.png",
    "./menu/burger2.png",
    "./menu/burger3.png",
    "./menu/burger4.png"
]
const store_name = [
    "成大育樂店",
    "台南東寧店",
    "台北華山店"
]
const store_addr = [
    "台南市東區大學路1號",
    "台南市東區東寧路186號",
    "台北市中正區八德路一段"
]
const store_tel = [
    "06-2757575",
    "06-1234567",
    "02-2020202"
]
var rand_get = 0;
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
    $("#step-indicator" + A + "").html("✔");
    $("#step-indicator" + A + "").css({
        "color": "#ffffff",
        "background-color": "#87817d",
        "border": "2px solid #87817d"
    })
    //$("#step-indicator" + A + "").append("<img src=\".\/menu\/main-54.png\"/>");
}
function indicator_change(A) {
    $("#step-indicator" + A + "").css({
        "background-color": "#bc1f33",
        "color": "#ffffff",
        "border": "2px solid #bc1f33"
    })
}
function send_order() {
    checked(1);
    indicator_change(2);
    $("#login-modal").show();
    const hour = d.getHours();
    const minute = d.getMinutes();
    $("#date").html("" + day + "," + date + "/" + month + "/" + year + "<br>" + hour + ":" + minute + "");

    for (var i = 0; i < cart_list.length; i++) {
        $(".order-content").append("<div><p>" + cart_list[i].name + " × " + cart_list[i].num + "</p><p>$" + cart_list[i].price + " </p></div>");
        order_price += cart_list[i].price;
    }
    $("#order-price").html("$" + order_price + "");
}
function getmatrix(a,b,c,d,e,f){
    var aa=Math.round(180*Math.asin(a)/ Math.PI);
    var bb=Math.round(180*Math.acos(b)/ Math.PI);
    var cc=Math.round(180*Math.asin(c)/ Math.PI);
    var dd=Math.round(180*Math.acos(d)/ Math.PI);
    var deg=0;
    if(aa==bb||-aa==bb){
        deg=dd;
    }else if(-aa+bb==180){
        deg=180+cc;
    }else if(aa+bb==180){
        deg=360-cc||360-dd;
    }
    return deg>=360?0:deg;
}

//---------------------googlemap---------------------//
var map;
var mypos;
var shoppos = [
    { lat: 22.9999521, lng: 120.212858 },
    { lat: 22.9910402, lng: 120.2218868 },
    { lat: 25.0441303, lng: 121.5272108 }
];
var shopname = [
    "shop1",
    "shop2"
];
//var shopdistance = new google.maps.DistanceMatrixService();
var shopdistance = new Array();
var markers = new Array();
var infowin = new Array();
var infocontent1 = "<div class=\"infocontent\">" + "<span class=\"infotitle\">"
var infocontent2 = "</span>" + "<br>" + "<button class=\"infobutton\" type=\"button\">" + "choose" + "</button>" + "</div>";
var directionsService;
var directionsDisplay;

function initMap() {
    map = new google.maps.Map(document.getElementById('googlemap'), {
        center: { lat: 22.9999521, lng: 120.212858 },
        zoom: 15
    });

    infoWindow = new google.maps.InfoWindow;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({
        preserveViewport: true
    });
    directionsDisplay.setMap(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            mypos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(mypos);
            markers[0] = new google.maps.Marker({
                position: mypos,
                map: map
            });

            $(".store").each(function (index) {
                $(this).on('click', function () {
                    directionsService.route({
                        origin: mypos,
                        destination: shoppos[index],
                        travelMode: 'DRIVING'
                    }, function (result, status) {
                        for (i = 0; i < markers.length; i++) {
                            markers[i].setMap(null);
                        }
                        if (status == 'OK') {
                            directionsDisplay.setDirections(result);
                        } else {
                            alert(status);
                        }
                    });
                })
            })
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());    // Browser doesn't support Geolocation
    }

    function handleLocationError(browserHasGeolocation, infoWindow, mypos) {
        infoWindow.setPosition(mypos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    var i;
    for (i = 1; i <= shoppos.length; i++) {
        //(function (info) {
        infowin[i] = new google.maps.InfoWindow({
            content: infocontent1 + shopname[i - 1] + infocontent2
        });
        //}(infowin[i]));
        markers[i] = new google.maps.Marker({
            position: shoppos[i - 1],
            map: map,
        });
        /*(function (info, mark) {
            markers[i].addListener('click', function () {
                info.open(map, mark);
            });
        }(infowin[i], markers[i]));*/
    }

    
}
//---------------------googlemap---------------------//

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

        $("#random-modal").hide();
        $("#login-modal").hide();
        $("#checkout-modal").hide();

        $(".store-info").hide();

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
        indicator_change(1);
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
            $(".cart-content").append("<div class=\"in-cart-item\"><div>"+last_element.name+" × "+last_element.num+"</div><div class='item_cancel'>×</div><div>");
        }else{
            $(".cart-content").empty();
            for(var i=0; i<cart_list.length; i++){
                $(".cart-content").append("<div class=\"in-cart-item\"><div>" + cart_list[i].name + " × " + cart_list[i].num + "</div><div class='item_cancel'>×</div><div>")
            }
        }

        quantity= 1;
        $("#number").html(quantity);
    });
    $(".cart-content").on("click", ".item_cancel", function(){
        var temp= this.parentElement;/*something strange*/
        var i = 0;
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
            $(".cart-content").append("<div><div>"+last_element.name+" × "+last_element.num+"</div><div class='item_cancel'>×</div><div>");
        }else{
            $(".cart-content").empty();
            for(var i=0; i<cart_list.length; i++){
                $(".cart-content").append("<div><div>"+cart_list[i].name+" × "+cart_list[i].num+"</div><div class='item_cancel'>×</div><div>")
            }
        }
        quantity= 1;
        $("#recommend-number").html(quantity);
    });
    /*$(".cart-content").on("click", ".item_cancel", function(){
        var temp= this.parentElement;//something strange
        var i= 0;
        while((temp= temp.previousSibling)!=null){
            i++;
        }
        cart_list.splice(i, 1);
        this.parentElement.remove();
    });*/
    /*---random---*/
    $(".random-dish").click(function () {
        if (rand_list.indexOf($(".random-dish").index(this)) != -1) {
            $(this).css({ border: "2px solid #747373" });
            $(this).find("img").css({ opacity: "0.3" });
            rand_list.splice(rand_list.indexOf($(".random-dish").index(this)), 1);
            console.log(rand_list);
        } else {
            $(this).css({ border: "2px solid #229aa3" });
            $(this).find("img").css({ opacity: "1" });
            rand_list.push($(".random-dish").index(this));
            console.log(rand_list);
        }
    });
    $("#random-start").click(function(){
        deg_record += 720;
        /*$(".circles").find("div").css({
            transform: "rotate("+deg_record+"deg)",
            transition: "transform 3.5s ease"
        });*/
        $(".rotate-circle").each(function () {
            var origin_deg = eval('get' + $(this).css('transform')) + deg_record;
            console.log(origin_deg);
            $(this).css({
                transform: "rotate("+origin_deg+"deg)",
                transition: "transform 3.5s ease"
            });
        })
        rand_get = rand_list[Math.floor(Math.random() * rand_list.length)];
        setTimeout(function () {
            /*$("#random-modal").css({
                "display": "flex",
                "justify-content": "center"
            })*/
            $("#random-modal").show();
            /*$("#random-modal-pic").append("<img src=\"" + rand_item_pic[rand_get] + "\"\/>");
            $("#random-modal-pic > img").css({ "height": "100%", "width": "100%" });*/
            $("#random-modal-pic > img").attr("src", rand_item_pic[rand_get]);
            $("#random-modal-text p:nth-child(2)").html(random_item_name[rand_get]);
            $("#random-modal-text p:nth-child(3)").html(rand_item_ch_name[rand_get]);
            $("#random-modal-text p:nth-child(4)").html("$" + rand_item_price[rand_get]);
        }, 3500);
    });
    $("#random-modal").on("click", "#random-plus", function () {
        quantity++;
        $("#random-number").html(quantity);
    });
    $("#random-modal").on("click", "#random-minus", function () {
        if (quantity > 1) {
            quantity--;
            $("#random-number").html(quantity);
        }
    });
    $("#random-modal").on("click", "#random-add-to-cart", function () {
        var merge = false;
        for (var i = 0; i < cart_list.length; i++) {
            if (random_item_name[rand_get] == cart_list[i].name) {
                merge = true;
                cart_list[i].num += quantity;
                cart_list[i].price += (rand_item_price[rand_get] * quantity);
                break;
            }
        }
        if (merge == false) {
            cart_list.push(new item(random_item_name[rand_get], quantity, (rand_item_price[rand_get] * quantity)));
            var last_element = cart_list[cart_list.length - 1];
            $(".cart-content").append("<div><div>" + last_element.name + " × " + last_element.num + "</div><div class='item_cancel'>×</div><div>");
        } else {
            $(".cart-content").empty();
            for (var i = 0; i < cart_list.length; i++) {
                $(".cart-content").append("<div><div>" + cart_list[i].name + " × " + cart_list[i].num + "</div><div class='item_cancel'>×</div><div>")
            }
        }

        quantity = 1;
        $("#random-number").html(quantity);
        $("#login-modal").show();
    });
    $("#random-modal").on("click", "#random-modal-close", function () {
        $("#random-modal").hide();
    });
    /*---random---*/
    $(".step2-back").on('click', function () {
        $(".step2").hide();
        $(".step1").show();
        $(".method0, .method1, .method2").hide();
        $("#step-indicator0").html("1");
        indicator_change(0);
        $("#step-indicator1").css({
            "background-color": "",
            "color": "#87817d",
            "border": "2px solid #87817d"
        })
        /*$("#step-indicator0").css({
            "background-color": "#bc1f33",
            "color": "#ffffff",
            "border": "2px solid #bc1f33"
        })*/
        $(".cart-content").empty();
        for (var i = 0; i < cart_list.length; i++) {
            $(".cart-content").append("<div class=\"in-cart-item\"><div>" + cart_list[i].name + " × " + cart_list[i].num + "</div><div class='item_cancel'>×</div><div>");
        }
    })
    $(".cancel-order").on('click', function () {
        cart_list.splice(0, cart_list.length);
        $(".cart-content").empty();
    })

    /*---step 3 start---*/
    $(".send-order").click(function () {
        $("#login-modal").show();
        /*checked(1);
        //$(".step2").hide();
        $("#login-modal").show();
        /*$("#login-modal").css({
            "display": "flex",
            "justify-content": "center"
        })
        //$(".step3").show();
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
        day = day_name[day];
        const hour= d.getHours();
        const minute= d.getMinutes();
        $("#date").html(""+day+","+date+"/"+month+"/"+year+"<br>"+hour+":"+minute+"");

        for(var i=0; i<cart_list.length; i++){
            $(".order-content").append("<div><p>"+cart_list[i].name+" × "+cart_list[i].num+"</p><p>$"+cart_list[i].price+" </p></div>");
            order_price += cart_list[i].price;
        }
        $("#order-price").html("$"+order_price+"");*/
    });
    $("#cancel").on('click', function () {
        location.reload();
    })
    /*---step 3 end---*/
    $(".payment-term").each(function (index) {
        $("#payment" + index + "").hover(function () {
            $(this).css({
                background: "#ffffff",
                border: "3px solid #f5bf4c"
            });
            $("img", this).attr("src", "menu/payment" + index + "h.png");
        }, function () {
            if (payment_term != index) {
                $(this).css({
                    background: "#f3f4f8",
                    border: "3px solid transparent"
                });
                $("img", this).attr("src", "menu/payment" + index + ".png");
            }
        })
        $("#payment" + index + "").click(function () {
            $("#payment" + payment_term + " > img").attr("src", "menu/payment" + payment_term + ".png");
            $("#payment" + payment_term + "").css({
                background: "#f3f4f8",
                border: "3px solid transparent"
            });
            if (payment_term != index) {
                $("img", this).attr("src", "menu/payment" + index + "h.png");
                payment_term = index;
            } else {
                payment_term = null;
            }
        });
    });
    $("#checkout").on('click', function () {
        $("#checkout-modal").show();
        /*$("#checkout-modal").css({
            "display": "flex",
            "justify-content": "center"
        })*/
    })
    $("#modal-confirm-btn").on('click', function () {
        $("#checkout-modal").hide();
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
    $("#member-visitor").on('click', function () {
        $("#login-modal").hide();
        $(".step2").hide();
        $(".step3").show();
        send_order();
        //$(".sign-up-choose").hide();
        //$(".member-input").show();
    })
    $("#login-btn").on('click', function () {
        $("#login-modal").hide();
        $(".step2").hide();
        $(".step3").show();
        send_order();
        //$("#my-account").show();
    })
    $("#sign-up-btn").on('click', function () {
        $("#login-modal").hide();
        $(".step2").hide();
        $(".step3").show();
        send_order();
    })
    $("#login-close-btn").on('click', function () {
        $("#login-modal").hide();
    })
    /*---login end---*/

    //----------------map----------------//
    /*$(".store").on('click', function () {
        $(".store-info").show();
    })*/
    $(".store").each(function (index) {
        $(this).on('click', function () {
            $("#store-info-name").html(store_name[index]);
            $("#store-addr").html(store_addr[index]);
            $("#store-tel").html(store_tel[index]);
            $(".store-info").show();
        })
    })
    $("#store-info-close-btn").on('click', function () {
        $(".store-info").hide();
    })

    //--------------------new--------------------//
    $(".popular-item-btn").on('click', function () {
        changeesection(1);
    })
});
