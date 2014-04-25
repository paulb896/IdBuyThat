var drawableCanvas = (function () {
    var canvas, stage;
    var drawingCanvas;
    var oldPt;
    var oldMidPt;
    var color;
    var stroke;
    var colors;
    var index;
    var useColorFromColors = true;

    function init() {
      if (window.top != window) {
        document.getElementById("header").style.display = "none";
      }
      canvas = document.getElementById("myCanvas");
      index = 0;
      colors = ["#fefefe", "#fafafa", "#dadada", "#fafafa", "#fafafa", "#fafafa", "#fafafa", "#fafafa", "#dadada", "#fbfafa", "#fafafa"];

      //check to see if we are running in a browser with touch support
      stage = new createjs.Stage(canvas);
      stage.autoClear = false;
      stage.enableDOMEvents(true);

      createjs.Touch.enable(stage);
      createjs.Ticker.setFPS(24);

      drawingCanvas = new createjs.Shape();

      stage.addEventListener("stagemousedown", handleMouseDown);
      stage.addEventListener("stagemouseup", handleMouseUp);

      stage.addChild(drawingCanvas);
      stage.update();
    }

    function stop() {}

    function handleMouseDown(event) {
      color = "#1f3972";
      stroke = 20;
      if (useColorFromColors){
        stroke = 0.5;
        color = colors[(index++)%colors.length];
      }

      oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
      oldMidPt = oldPt;
      stage.addEventListener("stagemousemove" , handleMouseMove);
    }

    function handleMouseMove(event) {
      var midPt = new createjs.Point(oldPt.x + stage.mouseX>>1, oldPt.y+stage.mouseY>>1);

      drawingCanvas.graphics.clear().setStrokeStyle(stroke).beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

      oldPt.x = stage.mouseX;
      oldPt.y = stage.mouseY;

      oldMidPt.x = midPt.x;
      oldMidPt.y = midPt.y;

      stage.update();
    }

    function toggleEraser() {
      useColorFromColors = !useColorFromColors;
    }

    function handleMouseUp(event) {
      stage.removeEventListener("stagemousemove" , handleMouseMove);
    }

    return {
      draw:init,
      toggle:toggleEraser
    };
}());