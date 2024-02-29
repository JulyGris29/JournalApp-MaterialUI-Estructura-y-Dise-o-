/* eslint-disable no-undef */
import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth';
import { checkingAuthentication, startGoogleSignIn } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixture';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
    
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );


    test('debe de invocar el checkingCredentials', async() => {
        
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        
    });


    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async() => {
        
        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );

    //     // thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    }); 

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => {
        
        const loginData = { ok: false, errorMessage: 'Un error en Google' };
        await signInWithGoogle.mockResolvedValue( loginData );

    //     // thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage ));

    }); 

    test('startLoginWithEmailPassword debe llamar checkingCredentials y  login - Exito',async () => {
        
        const loginData = { ok: true, ...demoUser };
        const fordata = { email: demoUser.email, Password: '123456 '};

        await loginWithEmailPassword.mockResolvedValue( loginData);

        await startLoginWithEmailPassword(fordata)(dispatch)

        expect ( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect ( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startLogout debe llamarlogoutFirebase, clearNotes y logout', async () => {
        
        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect ( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect ( dispatch ).toHaveBeenCalledWith( logout() );


        
    });
    
    

});


