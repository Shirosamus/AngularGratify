import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  
  constructor(private authService: AuthService) { }

  ngOnInit(){
    this.authService.popover = document.getElementById('connection-popover');
  }

  disconnect() {
    this.authService.disconnect();
  }
  connect() {
    this.authService.connect();
  }
  isConnected() {
    return this.authService.isAuth;
  }
}
