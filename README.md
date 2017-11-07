# Climateberry

Aplicación para controlar la temperatura a través de la Raspberry Pi

[![dependencies Status](https://david-dm.org/francisco-navarro/climateberry/status.svg)](https://david-dm.org/francisco-navarro/climateberry)

[![Maintainability](https://api.codeclimate.com/v1/badges/2ef2da957540815fb42a/maintainability)](https://codeclimate.com/github/francisco-navarro/climateberry/maintainability)

### Ejecutar servidor:


```bash
$ npm start
```

### Ejecutar cliente:


```bash
$ npm start client
```

## API

* ### Login

` POST api/login `

Devuelve el status code correcto o error

* ### Temperatura

Para obtener la temperatura

` GET api/temperature `

```javascript
{
  unit: 'C',
  actual: 23.5,
  desired: 23.5
}
```

Para modificar la temperatura

` PUT api/temperature `

```javascript
{
  desired: 23.5
}
```

Para obtener histórico de temperatura

` GET api/temperature?history `

```javascript
[
  {
    unit: 'C',
    date: 43543252352,
    actual: 23.5,
    desired: 23.5
  }
]
```

Plugin para homebridge

Para que sea compatible con homebridge hay que instalar

``` bash
npm install -g homebridge-climateberry-plugin
```

Y luego añadir la configuración del accesorio en el config.json

```javascript
        {
            "accessory": "Climateberry",
	          "name": "Climateberry 1",
            "getUrl": "http://HOST/api/status",
            "postUrl": "http://HOST/api/order"
      }
``` 