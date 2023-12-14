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
}
