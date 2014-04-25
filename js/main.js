var app = angular.module('IdBuyThat', ['ngResource', 'ngRoute']);
// Models
app.factory('PageState', function(){
  return {
    products:[]
  };
});

// Resources
app.factory('Product', ['$resource', function($resource) {
  return $resource('/product', null,
    {
      'create': { method:'POST' }
    });
}]);
app.factory('ProductList', ['$resource', function($resource) {
  return $resource('/products');
}]);

app.factory('ProductListResource', ['$resource', function($resource) {
  return $resource('/products');
}]);

app.factory('ProductList', ['$q', 'ProductListResource', function($q, ProductListResource) {
  return function(params) {
    var defer = $q.defer();
    ProductListResource.get(params, function(data) {
      defer.resolve(data);

    }, function(data) {
      defer.reject(data);
    });

    return defer.promise;
  };
}]);


// Controllers
app.controller('voteController', ['$scope', 'PageState', 'ProductList', function($scope, PageState, ProductList) {
  $scope.voteToPurchaseProduct = function(product) {
    product.votesTotal += 1;
    product.votesToPurchase += 1;
  };

  $scope.voteToNotPurchaseProduct = function(product) {
    product.votesTotal++;
  };

  $scope.initialize = function() {
    $scope.PageState = PageState;
    ProductList({}).then(function(data) {
      if (data.hasOwnProperty('results')) {
        $scope.PageState.products = data.results;
      }
    });
  };
}]);
app.controller('productCreation', ['$scope', 'PageState', 'Product', 'ProductList', function($scope, PageState, Product, ProductList) {
  $scope.initialize = function() {
    $scope.newProduct = {};
    $scope.PageState = PageState;
    drawableCanvas.draw();
  };

  $scope.toggleEraser = function()
  {
    drawableCanvas.toggle();
  }

  $scope.addProduct = function(product) {
    var canvas = document.getElementById('myCanvas');

    product.imageBase64 = canvas.toDataURL();
    product.votesToPurchase = 0;
    product.votesTotal = 0;
    Product.create({}, product);
    PageState.products.push(_.cloneDeep(product));
  };
}]);