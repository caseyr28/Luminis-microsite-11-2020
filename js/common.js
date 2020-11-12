/*
Theme Name: Luminis Health by Mikael D.
Theme URI:
Author: Mikael D.
Author URI: http://flexart.net
Description: Custom built
Version: 1.0
License: All rights reserved.
License URI: 
Tags: Custom built
Text Domain:
*/





/*
	@ Video Modal
	
	@ Example:
		
		- Uses Default options:
		<a class="btn1 lbm" href="https://player.vimeo.com/video/395093184" target="_blank">Watch our video</a>
		
		- With added options:
		<a class="btn1 lbm" lbv-data='{"data":"https://player.vimeo.com/video/395093184","attr":"style=max-width:800px;max-height:600px;height:100%;width:100%;"}' href="#" target="_blank">Watch our video</a>
		

	@ Developer
	- Mikael D.
*/

function lbv(i){
	var i=i||{};
	
	var trigger=i['trigger']||'.lbm';
	var lbm=$(trigger);
	var bdy=$('body');
	
	// The lbox html
	var lb_html=
	$(
	'<div class="lbv">'+
		'<div class="inner">'+
			'<div class="x"></div>'+
			'<div class="media">'+
			'</div>'+
		'</div>'+
		'<div class="over"></div>'+
	'</div>'
	);
	
	lbm.click(function(e){
		e.preventDefault();

		var _this=$(this);
		var data=_this.attr('lbv-data')||'{"data":false,"attr":"style=width:100%;height:100%;"}';

		data=JSON.parse(data);
		if(data['data']===undefined||data['data']==false){data['data']=_this.attr('href')||false;}
		
		// In case the A tag is wrapped in container that has the Trigger class
		if(data['data']==false){_this.find('>a');data['data']=_this.find('>a').attr('href')||false;}
		
		
		// Clear previous modal-box
		bdy.find('.lbv').remove();
		
		if(data['data']!=false){
			var _lb_html=lb_html.clone();
			
			_lb_html.find('.media').html('<iframe '+data['attr']+' frameborder="0" allow="autoplay; fullscreen" allowfullscreen src="'+data['data']+'"></iframe>');
			_lb_html.addClass('active');
			
			// Close ( X )
			_lb_html.find('.x').click(function(){_lb_html.removeClass('active');});
			
			// Show/Add the Modal HTML
			bdy.append(_lb_html);
		}
		
	});
	
}






/*
	@ Teams Block
		- Functionality for the Teams Modal and details
	
	@ Developer
		- Mikael D.
*/

function blocks_team(i){
	var i=i||{};

	var bdy=$('body');
	var trigger=$(i['trigger']);
	if(trigger.length==0){trigger=$('.about_team .team-member-entry');}
	
	if(trigger.length>0){
		
		// The lbox html
		var lb_html=
		$(
		'<div class="lbteam">'+
			'<div class="inner">'+
				
				'<div class="c1">'+
					'<div class="img"></div>'+
				'</div>'+
				
				'<div class="c2">'+
					'<div class="inner">'+
						'<div class="header">'+
							'<div class="name"></div>'+
							'<div class="title"></div>'+
						'</div>'+
						'<div class="description"></div>'+
					'</div>'+
				'</div>'+
				
				'<div class="x"></div>'+
			'</div>'+
			'<div class="over"></div>'+
		'</div>'
		);
		
		trigger.click(function(e){
			e.preventDefault();

			var _this=$(this);
			
			var data={
				'image':_this.find('.image').html(),
				'name':_this.find('.name').html(),
				'title':_this.find('.title').html(),
				'description':_this.find('.description').html(),
			};
			
			var _lb_html=lb_html.clone();
			
			_lb_html.find('.c1 .img').html(data['image']);
			_lb_html.find('.c2 .name').html(data['name']);
			_lb_html.find('.c2 .title').html(data['title']);
			_lb_html.find('.c2 .description').html(data['description']);
			_lb_html.addClass('active');
			
			// Close ( X )
			_lb_html.find('.x').click(function(){_lb_html.removeClass('active');});
			
			// Clear previous modal-box
			bdy.find('.lbteam').remove();
			
			// Show/Add the Modal HTML
			bdy.append(_lb_html);
			
		});
		
	}
	
}



