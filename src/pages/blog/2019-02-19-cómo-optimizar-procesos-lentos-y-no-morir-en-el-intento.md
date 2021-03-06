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

Es sorprendente la de veces que algo tan fácil como añadir un índice a una tabla de una base de datos ha mejorado en gran medida el rendimiento de una web. Antes de remangarte y ponerte a tocar código, comprueba, si aplica, las queries a la base de datos que intervengan en el proceso que quieres optimizar. A veces encontrarás una query que tarda una eternidad y sólo con añadir un índice en el sitio correcto hará que se ejecute casi de forma instantánea.

Más info: <https://www.sitepoint.com/optimize-mysql-indexes-slow-queries-configuration/>

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

Parece un trozo de código inofensivo: dado un array de ids, hacemos una query a la base de datos por cada uno para obtener sus datos.
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

        foreach ($datosDeLasCosas as $cosa) {
            //ya tenemos la cosa!
            dump($cosa);
        }
    }
}
```

Esto multiplicará la eficiencia y lo notarás más cuantos más elementos contenga el array inicial, hasta que te quedes sin memoria. Más adelante veremos cómo solucionar esto.

Este problema se conoce formalmente como "_N+1 Query Problem_". Puedes aprender más al respecto aquí: <https://vegibit.com/how-to-fix-the-n1-problem/>

# 5. Usa transacciones

Esto es parecido al caso anterior, aunque nos será útil cuando estemos modificando datos en una base de datos.

Por ejemplo, pongamos este código:

```php
<?php

class ImportadorDeProductos
{
    public function importar(array $productos = [])
    {        
        foreach ($productos as $producto) {
            Producto::create($producto);
        }
    }
}
```

Al igual que antes, muy sencillo: tenemos un array de datos de productos y hacemos un insert en la base de datos por cada uno de ellos.
Evidentemente, no tenemos otra forma de hacer esto que insertar de uno en uno. Cuando hacemos un insert en base de datos de esta forma, el motor de base de datos lo que hará (más o menos) será ejecutar la instrucción que le hemos mandado (`INSERT INTO productos VALUES(bla, bla, bla)`) y escribir los datos en disco. Como sabemos la E/S es la parte más lenta de cualquier sistema informático, por lo que debemos intentar minimizarla tanto como podamos.

En las bases de datos relacionales disponemos de una herramienta que se conoce como transacciones que, a grosso modo, almacenará en un buffer los cambios que hagamos y no los hará efectivos hasta que invoquemos la instrucción `COMMIT`. Esto tiene muchas ventajas, la primera es que nos permite cancelar un conjunto de cambios llamando a `ROLLBACK` sin que se haya llegado a hacer ningún cambio en los datos que tenemos guardados y otra, que es que la que nos interesa en este caso, es que no escribirá a disco hasta que digamos que queremos hacer efectivos los cambios. Por lo que sólo tenemos que hacer este cambio en nuestro código:

```php
<?php

class ImportadorDeProductos
{
    public function importar(iterable $productos = [])
    {   
        DB::transaction(function() use (&$productos) {
            foreach ($productos as $producto) {
                Producto::create($producto);
            }
        });        
    }
}
```

# 6. Utiliza generadores

Antes hablábamos de que podíamos obtener un montón de datos de la base de datos al mismo tiempo para procesarlos, pidiéndolos todos a la vez. Esto está muy bien, hasta que resulta que estamos iterando sobre 10.000.000 de registros. Hacer una petición con 10.000.000 de ids no es algo muy liviano y no creo que muchos servidores sean capaces de manejarlo. Para esto, tanto php como muchos otros lenguajes de programación disponen de generadores. 

Puedes aprender qué son y cómo utilizar los generadores en [este artículo](https://poesiabinaria.net/2017/04/iteradores-generadores-php-deberiamos-utilizar-yield-mas-menudo-ejemplos/) de mi amigo [Gaspar Fernández](https://poesiabinaria.net/).

Veamos un ejemplo:

```php
<?php

use MiClienteApi;

class ImportadorDeProductos
{
    protected $api;

    public function __construct(MiClienteApi $api)
    {
        $this->api = $api;
    }

    public function importar()
    {   
        $productos = $this->obtenerProductosDeApi();

        DB::transaction(function() use ($productos) {
            foreach ($productos as $producto) {
                Producto::create($producto);
            }
        });
    }

