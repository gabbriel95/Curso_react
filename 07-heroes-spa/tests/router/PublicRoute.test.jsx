import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";

describe('Pruebas en <PublicRoute/>', () => {

    test('Debe de mostrar el children si no esta autenticado', () => {

        const contextValue = {
            logged: false
        };

        render(
             <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta publica')).toBeTruthy();
    });

    test('Debe de navegar si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123'
            }
        };

        render(
             <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Routes>
                        <Route path='login' element={     
                             <PublicRoute>
                                <h1>Ruta publica</h1>
                            </PublicRoute>}/>
                        <Route path='marvel' element={<h1>Pagina Marvel</h1>}/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Pagina Marvel')).toBeTruthy();
    });
})