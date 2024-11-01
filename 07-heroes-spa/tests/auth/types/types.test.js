import { types } from "../../../src/auth";

describe('Pruebas en "types.jsx"', () => {
    test('Debe de regresar estos types', () => {

        expect(types).toEqual({
                login: '[Auth] Login',
                logout: '[Auth] Logout'
        });

    });
})