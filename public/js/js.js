			
			
			function getTheme() {
				if(localStorage.getItem('theme') === 'false') {
					$('body').addClass('night');
					$('.content, .pageTitle, .backToReading, .statusBar, .task').addClass('night');		
				}
				else {
					$('body').removeClass('night');
					$('.content, .pageTitle, .backToReading, .statusBar, .task').removeClass('night');
					$('.bookField').css("font-size", localStorage.getItem('size'));
					$('.bookField').css("font-family", localStorage.getItem('fontFamily'));
					$('.bookField').css("color", localStorage.getItem('color'));
					$('.readBook').css("background", localStorage.getItem('background'));
					$('.readBook').css('color', localStorage.getItem('color'));
				}
				//for example

			}
			
			function getSidebar() {
				if(localStorage.getItem('asideVisi') === 'true') {
					$('aside').addClass("asideVisible");
					$('.logo').attr("src","../public/img/arrow_reverse.png");
				
				}
				else {					
					$('aside').removeClass("asideVisible");
					$('.logo').attr("src","../public/img/arrow.png");	
					
				}
			}
			
			function changeTheme() {
				if(localStorage.getItem('theme') === 'false') {
					$('body').removeClass('night');
					$('.content, .pageTitle, .backToReading, .statusBar, .task').removeClass('night');
					localStorage.setItem('theme', 'true'); 
					
				}
				else {				
					$('body').addClass('night');
					$('.content, .pageTitle, .backToReading, .statusBar, .task').addClass('night');
					localStorage.setItem('theme', 'false'); 
					
				}
				
			}
			
			$('document').ready(function(){		

			
				getTheme();
				getSidebar();
				
				$('.nd').click(function(){
					changeTheme();
				});
				$('.fullscreen').click(function(){
					document.documentElement.requestFullScreen();
				});
				$('.logo').click(function() {
					sidebar();
				});
				
			});
			
			function fullscreen(element) {
			  if(element.requestFullScreen) {
				element.requestFullScreen();
			  } else if(element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			  } else if(element.webkitRequestFullScreen) {
				element.webkitRequestFullScreen();
			  }
			}
			function addBookmark() {
				$(".formBookmark").addClass("addBookmark");
			}
			function showInfoBook() {
				$(".formBookInfo").addClass("showBookInfo");
			}
			
			function sidebar() {
				if(localStorage.getItem('asideVisi') === 'true') {					
					$('aside').removeClass("asideVisible");
					$('.logo').attr("src","../public/img/arrow.png");					
					localStorage.setItem('asideVisi', 'false');
					
				}
				else {
					$('aside').addClass("asideVisible");
					$('.logo').attr("src","../public/img/arrow_reverse.png");					
					localStorage.setItem('asideVisi', 'true');
					
				}
			}
