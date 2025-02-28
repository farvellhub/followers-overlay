import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async ({ request }, next) => {
  const url = new URL(request.url);
  const allowed = {
    api: url.pathname.startsWith('/api'),
    auth: url.pathname.startsWith('/auth'),
    config: url.pathname.startsWith('/config')
  }
  if (allowed.api || allowed.auth || allowed.config) {
    // Redirecciona la petición al backend en el puerto 3000
    url.hostname = 'localhost';
    url.port = '3000';

    const backendRequest = new Request(url.toString(), request);
    const response = await fetch(backendRequest);

    return response; // Retorna la respuesta del backend al frontend
  }

  // Si no es una ruta de API, continúa con la petición normal
  return next(); // Esto permite que Astro siga con la ejecución
};
