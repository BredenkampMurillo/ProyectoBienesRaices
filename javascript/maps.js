let map;
let autocomplete;
let marker1;
let marker2;
let directionsService;
let directionsRenderer;

window.initMap = function () {
    const coords = { lat: 9.980556568518258, lng: -84.25872931826552 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: coords
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    if (marker2) {
        marker2.setMap(null);
        marker2 = null;
    }
    directionsRenderer.set('directions', null);
    marker1 = new google.maps.Marker({
        position: coords,
        map: map,
    });

    searchGoogleMap(map);
    getYourAproxLocation(map);
}

const searchGoogleMap = (map) => {
    autocomplete = new google.maps.places.Autocomplete(placeInput);
    autocomplete.addListener("place_changed", () => {
        if (marker2) {
            marker2.setMap(null);
        }

        const place = autocomplete.getPlace();
        map.setCenter(place.geometry.location);
        map.setZoom(13);
        marker2 = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
        });
    });
}

const getYourAproxLocation = (map) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                const coords = {
                    lat: latitude,
                    lng: longitude
                };

                map.setCenter(coords);
                map.setZoom(12);

                if (marker1) {
                    marker1.setMap(null);
                }

                marker1 = new google.maps.Marker({
                    position: coords,
                    map: map,
                });
            },
            () => {
                alert("El navegador tiene localización, pero ocurrió un error al obtener la ubicación.");
            }
        );
    } else {
        alert("No se cuenta con localización.");
    }
}

document.getElementById("calc").addEventListener("click", () => {
    if (marker1 && marker2) {
        caclRuta();
    } else {
        alert("Por favor, selecciona un destino para calcular la ruta.");
    }
});

function caclRuta() {
    const request = {
        origin: marker1.getPosition(),
        destination: marker2.getPosition(),
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
                marker1.getPosition(),
                marker2.getPosition()
            );
            alert(`La distancia es de ${(distance / 1000).toFixed(2)} km.`);
        } else {
            alert("No se pudo encontrar una ruta.");
        }
    });
}
