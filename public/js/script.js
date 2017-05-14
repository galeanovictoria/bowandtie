$(onLoaded);
        
        function onLoaded(e) {
            getInstagrameData();
             
            $('.parallax-window2').parallax({imageSrc: './assets/heroimg.png'});
            
            $('#nav-icon3').on('click', function(){
                $(this).toggleClass('open');
            });
            
            $('#simple-menu').sidr();
            
            $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
                $(this).toggleClass('open');
	       });
            
            var map;

    function initMap() {
                
        var myLatLng = {lat: -36.850841, lng: 174.768739};
        
        map = new google.maps.Map(document.querySelector(".map-container"), {
            center: {
                lat: -36.850841,
                lng: 174.768739
            },
            zoom: 18,
            scrollwheel:  false
        });
        
        var contentString = '<div id="mapcontent">'+
            '<h2>Bow and Tie</h2>'+
            '<h4>Micro Roastery</h4>'+
            '<p>Entrance to Albert Park - Princes St.</p>'+
            '<p>Monday to Friday: 8am - 3pm</p>'+
            '</div>';

        var marker = new google.maps.Marker({
            position: myLatLng,
            animation: google.maps.Animation.DROP,
            map: map,
            title: 'Bow and Tie'
        });
        
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        
        marker.addListener('click', toggleBounce);
        }
       function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
       
       $('a[href*="#"]:not([href="#"])').click(function(e) {
           if (e.currentTarget.id === 'simple-menu'){
               return;
           }
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
          
      },{duration:1000, complete: function(){$.sidr("close", "sidr");}});
      return false;
    }
  }
});
       
       function getInstagrameData() {
    var instagramURL = 'https://api.instagram.com/v1/users/self/media/recent?access_token=';
    var accessToken = '4214358389.1677ed0.30797489bcae499898127d4fc419bf5e';

    $.ajax({
        url: instagramURL + accessToken,
        dataType: 'jsonp',
        type:'GET',
        error: function () {
            console.log("ERROR")
        },
        success: function (result) {
            console.log("success")
           // debugger;
            var photos = result.data;
            for (var i=0; i<photos.length; i++){
                if (i === 12){break;}
                var photo = photos[i];
                var imgsrc = photo.images.standard_resolution.url;
                var imglink = photo.link;
//                console.log(photos);
                $('<li><a href="' + imglink + '">' + '<img class="instaimg" src="' + imgsrc + '"></a></li>').appendTo('.photos');
            }
        }
    })
}
        }