

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

			$('document').ready(function(){
				$('.logo').click(function() {
					sidebar();
				});
				getSidebar();
			});