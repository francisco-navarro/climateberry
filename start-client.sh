#!/bin/bash

# Ejecutar como sudo

# Cerrar pines
echo 18 > /sys/class/gpio/unexport
echo 23 > /sys/class/gpio/unexport

nohup node index client  &