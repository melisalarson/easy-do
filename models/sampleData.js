const express = require('express');

const sampleData = [
  { name: 'MODEL FOLDER -> Collaborator file', collaborators: 'Melisa', completionTime: '1 hour', stage: 'to-do' },
  { name: 'MODEL FOLDER -> Task file', collaborators: 'Melisa', completionTime: '2 hour', stage: 'to-do' },
  { name: 'CONTROLLER FOLDER -> task file', collaborators: 'Melisa', completionTime: '3 hour', stage: 'to-do' },
  { name: 'CONTROLLER FOLDER -> collaborator file', collaborators: 'Melisa', completionTime: '4 hour', stage: 'in-progress' },
  { name: 'VIEWS FOLDER -> index file', collaborators: 'Jimmy', completionTime: '5 hour', stage: 'in-progress' },
  { name: 'VIEWS FOLDER -> tasks folder -> index file', collaborators: 'Jimmy', completionTime: '6 hour', stage: 'in-progress' },
  { name: 'VIEWS FOLDER -> tasks folder -> new file', collaborators: 'Jimmy', completionTime: '7 hour', stage: 'completed' },
  { name: 'VIEWS FOLDER -> tasks folder -> edit file', collaborators: 'Jimmy', completionTime: '8 hour', stage: 'completed' },
  { name: 'VIEWS FOLDER -> tasks folder -> edit file', collaborators: 'Jimmy', completionTime: '9 hour', stage: 'completed' },
];

module.exports = sampleData;