/*
	Creates carousel using the Slick JS script
	
	@ Notes:
		- Needs slick.js to function
		
	@ Options
		- Add each one of the options as TAG to the wrapper container ( <div class="carousel" -slides-to-show="2" ... ><div class="slides">...</div></div> )
			- "-slides-to-show" or "slides-to-show" - Number
			- "-slides-to-scroll" or "slides-to-scroll" - Number
			- "-responsive" or "responsive" - Object with Breakpoints - see the code below for example, default is 600, 450. Pass empty object to ignore the default.
			- "-adaptive-height" or "adaptive-height" - Boolean, True / False ( default is TRUE )
			
	@ HTML example:

		- <div class="carousel" slides-to-show="3" slides-to-scroll="2">
				<div class="slides">
					<div> <!-- Each slide is wrapped in <div> -->
						<div class="img"><img src="/protected/extensions/kcfinder/upload/files/slide-1.jpg" /></div>
						<div class="description">Showcase post title</div>
					</div>
				</div>
			
				<div class="controls"> <!-- Optional controls -->
					<div class="prev">&nbsp;</div>
					<div class="dots"><span>&nbsp;</span></div>
					<div class="next">&nbsp;</div>
				</div>
			</div>
			
	@ Example:
		- block_carousel(i)
	
	@ Developer:
		- Ken Wheeler ( See the JS files for credits )
		- Mikael D. ( settings, function wrapper and styling )
*/

function block_carousel(i){
	var i=i===undefined?{}:i;
	var carousels=i['carousel']===undefined?$('.carousel'):$(i['carousel']);
	var dots_total_out_of=i['dots-total-out-of']===undefined?false:i['dots-total-out-of'];
	//var slides=i['slides']===undefined?$('.slides'):$(i['slides']);
	//var slides_entries=i['entries']===undefined?slides.find('>div'):slides.find(i['entries']);

	// Each carousel
	carousels.each(function(){
		
		var _this=$(this);
		//var slides=_this.find('.slides');
		//var slides_entries=slides.find('>div');

		var slides=i['slides']===undefined?_this.find('.slides'):_this.find(i['slides']);
		var slides_entry=i['entry']===undefined?slides.find('>div'):slides.find(i['entry']);
		
		var arrows_show=true;
		var dots_show=true;
		
		// Default settings
		var settings={
			'-slides-to-show':1,
			'-slides-to-scroll':1,
			'-responsive':[
			
					{
						breakpoint:600,
						settings:{
							slidesToShow:1,
							slidesToScroll:1
						}
					}

			],
			'-adaptive-height':true,
			'-dots-total-out-of':false
		};
		
		settings['-slides-to-show']=(_this.attr('-slides-to-show')||_this.attr('slides-to-show'))===undefined?
		settings['-slides-to-show']:parseInt(_this.attr('-slides-to-show'))||parseInt(_this.attr('slides-to-show'));
		
		settings['-slides-to-scroll']=(_this.attr('-slides-to-scroll')||_this.attr('slides-to-scroll'))===undefined?
		settings['-slides-to-scroll']:parseInt(_this.attr('-slides-to-scroll'))||parseInt(_this.attr('slides-to-scroll'));
		
		settings['-responsive']=(_this.attr('-responsive')||_this.attr('responsive'))===undefined?
		settings['-responsive']:_this.attr('-responsive')||_this.attr('responsive');
		
		settings['-adaptive-height']=(_this.attr('-adaptive-height')||_this.attr('adaptive-height'))===undefined?
		settings['-adaptive-height']:(_this.attr('-adaptive-height')||_this.attr('adaptive-height'))=="false"?false:true;
		
		settings['-dots-total-out-of']=(_this.attr('-dots-total-out-of')||_this.attr('dots-total-out-of'))===undefined?
		settings['-dots-total-out-of']:(_this.attr('-dots-total-out-of')||_this.attr('dots-total-out-of'))=="true"?true:false;
		
		
		// Each carousel - Slides
		if(slides.length>0){

			// Carousel set-up
			var controls=_this.find('.controls');
			var dots=controls.length>0?controls.find('.dots'):false;
			var prev=controls.length>0?controls.find('.prev'):false;
			var next=controls.length>0?controls.find('.next'):false;
			
			
			slides.on('afterChange', function(){
				slides.slick('setPosition');
			});
			
			if(settings['-dots-total-out-of']==true||dots_total_out_of==true){
				slides.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
					//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
					var i = (currentSlide ? currentSlide : 0) + 1;
					dots.text(i + '/' + slick.slideCount);
				});
			}
			
			
			// Video pause when you scroll away not the next or previous slide
			if(prev){prev.add(next).add(dots).click(function(){
				slides.find('video').each(function(){
					$(this).get(0).pause();
				});
			});}

			
			// Should be display slide controls? ( If only 1 slide is available, don't display Arrows and Dots )
			if(slides_entry.length==1){
				arrows_show=false;
				dots_show=false;
				if(controls.length>0){controls.hide();}
			}						
			
			// Init the main Carousel ( not the zoomed version )
			slides.slick({
				accessibility:true,
				slidesToShow:settings['-slides-to-show'],
				slidesToScroll:settings['-slides-to-scroll'],
				infinite:true,
				touchMove:true,
				arrows:arrows_show,
				appendDots:dots,
				prevArrow:prev,
				nextArrow:next,
				dots:dots_show,
				adaptiveHeight:settings['-adaptive-height'],
				variableWidth:false,
				autoplay:true,
				autoplaySpeed:6000,
				pauseOnHover:true,
				responsive:settings['-responsive']
			});
		
		}
	
	});
	
}





