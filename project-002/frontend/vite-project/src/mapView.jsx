import React, { Component } from "react";
import { APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps'


var color = "#FF0000";

const onLoad = polyline => {
    console.log('polyline: ', polyline)
};
  const markerOpt = {
    icon : './assets/pin.png', 
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
            
            position : { lat: 47.7, lng: -38.6 },
            //00000 UNID
            positionKarachi : { lat: 47.7, lng: -38.6 } ,
            //00001 SL-1 R/B
            positionLahore : { lat: 50.24, lng: -28.04 },
            //00100 Discover 23 Stopped
            // 10000 
            positionIslamabd : { lat: -0.11, lng: 26.15 },
            driverLat: 0,
            driverLng: 0,
            driverOpacity: 0,
            opacity: 1,
            seconds: 0
        };
    }

    getLiveLocation = async () => {
        var positionKarachi = this.state.positionKarachi;
        var positionIslamabd = this.state.positionIslamabd;
        var positionLahore = this.state.positionLahore;
        positionKarachi.lat = positionKarachi.lat + 1;
        positionKarachi.lng = positionKarachi.lng + 1;

        positionIslamabd.lat = positionIslamabd.lat + 1;
        positionIslamabd.lat = positionIslamabd.lat + 1;
        
        positionLahore.lat = positionLahore.lat + 1;
        positionLahore.lat = positionLahore.lat + 1;

        this.setState({ 
            positionKarachi: positionKarachi,
            positionIslamabd: positionIslamabd,
            positionLahore: positionLahore
        })
        
         
        // const response = await ShipmentService.getLiveLocation(this.props.biltyId);
        // if (response) {
        //     console.log(response)
        //     this.setState({
        //         driverLat: response.latitude,
        //         driverLng: response.longitude
        //     })
        // } else {
        //     message.error(response.error);
        // }
        // this.setState({ loading: false });
    }
    tick() {
        // if (this.props.biltyStatusId === 8 || this.props.biltyStatusId === 9 || this.props.biltyStatusId === 10) {
            //     }
                // this.getLiveLocation()
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
    }
    render() {
        return (
            <APIProvider apiKey={'AIzaSyBG4WuTT6-8Ssb-aPdpFH8sbqKWnMIt7uo'}>
            <Map
              style={{ width: '99vw', height: '80vh' }}
              // defaultCenter={{lat: 22.54992, lng: 0}}
              defaultCenter={this.state.position}
              defaultZoom={5}
              gestureHandling={'greedy'}
              zoomControl={false}
              disableDefaultUI={true}
              mapId={"DEMO_MAP_ID"}>
                <AdvancedMarker title={"Karachi"} position={this.state.positionKarachi}/>
                {/* <Marker title={"Lahore"} position={this.state.positionLahore}/> */}
                <AdvancedMarker title={"Lahore"} position={this.state.positionLahore} />
                {/* <Marker title={"Islamabd"} position={this.state.positionIslamabd}/> */}
                {/* <AdvancedMarker position={position}></AdvancedMarker> */}
            </Map>
          </APIProvider>
        );
    }
}
