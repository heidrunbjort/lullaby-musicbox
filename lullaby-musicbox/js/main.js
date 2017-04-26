window.onload = function (event) {
    
    // Some variables we will be using later
    var camera, scene, renderer;
    var controls;
    var element, container;
    var speed;
    
    // A clock to keep track of time in a convenient way
    var clock = new THREE.Clock();
    
    // Initialize the scene, cameras, objects
    init();
    
    // Start animating (updates and render)
    render();

    function init() {
        
        // Create render, append canvas to the DOM
        renderer = new THREE.WebGLRenderer({ antialias: true, });
        element = renderer.domElement;
        document.body.appendChild(element);
        
        // Create scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        
        // Create camera and position it in space
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
        camera.position.set(0, 90, 0)
        camera.lookAt(new THREE.Vector3(0, -50, -150));
        scene.add(camera);

      	var light1 = new THREE.AmbientLight( 0x404040, 4 ); // soft white light
      	light1.position.set(0, 0, -300 );
		 scene.add( light1 );
		// var light2 = new THREE.PointLight( 0xff0000, 1, 200 );
		// light2.position.set( 50, 50, 50 );
		// scene.add( light2 );
        
		var spotLight = new THREE.SpotLight( 0xffffff, 0.2 );
		spotLight.position.set( 10, 70, 70 );

		spotLight.castShadow = true;

		spotLight.shadow.mapSize.width = 1024;
		spotLight.shadow.mapSize.height = 1024;

		spotLight.shadow.camera.near = 500;
		spotLight.shadow.camera.far = 4000;
		spotLight.shadow.camera.fov = 30;

		scene.add( spotLight );

        // Allows navigating the scene via mouse



  //       controls = new THREE.OrbitControls(camera, element);
  //        controls.target.set(
		//     camera.position.x + 0.1,
		//     camera.position.y,
		//     camera.position.z
		    
		// );



        // Add the cube
        // var cubeGeometry = new THREE.CubeGeometry(50, 50, 50);
        // var cubeMaterial = new THREE.MeshPhongMaterial();
        // cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        // scene.add(cube);
        // cube.position.set(0, 0, 0);


        	//loada jsonloader
			// var loader = new THREE.JSONLoader();
			// loader.load("obj/box24.json", function(geometry, materials){
			// 	console.log("jeee");
			// 	var obj = new THREE.Mesh(geometry, materials);
			// 	obj.scale.set(1,1,1);
			// 	obj.position.set(-10, -20, 0);
			// 	scene.add(obj);
			// 	console.log(obj);
			// });

			// var loader = new THREE.ObjectLoader();
			// loader.load("obj/box25.json", function(obj){
			// 	obj.scale.set(1,1,1);
			// 	obj.position.set(0,0,0);
			// 	scene.add(obj);
			// 	console.log(obj);
			// })

			//þetta virkar með fyrra boxinu
			var loader = new THREE.ObjectLoader();

			loader.load("obj/mnota5.json", function(obj){
				obj.scale.set(3.5, 3.5, 3.5);
				obj.position.set(30, -100, -150);
				 obj.rotation.x = Math.PI / 0.2;
				 //obj.rotation.y = Math.PI * 1.97;
				//obj.rotation.z = Math.PI * 2.0;
				scene.add(obj);

				// obj.addEventListener("dblclick", function{
				// 	camera.position.set()
				// })
			});

        // document.addEventListener("mousedown", function(e){
        //     console.log("blabla");
        //   // camera.position.set(-100,-100, -100),
        // camera.lookAt(scene.position);
        //   camera
        // },false);
        
        // Add surrounding
        var surroundingGeometry = new THREE.CubeGeometry(200,400,600);
        var loader = new THREE.TextureLoader();
        loader.load('blatt.jpg', function(texture) {
            var surroundingMaterial = new THREE.MeshBasicMaterial({ 
                map: texture, side: THREE.DoubleSide 
            });
            var surroundingBox = new THREE.Mesh( surroundingGeometry, surroundingMaterial );
            surroundingBox.position.y = 100;
            scene.add( surroundingBox );
        });
        
        // Adjust everything in case there is a window resize
        window.addEventListener('resize', handleResize);
        
        // Set up these adjustments for the first time right away
        setTimeout(handleResize, 1);
        
    }


    // var raycaster = new THREE.Raycaster();
    // var mouse = new THREE.Vector2();

    // function onMouseMove(e){
    // 	mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    // 	mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    // 	console.log(raycaster);
    // 	console.log(mouse); 
    // }
    // Render loop
    function render() {
    	//raycaster.setFromCamera(mouse, camera);
        requestAnimationFrame(render);
        renderer.render(scene, camera);
       
        //controls.update();
    }
    

    // Adjust sizes on window resize
    function handleResize() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

window.cm = function() {
      	cameraMoveInY();
        cameraMoveInZ();
    }
window.cn = function(){
	cameraMoveOutY();
	cameraMoveOutZ();
}
    
    function cameraMoveInY() {
        
        var y = 0;
        var controlReached = false;
        camera.updateProjectionMatrix();
        var move = setInterval(function() {
            
            // Check if we need to stop the animation
            if ( controlReached && (camera.position.y <= 80) ) {
                clearInterval(move);
            }
            
            // Increase modifier
            y+=0.1;

            // Move camera a little bit
            camera.position.y = (Math.sin(y) * 40) + 90;
            console.log(camera.position);
            if (camera.position.y > 80) {
                controlReached = true;
            }
            camera.lookAt(new THREE.Vector3(0, -50, -150));
        }, 100);
        
    }
    
    function cameraMoveInZ() {
        
        var z = 0;
        var controlReached = false;
        
        var move = setInterval(function() {
            
            // Increase modifier
            z +=0.05;

            // Move camera a little bit
            camera.position.z = (Math.sin(z) * 150 * -1);
            console.log(camera.position);
            if (camera.position.z < -145) {
                clearInterval(move);
            }
            
        }, 100);
        
    }

    //-----------------------------------------------------------------

     function cameraMoveOutY() {
        
        var y = 0;
        var controlReached = false;
        camera.updateProjectionMatrix();
        var move = setInterval(function() {
            
            // Check if we need to stop the animation
            if ( controlReached && (camera.position.y >= 50) ) {
                clearInterval(move);
            }
            
            // Increase modifier
            y+=0.1;

            // Move camera a little bit
            camera.position.y = (Math.sin(y) * 40) + 90;
            
            if (camera.position.y < 51) {
                controlReached = true;
            }
            console.log(camera.position);
            camera.lookAt(new THREE.Vector3(0, -50, -150));
        }, 100);
        
    }
    
    function cameraMoveOutZ() {
        
        var z = 0;
        var controlReached = false;
        
        var move = setInterval(function() {
            
            // Increase modifier
            z -=0.05;

            // Move camera a little bit
            camera.position.z = (Math.sin(z) * 150);
            console.log(camera.position);
            if (camera.position.z <= 0) {
                clearInterval(move);
            }
            
        }, 100);
        
    }
    
}
