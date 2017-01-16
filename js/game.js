var container, scene, camera, renderer;

var controls, players, coins;
players = {};
coins = [];
coins_in_circulation = 0;

// var username = prompt("What is your username?");
var main_player;

// init();
// animate();

function init() {
  container = $("#container");

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100);
  camera.position.z = 100;

  renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  loadGame();

  // handle resizing screen
  window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  })

  // arrow controls
  $(document).on("keydown", function(e){
    var mesh = main_player.mesh
    var key = e.keyCode;
    if (key == 37) { // left
      mesh.position.x -= main_player.speed;
    } else if (key == 38) { // up
      mesh.position.y += main_player.speed;
    } else if (key == 39) { // right
      mesh.position.x += main_player.speed;
    } else if (key == 40) { // down
      mesh.position.y -= main_player.speed;
    }
  })

  $(document).on("mousemove", function(e){
    // players[0].mesh.position.x = e.clientX;
    // camera.position.x = e.clientX * (180/window.innerWidth)
    // camera.position.y = e.clientY * (180/window.innerWidth)
    // camera.position.x = (e.clientX - (window.innerWidth / 2)) % 180;
    console.log(camera.position.x)
  })

  container.html(renderer.domElement);
}

function animate () {
  requestAnimationFrame(animate);

  if (main_player && main_player.mesh) {
    camera.position.x = main_player.mesh.position.x;
    camera.position.y = main_player.mesh.position.y;
    camera.position.z = main_player.coins * 1.5;
    camera.lookAt(main_player.mesh.position);
  }

  for (var i = 0; i < coins.length; i++) {
    if (coins[i].position.distanceTo(main_player.mesh.position) < main_player.speed) {
      scene.remove(coins[i]);
      coins.splice(i);
      if (main_player.speed - 1 > 0) {
        main_player.speed -= 0.1;
      }
      var scale = 1 + main_player.coins / 20;
      main_player.mesh.scale.multiplyScalar(scale, scale, scale);
      main_player.coins += 1;
    }
  }

  render();
}

function render() {
  renderer.clear();
  renderer.render(scene, camera);
}

function generateCoin() {
  var coin_geometry = new THREE.SphereGeometry(1);
  var coin_material = new THREE.MeshBasicMaterial({
    color: 0xF0C400,
    side: THREE.DoubleSide
  });
  var coin = new THREE.Mesh(coin_geometry, coin_material);
  coin.position.x = (Math.random() * 180) - 90;
  coin.position.y = (Math.random() * 180) - 90;
  coins.push(coin);
  scene.add(coin);
  coins_in_circulation += 1;
  if (coins_in_circulation >= 100) {
    clearInterval(coin_generator);
  }
}

var coin_generator;
function loadGame() {
  player = new Player();
  player.init();
  players[username] = player;
  main_player = players[username];

  coin_generator = setInterval(generateCoin, 1000);
  setInterval(syncState, 100);

  // plane
  var geometry = new THREE.PlaneGeometry( 300, 300 );
  var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}





