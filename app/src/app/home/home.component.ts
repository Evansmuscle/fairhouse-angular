import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Types
import { HousingLocation } from '../housing-location';

// Services
import { HousingDataService } from '../housing-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  selectedLocation: HousingLocation | undefined;

  constructor(
    private housingDataService: HousingDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.housingDataService.getHousingData().subscribe((response) => {
      this.housingLocationList = response.data;
    });
  }

  updateSelectedLocation(location: HousingLocation) {
    this.selectedLocation = location;

    this.router.navigate(
      ['/housing', location.name.toLowerCase().replace(' ', '-')],
      {
        queryParams: {
          name: location.name,
          city: location.city,
          state: location.state,
          photo: location.photo,
          wifi: location.wifi,
          laundry: location.laundry,
        },
      }
    );
  }
}
