import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSingIn } from "../../../src/store/auth/thunks";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSingIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSingIn: () => mockStartGoogleSingIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
  /*Recibe una funcion y le manda a llamar a esa funcion (?)
    El valor que regresa la funcion es una funcion que regresa el llamado de esa funcion
    Cuando se llame el useDispatch para retornar esa funcion*/
}));

// Tecnica para sobrescribir cualquier funcion con jest

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe("Pruebas en <LoginPage/>", () => {
  beforeEach(() => jest.clearAllMocks());

  test("Debe de mostrar el componente correctamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    //screen.debug();

    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("Boton de google debe de llamar el startGoogleSingIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText("google-btn");

    fireEvent.click(googleBtn);

    expect(mockStartGoogleSingIn).toHaveBeenCalled();
  });

  test("Submit debe de llamar el startLoginWithEmailPassword", () => {
    const email = "fernando@google.com";
    const password = "1234567";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", { name: "Correo" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    const loginForm = screen.getByLabelText("submit-form");
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email: email,
      password: password,
    });
  });
});
