# Simple APP Calendar for Artistics OpenCalls

Esta app permite de forma simple agregar convocatorias y organizarlas en un tabla o calendario, el orden prioriza el Deadline de cada convocatoria.

# Instalar

1. Instalar dependencias mediante el comando `npm install` o `npm i`
2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.
3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos anteriormente creada.
4. Ejecutar `npm run dev` o `npm start` para lanzar el servidor.

## Entidades

### User

| Campo      | Tipo         | Descripción                              |
| ---------- | -------      | -------------------------------          |
| id         | INT          | Identificador unico del usuario          | 
| email      | VARCHAR      | Dirección de correo electrónico          | 
| username   | VARCHAR      | Nombre de usuario                        | 
| password   | VARCHAR      | Contraseña del usuario                   | 
| avatar     | VARCHAR      | Nombre del Avtar del usuario             | 
| bio        | VARCHAR      | Descripción del usuario                  | 
| role       | VARCHAR      | Rol del Usuario                          | 
| createdAt  | DATETIME     | Fecha y hora de creación del usuario     | 
| modifiedAt | DATETIME     | Fecha y hora de modificación del usuario | 
| registrationCode | VARCHAR | Codigo de registro                       |
| isActive         | TINYINT  | Estado de la validación.

### Open Call


| Campo         | Tipo     | 
| ------------- | -------- |
| id            | INT      | Identificador único
| userId        | INT      | Identificador del usuario propietario de la opencall.
| name          | VARCHAR  | Nombre de la opencall.
| state         | ENUM     | Estado de la opencall.
| deadline      | DATE     | Fecha límite de la opencall.
| link          | VARCHAR  | Enlace relacionado con la opencall.
| image         | VARCHAR  | URL de la imagen relacionada con la opencall.
| place         | VARCHAR  | Lugar de la opencall.
| request       | VARCHAR  | Requisitos de la opencall.
| offer         | VARCHAR  | Ofertas de la opencall.
| comments      | VARCHAR  | Comentarios adicionales sobre la opencall.
| selected      | ENUM     | Indica si la opencall está seleccionada o no.
| createdAt     | DATETIME | Fecha y hora de creación de la opencall.
| isActive         | TINYINT  | Estado de la openCall.(según deadline)
| addNewColumn  | BOOLEAN  |

## Enpoints

## Usuarios:

- POST / `users` -  Registro de usuario.
- POST / `users/login` - Login de usuario (devuelve token).
- POST `/users/validate/:regCode` - Permite validar un usuario. (VER SI SE HACE)
- GET / `users` - Devuelve información del usuario del token.
- PUT / `users` - Editar el email o el nombre del usuario.
- PUT / `users/avatar` Editar el avatar.
- DELETE `/users/delete` - Eliminar cuenta del usuario. (VER SI SE HACE)
-  GET `/users/products/:id` - Ver los productos de un usuario.(VER SI SE HACE)


### Open calls:

-   POST `/newopencall` - Permite crear una nueva opencall .
-   GET `/opencall` - Lista todas las opencalls.
-   GET `/opencall/:opencallId` - Devuelve la infomación de la opencall.
-   GET `/opencall/filters/?` - Devuelve la infomación de las opencallS filtrados.
-   PUT `/opencalls/:productId` - Permite editar la información de una opencall dentro del calendario.
-   DELETE `/opencall` - Elimina una opencall solo si eres el propietario.

### Favoritos (VER SI SE HACE)

-   PUT `/favorites` - Añade/elimina un favorito.
-   GET `/favorites` - Información de los favoritos del usuario logueado.