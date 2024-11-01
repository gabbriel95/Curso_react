import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dodr5iwn5",
  api_key: "738617221416219",
  api_secret: "SKfMLoIYu7Yrq5nTNDyJs7k9viI",
  secure: true,
});

describe("Pruebas en fileUpload", () => {
  test("Debe de subir el archivo correctamente a cloudinary", async () => {
    const imgURL =
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80";

    const resp = await fetch(imgURL);
    const blob = await resp.blob();
    const file = new File([blob], "foto.jpg");

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    const segments = url.split("/");

    const imageId = segments[segments.length - 1].replace(".jpg", "");

    await cloudinary.api.delete_resources(["journal/" + imageId]);
  }, 10000);

  test("Debe de retornar null", async () => {
    const file = new File([], "foto.jpg");

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
