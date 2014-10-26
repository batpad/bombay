$(function() {
    var baseLaye
    var map = L.map('map').setView([18.9924, 72.9727], 11);
    var osmLayer = L.tileLayer('http://geo.klp.org.in/osm/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    });
    var bingLayer = new L.BingLayer("Ar-SXsfRZ8jqD7u18tYZEtoFOhPYyU4zcwe2_sMbYsAXNvDlwlo1gftifmIXaR0e", {

    }); 
    var mapboxLayer = L.tileLayer('http://a.tiles.mapbox.com/v4/aj.03e9e12d/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FuamF5YiIsImEiOiI3NjVvMFY0In0.byn_eCZGAwR1yaPeC-SVKw', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);

    var warperLayer = L.tileLayer('http://mapwarper.net/maps/tile/' + WARPER_ID + '/{z}/{x}/{y}.png')
        .addTo(map).setOpacity(0.5);
    var geojsonLayer;

    $('#slide').on('input', function(e) {
        updateOpacity();
    });

    $.getJSON("../data/" + WARPER_ID + ".json", {}, function(geojson) {
        console.log("geojson", geojson);
        geojsonLayer = L.geoJson(geojson, {
            onEachFeature: function(feature, layer) {
                console.log("feature", feature);
                layer.on('click', function(e) {
                    showInfo(feature.properties);
                });
            }
        });
        geojsonLayer.addTo(map);
        instantiateLayerControl();
    });
    

    // var otherLayer = L.tileLayer('http://mapwarper.net/maps/tile/4425/{z}/{x}/{y}.png');

    function instantiateLayerControl() {
        var overlayMaps = {
            "Warper Layer": warperLayer,
            "Vector Layer": geojsonLayer
        };

        var baseMaps = {
            'Mapbox Pencil Map': mapboxLayer,
            'OSM Streets': osmLayer,
            'Bing Satellite': bingLayer
        };

        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false,
            position: 'bottomleft'
        }).addTo(map);
    }
    function updateOpacity() {
        var value = $('#slide').val();
        map.eachLayer(function (layer) {
            console.log(layer);
            if (layer._url.indexOf("mapwarper.net") !== -1) {
                layer.setOpacity(value);
            }
        })
    }

    function showInfo(data) {
        $('#pointTitle').text(data.title);
        $('#pointDescription').text(data.description);
        $('#pointImage').attr("src", "../images/" + data.image);
    }

});
