import { renderHook, act } from "@testing-library/react"
import { useForm } from "../../src/hooks/useForm"

describe('Pruebas en useForm', () => {

    const initialForm = {
        name: 'Fernando',
        email: 'fernando@google.com'
    }

    test("Debe de retornar los valores por defecto", ()=> {
        const {result} = renderHook(() => useForm(initialForm));
  
        expect(result.current).toEqual({
            name: initialForm.name,
            email: initialForm.email,
            formState: initialForm,
            onInputChange: expect.any(Function),
            onResetForm: expect.any(Function),
          });
    });

    test("Debe de cambiar el nombre del formulario", () => {
        const newValue = 'Juan';
        const {result} = renderHook(() => useForm(initialForm));
        const {onInputChange} = result.current;

        act(() => {
            onInputChange({target: {name: 'name', value: newValue}});
        });

        expect(result.current).toMatchObject({
            name: newValue,
            email: initialForm.email,
            formState: {name: newValue, email: initialForm.email}
        });

    });

    test("Debe de realizar el reset del formulario", () => {
        const newValue = 'Juan';
        const {result} = renderHook(() => useForm(initialForm));
        const {onInputChange, onResetForm} = result.current;

        act(() => {
            onInputChange({target: {name: 'name', value: newValue}});
            onResetForm()
        });

        expect(result.current).toMatchObject({
            name: initialForm.name,
            email: initialForm.email,
            formState: {name: initialForm.name, email: initialForm.email}
        });

    });
})