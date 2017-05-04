window.onload = function (event) {
    
    // Some variables we will be using later
    let camera, scene, renderer;
    var controls;
    let element, container;
    let speed;
    let mouse, raycaster;
    const clickObjects = [];

    // A clock to keep track of time in a convenient way
    const clock = new THREE.Clock();
    
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
        camera.position.set(0, 0, 0)
        camera.lookAt(new THREE.Vector3(0, -50, -150));
        scene.add(camera);

        const light1 = new THREE.AmbientLight( 0x404040, 6 ); // soft white light
        light1.position.set(0, 0, 0 );
         scene.add( light1 );
        // var light2 = new THREE.PointLight( 0xff0000, 1, 200 );
        // light2.position.set( 50, 50, 50 );
        // scene.add( light2 );
        
        const spotLight = new THREE.SpotLight( 0xffffff, 0.2 );
        spotLight.position.set( 10, -120, 70 );

        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;

        scene.add( spotLight );

        // Allows navigating the scene via mouse



        // controls = new THREE.OrbitControls(camera, element);
        //  controls.target.set(
        //     camera.position.x + 0.01,
        //     camera.position.y,
        //     camera.position.z
            
        // );

            //þetta virkar með fyrra boxinu
            var loader = new THREE.ObjectLoader();

            loader.load("obj/mnota5.json", (obj) =>{
                obj.scale.set(3.5, 3.5, 3.5);
                obj.position.set(15, -100, -150);
                obj.rotation.x = 180 * (Math.PI / 180);
                obj.rotation.y = 1.2 * (Math.PI / 180) * -1;
                 //obj.rotation.y = Math.PI * 1.97;
                //obj.rotation.z = Math.PI * 2.0;
                scene.add(obj);

                scene.traverse(function(children){

                    clickObjects.push(children);
                    //console.log(clickObjects);
                    console.log(clickObjects[31]);
                })
                
            });

        let isFarNear = true;
        

        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();

        document.addEventListener('dblclick', onDocumentMouseDown, false);

        function onDocumentMouseDown(event){
            event.preventDefault();

            mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
            mouse.y = (event.clientY / renderer.domElement.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(clickObjects);

            if(intersects.length > 0 && isFarNear == true){
                cameraMoveInY();
                cameraMoveInZ();
                isFarNear = false;

            }

            else if(intersects.length > 0 && isFarNear == false){
                cameraMoveOutY();
                cameraMoveOutZ();
                

                // if(intersects.lenght == clickObjects[31]){
                //  console.log("cylender clicked");
                // }
                isFarNear = true;
            }
        }


window.lk  = function(){
    rotateCylender();
}
function rotateCylender(){
        requestAnimationFrame(rotateCylender);
         // clickObjects[31].rotation.z += Math.PI / 180;
         clickObjects[31].rotateOnAxis(new THREE.Vector3(0,0,0.05), Math.PI / 180 * 3);
        }
     


        
        // Add surrounding
        const surroundingGeometry = new THREE.CubeGeometry(200,400,600);
        var loader = new THREE.TextureLoader();
        loader.load('img/blatt.jpg', (texture) =>{
            const surroundingMaterial = new THREE.MeshBasicMaterial({ 
                map: texture, side: THREE.DoubleSide 
            });
            const surroundingBox = new THREE.Mesh( surroundingGeometry, surroundingMaterial );
            surroundingBox.position.y = 100;
            scene.add( surroundingBox );
        });
        
        // Adjust everything in case there is a window resize
        window.addEventListener('resize', handleResize);
        
        // Set up these adjustments for the first time right away
        setTimeout(handleResize, 1);
        
    }

    document.addEventListener('keyboard', keyboard, false);

    function keyboard(){
        switch(event.keyCode){
            case 0: 

        }
    }


    // Render loop
    function render() {

        requestAnimationFrame(render);
        renderer.render(scene, camera);
        // controls.update();

    }
    

    // Adjust sizes on window resize
    function handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

//     window.cm = function() {
//         cameraMoveInY();
//         cameraMoveInZ();
//     }
//     window.cn = function(){
//         cameraMoveOutY();
//         cameraMoveOutZ();
// }
    function cameraMoveInY() {
        
        let y = 0;
        let delta = 50;
        let controlReached = false;
        const move = setInterval(() => {
            
            // Check if we need to stop the animation
            if ( controlReached && (camera.position.y <= 15) ) {
                clearInterval(move);
            }
            
            // Increase modifier
            y += 0.08;

            // Move camera a little bit
            camera.position.y = Math.sin(y) * delta;
            //console.log(camera.position.y);
            
            if (camera.position.y > 15) {
                console.log('Y finished');
                controlReached = true;
            }

            camera.lookAt(new THREE.Vector3(0, -50, -150));
            camera.updateProjectionMatrix();

        }, 100);
        
    }
    
    function cameraMoveInZ() {
        
        let z = 0;
        let delta = 150;
        let controlReached = false;
        
        const move = setInterval(() => {
            
            // Increase modifier
            z += 0.036;

            // Move camera a little bit
            camera.position.z = Math.sin(z) * delta * -1;
            console.log(camera.position.z);

            if (camera.position.z < -145) {
                console.log('Z finished');
                clearInterval(move);
            }
            
        }, 100);
        
    }

    //-----------------------------------------------------------------

     function cameraMoveOutY() {
        
        let y = 0;
        let delta = 15;
        let controlReached = false;
        const move = setInterval(() =>{
            
            // Check if we need to stop the animation
            if ( controlReached && (camera.position.y <= 1) ) {
                clearInterval(move);
            }
            
            // Increase modifier
            y += 0.08;

            // Move camera a little bit
            camera.position.y = Math.sin(y) * delta +15;
            //vconsole.log(camera.position.y);
            
            if (camera.position.y > 1) {
                //console.log('Y finished');
                controlReached = true;
            }

            camera.lookAt(new THREE.Vector3(0, -50, -150));
            camera.updateProjectionMatrix();

        }, 100);
        
    }
    
    function cameraMoveOutZ() {
        
        let z = 0;
        let delta = 150;
        let controlReached = false;
        
        const move = setInterval(() => {
            
            // Increase modifier
            z += 0.036;

            // Move camera a little bit
            camera.position.z = Math.sin(z) * delta - 150; 
            console.log(camera.position.z);
            if (camera.position.z > -1) {
                console.log('Z finished');
                clearInterval(move);
            }
            
        }, 100);
        
    }
    
}
