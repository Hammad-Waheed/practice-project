import React, { Component } from "react";
import { APIProvider, Map, AdvancedMarker, Marker } from '@vis.gl/react-google-maps'
import axios from "axios";


var color = "#FF0000";

const onLoad = polyline => {
    console.log('polyline: ', polyline)
};
const markerOpt = {
    icon: './assets/pin.png',
};
const options = {
    strokeColor: '#1b53ab',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    fillColor: '#1b53ab',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
};
export default class MapView extends Component {
    constructor() {
        super();
        this.state = {

            position: { lat: 47.7, lng: -38.6 },
            //00000 UNID
            positionKarachi: { lat: 47.7, lng: -38.6 },
            //00001 SL-1 R/B
            positionLahore: { lat: 50.24, lng: -28.04 },
            //00100 Discover 23 Stopped
            // 10000 
            positionIslamabd: { lat: -0.11, lng: 26.15 },

            satelite01: { lat: 0, lng: 0 },
            satelite01Name: '',
            satelite02: { lat: 0, lng: 0 },
            satelite02Name: '',
            sateliteCenter: { lat: 0, lng: 0 },
            seconds: 0
        };
    }

    async getUser() {
        try {
            const response = await axios.get('http://localhost:3001/api/latest-data');
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    getLiveLocation = async () => {
        // var positionKarachi = this.state.positionKarachi;
        // var positionIslamabd = this.state.positionIslamabd;
        // var positionLahore = this.state.positionLahore;
        // positionKarachi.lat = positionKarachi.lat + 1;
        // positionKarachi.lng = positionKarachi.lng + 1;

        // positionIslamabd.lat = positionIslamabd.lat + 1;
        // positionIslamabd.lat = positionIslamabd.lat + 1;

        // positionLahore.lat = positionLahore.lat + 1;
        // positionLahore.lat = positionLahore.lat + 1;

        
        
        
        const response = await this.getUser();
        if (response) {
            var satelite01 = this.state.satelite01;
            var satelite02 = this.state.satelite02;
            var satelite01Name = this.state.satelite01Name;
            var satelite02Name = this.state.satelite02Name;
            var sateliteCenter = this.state.sateliteCenter;
            console.log(response)
            satelite01Name = response[0].name === "SL-1 R/B" ? response[0].name : response[1].name
            satelite02Name = response[1].name === "UNID" ? response[1].name : response[0].name
            
            satelite01.lat = response[0].name === "SL-1 R/B" ? parseFloat(response[0].latitude) : parseFloat(response[1].latitude)
            satelite02.lat = response[1].name === "UNID" ? parseFloat(response[1].latitude) : parseFloat(response[0].latitude)
            
            
            satelite01.lng = response[0].name === "SL-1 R/B" ? parseFloat(response[0].longitude) : parseFloat(response[1].longitude)
            satelite02.lng = response[1].name === "UNID" ? parseFloat(response[1].longitude) : parseFloat(response[0].longitude)
            // if(this.state.seconds === 2){
                sateliteCenter.lat = (satelite01.lat + satelite02.lat) / 2;
                sateliteCenter.lng = (satelite01.lng + satelite02.lng) / 2; 
            // }
            console.log(satelite01)
            console.log(satelite02)
            console.log(sateliteCenter)
            console.log(satelite01Name, satelite02Name)
            
            this.setState({
                satelite01: satelite01,
                satelite02: satelite02,
                satelite01Name: satelite01Name,
                satelite02Name: satelite02Name,
                sateliteCenter: sateliteCenter 
            })
            
        }
        this.setState({ loading: false });
    }
    tick() {
        // if (this.props.biltyStatusId === 8 || this.props.biltyStatusId === 9 || this.props.biltyStatusId === 10) {
        //     }
        this.getLiveLocation();
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }
    componentWillUnmount() {
        console.log("lets Unmount")
        clearInterval(this.interval);
    }

    async componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
        // this.getLiveLocation();
    }
    render() {
        return (
            <APIProvider apiKey={'AIzaSyBG4WuTT6-8Ssb-aPdpFH8sbqKWnMIt7uo'}>
                <Map
                    style={{ width: '99vw', height: '80vh' }}
                    // defaultCenter={{lat: -36.59, lng: 138.12}}
                    center={this.state.sateliteCenter}
                    defaultZoom={8}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}>
                    <Marker title={this.state.satelite01Name} position={this.state.satelite01} />
                    <Marker title={this.state.satelite02Name} position={this.state.satelite02} />
                    {/* <Marker title={"Lahore"} position={this.state.positionLahore}/> */}
                    {/* <AdvancedMarker title={"Lahore"} position={this.state.positionLahore} /> */}
                    {/* <Marker title={"Islamabd"} position={this.state.positionIslamabd}/> */}
                    {/* <AdvancedMarker position={position}></AdvancedMarker> */}
                </Map>
            </APIProvider>
        );
    }
}
