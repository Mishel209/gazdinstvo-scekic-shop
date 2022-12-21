import { Component , OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarService } from '../services/sidebar/sidebar.service';
import { Subscription } from 'rxjs';
import { MesssageService } from '../services/message.service';



@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{

    route: string;
    default : any;
    private subscription: Subscription = new Subscription;
    numberOfProducts = 0;
    
    constructor(public sidebarservice: SidebarService, private messageService: MesssageService, location: Location, router: Router) {

        router.events.subscribe((val) => {
            if(location.path() == '/dashboard/default'){
                $('body').removeAttr('class')
                this.default =true; 
                $('body').addClass('bg-theme bg-theme1')
            } else {
                this.default =false;
                if(location.path() == '/dashboard/eCommerce'){
                    $('body').removeAttr('class')
                    $('body').addClass('bg-theme bg-theme2')
                    } else {
                        if(location.path() == '/dashboard/sales'){
                            $('body').removeAttr('class')
                            $('body').addClass('bg-theme bg-theme6')
                        } else{
                            if(location.path() == '/dashboard/analytics'){
                                $('body').removeAttr('class')
                                $('body').addClass('bg-theme bg-theme9')
                            } else {
                                if(location.path() == '/dashboard/alternate'){
                                    $('body').removeAttr('class')
                                    $('body').addClass('bg-theme bg-theme3')

                                    }   else {
                                        if(location.path() == '/dashboard/digital-marketing'){
                                            $('body').removeAttr('class')
                                            $('body').addClass('bg-theme bg-theme4')

                                            } else {
                                                    if(location.path() == '/dashboard/human-resources'){
                                                        $('body').removeAttr('class')
                                                        $('body').addClass('bg-theme bg-theme7')

                                                    }

                                                }

                                    }
                        }
                    }
                }
            }
          });

     }
        
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }
    
    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    ngOnInit() {

        this.subscription = this.messageService.getNumberOfProducts().subscribe(sub => { 
            this.numberOfProducts = sub;
        });

        /* Search Bar */

        $(".mobile-search-icon").on("click", function() {
			
            $(".search-bar").addClass("full-search-bar")
           
          }), 
      
        $(".search-close").on("click", function() {
           $(".search-bar").removeClass("full-search-bar")
        }), 
 
        // header color change on scrol
        $(document).ready(function () {
			$(window).on("scroll", function () {
				if ($(this).scrollTop() > 60) {
					$('.topbar').addClass('bg-dark');
				} else {
					$('.topbar').removeClass('bg-dark');
				}
			});
			
		});

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
      } 
    
}
