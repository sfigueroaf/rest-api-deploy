import axios from "axios";


export class LedController {
  // Método para encender el LED
  static async encenderLED(req, res) {
    try {
      // Realiza una solicitud HTTP al NodeMCU ESP8266 para encender el LED
    //   const response = await axios.get("http://IP_DEL_NODEMCU/encender"); // Reemplaza con la IP de tu NodeMCU
      const response = 's' // Reemplaza con la IP de tu NodeMCU
      res.send(response.data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  // Método para apagar el LED
  static async apagarLED(req, res) {
    try {
      // Realiza una solicitud HTTP al NodeMCU ESP8266 para apagar el LED
    //   const response = await axios.get("http://IP_DEL_NODEMCU/apagar"); // Reemplaza con la IP de tu NodeMCU
      const response = 'a' // Reemplaza con la IP de tu NodeMCU
      res.send(response.data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
