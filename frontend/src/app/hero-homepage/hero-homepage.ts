import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-hero-homepage',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './hero-homepage.html',
  styleUrl: './hero-homepage.css',
})
export class HeroHomepage {

}
