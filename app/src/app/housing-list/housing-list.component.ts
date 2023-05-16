import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

// Types
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-housing-list',
  templateUrl: './housing-list.component.html',
  styleUrls: ['./housing-list.component.scss'],
})
export class HousingListComponent {
  @Input() locationList: HousingLocation[] = [];
  results: HousingLocation[] = [];
  @Output() selectedLocationEvent = new EventEmitter<HousingLocation>();

  constructor() {}

  ngOnInit(): void {
    this.results = this.locationList;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['locationList']) {
      this.results = this.locationList;
    }
  }

  searchHousingLocations(searchText: string) {
    if (!searchText) {
      this.results = this.locationList;
      return;
    }

    this.results = this.locationList.filter((location) => {
      return (
        location.name.toLowerCase().includes(searchText.toLowerCase()) ||
        location.city.toLowerCase().includes(searchText.toLowerCase()) ||
        location.state.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }

  selectLocation(location: HousingLocation) {
    this.selectedLocationEvent.emit(location);
  }
}
