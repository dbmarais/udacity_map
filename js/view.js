
var Place = function(obj) {


  this.title = obj.title;
  this.postion = obj.position;
  this.url = obj.url;

};



//-------------------------------------------
//Initialize the Map given a set of "mapOptions"
//------------------------------------------

var map;
var mapOptions = {
  center: {
    lat: 50.783333,
    lng: 7.283333
  },
  zoom: 11
};

var mapInit = function() {

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  ko.applyBindings(new ViewModel());
};

//----------------------------------
//-------------Initialze the Markers
//----------------------------------
var markerInit = function() {

  var marker = [ko.observable(null)];

  //Iterate over 'Places' and create 'google.maps.Marker' object for each
  places.forEach(function(obj, index) {

    //Create "google.maps.Marker object"
    marker[index] = new google.maps.Marker({
      position: {
        lat: obj.position.lat,
        lng: obj.position.lng
      },
      title: obj.title,
      map: map,
      animation: google.maps.Animation.DROP,
    });

    //Create 'infowindow' for each marker in the 'marker' array
    marker[index].infowindow = new google.maps.InfoWindow();

    //Content of the 'markerObj.infowindow' is set inside the ajax request inside a callback function.
    //The 'markerObj' is passed to apply the changes to 'markerObj.infowindow'

    //URL created for the Wikipedia Ajax request. 'Marker' titles are used as the search term.
    var wikiStr = "http://de.wikipedia.org/w/api.php?action=opensearch&search=" + obj.title + "&format=json&callback=wikiCallback";


    // Ajax request sets the 'infowindow' content on success
    function wikiRequest(markerObj) {
      $.ajax({
        url: wikiStr,
        dataType: "jsonp",
        success: function(response) {
          var wikiSummary = response[2][0];

          if (wikiSummary) {
            markerObj.infowindow.setContent("<h2>" + markerObj.title + "</h2><div class='wikiArticle'>" + wikiSummary + "</div><p>source: <a href='http://de.wikipedia.org'>Wikipedia </p>");
          } else {

            markerObj.infowindow.setContent("<h2>" + markerObj.title + "</h2> Sorry,There is currently no Wikepedia Article is available");

          }
          markerObj.infowindow.open(map, markerObj);
        },
        error: function(request, status, error) {
          alert("Wikipedia Request Failed!");
        }
      });
    }

    //Animate the 'markerObj' to Bounce on click
    function toggleBounce(markerObj) {
      if (markerObj.getAnimation() !== null) {
        markerObj.setAnimation(null);
      } else {
        markerObj.setAnimation(google.maps.Animation.BOUNCE);

        //Timeout set for the bounce of the 'markerObj' to achieve single bounce
        setTimeout(function() {
          markerObj.setAnimation(null);
        }, 700);
      }
    }



    //Listen for clicks that will make "infowindow" appear
    marker[index].addListener("click", function() {

      //Close all 'markerObj.infowindows' in the 'marker' Array so that only one 'infowindow' is visible at any given time
      marker.forEach(function(markerObj) {

        markerObj.infowindow.close();
        markerObj.setAnimation(null);
      });

      //Marker object is passed to the wikiRequest function so that is knows for which marker the infowindow should be opened.
      wikiRequest(this);
      toggleBounce(this);


    });

  });



  //Value of the input box bound to observable for use by Knockout
  this.query = ko.observable();

  //maybe computed does not take the Push method
  this.filteredMarkerList = ko.computed(function() {

    if (!this.query()) {

      //'marker' is returned if input field is empty
      return marker;

    } else {

      // 'ko.utils.arrayFilter' returns part of the array matching typed user 'query'
      return ko.utils.arrayFilter(marker, function(marker) {
        return marker.title.toLowerCase().indexOf(this.query().toLowerCase()) != -1;
      });

    }
  });

  // Change the markers on map to conform to 'filteredMarkerList'
  this.filteredMarkerList.subscribe(function() {
    var diffArray = ko.utils.compareArrays(self.markerArray, self.filteredMarkerList());

    ko.utils.arrayForEach(diffArray, function(marker) {



      if (marker.status === 'added') {

        marker.value.visible = false;

      } else {
        marker.value.visible = true;
      }
    });
  });


  // Trigger items on map when menu filter is clicked.
  self.selectItem = function(listItem) {
    google.maps.event.trigger(listItem, 'click');

  };
};
function mapError(){
  document.getElementById('map').innerHTML = 'Unable to load map. Please try again.';

}
// Bring everythign together
var ViewModel = function() {

  var self = this;



  //Initialize the Markers and the Menu
  markerInit();

};
