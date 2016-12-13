
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

//Content of the infoinfowindow is set inside the ajax request inside a callback function.
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








//Create the Clickevent that will make "infowindow" appear t
marker[index].addListener("click", function(){
//cloase all other infowindows

marker.forEach(function(obj){
  obj.infowindow.close();
});

//the Maker object is passed to the wikiRequest function so that is knows for which marker the infowindow should be opened.
  wikiRequest(this);
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
