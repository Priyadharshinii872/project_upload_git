const service = require('./service')
const csv = require('csvtojson')

const savedetail = async(req,res)=>
{
    try
    {
        if((req.file==undefined)||(req.file==null))
        {
            res.send({code:404,message:'please upload csv file'})
            return console.log('kindly select and upload csv file')
        }

        let path='./files/'+req.file.filename
        const details = await csv().fromFile(path)

        for(const item of details)
        {
             await service.savedata(item)
        }
        res.send({code:200,success:true,message:'upload succesfully'})

    }catch(error)
    {
        res.send({status:error,message:'not uploaded'})
    }
}

const getonedata = async(req,res)=>
{
    const get = await service.getaadhardata(req.body)
    res.send(get)
}

const updatedata = async(req,res)=>
{
    const update = await service.updateaadhar(req.body)
    res.send(update)
}

const getstatus = async(req,res)=>
{
    const display = await service.getbyempstatus(req.body)
    res.send(display)
}

const countemp = async(req,res)=>
{
    try {
        const count = await service.getcount(req.body);
        res.send({ success: true, count });
    } catch (error) {
        res.send({ success: false, message: 'Internal server error.' });
    }
}


/* const countemp = async(req,res)=>
{
    try {
        const count = await service.getcount(req.body);
        res.status(200).json({ success: true, count });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}*/


module.exports=
{
    savedetail,
    getonedata,
    updatedata,
    getstatus,
    countemp
}