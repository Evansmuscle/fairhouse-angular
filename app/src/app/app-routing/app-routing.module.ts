import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HousingDetailComponent } from '../housing-detail/housing-detail.component';
import { HomeComponent } from '../home/home.component';

const appRoutes: Routes = [
  { path: 'housing/:id', component: HousingDetailComponent },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
