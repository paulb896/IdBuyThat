;
app.directive('canvasimage', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      attrs.$observe('canvasimage', function(encodedImage){
        var image = new Image();
        var ctx = attrs.$$element[0].getContext('2d');
        image.onload = function() { ctx.drawImage(image, 0, 0)};
        image.src = encodedImage;
      });
    }
  }
});