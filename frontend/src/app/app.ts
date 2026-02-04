import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNav } from './top-nav/top-nav';
import { HeroHomepage } from './hero-homepage/hero-homepage';
import { ExerciseCards } from './exercise-cards/exercise-cards';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopNav, HeroHomepage, ExerciseCards],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
