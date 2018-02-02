/* ==========  ====================
Author : Nazeer Ahmed Mishkari
-----------------------------                                  
Version No : V28032016
-----------------------------                                 
Modified By : RAMESH
===========  ==================== */

// JavaScript Document

//header fixed
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
        $("#header").addClass("FixedHeader");
    } else {
        $("#header").removeClass("FixedHeader");
    }
});

$(document).ready(function(){
	
	//Select box
	function DropDown(el) {
				this.dd = el;
				this.placeholder = this.dd.children('span');
				this.opts = this.dd.find('.dropdown a');
				this.val = '';
				this.index = -1;
				this.initEvents();
			}
			DropDown.prototype = {
				initEvents : function() {
					var obj = this;

					obj.dd.on('click', function(event){
						$(this).toggleClass('active');
						return false;
					});

					obj.opts.on('click',function(){
						var opt = $(this);
						obj.val = opt.text();
						obj.index = opt.index();
						obj.placeholder.text(obj.val);
					});
				},
				getValue : function() {
					return this.val;
				},
				getIndex : function() {
					return this.index;
				}
			}

			$(function() {

				var dd = new DropDown( $('#dd, .wrapper-dropdown-3') );



			});
$('.nav-icon').click(function(e){
		$(this).toggleClass('open');
		
});			
// OFF CANVAS MENU
/*$('#menu')
	.mmenu({});*/
	$(function() {
				var $menu = $('nav#menu'),
					$html = $('html, body');

				$menu.mmenu({
					dragOpen: true
				});

				
			});
	
});

$( ".search" ).click(function() {
  	$(".searchResult" ).slideDown("slow") 
}); 
$( ".cancel" ).click(function() {
  	$(".searchResult" ).slideUp("slow") 
}); 
$( ".showDetails" ).click(function() {
  	$(".details" ).slideDown("slow") 
}); 

$(".preliminary").hide();
$(".showPreliminary").click(function() {
    if($(this).is(":checked")) {
        $(".preliminary").slideDown("slow") 
    } else {
        $(".preliminary").slideUp("slow") 
    }
});

// prelimilanry information search vehicle details
$(".showDetail").click(function() {
    if($(this).is(":checked")) {
        $(".lossDetail").slideDown("slow") 
    } else {
        $(".preliminary").slideUp("slow") 
    }
});

