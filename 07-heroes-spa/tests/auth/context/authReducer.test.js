import { authReducer, types } from "../../../src/auth";

describe('Pruebas en authReducer', () => {

    test('Debe de  retornar el estado por defecto', () => {
       
        const newState = authReducer({logged: false},{});

        expect(newState).toEqual({logged: false});
    });

    test('Debe de (login) llamar el login autenticar y establecer el usuario', () => {
    
        const action = {
            type: types.login,
            payload: {
                name: 'Juan',
                id: '123'
            }
        };

        const state = authReducer({logged: false}, action);

        expect(state.logged).toBeTruthy();
        expect(state.payload).toEqual(state.user.payload);
    });

    test('Debe de (logout) borrar el name del usuario y logged en false', () => {
        const action = {
            type: types.logout,
            payload: {
                name: 'Juan',
                id: '123'
            }
        };

        const state = {
            logged: true, 
            user: {name: 'Juan', id: '123'}}

        const newState = authReducer(state, action);

        expect(newState.logged).toBeFalsy();
        expect(newState.payload).toEqual();
    });
})