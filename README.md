**1. Para poder trabajar con el proyecto necesitas tener instalado NodeJs.**

Para comprobar si tienes instalado NodeJs en tu equipo abre una terminal y escribe este comando: `node -v`. Si receibes una respuesta como esta `v22.8.0`, ya lo tienes. Si no, puedes instalarlo desde [aquí](https://nodejs.org/en/download).

*Node.js es un entorno de ejecución de JavaScript basado en el motor V8 de Chrome, que permite ejecutar código fuera del navegador.
Su finalidad es el desarrollo backend y utiliza un modelo basado en eventos y asíncrono, es decir, puede hacer varias cosas sin quedarse bloqueado esperando, lo que le permite manejar muchas conexiones simultáneamente con bajo consumo de recursos.
Es especialmente popular para crear APIs, servidores web y aplicaciones en tiempo real gracias a su ecosistema de paquetes (npm) que permite gestionar de forma muy cómoda las dependecias (utilidades de terceros) del proyecto.*

**2. Clona este repositorio en local**

**3. Instala las dependencias**

Para ello abre una terminal y situate en el directorio del repositorio que acabas de clonar. Desde ahí ejecuta `npm install`. Esto descargará y configurará todas las dependecias del proyecto. 

*Cuando hablamos de dependencias nos referimos a utilidades o bibliotecas de terceros. Es decir, herramientas que han desarrollado otros programadores y que, debido a que son de código abierto, cualquiera puede usar en su proyecto. Si no modificas ese código nunca, no tiene sentido que lo controles mediante un repositorio de Git, por lo que ese código no se sube a los repositorios remotos, así aligeramos el código que controla el repo, y nos centramos solo en mantener el código del que somos propietarios. Para no controlar un archivo o carpeta dentro de un repo solo tenemos que añadirlo al archivo `.gitignore`. Las dependencias de un proyecto en NodeJS se gestionan mediante un archivo llamado `package.json`. Si quieres saber más sobre la finalidad de este archivo, puedes hacerlo desde [aquí](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)*

**4. Ejecuta la app**

Solo tienes que ir a la terminal y ejecutar el comando `npm start`. Esto tambien se define dentro del `package.json`, en el apartado scripts.

**5. Accede a la app**

Abre el navegador y accede a la URL del servidor local, en concreto al puerto 3000 (un puerto bastante común para estos menesteres, se define dentro del código del proyecto, en el archivo index.ts): 
[http://localhost:3000](
http://localhost:3000)

**6. Si trabajas en equipo**

Uno de los miembros del equipo deberá crear un repo nuevo en Github y añadir al resto de integrantes del equipo como colaboradores. Ese es el repo que tendréis que compartir para la evaluación.