    protected function obtenerProductosDeApi(): iterable
    {
        return $this->api->dameTodosLosProductos();
    }
}
```

En este ejemplo, tenemos una api que tenemos abstraida en una clase, con métodos que nos dan los datos de varias formas distintas. En este caso estamos pidiendo todos los productos a la vez desde la api como un array y procesándolos de uno en uno a continuación.

El problema es que si se nos devuelven los datos juntos, y nos vienen muchos, php nos dará un bonito _Fatal error _indicándonos que nos hemos quedado sin memoria. Podemos evitar esto con un generador:

```php
<?php

use MiClienteApi;

class ImportadorDeProductos
{
    protected $api;

    public function __construct(MiClienteApi $api)
    {
        $this->api = $api;
    }

    public function importar()
    {  
        DB::transaction(function() use ($productos) {
            foreach ($this->iterarProductosDeApi() as $producto) {
                Producto::create($producto);
            }
        });
    }

    protected function iterarProductosDeApi(): iterable
    {
        yield from $this->api->iteraTodosLosProductos();
    }
}
```

Aquí estamos haciendo exactamente lo mismo sólo que en vez de almacenar los datos en memoria los vamos cogiendo y procesando de uno en uno, por lo que el consumo de memoria queda totalmente contenido y no nos explotará en la cara. ¡Magia!

# 7. Ejecuta tareas pesadas en segundo plano

Hay veces que los procesos tardan y no tenemos ninguna manera de hacer que vayan rápido: importar datos de sistemas externos o descargar imágenes de servidores ftp suelen ser ejemplos habituales.

En  estos casos, la mejor opción suele ser realizar estos procesos en tareas asíncronas, ya sean comandos programados con cron o procesamiento paralelo (o una combinación de ambos).

Procura no hacer que las peticiones de tu aplicación dependan directamente de la ejecución de alguna tarea de este tipo, o tus usuarios se desesperarán esperando que acaben sus peticiones; o, lo que es peor, sus peticiones darán timeout arruinando su experiencia.

Cuando tengas algo en tu aplicación que dependa de una tarea en segundo plano, procura que dicha tarea almacene el resultado en algún lugar que luego te permita acceder rápidamente; ya sea una base de datos, un fichero o un servidor de cache, lo que nos lleva a nuestro siguiente punto...

# 8. Cachea todo lo cacheable

> There are only two hard things in Computer Science: cache invalidation and naming things.
>
> _Phil Karlton_

Esta frase de Phil Karlton es una verdad como un castillo. Una de las cosas más difíciles de hacer en una aplicación es diseñar un sistema de cache que funcione de forma eficiente.

Sin embargo, una estrategia de cache adecuada hará que nuestras aplicaciones corran como una bala. Quizá sea una de las formas más efectivas de mejorar el rendimiento de una web.

Cuando hablamos de cache, no nos referimos solamente a guardar datos en memoria o a escribir en un servidor de cache; también podemos cachear índices de búsqueda en una tabla de nuestra base de datos (o en un motor de búsqueda tipo ElasticSearch), guardar combinaciones de parámetros y sus resultados en una base de datos NoSQL que nos permita un acceso híper rápido, pre-procesar cálculos con tareas asíncronas...

Este blog es un ejemplo de ello: está hecho con [una tecnología](https://www.gatsbyjs.org/) que hace que cuando se realiza una modificación en el código o en el contenido se genere todo el sitio web en html estático; lo que hace que servir esto que estás leyendo sea extremadamente rápido y barato, sin contar con que es sencillísimo de alojar, dado que no necesita ejecutar ningún tipo de código de servidor.

Plantearse qué cosas pueden generarse como contenidos estáticos y regenerarlas cuando hay una modificación que les afecta es una de las mejores formas de mejorar el rendimiento y reducir la carga de un sitio web; aunque también es una de las más difíciles de diseñar e implementar, por lo que hay que andarse con ojo cuando lo hagamos.

# Concluyendo

Como hemos visto hay muchas maneras de mejorar el rendimiento de nuestras aplicaciones web, estas son algunas que he ido descubriendo con los años y he comprobado que funcionan. Al final, cada caso es un mundo y tendrás que usar la imaginación y la inventiva (al fin y al cabo somos ingenieros, ¿no?) para resolver cada problema pero espero que al menos estos consejos sirvan para tener un punto de partida por donde empezar a experimentar.
