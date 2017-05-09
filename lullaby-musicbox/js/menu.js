$(document).ready(() => {
	let menuOpen = false;

	$('.open-menu').click(() => {

		if(!menuOpen){
			if(!isZoomed) {
				$('body').toggleClass('menu-opened');
				cameraMoveInY();
		        cameraMoveInZ();
	        }
	        else {
				$('body').toggleClass('menu-opened-zoomed');

	        }
	        menuOpen = true;
		}
		else{
			if(!isZoomed){
				$('body').toggleClass('menu-opened');
				cameraMoveOutY();
				cameraMoveOutZ();
			} else{
				$('body').toggleClass('menu-opened-zoomed');
			}
			menuOpen = false;
		}
		return false;
	});
});