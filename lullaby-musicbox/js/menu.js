$(document).ready(() => {
	let menuOpen = false;

	instructionsMenuOpenClose = function instructionsMenuOpenClose() {
		if(!menuOpen){
			if(!isZoomed) {
				$('body').toggleClass('menu-opened');
				moveIn();
	        }
	        else {
				$('body').toggleClass('menu-opened-zoomed');

	        }
	        menuOpen = true;
		}
		else{
			if(!isZoomed){
				$('body').toggleClass('menu-opened');
				moveOut();
			} else{
				$('body').toggleClass('menu-opened-zoomed');
			}
			menuOpen = false;
		}
		return false;
	}

	$('#open-menu').click(instructionsMenuOpenClose);
});