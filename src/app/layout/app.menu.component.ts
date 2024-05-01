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
                    { label: 'Candidates', icon: 'pi pi-fw pi-circle', routerLink: ['/candidate'] },
                    { label: 'Tests', icon: 'pi pi-fw pi-circle', routerLink: ['/quiz'] },
                ]
            },
            {
                label: 'Configuration',
                items: [
                    { label: 'Measures', icon: 'pi pi-fw pi-cog', routerLink: ['/utilities/icons'] },
                    { label: 'Profiles', icon: 'pi pi-fw pi-cog', routerLink: ['/utilities/icons'] },
                    { label: 'Decatypes', icon: 'pi pi-fw pi-cog', routerLink: ['/utilities/icons'] },
                    { label: 'Summarys', icon: 'pi pi-fw pi-cog', routerLink: ['/utilities/icons'] },
                    { label: 'Tests', icon: 'pi pi-fw pi-cog', routerLink: ['/utilities/icons'] },
                    { label: 'Academic Degrees', icon: 'pi pi-fw pi-cog', routerLink: ['/utilities/icons'] },
                    { label: 'Positions', icon: 'pi pi-fw pi-cog', routerLink: ['/utilities/icons'] },
                    { label: 'Customers', icon: 'pi pi-fw pi-cog', routerLink: ['/utilities/icons'] },
                    { label: 'Users', icon: 'pi pi-fw pi-cog', routerLink: ['/utilities/icons'] },
                ]
            }
        ];
    }
}
