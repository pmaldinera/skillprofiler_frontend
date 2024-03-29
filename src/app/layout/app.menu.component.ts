import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Quiz', icon: 'pi pi-fw pi-circle', routerLink: ['/quiz'] },
                ]
            },
            {
                label: 'Configuration',
                items: [
                    { label: 'Measures', icon: 'pi pi-fw pi-cog', routerLink: ['/utilities/icons'] },
                    { label: 'Profiles', icon: 'pi pi-fw pi-cog', routerLink: ['/utilities/icons'] },
                    { label: 'Decatypes', icon: 'pi pi-fw pi-cog', routerLink: ['/utilities/icons'] },
                ]
            }
        ];
    }
}
