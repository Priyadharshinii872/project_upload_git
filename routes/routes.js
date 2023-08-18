const exp = require('express')
const router = exp.Router()

const functions = require('../controller/empdetails/index')

const multer = require('../middleware/multer')

let routes = (app)=>
{
    router.post('/save',multer.single("upload"),functions.savedetail)
    router.post('/getdata',functions.getonedata)
    router.post('/updatemany',functions.updatedata)
    router.post('/empstatus',functions.getstatus)
    router.post('/count',functions.countemp)


    app.use('/api',router)
}

module.exports=
routes