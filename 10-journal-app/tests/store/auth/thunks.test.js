import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  singIngWithGoogle,
} from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import {
  checkingAuthentication,
  startCreatingUserWithEmailPassword,
  startGoogleSingIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe("Pruebas en AuthThunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("Debe de invocar el checkingCredentials", async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSingIn debe de llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };

    await singIngWithGoogle.mockResolvedValue(loginData);

    await startGoogleSingIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSingIn debe de llamar checkingCredentials y logout - Error", async () => {
    const errorMessage = "Un error en Google";
    const loginData = { ok: false, errorMessage };

    await singIngWithGoogle.mockResolvedValue(loginData);

    await startGoogleSingIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };

    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startLoginWithEmailPassword debe de llamar checkingCredentials y login - Error", async () => {
    const errorMessage = "Un error";
    const loginData = { ok: false, errorMessage };

    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test("startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };

    const formData = {
      email: demoUser.email,
      displayName: demoUser.displayName,
      password: "123456",
    };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - Error", async () => {
    const errorMessage = "Un error";

    const loginData = { ok: false, errorMessage };

    const formData = {
      email: demoUser.email,
      displayName: demoUser.displayName,
      password: "123456",
    };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage }));
  });

  test("startLogout debe de llamar logoutFirebase, clearNotes y logout", async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
