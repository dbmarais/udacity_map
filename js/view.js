
// Place Class from the model a
var Place = function(obj){
  var self = this;

  self.title = ko.observable(obj.title);
  self.postion = ko.observable(obj.position);
  self.url = ko.observable(obj.url);


};

var map;
var mapOptions =  {
          center: {lat: 50.783333, lng:  7.283333},
          zoom: 13};



//Initialize the Map given a set of "mapOptions"
var mapInit = function() {

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

};


var placeInit = function() {

    this.placeList = ko.observableArray([]);

    //From the Model bring the Places into the ViewModel
    places.forEach(function(obj){
      this.placeList.push(new Place(obj));
    });



};

//Initialze the Markers by iterating over the places
var markerInit = function(){

  places.forEach(function(obj){

//Create "google.maps.Marker object"
  var marker = new google.maps.Marker(
    {
    position: {lat: obj.position.lat,lng: obj.position.lng},
    title: obj.title,
    map: map,
    animation: google.maps.Animation.DROP,
  }
);

//  Create the infowindow
var infowindow = new google.maps.InfoWindow({
    content: obj.info
  });

//Create the Clickevent that will make "infowindow" appear
marker.addListener("click",function(){infowindow.open(map,marker);});

  console.log(obj.title);
});
};








var ViewModel = function(){

var self = this;

  mapInit();
  placeInit();
  markerInit();


};


ko.applyBindings(new ViewModel());
