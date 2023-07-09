import { NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [ApiService, UserService],
})
export class CommonModule {}
