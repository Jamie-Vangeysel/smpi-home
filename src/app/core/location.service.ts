import { Injectable } from '@angular/core';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationEvents,
  BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation/ngx';
import { LocationApiService } from './api/location.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private locationApiService: LocationApiService
  ) {
  }

  async start() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 50,
      distanceFilter: 50,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      activityType: 'OtherNavigation',
      saveBatteryOnBackground: true,
      startOnBoot: true,
      activitiesInterval: 30000
    };

    this.backgroundGeolocation.configure(config)
      .then(() => {
        this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);

          const username = window.localStorage.getItem('smpiHome.username');
          this.locationApiService.post(location, username).subscribe(() => {
            console.log('location has been posted!');
          }, err => {
            console.log('error posting location');
          });

          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          this.backgroundGeolocation.finish(); // FOR IOS ONLY
        });
      });

    // start recording location
    await this.backgroundGeolocation.start();
  }
}
