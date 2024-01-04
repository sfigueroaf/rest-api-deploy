import axios from "axios";

export class LedController {
  // Método para encender el LED
  static async encenderLED(req, res) {
    try {
      // Realiza una solicitud HTTP al NodeMCU ESP8266 para encender el LED
      const response = await axios.get("http://IP_DEL_NODEMCU/encender"); // Reemplaza con la IP de tu NodeMCU
      // const response = 's' // Reemplaza con la IP de tu NodeMCU
      res.send(response.data);
    } catch (error) {
      console.error("Error al encender el LED:", error);
      res
        .status(500)
        .send(
          "Error al encender el LED: No se pudo establecer conexión con el servidor del NodeMCU"
        );
    }
  }

  // Método para apagar el LED
  static async apagarLED(req, res) {
    try {
      // Realiza una solicitud HTTP al NodeMCU ESP8266 para apagar el LED
      const response = await axios.get("http://IP_DEL_NODEMCU/apagar"); // Reemplaza con la IP de tu NodeMCU
      // const response = "a"; // Reemplaza con la IP de tu NodeMCU
      res.send(response.data);
    } catch (error) {
      console.error("Error al apagar el LED:", error);
      res
        .status(500)
        .send(
          "Error al apagar el LED: No se pudo establecer conexión con el servidor del NodeMCU"
        );
    }
  }

  // Método para controlar el LED
  static async controlarLED(req, res) {
    try {
      const { x, y } = req.body; // Suponiendo que los datos x e y están en el cuerpo de la solicitud
      const data = { x, y };

      // Realiza una solicitud POST al NodeMCU ESP8266 para controlar acciones basadas en x e y
      // const response = await axios.post("http://IP_DEL_NODEMCU/control", data); // Reemplaza con la IP de tu NodeMCU y la ruta adecuada
      const response = data; // Reemplaza con la IP de tu NodeMCU y la ruta adecuada

      // Envia una respuesta con un mensaje y los datos recibidos
      res.status(200).json({
        mensaje: "Datos recibidos y procesados correctamente en el servidor",
        datosRecibidos: { x, y },
        respuestaNodeMCU: response.data, // Puedes incluir aquí la respuesta del NodeMCU si es relevante
      });
      // res.send(response.data);
    } catch (error) {
      console.error("Error al enviar datos al NodeMCU:", error);
      res.status(500).send("Error al enviar datos al NodeMCU");
    }
  }

  // Método para leer valores
  static async readLED(req, res) {
    try {
      const { a, b, c, d } = { a: 50, b: 60, c: 80, d: 40 }; // Suponiendo que los datos x e y están en el cuerpo de la solicitud
      const data = { a, b, c, d };

      // Realiza una solicitud GET al NodeMCU ESP8266 para controlar acciones basadas en x e y
      // const response = await axios.post("http://IP_DEL_NODEMCU/control", data); // Reemplaza con la IP de tu NodeMCU y la ruta adecuada
      const response = data; // Reemplaza con la IP de tu NodeMCU y la ruta adecuada

      // Envia una respuesta con un mensaje y los datos recibidos
      res.status(200).json({
        mensaje: "Datos recibidos y procesados correctamente en el servidor",
        datosRecibidos: { a, b, c, d },
        respuestaNodeMCU: response.data, // Puedes incluir aquí la respuesta del NodeMCU si es relevante
      });
      // res.send(response.data);
    } catch (error) {
      console.error("Error al enviar datos al NodeMCU:", error);
      res.status(500).send("Error al enviar datos al NodeMCU");
    }
  }
}
