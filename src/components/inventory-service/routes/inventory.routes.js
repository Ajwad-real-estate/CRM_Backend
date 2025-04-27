import * as contollers from '../controller/inventory.controller.js'
import {Router} from 'express'

const inventory = Router()

// get id's for projects that have availbe units
inventory.get('/getAllProjectsIDS',contollers.getAllProjectsIDS) 

// get all units for specific project
inventory.get('/getUnits/:id',contollers.getAllUnitsIDS) 

export default inventory