import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import useCoordinated from '@/hooks/useCoordinated';
import { getAllLuggage } from '@/actions/getAllLuggage';

const LocationMap = ({params}:{params:{id: string}}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const { latitude, Longitude} = useCoordinated();
  const [luggageAll, setLuggageAll] = useState<{ id: string; userId: string; luggageRfid: string; luggageName: string; }[]>([]);

  useEffect(() => {
    const luggageData = getAllLuggage();
    luggageData.then((data) => {
        if ('error' in data) {
            console.error(data.error);
        } else {
            console.log(data);
            setLuggageAll(data);
        }
    });
  },[params.id])

  const luggage = luggageAll.find((luggage) => luggage.luggageRfid === params.id);
  useEffect(() => {
    const initMap = async () => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
            version: "weekly",
        });

        const { Map } = await loader.importLibrary('maps');

        // init a marker
        const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

        const position = {
          lat: Number(latitude),
          lng: Number(Longitude)
        }
        const mapOptions: google.maps.MapOptions = {
          center: position,
          zoom: 17,
          mapId: "Luggage_Tracking_App",

        };

        //setup the map
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        // put up marker
        const marker = new Marker({
            position,
            map,
            title: "Luggage Location",
            animation: google.maps.Animation.DROP,
            icon: {
            url: '/marker.png',
            scaledSize: new google.maps.Size(40, 40),
            },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<h1>${luggage?.luggageName}</h1>`
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        })
    }

    initMap();
  }, [latitude, Longitude,  luggage?.luggageName]);

  return (
    <div className='flex flex-col gap-10 justify-center items-center'>
        <h1 className='font-bold text-lg text-black'>Location of Luggage: {luggage?.luggageName}</h1>
        <div ref={mapRef} style={{ height: '600px'}} className='w-[120%] md:w-[250%] lg:w-[350%]'/>
    </div>
  );
};

export default LocationMap;
