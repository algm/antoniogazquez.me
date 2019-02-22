---
templateKey: blog-post
image: /img/mortgage-acceleration.jpg
title: Cómo optimizar procesos lentos y no morir en el intento
date: 2019-02-19T18:06:51.676Z
description: >-
  Cuando trabajas en webs con mucho código del que conocemos como "legado"
  muchas veces te encuentras con procesos que son muy lentos y penalizan
  muchísimo el rendimiento de la web. Estos son algunos trucos que utilizo para
  mejorar estas situaciones sin muchos quebraderos de cabeza.
tags:
  - programación
  - optimización
  - legacy code
  - php
---
Importaciones de datos, búsquedas complejas, consultas a APIs; todas estos procesos nos los encontramos en muchos proyectos y muchas veces se convierten en un quebradero de cabeza, un cuello de botella de rendimiento y, al final, en un pozo negro de tiempo, recursos y dinero. 

He conocido (y también creado, quien esté libre de pecado que tire la primera piedra) muchos casos como los que he mencionado. En este artículo voy a intentar proporcionar una serie de consejos que me han ayudado en el pasado para mejorar el rendimiento de nuestras aplicaciones.

Enfocaré los ejemplos a código php, pero son aplicables a casi cualquier lenguaje de programación.

# 1. No busques culpables

Parece una tontería, pero no lo es. Cuando nos encontramos con un sistema lento y pesado lo primero que hacemos es pensar que aquellas personas que lo programaron han tenido la culpa de todos los males y que no saben hacer la O con un canuto. Lo cierto es que no lo sabes, ni importa lo más mínimo. Lo primero que hay que hacer al enfrentarse a una tarea de este tipo, especialmente si no la has hecho tú ni tu equipo, es asumir que quien fuera que lo hiciera tuvo sus razones y sus circunstancias; pero sus soluciones, por el motivo que sea, han dejado de ajustarse a las necesidades actuales. 
Es muy importante enfocar las cosas de forma constructiva. Como decía un amigo: **No me des problemas, dame soluciones.**

# 2. Aumenta los recursos de hardware

La solución más obvia (y la más cara probablemente) es darle más músculo al hardware que mueve la aplicación; hacer peticiones distribuidas, usar una base de datos con replicación de lectura, aumentar la RAM, la CPU... todo esto puede mitigar el problema, al menos mientras buscamos una solución más óptima.

Sólo recurriría a esto como medida temporal para ganar tiempo y tampoco está garantizado que mejore realmente el rendimiento, dependiendo del problema de fondo que tengas.

# 3. Indexa bien las bases de datos

Es sorprendente la de veces que algo tan fácil como añadir un índice a una tabla de una base de datos a mejorado en gran medida el rendimiento de una web. Antes de remangarte y ponerte a tocar código, comprueba, si aplica, las queries a la base de datos que intervengan en el proceso que quieres optimizar, a veces encontrarás una query que tarda una eternidad y sólo con añadir un índice en el sitio correcto se hará casi de forma instantánea.

Más info: [https://www.sitepoint.com/optimize-mysql-indexes-slow-queries-configuration/](https://www.sitepoint.com/optimize-mysql-indexes-slow-queries-configuration/)

# 4. Pide los datos de una sola vez

¿Cuántas veces has visto algo como esto?

```php
<?php

class MiProcesadorDeCosas
{
    public function procesarCosas(array $cosas = [])
    {
        //$cosas es un array de ids
        foreach ($cosas as $cosa) {
            //sacamos la cosa de la base de datos
            $datosDeLaCosa = MiModeloDeCosas::find($cosa); 
        }
    }
}
```

Parece un trozo de código inofensivo, dado un array de ids, hacemos una query a la base de datos por cada uno para obtener sus datos.
La query es muy sencilla y rápida, es cierto. El problema viene si `$cosas` tiene 100.000 elementos; como por ejemplo si estamos intentando importar un catálogo de productos y queremos actualizar los que ya existen; estaremos haciendo 100.000 queries; las cuales, además de tardar, harán que ese tiempo tu base de datos esté prácticamente bloqueada para traerle datos a tu proceso.

¿Cómo lo solucionamos? Pues es relativamente sencillo, pero tienes que tener cuidado con la memoria de tu sistema (más adelante hablaremos de esto). Imaginemos, que el código anterior lo estamos escribiendo con Laravel y `MiModeloDeCosas` es un modelo de [Eloquent](https://laravel.com/docs/5.7/eloquent), podemos hacer lo siguiente:

```php
<?php

class MiProcesadorDeCosas
{
    public function procesarCosas(array $cosas = [])
    {
        // $cosas es un array de ids
        // obtenemos una colección de cosas
        $datosDeLasCosas = MiModeloDeCosas::whereIn('id', $cosas)->get(); 

        foreach ($datosDeLasCosas as $datosDeLaCosa) {
            //ya tenemos la cosa!
            dump($cosa);
        }
    }
}
```



# Usa transacciones



# Utiliza generadores



# Ejecuta en segundo plano



# Cachea todo lo cacheable




# Utiliza servicios con soluciones específicas


