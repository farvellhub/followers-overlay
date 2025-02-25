# followers-overlay

## Descripción

Esta aplicación utiliza la API de Twitch para obtener la lista de los 30 seguidores más recientes y mostrarla como una superposición (overlay) para OBS (Open Broadcaster Software).

## Características

- **Integración con la API de Twitch**: Obtiene y muestra en tiempo real los 30 seguidores más recientes.
- **Superposición para OBS**: Diseñada específicamente para ser utilizada como una fuente de navegador en OBS, permitiendo a los streamers mostrar a sus nuevos seguidores en sus transmisiones.

## Requisitos

- **Node.js**: Asegúrate de tener instalada la versión 14 o superior.
- **Cuenta de desarrollador de Twitch**: Necesitarás un Client ID y un Client Secret para autenticar las solicitudes a la API de Twitch.
- **OBS Studio**: Para incorporar la superposición en tus transmisiones.

## Instalación

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/farvellhub/followers-overlay.git
   ```

2. **Navega al directorio del proyecto**:

   ```bash
   cd followers-overlay
   ```

3. **Instala las dependencias**:

   ```bash
   npm install
   ```

4. **Configura las variables de entorno**:

   Crea un archivo `.env` en `backend/` con el siguiente contenido:

   ```env
   CLIENT_ID=tu_client_id
   CLIENT_SECRET=tu_client_secret
   CALLBACK=la_uri_de_redirección
   PORT=puerto_del_server
   ```

   Reemplaza `tu_client_id` y `tu_client_secret` con los valores correspondientes de tu aplicación de Twitch. `la_uri_de_redirección` debe ser `http://localhost:3000/auth/callback`. Debes ir a [Twitch Developers](https://dev.twitch.tv) si deseas cambiarla. Si quieres que la aplicación se conecte con otro puerto, usa la variable `PORT` y reemplaza `puerto_del_server` por el valor que deseas (Recuerda cambiar el puerto en `CALLBACK`).

5. **Inicia la aplicación**:

   ```bash
   npm run start
   ```

   La aplicación debería estar ejecutándose en `http://localhost:3000`.

## Uso

1. **Configuración en OBS**:

   - Inicia la aplicación en una terminal.
   - Autenticate en un navegador en `http://localhost:3000/`.
   - Abre OBS Studio.
   - Añade una nueva **Fuente de navegador** a tu escena.
   - En la URL, ingresa `http://localhost:3000/`.
   - Ajusta el ancho y alto a 1920 x 1080.
   - Asegúrate de que la opción "Controlar la fuente del navegador localmente" esté desactivada.

2. **Personalización**:

   - Los estilos del overlay se pueden modificar en el archivo `frontend/styles/global.css`.
   - Si deseas cambiar la cantidad de seguidores mostrados o el intervalo de actualización, puedes ajustar los parámetros en `backend/config.js`.

## Contribuciones

Si deseas contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request en GitHub.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---
