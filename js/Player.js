function Player() {
  this.player_id = 0;
  this.mesh;
  this.speed = 5;
  this.coins = 0;

  var self = this;


  this.init = function () {
    var sphere_geometry = new THREE.SphereGeometry(1);
    var sphere_material = new THREE.MeshNormalMaterial();
    self.mesh = new THREE.Mesh(sphere_geometry, sphere_material);

    // var text_geometry = THREE.TextGeometry(coins.toString(), {});
    // var score = new THREE.Mesh(text_geometry, new THREE.MeshBasicMaterial({
    //   color: 0xff0000
    // }));
    // score.position = character.position;

    // self.mesh = new THREE.Object3D();
    // self.mesh.add(score);
    // self.mesh.add(character);
    self.mesh.position.x = (Math.random() * 200) - 100;
    self.mesh.position.y = (Math.random() * 200) - 100;

    scene.add(self.mesh);
  }
}