import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { NavComponent } from './nav.component';
import { BookService } from '../services/book.service';
import { RouterTestingModule } from '@angular/router/testing'
import { HomeComponent } from '../pages/home/home.component';
import { CartComponent } from '../pages/cart/cart.component';
import { Router } from '@angular/router';

class ComponentTestRoute {}

describe('Nav component', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'home', component: ComponentTestRoute },
                    { path: 'cart', component: ComponentTestRoute }
                ])
            ],
            declarations: [
                NavComponent,
            ],
            providers: [
                {
                    provide: BookService
                },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate', () => {
        const router = TestBed.inject(Router);

        const spy = spyOn(router, 'navigate');

        component.navTo('home');
        expect(spy).toHaveBeenCalledWith(['/home']);
        
        component.navTo('cart');
        expect(spy).toHaveBeenCalledWith(['/cart']);
    });


});