// upload file upload driver license right panel
//Reference: 
//http://www.onextrapixel.com/2012/12/10/how-to-create-a-custom-file-input-with-jquery-css3-and-php/
;(function($) {

		  // Browser supports HTML5 multiple file?
		  var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
		      isIE = /msie/i.test( navigator.userAgent );

		  $.fn.customFile = function() {

		    return this.each(function() {

		      var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
		          $wrap = $('<div class="file-upload-wrapper">'),
		          $input = $('<input type="text" class="file-upload-input" />'),
		          // Button that will be used in non-IE browsers
		          $button = $('<button type="button" class="file-upload-button">Select a File</button>'),
		          // Hack for IE
		          $label = $('<label class="file-upload-button" for="'+ $file[0].id +'">Select a File</label>');

		      // Hide by shifting to the left so we
		      // can still trigger events
		      $file.css({
		        position: 'absolute',
		        left: '-9999px'
		      });

		      $wrap.insertAfter( $file )
		        .append( $file, $input, ( isIE ? $label : $button ) );

		      // Prevent focus
		      $file.attr('tabIndex', -1);
		      $button.attr('tabIndex', -1);

		      $button.click(function () {
		        $file.focus().click(); // Open dialog
		      });

		      $file.change(function() {

		        var files = [], fileArr, filename;

		        // If multiple is supported then extract
		        // all filenames from the file array
		        if ( multipleSupport ) {
		          fileArr = $file[0].files;
		          for ( var i = 0, len = fileArr.length; i < len; i++ ) {
		            files.push( fileArr[i].name );
		          }
		          filename = files.join(', ');

		        // If not supported then just take the value
		        // and remove the path to just show the filename
		        } else {
		          filename = $file.val().split('\\').pop();
		        }

		        $input.val( filename ) // Set the value
		          .attr('title', filename) // Show filename in title tootlip
		          .focus(); // Regain focus

		      });

		      $input.on({
		        blur: function() { $file.trigger('blur'); },
		        keydown: function( e ) {
		          if ( e.which === 13 ) { // Enter
		            if ( !isIE ) { $file.trigger('click'); }
		          } else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
		            // On some browsers the value is read-only
		            // with this trick we remove the old input and add
		            // a clean clone with all the original events attached
		            $file.replaceWith( $file = $file.clone( true ) );
		            $file.trigger('change');
		            $input.val('');
		          } else if ( e.which === 9 ){ // TAB
		            return;
		          } else { // All other keys
		            return false;
		          }
		        }
		      });

		    });

		  };

		  // Old browser fallback
		  if ( !multipleSupport ) {
		    $( document ).on('change', 'input.customfile', function() {

		      var $this = $(this),
		          // Create a unique ID so we
		          // can attach the label to the input
		          uniqId = 'customfile_'+ (new Date()).getTime(),
		          $wrap = $this.parent(),

		          // Filter empty input
		          $inputs = $wrap.siblings().find('.file-upload-input')
		            .filter(function(){ return !this.value }),

		          $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

		      // 1ms timeout so it runs after all other events
		      // that modify the value have triggered
		      setTimeout(function() {
		        // Add a new input
		        if ( $this.val() ) {
		          // Check for empty fields to prevent
		          // creating new inputs when changing files
		          if ( !$inputs.length ) {
		            $wrap.after( $file );
		            $file.customFile();
		          }
		        // Remove and reorganize inputs
		        } else {
		          $inputs.parent().remove();
		          // Move the input so it's always last on the list
		          $wrap.appendTo( $wrap.parent() );
		          $wrap.find('input').focus();
		        }
		      }, 1);

		    });
		  }

}(jQuery));

$('input[type=file]').customFile();



// chat 
$('.chat').click(function(){
	$('.vam-chatting').slideDown();
});
$('.vam-chat-close').click(function(){
	$('.vam-chatting').slideUp();
});

// call back 
$('.phone').click(function(){
	$('.vam-CallBack').slideDown();
});
$('.vam-CallBack-close').click(function(){
	$('.vam-CallBack').slideUp();
});

// message 
$('.message').click(function(){
	$('.vam-message').slideDown();
	
});
$('.vam-message-close').click(function(){
	$('.vam-message').slideUp();
});

// Agent Profile
$(".vam-profile-user").click(function(e){
         $(".vam-profile-top").slideToggle();
         $(".vam-profile-top").offset({right:e.pageX,top:e.pageY});
})

$('[data-toggle="tooltip"]').tooltip()

//popover 
$('.popper').popover({
    container: 'body',
    html: true,
    content: function () {
        return $(this).next('.popper-content').html();
    }
});



$('.chat').click(function(){
	$(this).next('.vam-getcallBack').toggle();
});
$('.vam-chat-close').click(function(){
	$(this).parent().parent().parent('.vam-getcallBack').hide();									
});

//Payment
$(".Payment").hide();
    $("input[name$='Payment']").click(function() {
    var test = $(this).val();
        $(".Payment").hide();
        $("#Payment" + test).show();
});

/*$('.popper').popover({
    content: $('.popper-content').html(),
    html: true
}).click(function() {
    return $(this).popover('show');
});
*/

/*$(".vam-notification").click(function() {
 
  $(".retrive").show().animate({left: '-250px'});
  $(".quote").hide().animate();
});*/

