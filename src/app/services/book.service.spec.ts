import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BookService } from "./book.service";
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "src/environments/environment.prod";
import { Key } from "protractor";

describe('BookService', () => {

    const book: Book = {
        name: 'BookOne',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
    }

    const listBook: Book[] = [
        {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2
        },
        {
            name: '',
            author: '',
            isbn: '',
            price: 20,
            amount: 1
        },
        {
            name: '',
            author: '',
            isbn: '',
            price: 8,
            amount: 7
        }
    ];

    let service: BookService;
    let httpMock: HttpTestingController;
    let storage = {};

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach( () => {
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
        storage = {};
        spyOn(localStorage, 'getItem').and.callFake((key: string) => {
            return storage[key] ? storage[key] : null;
        });

        spyOn(localStorage, 'setItem').and.callFake((_Key: string, value: string) => {
            return storage[_Key] = value;
        });
    });

    afterEach( () => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getBook return a list of book and does a get method', () => {
        service.getBooks().subscribe((resp: Book[]) => {
            expect(resp).toEqual(listBook);
        });
        const req = httpMock.expectOne(environment.API_REST_URL + '/book');
        expect(req.request.method).toBe('GET');
        req.flush(listBook);
    });

    it('getBooksFromCart return empty array when localStorage is empty', () => {
        const listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
    });

    it('addBookToCart add a book successfuly when the list does not exist in the localStorage', () => {
        // const toast = {
        //     fire: () => null
        // };

        // const spy1 = spyOn(swal, 'mixin').and.callFake(() => {
        //     return toast;
        // });

        let listBook = service.getBooksFromCart();
        service.addBookToCart(book);
        console.log(listBook.length);
        expect(listBook.length).toBe(0);
        service.addBookToCart(book);
        // expect(spy1).toHaveBeenCalled();
    });

    it('removeBooksFromCart removes the list from the localStorage', () => {
        service.addBookToCart(book);
        let listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(1);
        service.removeBooksFromCart();
        listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
    });

});