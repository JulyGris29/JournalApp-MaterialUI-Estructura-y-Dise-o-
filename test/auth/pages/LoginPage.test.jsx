/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice, startGoogleSignIn, startLoginWithEmailPassword } from '../../../src/store/auth/';
import { notAuthenticatedState } from '../../fixtures/authFixture';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();


jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn : () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password })
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store  = configureStore ({
    reducer: {
        auth: authSlice.reducer
    },

    preloadedState: {
        auth: notAuthenticatedState
    }

})



describe('Pruebas en el <LoginPage />', () => { 

    beforeEach(() => jest.clearAllMocks() );

    
    test('debe de mostrar el compoponente correctamente', () => { 

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        // screen.debug()
        expect( screen.getAllByText ('Login').length ).toBeGreaterThanOrEqual(1);
    });

    test('botón de Google debe llamar el startGoogleSignIn', () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click( googleBtn );
        expect (mockStartGoogleSignIn).toHaveBeenCalled();

        
    });

    test('submit debe llamar startLoginWithEmailPassword', () => {

        const email = 'Julygrsiale@google.com';
        const password = '1234';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const emailField= screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change( emailField, { target: { name: 'email', value: email } });

        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        expect( mockStartLoginWithEmailPassword ).toHaveBeenLastCalledWith({
            email: email,
            password: password
        })

        
        
     })
    
 });