import {Subject} from 'rxjs';

const cartSumSubject = new Subject();

export const cartSumService = {
    sendCartSum: (newCartSum) => cartSumSubject.next(newCartSum) ,
    getCartSum: () => cartSumSubject.asObservable()
}

//subjekt on selline asi, et nii kui .next() kaivitub, siis laheb kaima .subscribe()
//nii kui toimub ostukorvi lisamine, koheselt arvutatakse ostukorvi kogusumma
//kui toimub ostukorvist kustutamimne, arvutatakse j'allke ostukorvi kogusumma