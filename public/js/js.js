			
			
			function getTheme() {
				if(localStorage.getItem('theme') === 'false') {
					$('body').addClass('night');
					$('.content, .pageTitle, .backToReading, .statusBar, .task').addClass('night');		
				}
				else {
					$('body').removeClass('night');
					$('.content, .pageTitle, .backToReading, .statusBar, .task').removeClass('night');
				}
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
			
			
