function loadPlaces(position) {

    // Foursquare API (limit param: number of maximum places to fetch)
    const endpoint = `https://townar.rayconnect.ir/places?ll=${position.longitude},${position.latitude}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};

window.onload = () => {
    const scene = document.querySelector('a-scene');
    
    alert("welcome");

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        
       loadPlaces(position.coords)
            .then((places) => {
                 alert(JSON.stringify(places));
                places.forEach((place) => {
                    const latitude = place.loc.coordinates[1];
                    const longitude = place.loc.coordinates[0];
                    
                    alert(JSON.stringify(place));

                    // add place name
                    const placeText = document.createElement('a-link');
                    placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    placeText.setAttribute('title', place.title);
                    placeText.setAttribute('scale', '5 5 5');
                    
                    placeText.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });

                    scene.appendChild(placeText);
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};
