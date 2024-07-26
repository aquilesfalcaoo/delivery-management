import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, MenubarModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './menu.component.html',
  styles: ``,
})
export class MenuComponent {
  public items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(): void {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home', route: '/' },
      { label: 'Delivery', icon: 'pi pi-truck', route: '/delivery' },
    ];
  }
}
