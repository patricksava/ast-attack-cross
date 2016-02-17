(function(namespace) {
  var Callbacks = LNXCommons.CallbackHelper;
  var Animation = LNXGames.Animation;

  namespace.AsteroidGraphics = function(container) {
    var callbacks = Callbacks.initializeFor(this);
    var self = this;
    var animation = null;
    var normalTexture = null;
    var recoveringTexture = null;
    var deathTexture = null;
    var sprite = null;
    var animations = null;
    var animationName = null;

    function init() {
      normalTexture = PIXI.loader.resources["./img/asteroid_sprite.png"].texture;
      recoveringTexture = PIXI.loader.resources["./img/asteroid_invencible.png"].texture;
      deathTexture = PIXI.loader.resources["./img/asteroid_death.png"].texture;
      sprite = new PIXI.Sprite(normalTexture);
      animations = createAnimationsFor(sprite);
      animations["dead"].listen("animationEnd", function() {
        callbacks.emit("deadAnimationEnd");
      });
      sprite.x = -9999;
      sprite.y = -9999;
      container.addChild(sprite);
    }

    this.update = function(x, y) {
      animations[animationName].toNextFrame(x, y);
    };

    this.destroy = function() {
      container.removeChild(sprite);
      sprite.destroy();
    }

    this.changeAnimationToCompatibleWithState = function(state, directionX, directionY, invencible) {
      if(invencible) {
        var name = "recovering";
      } else {
        var name = state === "dead" ? "dead" : "moving";
      }
      self.changeAnimationTo(name);
    };
    
    this.changeAnimationTo = function(animName) {
      if(animationName !== animName) {
        animations[animName].reset();
      }
      animationName = animName;
    }

   var animmoving = [
      {duration: 5, x: 0,   y: 0, width: 40, height: 40},
      {duration: 5, x: 40,  y: 0, width: 40, height: 40},
      {duration: 5, x: 80,  y: 0, width: 40, height: 40},
      {duration: 5, x: 120, y: 0, width: 40, height: 40},
      {duration: 5, x: 160, y: 0, width: 40, height: 40},
      {duration: 5, x: 200, y: 0, width: 40, height: 40},
      {duration: 5, x: 240, y: 0, width: 40, height: 40},
      {duration: 5, x: 280, y: 0, width: 40, height: 40},

      {duration: 5, x: 0,   y: 40, width: 40, height: 40},
      {duration: 5, x: 40,  y: 40, width: 40, height: 40},
      {duration: 5, x: 80,  y: 40, width: 40, height: 40},
      {duration: 5, x: 120, y: 40, width: 40, height: 40},
      {duration: 5, x: 160, y: 40, width: 40, height: 40},
      {duration: 5, x: 200, y: 40, width: 40, height: 40},
      {duration: 5, x: 240, y: 40, width: 40, height: 40},
      {duration: 5, x: 280, y: 40, width: 40, height: 40},

      {duration: 5, x: 0,   y: 80, width: 40, height: 40},
      {duration: 5, x: 40,  y: 80, width: 40, height: 40},
      {duration: 5, x: 80,  y: 80, width: 40, height: 40},
      {duration: 5, x: 120, y: 80, width: 40, height: 40},
      {duration: 5, x: 160, y: 80, width: 40, height: 40},
      {duration: 5, x: 200, y: 80, width: 40, height: 40},
      {duration: 5, x: 240, y: 80, width: 40, height: 40},
      {duration: 5, x: 280, y: 80, width: 40, height: 40},

      {duration: 5, x: 0,   y: 120, width: 40, height: 40},
      {duration: 5, x: 40,  y: 120, width: 40, height: 40},
      {duration: 5, x: 80,  y: 120, width: 40, height: 40},
      {duration: 5, x: 120, y: 120, width: 40, height: 40},
      {duration: 5, x: 160, y: 120, width: 40, height: 40},
      {duration: 5, x: 200, y: 120, width: 40, height: 40},
      {duration: 5, x: 240, y: 120, width: 40, height: 40},
      {duration: 5, x: 280, y: 120, width: 40, height: 40}
    ];


   var animdeath = [
      {duration: 10, x: 0,   y: 0, width: 40, height: 40},
      {duration: 10, x: 40,  y: 0, width: 40, height: 40},
      {duration: 10, x: 80,  y: 0, width: 40, height: 40},
      {duration: 10, x: 120, y: 0, width: 40, height: 40},
      {duration: 10, x: 160, y: 0, width: 40, height: 40},
      {duration: 10, x: 200, y: 0, width: 40, height: 40},
      {duration: 10, x: 240, y: 0, width: 40, height: 40},
      {duration: 10, x: 280, y: 0, width: 40, height: 40}
    ];

    function createAnimationsFor(sprite) {
      return {
        "moving" : new Animation(sprite, animmoving, normalTexture),
        "recovering" : new Animation(sprite, animmoving, recoveringTexture),
        "standing": new Animation(sprite, animmoving, normalTexture),
        "dead": new Animation(sprite, animdeath, deathTexture)
      };
    }
    
    init();
  };
}(LNXAstAttack = window.LNXAstAttack || {}));
