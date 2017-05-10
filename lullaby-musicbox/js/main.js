let moveIn;
let moveOut;
let rotateCylender;
let rotateCrank;
let isZoomed = false;
let stopCylender = false;
let stopCrank = false;
let loadBackground;
let instructionsMenuOpenClose;

window.onload = function (event) {
    
    // Some variables we will be using later
    let camera, scene, renderer;
    var controls;
    let element, container;
    let speed;
    let mouse, raycaster;
    let menuState = false;
    const module = {};
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

        // const light1 = new THREE.AmbientLight( 0x303030, 7 ); // soft white light
        // light1.position.set(0, 0, 0 );
        //  scene.add( light1 );
        // var light2 = new THREE.PointLight( 0xff0000, 1, 200 );
        // light2.position.set( 50, 50, 50 );
        // scene.add( light2 );
        
        // two spot lights to the left and right infront of the box

        const light = new THREE.SpotLight( 0xffffff, .7, 0, 0.12, 0.3, 1 )//, 1, 10)//, 1, 0.1, 2 );
        light.position.set( 300, 1000, 900 );

        light.castShadow = true;

        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;

        light.shadow.camera.near = 500;
        light.shadow.camera.far = 4000;
        light.shadow.camera.fov = 30;

        scene.add( light );

        const light2 = new THREE.SpotLight( 0xffffff, .7, 0, 0.12, 0.3, 1 )//, 1, 10)//, 1, 0.1, 2 );
        light2.position.set( -300, 1000, 900 );

        light2.castShadow = true;

        light2.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;

        light2.shadow.camera.near = 500;
        light2.shadow.camera.far = 4000;
        light2.shadow.camera.fov = 30;

        scene.add( light2 );

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
                obj.rotation.y = 0.2 * (Math.PI / 180) * -1;
                scene.add(obj);

                scene.traverse(function(child) {
                    clickObjects.push(child);
                    module[child.name] = child;
                    // console.log(clickObjects);
                });

                const CylObj = module['pasted__group2 group pasted__polySurface761'];
                const CrankObj = module['pasted__group2 group pasted__polyToSubd5'];


                CylObj.geometry.center();
                CylObj.position.y = -5.5;
                CylObj.position.z = 4;
                
                CrankObj.geometry.center();
                CrankObj.geometry.translate(0,2, 0);
                // clickObjects[54].rotation.z = 1.2 * (Math.PI / 180) *-1 ;
                CrankObj.rotation.y = 1.2 * (Math.PI / 180) * -1;
                CrankObj.position.x = 1;
                CrankObj.position.y = -7;
                CrankObj.position.z = 9;

                // clickObjects[54].position.x = 1;
                // clickObjects[54].position.y = -7;
                // clickObjects[54].position.z = 9.4; 
            });

        let isFar = true;

        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();

        document.addEventListener('dblclick', onDocumentMouseDown, false);

        function onDocumentMouseDown(event) {
            isZoomed = !isZoomed;
            event.preventDefault();

            mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
            mouse.y = (event.clientY / renderer.domElement.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(clickObjects);

            if(intersects.length > 0 && isFar == true){
                cameraMoveInY();
                cameraMoveInZ();
                isFar = false;
            }

            else if(intersects.length > 0 && isFar == false){
                cameraMoveOutY();
                cameraMoveOutZ();
                isFar = true;
            }
        }

        /* window.lk  = function(){
            rotateCylender();
        }

        window.ur = function(){
            rotateCrank();
        } */


/*
31
pasted__group2 group pasted__polySurface761
"A1173239-A7D6-4B11-8191-5D819D0B01DA"

54

pasted__group2 group pasted__polyToSubd5
"3B4A4CF9-A2EC-4181-B67D-FB6AC5FB68F7"
*/

        rotateCylender = function rotateCylender() {
            if(stopCylender) {
                stopCylender = false;
                return;
            }
            const obj = module['pasted__group2 group pasted__polySurface761'];
            obj.rotation.z += Math.PI / 180 * -1;
            //clickObjects[31].rotation.z += Math.PI / 180 * -1;
            requestAnimationFrame(rotateCylender);
        }

        rotateCrank = function rotateCrank() {
            if(stopCrank) {
                stopCrank = false;
                return;
            }
            const obj = module['pasted__group2 group pasted__polyToSubd5'];
            obj.rotation.x += Math.PI/180;
            // clickObjects[54].rotation.x += Math.PI/180;
            requestAnimationFrame(rotateCrank);
        }

        // Add surrounding
        // height, width, depth
        const surroundingGeometry = new THREE.CubeGeometry(200,400,600);
        var loader = new THREE.TextureLoader();
        // loader.load('img/blatt.jpg', (texture) =>{
        /* background loadað inn */
        loadBackground = function loadBackground(imgPath) {
            loader.load(imgPath, (texture) =>{
                const surroundingMaterial = new THREE.MeshBasicMaterial({ 
                    map: texture, side: THREE.DoubleSide 
                });
                const surroundingBox = new THREE.Mesh( surroundingGeometry, surroundingMaterial );
                surroundingBox.position.y = 100;
                scene.add( surroundingBox );
            });
        }
        loadBackground('img/bla.png');
        /* background loaded end */
        // Adjust everything in case there is a window resize
        window.addEventListener('resize', handleResize);
        
        // Set up these adjustments for the first time right away
        setTimeout(handleResize, 1);
        
    }

    // Render loop
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    
    // Adjust sizes on window resize
    function handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    // window.cm = function() {
    //     cameraMoveInY();
    //     cameraMoveInZ();
    // }
