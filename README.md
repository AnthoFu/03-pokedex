<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo:

1. Clonar repositorio

```bash
git clone https://github.com/AnthoFu/03-pokedex.git 
```

2. Ejecutar

```bash
npm install
```

3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```bash
docker-compose up -d
```

5. Clonar el archivo __.env.template__ y renombrar a __env__

6. Llenar las variables de entornos definidas en el .env

7. Ejecutar la aplicacion en dev:

```bash
npm run start:dev
```

8. Reconstruir la base de datos con la semilla 

```
http//localhost:3000/api/v2/seed
```

9. Conectarse a la base de datos de mongoDB (En mi caso utilicé TablePlus)


__mongodb://localhost:27017/nest-pokemon__

## Stack tecnologico utilizado:

* MongoDB
* Nest

## Herramientas de produccion utilizadas:

* Render (Backend)
* MongoDB Atlas (Base de datos)