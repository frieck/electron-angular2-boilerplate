import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';



import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Calendar,
    Dashboard
  ],
  providers: [
    CalendarService
  ]
})
export class DashboardModule {}