//     window.cn = function(){
//         cameraMoveOutY();
//         cameraMoveOutZ();
// }
    window.cj = function(){
        cylenderMoveUp();
    }
    window.cl = function(){
        cylenderMoveDown();
    }

    function cylenderMoveUp(){
        let y = -5.5;
        let delta = -20;
        let controlReached = false;
        const move = setInterval(()=>{

            if(controlReached && (clickObjects[31].position.y >= -19.9)){
                clearInterval(move);
            }

            y += 0.08;
            clickObjects[31].position.y = Math.sin(y) * delta;
            console.log(clickObjects[31].position.y);

             if (clickObjects[31].position.y < -19.9) {
                console.log('Y finished');
                controlReached = true;
            }

        },100);
    }
    // function cameraMoveOutY() {
        
    //     let y = 0;
    //     let delta = 15;
    //     let controlReached = false;
    //     const move = setInterval(() =>{
            
    //         // Check if we need to stop the animation
    //         if ( controlReached && (camera.position.y <= 1) ) {
    //             clearInterval(move);
    //         }
            
    //         // Increase modifier
    //         y += 0.08;

    //         // Move camera a little bit
    //         camera.position.y = Math.sin(y) * delta +15;
    //         //vconsole.log(camera.position.y);
            
    //         if (camera.position.y > 1) {
    //             //console.log('Y finished');
    //             controlReached = true;
    //         }

    //         camera.lookAt(new THREE.Vector3(0, -50, -150));
    //         camera.updateProjectionMatrix();

    //     }, 100);
        
    // }
     function cylenderMoveDown(){
        let y = 0;
        let delta = 12;
        let controlReached = false;
        const move = setInterval(()=>{

            if(controlReached && (clickObjects[31].position.y <= 0)){
                clearInterval(move);
            }

            y += 0.08;
            clickObjects[31].position.y = Math.sin(y) * delta + -10;
            console.log(clickObjects[31].position.y);

             if (clickObjects[31].position.y >1.9   ) {
                console.log('Y finished');
                controlReached = true;
            }

        },100);
    }
    function cylenderRotateLeft(){
        let controlReached = false
        const rotate = setInterval(()=>{

            if(controlReached && (clickObjects[31].rotation <=90))
            //requestAnimationFrame(rotateCylender);
          clickObjects[31].rotation.y += Math.PI / 180;

          if(clickObjects[31].rotation.y >90){
            controlReached = true;
          }
        });
    }

    moveIn = (move) => {
        cameraMoveInY();
        cameraMoveInZ();
    }

    moveOut = () => {
        cameraMoveOutY();
        cameraMoveOutZ();
    }

    cameraMoveInY = function cameraMoveInY() {
        let y = 0;
        let delta = 50;
        let controlReached = false;
        let move;
        clearInterval(move)
        move = setInterval(() => {
            
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
        
        let move;
        clearInterval(move);
        move = setInterval(() => {
            
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


    function cameraMoveOutY() {
        let y = 0;
        let delta = 15;
        let controlReached = false;
        let move;
        clearInterval(move);
        move = setInterval(() =>{
            
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
        
        let move;
        clearInterval(move);
        move = setInterval(() => {
            
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
