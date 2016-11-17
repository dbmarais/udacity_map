
var ViewModel = function(){

var map;
var mapOptions =  {
          center: {lat: 50.783333, lng:  7.283333},
          zoom: 13};



//Initialize the Map
var mapInit = function(){

  map = new google.maps.Map(document.getElementById("map"),mapOptions);


//Create Marker object using using the array of location objects in the "Model"
model.markers.forEach(function(obj){


var marker = new google.maps.Marker({

  position: {lat:obj.lat, lng:obj.lng},
  title: obj.title,
  map:map,
  animation: google.maps.Animation.DROP,
  

}
);
});

}();



};

ko.applyBindings(new ViewModel());
