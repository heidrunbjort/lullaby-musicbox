$(document).ready(function(){

	$('.open-menu').click(function () {
	console.log("halo")
	$('body').toggleClass('menu-opened');
		if("menu-opened"){
			cameraMoveInY();
            cameraMoveInZ();
		}
		else{
			cameraMoveOutY()
			cameraMoveOutZ();
		}
		return false;

	});
		
});