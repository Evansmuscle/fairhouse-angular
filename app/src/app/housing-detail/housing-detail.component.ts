import { Component, Input } from '@angular/core';

// Types
import { HousingLocation } from '../housing-location';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-housing-detail',
  templateUrl: './housing-detail.component.html',
  styleUrls: ['./housing-detail.component.scss'],
})
export class HousingDetailComponent {
  location: HousingLocation | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.location = {
        name: params['name'],
        city: params['city'],
        state: params['state'],
        photo: params['photo'],
        wifi: params['wifi'],
        laundry: params['laundry'],
      } as HousingLocation;
    });
  }
}
