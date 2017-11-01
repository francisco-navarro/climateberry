# Climateberry

Aplicación para controlar la temperatura a través de la Raspberry Pi


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

