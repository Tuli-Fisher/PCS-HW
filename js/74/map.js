/* global google */
(async function(){
    'use strict';

    const home = { lat:40.0717370607721, lng:-74.23881776259543};
    const inputElement = document.querySelector('#user-input');

    let map;

    async function initMap(){
        
        const { Map } = await google.maps.importLibrary("maps");

        map = new Map(document.querySelector("#map"), {
            center: home,
            zoom: 10,
            mapId: 'DEMO_MAP_ID'
        });
    };

    await initMap();

    map.addListener('center_changed', () => {
        const newCenter = map.getCenter();
        console.log(newCenter.lat(), newCenter.lng());
    });

    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

    const marker = new AdvancedMarkerElement({
        map,
        position: home,
        title: 'Home'
    });

    marker.addListener('click', () => {
        const infoWindow = new google.maps.InfoWindow({
            content: 'Home Sweet Home'
        });
        infoWindow.open({
            anchor: marker,
            map,
        });
    });

    async function callwiki(){
        if(inputElement.value===''){
            alert('Please enter a location');
        };
        try{
            const response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${inputElement.value}&maxRows=10&username=slubowsky&type=json`);
            if (!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }catch(e){
            console.error('Error fetching data:', e.message);
        }
    };
    
    inputElement.addEventListener('change', async()=>{
        const data = await callwiki();

        
        data?.geonames?.forEach((place)=>{
            const marker = new AdvancedMarkerElement({
                position: {lat: place.lat, lng: place.lng},
                map: map,
                title: place.title,
            });

            marker.addListener('click', ()=>{

                const infoWindow = new google.maps.InfoWindow({
                    content: `<div><h3>${place.title}</h3><p>${place.summary}</p><a href="https://${place.wikipediaUrl}" target="_blank">Read more on Wikipedia</a></div>`
                });

                infoWindow.open({
                    anchor: marker,
                    map,
                });
            });
        });


    });




}());