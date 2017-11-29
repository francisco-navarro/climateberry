## Servicios para llamar desde el plugin

### Estado

GET /api/status
``` javascript
{
  "currentTemp":"20.0","targetTemperature":17,
  "heatingState":0
}
```

Los posibles valores de heating state son:
*  OFF: 0
*  HEAT: 1
*  COLD: 2
*  AUTO: 3

### Cambiar de estado

POST /api/order
``` javascript
{
  "heatingState": 0,
  "targetTemperature": 22,
}
```

Los posibles valores de heating state son:
*  OFF: 0
*  HEAT: 1
*  COLD: 2
*  AUTO: 3