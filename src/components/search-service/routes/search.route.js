import * as contollers from '../controller/search.contoller.js'
import {Router} from 'express'

const search = Router()

search.get('/phone/:phone',contollers.searchByPhoneNumber)

search.get('/filters',contollers.searchByMuliptleFilters)

search.get('/filters/retrictedOptions',contollers.getSearchFilters)

export default search



