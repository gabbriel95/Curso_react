import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { AuthContext } from "../../src/auth";

describe('Pruebas en <PrivateRoute/>', () => {

    test('Debe de mostrar el children si esta autenticado', () => {

        Storage.prototype.setItem = jest.fn();


        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123'
            }
        };

        render(
            <AuthContext.Provider value={ contextValue }>
               <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                       <h1>Ruta privada</h1>
                    </PrivateRoute>
               </MemoryRouter>
           </AuthContext.Provider>
       );


        expect(screen.getByText('Ruta privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", '/search?q=batman');
    });

   
})