/*
	@ Header Menu 
	
	@ Developer:
		- Mikael D.
*/
function hmenu(){
	var wrapper=$('.header .mm');
	var trigger=wrapper.find('>.inner >.ico');

	trigger.click(function(e){
		wrapper.toggleClass('active');
	});
}



/*
	@ In-Page scroll 
	
	@ Developer:
		- Mikael D.
*/
function inscroll(i){
	var i=i||{};
	var offset=i['offset']||0;
	var inpagescroll=i['inpagelnk']===undefined?$('.inpagelnk'):false;
	
	if(inpagescroll!=false){
		inpagescroll.click(function(e){
			e.preventDefault();

			var _this=$(this);
			var scrollhere=_this.attr('rel');
			
			scrollto({'el':'#'+scrollhere,'offset':offset});
			
		});
	}
}



/*
	@ Scroll to
	
	@ Notes:
		- Will scroll to given DOM element
	
	@ Developer:
		- Mikael D.

*/

function scrollto(i){
	
	var el=i['el']||false;
	var speed=i['speed']||500;
	var offset=i['offset']||0;
	
	if(el!==false){
		
		if(typeof(el)!=='object'){el=$(el);}

		if(el.length>0){
			var elpos=el.offset();			
			$('html,body').animate({scrollTop:elpos.top+offset},speed,function(){});
		}
		
	}
	
}

/*
	@ Alert
	
	@ Will display alert message at the top of the page. Cookie based so it won't show again once you close it.
	
	@ Developer:
		- Mikael D.
*/
function alert(){
	var mc=$('.mc');
	var amsg=$('.amsg');
	if(amsg.length>0){
		
		var status=cookie_get('alertmsg');
		amsg.find('.x').click(function(){
			cookie_set('alertmsg',1)
			mc.removeClass('alert');
		});
		
		if(status==1){mc.removeClass('alert');}
		else{mc.addClass('alert');}
	}
}


/*
	@ Is-Secure Cookie
	
	@ Developer:
		- Mikael D.
*/
function cookie_issec(){return window.location.protocol.indexOf("https") >= 0;}


/*
	@ Set Cookie
	
	@ Developer:
		- Mikael D.
*/

function cookie_set(cname, cvalue, exdays, path) {
  var d = new Date();
  var secure = (cookie_issec()) ? ";secure" : "";
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  var vpath = "";
  if (path != "undefined") {
    vpath = "; path=" + path;
  }
  cookieInfo = cname + "=" + cvalue + secure + "; ";
	
  //if 0 is passed then don't set the expirey date, let it set as a session cookie.
  if (exdays == 0) {
    cookieInfo += vpath;
  } else {
    cookieInfo += expires + vpath;
  }
  document.cookie = cookieInfo;
}

/*
	@ Get Cookie
	
	@ Developer:
		- Mikael D.
*/
function cookie_get(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/*
	@ Console output
	
	@ Developer:
		- Mikael D.
*/

function cl(i){console.log(i);}