import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/book.model";
import { of } from "rxjs";

const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2,
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 5,
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 28,
        amount: 1,
    }
];

describe('HomeComponent', () => {

    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [ 
                HomeComponent 
            ],
            providers: [
                //BookService
                {
                    provide: BookService,
                    useValue: {}
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
          }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("getBooks get books from the subscription", () => {
        const bookService = fixture.debugElement.injector.get(BookService);
        // const listBook: Book[] = [];
        const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listBook));
        component.getBooks();
        expect(spy1).toHaveBeenCalled();
        console.log(component.listBook.length);
        expect(component.listBook.length).toBe(3);
    });


});