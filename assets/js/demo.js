
/**
 * Adds a circle over New Delhi with a radius of 1000 metres onto the map
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
var l,separador,limite;
function addCircleToMap(map,lat,long){
 
  map.addObject(new H.map.Circle(

    // The central point of the circle
    {lat:lat, lng:long},
    // The radius of the circle in meters
    100,
    {
      style: {
        strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
        lineWidth: 2,
        fillColor: 'rgba(0, 128, 0, 0.7)'  // Color of the circle
      }
    }
  ));
}

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: "89hU2fij6avHFTT7eSNdBzukFKsbYBSP7tt-f5IDbHY"
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over New Delhi
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: {lat:24.0203209, lng:-104.6575623},
  zoom: 13,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

 db.collection('denuncias').orderBy('createdAt', 'desc')
                .get()
                .then(querySnapshot => {
 
                    if (querySnapshot.empty) {
                        alert('No hay ninguna queja pendiente');
                    }

                    querySnapshot.forEach(doc => {
                        var date = doc.data().createdAt.toDate();
                        console.log(doc.data().lugar);
                        var l= doc.data().lugar;

                        addCircleToMap(map,l._lat, l._long);
})
});
