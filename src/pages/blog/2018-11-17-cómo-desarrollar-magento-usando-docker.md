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
---
Desde que empecé a trabajar en [Redegal](https://www.redegal.com/es/), he usado mucho Magento (especialmente Magento 2). Es un sistema enorme y complejo y configurar el entorno de desarrollo, la instalación y compartir configuraciones, módulos y código puede llegar a convertirse en todo un reto.

Para simplificar un poco todo esto decidí crear un entorno dockerizado de desarrollo para poder configurar entornos de la forma más indolora posible.

He compartido el paquete en este repositorio: <https://github.com/algm/magento-vessel>.

A continuación os detallo una pequeña guía sobre cómo podéis usarlo.

## Peparación del entorno

Para poder utilizar este sistema, obviamente, necesitas tener instalado Docker y docker-compose. Si nunca has utilizado Docker y no lo tienes instalado, consulta la guía oficial en <https://docs.docker.com>.

Recomiendo encarecidamente que uses un sistema GNU/Linux para trabajar con Docker, ya que está diseñado para trabajar con una funcionalidad nativa del kernel Linux y obtendrás el mejor rendimiento y compatibilidad si lo usa sobre él.
