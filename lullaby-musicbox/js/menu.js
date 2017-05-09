$(document).ready(() => {
	let menuOpen = false;
	$('.open-menu').click(() => {
		$('body').toggleClass('menu-opened');

		if(!menuOpen){
			cameraMoveInY();
	        cameraMoveInZ();
	        menuOpen = true;
		}
		else{
			cameraMoveOutY();
			cameraMoveOutZ();
			menuOpen = false;
		}
		return false;
	});
});