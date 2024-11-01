import { render, screen } from "@testing-library/react";
import { MainApp } from "../../src/09-useContext/MainApp";
import { UserContext } from "../../src/09-useContext/context/UserContext";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en <MainApp/>",() =>{

    test('Debe de mostrar el HomePage', () => {

        render(
            <MemoryRouter>
                <MainApp/>
            </MemoryRouter>
        );

        expect(screen.getByText('HomePage')).toBeTruthy();
    });

    test('Debe de mostrar el LoginPage', () => {

        render(
            <MemoryRouter initialEntries={['/login']}>
                <MainApp/>
            </MemoryRouter>
        );

        expect(screen.getByText('LoginPage')).toBeTruthy();
    });

    test('Debe de mostrar el About', () => {

        render(
            <MemoryRouter initialEntries={['/about']}>
                <MainApp/>
            </MemoryRouter>
        );

        expect(screen.getByText('About')).toBeTruthy();
    });

})