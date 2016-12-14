
// Place Class from the model a
var Place = function(obj){


  this.title = ko.observable(obj.title);
  this.postion = ko.observable(obj.position);
  this.url = ko.observable(obj.url);



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



//Value of the input box bound to observable for use by Knockout
this.query = ko.observable();

//maybe computed does not take the Push method
this.computedPlaceList = ko.computed(function(){

  if(!this.query()){

    console.log("noFilter");

//Complete places array is returned but only "places.title" are bound to the menu list.
    return places;

  } else {
// 'ko.utils.arrayFilter' returns part of the array conforming to query
    return ko.utils.arrayFilter(places,function(place){
      return place.title.toLowerCase().indexOf(this.query().toLowerCase()) != -1;
    });

  }
});



};


















//Initialze the Markers by iterating over the places
var markerInit = function(){

var marker =[];

  places.forEach(function(obj,index){

//Create "google.maps.Marker object"
    marker[index] = new google.maps.Marker(
    {
    position: {lat: obj.position.lat,lng: obj.position.lng},
    title: obj.title,
    map: map,
    animation: google.maps.Animation.DROP,
  }
);

//  Create the infowindow for each Place in the Places Array
var wikiStr = "http://de.wikipedia.org/w/api.php?action=opensearch&search=" + obj.title+ "&format=json&callback=wikiCallback";
//var wikiRequestTimeOut = setTimeout(function(){$wikiElem.text("Faluire of the internet to deliver the Wiki Articles");},8000);


//Create a new infowindow for each Place in the Places Array
marker[index].infowindow = new google.maps.InfoWindow();

//Content of the 'markerObj.infowindow' is set inside the ajax request inside a callback function.
//The 'markerObj' is passed to apply the changes to 'markerObj.infowindow'
function wikiRequest(markerObj){
  $.ajax({
  url: wikiStr,
  dataType: "jsonp",
  success: function(response) {
    var wikiSummary = response[2][0];
    markerObj.infowindow.setContent(wikiSummary);
    markerObj.infowindow.open(map,markerObj);
  },
  error: function(request,status,error){
    alert(request.responseText);


  }


});
}

//Animate the 'markerObj'  to Bounce on click
function toggleBounce(markerObj) {
  if (markerObj.getAnimation() !== null) {
    markerObj.setAnimation(null);
  } else {
    markerObj.setAnimation(google.maps.Animation.BOUNCE);

    //Timeout set for the bounce of the 'markerObj' to achieve single bounce
    setTimeout(function(){markerObj.setAnimation(null); }, 700);
  }
}


//Create the Clickevent that will make "infowindow" appear t
marker[index].addListener("click", function(){

//Close all 'markerObj.infowindows' in the 'marker' Array so that only one 'infowindow' is visible at any given time
marker.forEach(function(markerObj){
  markerObj.infowindow.close();
  markerObj.setAnimation(null);
});

//the Maker object is passed to the wikiRequest function so that is knows for which marker the infowindow should be opened.
  wikiRequest(this);
  toggleBounce(this);
 });












});
};













var ViewModel = function(){

var self = this;

  mapInit();
  placeInit();
  markerInit();

};




ko.applyBindings(new ViewModel());
