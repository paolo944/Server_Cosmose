const express = require('express');
const { validateSession } = require('./../routes');
const db = require('../db');

const amis = express.Router();