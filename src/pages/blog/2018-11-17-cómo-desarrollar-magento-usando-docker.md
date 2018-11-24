---
templateKey: blog-post
image: /img/docker2.jpg
title: Cómo desarrollar en Magento 2 usando Docker
date: 2018-11-17T12:33:57.736Z
description: >-
  Usamos magento-vessel para desarrollar un ecommerce Magento desde nuestra
  máquina.
tags:
  - programación
  - magento
  - docker
  - desarrollo
  - ecommerce
  - magento-vessel
---
Desde que empecé a trabajar en [Redegal](https://www.redegal.com/es/), he usado mucho Magento (especialmente Magento 2). Es un sistema enorme y complejo y configurar el entorno de desarrollo, la instalación y compartir configuraciones, módulos y código puede llegar a convertirse en todo un reto.

Para simplificar un poco todo esto decidí crear un entorno dockerizado de desarrollo para poder configurar entornos de la forma más indolora posible.

He compartido el paquete en este repositorio: <https://github.com/algm/magento-vessel>.

Este entorno de Docker está basado en el excelente [Vessel](https://vessel.shippingdocker.com/) que se utiliza en el ecosistema Laravel y comparte la misma filosofía (y scripts), por lo que la documentación del mismo es, en su mayor parte, válida para este sistema.

A continuación os detallo una pequeña guía sobre cómo podéis usarlo.

## Peparación del entorno

Lo primero que necesitaremos es una cuenta en <https://marketplace.magento.com> y unas credenciales para acceder a los repos de Magento. Puedes crearlas aquí: <https://marketplace.magento.com/customer/accessKeys/>.

Para poder utilizar este sistema, obviamente, necesitas tener instalado Docker y docker-compose. Si nunca has utilizado Docker y no lo tienes instalado, consulta la guía oficial en <https://docs.docker.com>.

Recomiendo encarecidamente que uses un sistema GNU/Linux para trabajar con Docker, ya que está diseñado para trabajar con una funcionalidad nativa del kernel Linux y obtendrás el mejor rendimiento y compatibilidad si lo usa sobre él.

Además de Docker necesitarás tener el omnipresente git. Si no lo tienes o no sabes lo que es... debes vivir en otro planeta o no dedicarte a la programación :)

Una vez tengas Docker y un terminal abierto ya lo tienes todo. ¡En serio! ¡Esto es todo! A continuación podemos empezar a trabajar.

## Instalación de magento-vessel

Para instalar magento-vessel sólo tenemos que clonar el repositorio dentro de un directorio donde queramos montar nuestro proyecto de magento.

```bash
$ git clone https://github.com/algm/magento-vessel.git
```

Una vez clonado, crea una carpeta llamada magento dentro y déjala vacia.

Ya tenemos listos los ficheros básicos de nuestro entorno Docker. Puedes editar la configuración que desees y ponerlo todo a tu gusto. Asegúrate de que creas un fichero .env con las credenciales de la base de datos, ya que magento-vessel las usará para configurar su base de datos. Hay un ejemplo en el repositorio que se llama `.env.example`. Puedes copiarlo y renombrarlo a `.env` dentro del mismo directorio. También puedes usar el fichero .env para añadir cualquier otra variable que necesites en la configuración de Docker.

A continuación, construiremos los contenedores definidos en docker-compose.yml ejecutando el siguiente comando:

```bash
$ ./vessel build
```

Una vez esté listo podemos arrancar las máquinas:

```bash
$ ./vessel start
```

Si todo ha ido correctamente, deberiamos tener nuestro entorno arrancado... ¡pero aún no tenemos Magento! Calma, calma, vamos a instalarlo a continuación.

## Instalando Magento 2 con composer

He visto multitud de guías en Internet sobre instalación de Magento y a la gente hacer todo tipo de trucos, pero creo que la forma más sencilla de instalar Magento 2 es con composer. En la documentación oficial existe una guía para hacerlo: <https://devdocs.magento.com/guides/v2.2/install-gde/composer.html>. Como ellos mismos dicen; si lo haces así evitarás problemas de compatibilidad, conflictos de módulos y demás dolores de cabeza, además será sencillísimo de actualizar e instalar parches de seguridad.

Seguro que te estarás preguntando cómo demonios pretendo instalar cosas con composer si antes he dicho que sólo necesitamos Docker y git para trabajar. Está todo en los contenedores y tenemos un script listo para esta tarea:

```bash
$ ./vessel composer create-project --repository=https://repo.magento.com/ magento/project-community-edition magento
```

Mola, ¿eh? Podemos ejecutar cualquier comando de composer dentro del directorio magento usando `./vessel composer en cualquier momento`.

Cuando pase un (buen) rato, se habrán instalado todos los paquetes necesarios y tendremos nuestra instalación de Magento lista para comenzar el proceso de configuración.

## Ejecutando el instalador de Magento 2

Si todo ha ido correctamente ya podemos abrir el navegador y entrar en <http://localhost>. Deberías ver esto:

![Página de instalación](/img/installation.png)

Cuando el instalador pida los parámetros de la base de datos, pondremos las credenciales de las variables que hemos definido en el fichero .env y como host pondremos mysql.

![Parámetros base de datos](/img/add-a-database.png)

Una vez hecho esto, configura todo a tu gusto y al ejecutar el instalador nos podremos regocijar viendo cómo se instala Magento sin ningún problema.

![Instalando...](/img/install.png)

¡Cuando se llene la barra de verde, estará todo listo para usar nuestro sistema! ¡Maravilloso!

![¡Funciona!](/img/magento-admin.png)

## Siguientes pasos

Una vez tengas instalado y funcionando Magento querrás empezar a trastear con él. Recuerda que todo sigue el proceso normal, pero debes ejecutar todos los comandos desde dentro de Docker.

Para ejecutar la consola de Magento usa el comando `./vessel mage`.

¡Que disfrutes!

![cheers!](https://i.giphy.com/media/yziuK6WtDFMly/giphy.webp)
