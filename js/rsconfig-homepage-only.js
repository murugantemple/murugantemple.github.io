var mySwiper;
var galleryThumbs;

/* USED BY BOTTOM ROLLING GALLERY ON HOMEPAGE */
function loadSlider() {
    galleryThumbs = new Swiper('.gallery-thumbs1', {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });

    mySwiper = new Swiper ('.gallery-top1', {
        // Optional parameters
        direction: 'horizontal',
        speed: 300,
        loop: true,

        autoplay: {
            delay: 9000,
        },

        autoHeight: true,

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        //thumbs: {
        //  swiper: galleryThumbs,
        //  slideToClickedSlide: true,
        //}
    });

    //mySwiper.controller.control = galleryThumbs;
    //galleryThumbs.controller.control = galleryTop;
}

var rndNumSI = Math.floor(Math.random() * 100000);
var imgPrefixPath1 = '/slider-images/?rnd='+ rndNumSI;

jQuery(document).ready(function() {
    // Fetch all slides from server /slider-images/

    var imgFilesDirectory = imgPrefixPath1;
    var str = '';

    // get auto-generated page 
    $.ajax({url: imgFilesDirectory}).then(function(html) {
        // create temporary DOM element
        var document = $(html);

        // find all links ending with .jpg 
        document.find('a[href$=".jpg"], a[href$=".png"]').each(function() {
            var jpgName = $(this).text();
            var jpgUrl = $(this).attr('href');
            var newJpgUrl = '/slider-images/' + jpgUrl.replace(/slider-images/g, 'slider-images');

            str += '<li class="touchcarousel-item"><img src="' + newJpgUrl + '" width="400"/></li>';

        });

        $('#carousel1body').prepend(str);
        
        $("#carousel1").touchCarousel({
            autoplay: true,
            loopItems: true,
            autoplayDelay:3000,
            itemsPerMove: 3,     
        });
    });

});

/* ===================================================================== */

/* USED BY TOP BANNERS ON HOME PAGE */

var bannerHrefLinks = "{}";

function loadJSONLinksFromFile() {
    var rndNum = Math.floor(Math.random() * 100000);
    var jsonFile = '/banner-images/bannerlinksfile.json?rnd='+ rndNum;
    return $.ajax({url: jsonFile});
}

function fetchImgList() {
    var rndNum = Math.floor(Math.random() * 100000);
    var imgFilesDirectory = '/banner-images/?rnd='+ rndNum;
    return $.ajax({url: imgFilesDirectory});
}


var imgPrefixPath2 = '/banner-images/';
jQuery(document).ready(function() {
    // Load the links file for banners
    var bannerHrefLinks = "{}";

    $.when(loadJSONLinksFromFile(), fetchImgList()).done( function(a1, a2) {
        bannerHrefLinks = a1[0];
        // create temporary DOM element
        var document = $(a2[0]);
        // find all links ending with .jpg 
        var str = '';
        document.find('a[href$=".jpg"], a[href$=".png"]').each(function() {
            var jpgName = $(this).text();
            var jpgUrl = $(this).attr('href');
            var newJpgUrl = imgPrefixPath2 + jpgUrl.replace(/banner-images/g, 'banner-images');
            var hrefBeginPortion = '';
            var hrefEndPortion = '';
            $(bannerHrefLinks).each(function( i, val ) {
                filename = val['filename'];
                linkUrl = val['link'] + '?rnd=' + Math.floor(Math.random() * 100) + 1;
                target = val['target'];
                //console.log(jpgUrl.toLowerCase() + " =?= " + filename.toLowerCase());
                //console.log(jpgUrl.toLowerCase().indexOf(filename.toLowerCase()));
                if (jpgUrl.toLowerCase().indexOf(filename.toLowerCase()) > -1) {
                    hrefBeginPortion = "<a href=\"" + linkUrl + "\" target=\"" + target + "\" >";
                    hrefEndPortion = '</a>';
                }
            });
            
            str += '<div class="rsContent">' + hrefBeginPortion + '<img class="rsImg" src="' + newJpgUrl + '"/>' + hrefEndPortion + '</div>';

        });

        $('#sliderone').prepend(str);

        $("#sliderone").royalSlider({
            // options go here
            // as an example, enable keyboard arrows nav
            keyboardNavEnabled: true,
            autoScaleSlider: true, 
            autoScaleSliderWidth: 1660,     
            autoScaleSliderHeight: 465,
            imageScaleMode: 'fit',
            loop: true,
            loopRewind: true,
            autoPlay: {
              // autoplay options go gere
              enabled: true,
              pauseOnHover: true,
              delay: 10000,
            },
        });
    });
});

