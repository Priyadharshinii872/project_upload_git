const mongoose = require('mongoose')

const empschema = mongoose.Schema(
    {
        id:{
            type:String
        },
        Name:{
            type:String
        },
        Father_Name:{
            type:String
        },
        Date_of_Join:{
            type:String
        },
        M2_Permenant_Date:{
            type:String
        },
        Date_of_Resignation:{
            type:String
        },
        Date_of_Birth:{
            type:String
        },
        Mobile_NO:{
            type:String
        },
        Postal_Address:{
            type:String
        },
        Name_of_Nominee: {
            type:String
        },
        Salary: {
            type:String
        },
        Designation:{
            type:String
        },
        Aadhar_No:{
            type:String
        },
        PAN:{
            type:String
        },
        Bank_AC_Number:{
            type:String
        },
        IFSC_code:{
            type:String
        },
        Emp_status:{
            type:String
        },
        Company_Name:{
            type:String
        },
        Created_on:{
            type:String
        }
    }
)

const collect = mongoose.model('empdetails',empschema)


//save the csv file with no repeating aadhar no and the id is the date +entry datacount
const savedata = async(data)=>
{
    if(data.length!==0)
    {
        const existingemp = await collect.findOne({Aadhar_No:data.Aadhar_No})
        if(existingemp)
        {
            return false
        }
        else
        {
            const date = new Date();
            const  Empid = date.toISOString().slice(0,10).replace('-','').replace('-','')

            data.Created_on = Empid;
            const count = await collect.countDocuments({'Created_on':Empid})

            data.id = Empid+(count+1)

            const newemp = new collect(data)
            const saveemp = await newemp.save()
            return saveemp;
        }
    }
    else
    {
        return false
    }

}

//get all data by aadhar no
const getaadhardata = async(data)=>
{
    const getdata = await collect.findOne({Aadhar_No:data.Aadhar_No})
    return getdata;
}

//update all fields by aadhar no
const updateaadhar = async(data)=>
{
    const update = await collect.updateMany({Aadhar_No:data.Aadhar_No},{$set:{id:data.id,Name:data.Name,Father_Name:data.Father_Name,Date_of_Join:data.Date_of_Join,M2_Permenant_Date:data.M2_Permenant_Date,Date_of_Resignation:data.Date_of_Resignation,Date_of_Birth:data.Date_of_Birth,Mobile_NO:data.Mobile_NO,Postal_Address:data.Postal_Address,Name_of_Nominee:data.Name_of_Nominee,Salary:data.Salary,Designation:data.Designation,PAN:data.PAN,Bank_AC_Number:data.Bank_AC_Number,IFSC_code:data.IFSC_code,Emp_status:data.Emp_status,Company_Name:data.Company_Name,Created_on:data.Created_on}})
    return update
}

//get all employees whose emp_status is On Roll
const getbyempstatus = async(data)=>
{
    const get = await collect.find({Emp_status:data.Emp_status})
    return get;
}

//get count of all employees whose emp_status is On Roll
const getcount = async(data)=>
{
    const count = await collect.countDocuments({Emp_status:data.Emp_status})
    return count;
}

/* 
//onroll count
const onroll = async(data)=>
{z
    const count = await empDetailsModel.aggregate([{$match : {Emp_status : data.Emp_status}},{$count : "on_roll counts"}])
    return count

}*/





module.exports=
{
    savedata,
    getaadhardata,
    updateaadhar,
    getbyempstatus,
    getcount
}