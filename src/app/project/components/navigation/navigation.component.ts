import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(private router: Router) { }


  navigateToGeneral(): void {
    this.router.navigate(['']);
  }

  navigateToSource(): void {
    this.router.navigate(['/source']);
  }

  navigateToDayOffs(): void {
    this.router.navigate(['/dayOffs']);
  }

  navigateToCodes(): void {
    this.router.navigate(['/codes']);
  }
}