// index retrive quote
    $('.vam-notification').click(function(){
    var hidden = $('.retrive');
    var right = $('.quote');
    if (hidden.hasClass('visible')){
        hidden.animate({"left":"1000px"}, "2000").removeClass('visible');
        right.animate({"left":"0px","opacity":"1"}, "2000");
		//$("html, body").animate({ scrollTop: 120 }, 500);
    } else {
        $("html, body").animate({ scrollTop: 0 }, 500);
        hidden.animate({ "left": "1000px" }, "2000").removeClass('visible');
        right.animate({ "left": "0px", "opacity": "1" }, "2000");
        //hidden.animate({"left":"0px","paddingLeft":"15px","paddingRight":"15px"}, "2000").addClass('visible');
		//right.animate({"left":"1000px","opacity":"0"}, "2000");
    }
    });
	
// retrive quote email or quote
  $('.eMail').click(function(){
		
	$('.email').slideDown();
	$('.eMail').addClass('active');
	$('.quotenumber').slideUp();
	$('.quoteNumber').removeClass('active');
	
});
$('.quoteNumber').click(function(){
	$('.email').slideUp();
	$('.eMail').removeClass('active');
	$('.quotenumber').slideDown();
	$('.quoteNumber').addClass('active');
	
}); 



// vehicle carousel	
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:2,
            nav:false
        },
        1000:{
            items:2,
            nav:true,
            loop:false
        },
		
		1300:{
            items:4,
            nav:true,
            loop:false
        }
    }
})


$('.owl-carousel1').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:2,
            nav:false
        },
        1000:{
            items:4,
            nav:true,
            loop:false
        },
		
		1300:{
            items:4,
            nav:true,
            loop:false
        }
    }
})

$('.owl-carousel2').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:2,
            nav:false
        },
        1000:{
            items:4,
            nav:true,
            loop:false
        },
		
		1300:{
            items:6,
            nav:true,
            loop:false
        }
    }
})

/*$('.vam-profile-user').click(function(){
	$('.vam-profile-top').slideToggle();
});*/

//select Vehicle
$(".vam-VehicleList input:checkbox").change(function(){
	  $(this).parent().parent().parent().toggleClass('selected', this.checked);
});


$('.vam-fixedTH').slimScroll({});

// VIEW POLICY TAB SCROLLER
/*var hidWidth;
var scrollBarWidths = 40;
var items=0;
var widthOfList = function(){
  var itemsWidth = 0;
  $('.list li').each(function(){
    var itemWidth = $(this).outerWidth();
    itemsWidth+=itemWidth;
  });
  return itemsWidth;
};

var widthOfHidden = function(){
  return (($('.scroll-wrap').outerWidth())-widthOfList()-getLeftPosi())-scrollBarWidths;
};

var getLeftPosi = function(){
  return $('.list').position().left;
};

var reAdjust = function(){
  if (($('.scroll-wrap').outerWidth()) < widthOfList()) {
    $('.scroller-right').show();
  }
  else {
    $('.scroller-right').hide();
  }
  
  if (getLeftPosi()<0) {
    $('.scroller-left').show();
  }
  else {
    $('.item').animate({left:"-="+getLeftPosi()+"px"},'slow');
  	$('.scroller-left').hide();
  }
}

reAdjust();

$(window).on('resize',function(e){  
  	reAdjust();
});
var scrollcount=0;
$('.scroller-right').click(function() { 
  $('.scroller-left').fadeIn('slow');
 //$('.scroller-right').fadeOut('slow');
var hiddenwidth=widthOfHidden();
if(hiddenwidth<=0)
{
  if(scrollcount<=$('.list li').length)
  {
  $('.list').animate({left:"+="+-($('.list li:eq('+scrollcount+')').outerWidth())+"px"},'slow',function(){
  });
  scrollcount+=1;
  }
} 
});

$('.scroller-left').click(function() {
  //debugger;
	$('.scroller-right').fadeIn('slow');
	//$('.scroller-left').fadeOut('slow');
	reAdjust();
   scrollcount-=1;
  if(scrollcount>=0)
  {
	  
  	$('.list').animate({left:"-="+-($('.list li:eq('+scrollcount+')').outerWidth())+"px"},'slow',function(){
  	
  	});
  }
	
}); */ 
// VIEW POLICY TAB SCROLLER END

	



