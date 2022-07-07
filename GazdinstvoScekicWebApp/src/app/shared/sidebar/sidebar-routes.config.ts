import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    {
        path: 'pocetna', title: 'Kontrolna tabla', icon: 'bi bi-house-door', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: 'pocetna', title: 'Početna', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []  },  
            { path: 'proizvodi', title: 'Proizvodi', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: 'dodajProizvod', title: 'Dodaj proizvod', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
    },
];