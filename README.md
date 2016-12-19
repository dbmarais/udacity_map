# Udacity Neigbourhood Map

The Neigbourhood Map project is a responsive Map of the 'Siegtal' area in Germany. The map is built combining the Google maps api, Wikimedia's Wikipedia API using JQuery and Knockout. Basic Wikipedia information is shown for five interesting locations in the area.

## Getting Started
Currently the application is only available as a locally hosted version.


**1.** Clone this repo:

```
$ git clone https://github.com/dbmarais/map
````

**2.** Serve the application:

```
$ python -m SimpleHTTPServer
```

Detailed Python Simple Server instructions can been found [here](https://docs.python.org/2/library/basehttpserver.html).

**3.** Open the application:

```
$ open "http://localhost:8000"
```

## Markers
Five Sights in the _Siegtal_ are Hardcoded into the `Places` array found in `model.js`. The `Places` Array is used to create a `marker`array filled with `google.marker` objects.

### Filtering Map Markers
 Map Markers are filterable using the input field in the Menu on the Left ( screens with a width > 768px) or bottom (on screens with a width < 768px). Clicking on either a map marker or its corresponding list item in the Menu will open an infowindow. The infowindow is populated with an article summary for the sight from the Wikimedia Wikipedia API 
