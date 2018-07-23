# Hulk-Store
Prueba tecnica Angular 6 con ngrx (redux)

# Usuarios

Administrador: admin@system.com
Password: 91012202364

Usuario: jdoe@gmail.com	
Password: 91012202364

# Instaladores

- De manera previa instale xamppp con php version 7+, para esto baje el instalador del siguiente link [XAMPP](https://www.apachefriends.org/es/download.html)

- Co configurar variable de entorno php [link](https://es.stackoverflow.com/questions/47618/c%C3%B3mo-a%C3%B1ado-el-path-de-php-con-xampp-a-visual-studio-code)

- Descargue e instale composer [Composer](https://getcomposer.org/download/).


## Instalar api

Ya teniendo todo lo anterior instalado, crear la base de datos con los archivos que estan en la carpeta, descargue el contenido de la carpeta 
back-php y pongalo en una nueva carpeta su xampp en la ruta xampp > htdocs > nueva_carpeta o su servidor php de preferencia, copie el archivo
.env.example, al nuevo archivo cambie el nombre y renombre a .env, actualice los datos de conexion a base de datos esto dentro del archivo .env

instale el proyecto laravel usando el comando: php artisan install

hasta este punto no deberia tener problemas, esto si la instalación del composer, xampp y la variable de entorno fueron correctas.

## Instalar el cliente Angular 6

Descargue o clone los archivos de la carpeta cliente-angular-6, de manera previamente instale angular en su version 6, para esto desinstale la version de angular 
que tenga si es que es menor a la version 6, instale angular cli [guia](https://cli.angular.io/)

Ya en la carpeta final del cliente ejecute el comando: ng install 
Y para ejecutar el comando: ng serve

## NGRX

Documentación sobre NgRX [NGRX](https://github.com/ngrx).

## Redux

Documentación sobre redux en ingles [redux.js.org](https://redux.js.org)
Documentación sobre redux en español [es.redux.js.org](https://es.redux.js.org)

