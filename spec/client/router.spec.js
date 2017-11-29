const router = require('../../client/router');
const temperateController = require('../../client/controller/temperature.controller');
const express = require('express');

describe('client tests for api in raspberry', () => {
  const routerMock = {};

  beforeEach(() => {
    spyOn(express, 'Router').and.returnValue(routerMock);
    spyOn(temperateController, 'getStatus').and.returnValue({});
  });

  it('should get the state', () => {
    // Arrange
    console.log('should get the state');
    // Act
    // Assert
  });
  it('should order new state', () => {
    // Arrange
    // Act
    // Assert
  });
});
