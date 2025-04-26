import * as contollers from '../controller/search.contoller.js'
import {Router} from 'express'

const search = Router()

search.get('/phone/:phone',contollers.searchByPhoneNumber)

export default search