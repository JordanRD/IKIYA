import React, { useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios'
import { Button, FormControl, InputGroup, } from "react-bootstrap";
const containerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '4px'
};
const center = {
    lat: -6.175110,
    lng: 106.865036
};
// const bandung = {
//     lat: -6.9344694,
//     lng: 107.6049539
// }

function MapsSelect({ setStoreCordinates }) {
    const [address, setAddress] = useState('')
    const [currentAddress, setCurrentAddress] = useState('')
    const [marker, setMarker] = useState(center)
    const [mapCenter, setMapCenter] = useState(center)
    const { isLoaded, loadError } = useLoadScript({
        // googleMapsSelectApiKey: 'AIzaSyA0DmOm2jH0bvOLSS8orMgqd6brqTMDlOg',
    })
    const handleChange = i => setAddress(i.target.value)
    const handleSearch = async () => {
        if (!address) return
        try {
            const { data } = await axios.get(`http://api.positionstack.com/v1/forward?access_key=9c563dc12d8c62d674d480428de2c4ae&query=${address}&country=ID`)
            const { county, country, latitude: lat, longitude: lng, name } = data.data[0]
            if(!country)return alert('location not found')
            setMarker({ lat, lng })
            setMapCenter({ lat, lng })
            setCurrentAddress(`${name} , ${county||''}, ${country}`)
            setAddress('')
            setStoreCordinates({ lat, lng, })
        } catch (error) {
            console.log(error?.response?.data || error)
        }
    }
    const handleChangeMarker = async (e) => {
        try {
            const position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
            const { data } = await axios.get(`http://api.positionstack.com/v1/reverse?access_key=9c563dc12d8c62d674d480428de2c4ae&query=${position.lat},${position.lng}&country=ID`)
            const { county, country, latitude: lat, longitude: lng, name } = data.data[0]
            setMarker(position)
            setCurrentAddress(name + ', ' + county + ',' + country)
            setStoreCordinates({ lat, lng, })
        } catch (error) {
            console.log(error?.response?.data || error)
        }
    }

if (loadError) return <></>
if (!isLoaded) return <></>
return (
    <div style={{padding:'10px 0'}}>
        <InputGroup style={{ width: '100%' }} className="mb-3">
            <FormControl
                placeholder="Search city"
                aria-describedby="basic-addon2"
                value={address}
                onChange={handleChange}
                type='text'
            />
            <InputGroup.Append>
                <Button onClick={handleSearch} variant="outline-secondary">Search</Button>
            </InputGroup.Append>
        </InputGroup>
        <p>{currentAddress}</p>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={13}
            onClick={handleChangeMarker}
        >
            <Marker position={marker} onClick={() => setMapCenter(marker)} />
        </GoogleMap>
    </div>
)
}
export default React.memo(MapsSelect)

//# gapi AIzaSyA0DmOm2jH0bvOLSS8orMgqd6brqTMDlOg
//# poison 9c563dc12d8c62d674d480428de2c4ae
//# zip 5a7b8f30-86de-11eb-b29c-a16ee1852846