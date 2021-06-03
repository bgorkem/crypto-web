
import React from 'react'
import AppComponent from '../AppComponent';

import { render, waitFor, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


describe ('AppComponent test', ()=>{

    let comp = null;

    beforeEach( ()=>{
         comp = render(<AppComponent/>)      
    })

    afterEach( ()=>{
        comp = null;
        cleanup()
    })

    test('it should render the header', async ()=>{
       
        const header = await waitFor(() => screen.getByTestId('header'))
        expect (header).toHaveTextContent('This is the count: 0');
        
    })

    test('it should contain the right link', async ()=> {
        const link = comp.getByTestId('link')
        expect (link).toBeInTheDocument();
        expect (link).toHaveAttribute('href', 'http://www.bbc.com')
        expect (link).toHaveTextContent('Link to BBC')
    })

    test('it should increase the count', async ()=> {
       
        const header = screen.getByTestId('header')
        const button= comp.getByTestId('button');
        button.click();

        expect (header).toHaveTextContent('This is the count: 1');

    })
})