import { fireEvent, render, screen } from "@testing-library/react";
import { MultipleCustomHooks } from "../../src/03-examples";
import { useFetch } from "../../src/hooks/useFetch";
import { useCounter} from "../../src/hooks/useCounter";

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');


describe('Pruebas en <MultipleCustomHook/>', () => {

    const mockIncrement = jest.fn();

    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de mostrar el componente por defecto', () => {

        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null
        })

        render(<MultipleCustomHooks/>);

        expect(screen.getByText('Loading...'));
        expect(screen.getByText('BreakingBad Quotes'));

        const nextButton = screen.getByRole('button',{ name:'Next quote' });

        expect(nextButton.disabled).toBeTruthy();

        // screen.debug();

    });

    test('Debe de mostrar un Quote', () => {

        useFetch.mockReturnValue({
            data: [{
                author: 'Fernando',
                quote: 'Hola mundo'
            }],
            isLoading: false,
            hasError: null
        })


        render(<MultipleCustomHooks/>);

        expect(screen.getByText('Hola mundo')).toBeTruthy();
        expect(screen.getByText('Fernando')).toBeTruthy();

        const nextButton = screen.getByRole('button',{ name:'Next quote' });
 
        expect(nextButton.disabled).toBeFalsy();
    });

    test('Debe de llamar la funcion de incrementar', () => {
        
        useFetch.mockReturnValue({
            data: [{
                author: 'Fernando',
                quote: 'Hola mundo'
            }],
            isLoading: false,
            hasError: null
        })

      
        render(<MultipleCustomHooks/>);

        const nextButton = screen.getByRole('button',{ name:'Next quote' });

        fireEvent.click(nextButton);


        expect(mockIncrement).toHaveBeenCalled();

    })
})