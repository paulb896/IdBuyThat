;
// Models
app.factory('PageState', function(){
  return {
    products:[]
  };
});

// Resources
app.factory('Product', ['$resource', function($resource) {
  return $resource('./product', null,
    {
      'create': { method:'POST' }
    });
}]);
app.factory('ProductList', ['$resource', function($resource) {
  return $resource('./products');
}]);

app.factory('ProductListResource', ['$resource', function($resource) {
  return $resource('./products');
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