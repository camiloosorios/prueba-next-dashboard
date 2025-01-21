# Proyecto: **NextDashboard**

Este proyecto es una aplicación web de **Dashboard** construida con **Next.js**. Cuenta con autenticación por medio de OAuth, interacción con una api de prueba y dashboard con tablas y gráficas.

`Objetivo:` En este documento, te proporcionaré las instrucciones necesarias para configurar el proyecto en tu entorno local y cómo ponerlo en funcionamiento utilizando Docker.

## Requisitos

Para ejecutar el proyecto correctamente, necesitarás las siguientes herramientas:

- **Node.js**: Necesitarás tener **Node.js 18 o superior** instalado en tu máquina. Puedes verificar si tienes Node.js instalado con el siguiente comando:
  
  ```bash
  node -v
  ```

- **Docker**: Asegúrate de tener **Docker** instalado y funcionando en tu sistema. Puedes verificar esto con el siguiente comando:

    ```bash
    docker --version
    ```

- **Docker Compose**: Este proyecto utiliza Docker Compose para gestionar múltiples contenedores. Asegúrate de que Docker Compose también esté instalado. Verifica con:

    ```bash
    docker-compose --version
    ```

## Pasos para configurar el proyecto

1. ### Clonar el repositorio:
    Primero, clona el repositorio a tu máquina local:
    ```bash
    git clone https://github.com/camiloosorios/prueba-next-dashboard.git

    cd prueba-next-dashboard
    ```

2. ### Configurar las variables de entorno:
    Este proyecto utiliza variables de entorno para almacenar credenciales y configuraciones sensibles. Para facilitar su configuración, sigue los siguientes pasos:
    
    - Renombra el archivo `.env.example` que se encuentra en la raíz del proyecto a `.env` y configura las variables de entorno con sus valores.

    ```bash
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    NEXTAUTH_SECRET=your-nextauth-secret
    ```

3. ### Ejecutar la aplicación con Docker y Docker compose
    - **Construir la imagen y levantar el contenedor:** Para construir  y levantar la imagen de Docker, utiliza el siguiente comando:

    ```bash
    docker compose up --build
    ```

    - Acceder a la aplicación: La aplicación estará disponible en http://localhost:3000. Abre tu navegador y navega a esta URL para ver el proyecto en funcionamiento.

## Comandos útiles
- Detener los contenedores
    ```bash
    docker-compose down
    ```

- Reconstruir sin cache
    ```bash
    docker-compose build --no-cache
    ```

## Notas finales

Con esta guía, se tiene todo lo necesario para ejecutar el proyecto en un entorno local. El objetivo principal de este proyecto es demostrar la integración de tecnologías como Next.js, autenticación OAuth, y despliegue mediante Docker, ofreciendo una base sólida para evaluaciones técnicas y posibles extensiones.

Si existe algún problema durante la configuración, asegúrate de verificar los requisitos y los pasos descritos. Este proyecto busca ser un ejemplo funcional y práctico, adaptable a diversos ambientes de desarrollo.