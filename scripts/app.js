var example = (function() {

    "use strict";

    var scene = new THREE.Scene(),
        renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
        light = new THREE.AmbientLight(0xffffff),
        camera,
        controls,
        mesh;

    function initScene() {
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // document.getElementById("webgl-container").appendChild(renderer.domElement);

        // scene.add(light);

        renderer.setSize(window.innerWidth, window.innerHeight);

        var element = document.getElementById("webgl-container");
        element.appendChild(renderer.domElement);

        scene.add(light);

        // camera = new THREE.PerspectiveCamera(
        //     35,
        //     window.innerWidth / window.innerHeight,
        //     1,
        //     1000
        // );

        // camera.position.z = 100;
        // scene.add(camera);   

        camera = new THREE.PerspectiveCamera(
        35,
        element.offsetWidth  / element.offsetHeight,
        1,
        1000
        );
                            
        camera.position.z= 100;            
        scene.add( camera );       

    //     box = new THREE.Mesh(
    //         new THREE.BoxGeometry(
    //             20,
    //             20,
    //             20),
    //         new THREE.MeshBasicMaterial({

    //             vertexColors: THREE.VertexColors
    //         }));

    //    // assignColorsToCube(box);
    //     scene.add(box);

    //  box = new THREE.Mesh(
    //     new THREE.BoxGeometry(20,20,20),
    //     new THREE.MeshBasicMaterial({color: 0xFF0000})
    //     );

    //     box.name="box";

    //     scene.add(box);

    var loader = new THREE.JSONLoader();
    loader.load('./marmelab.json', function(geometry, materials) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
        mesh.translation = THREE.GeometryUtils.center(geometry);
        scene.add(mesh);
    });

        controls = new THREE.OrbitControls(camera);
        controls.addEventListener('change', render);

        render();
    }

    function assignColorsToCube(cube) {


        var colors = [
            new THREE.Color("rgb(255,0,0)"),
            new THREE.Color("rgb(0,255,0)"),
            new THREE.Color("rgb(0,0,255)"),
            new THREE.Color("rgb(255,255,0)"),
            new THREE.Color("rgb(0,255,255)"),
            new THREE.Color("rgb(255,0,255)")
        ];

        for (var i = 0; i < 12; i += 2) {

            var color = colors[i / 2];

            //each cube face is made up of 2 triangles & we want same color for each
            cube.geometry.faces[i].color = color;
            cube.geometry.faces[i + 1].color = color;
        }
    }

    function render() {
        //renderer.render(scene, camera);      
        renderer.render(scene, camera); 
        requestAnimationFrame(render);  
    }

    window.onload = initScene;

    return {
        scene: scene
    }

})();