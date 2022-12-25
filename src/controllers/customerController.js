const customerModel = require("../models/customerModel")
const { v4: uuidv4 } = require('uuid');

const createCustomer = async function(req,res){
    try {
        let data = req.body
        if(data.customerID){
            await customerModel.deleteOne({customerID : data.customerID})
            return res.status(200).send({status : true , message : " deleted successfully"})
        }

        if(Object.keys(data).length == 0) {
            let customers = await customerModel.find({status : "ACTIVE"})
            return res.status(200).send({status : true , data : customers})
        }

        data.customerID = uuidv4()
        let customer = await customerModel.create(data)
        return res.status(201).send({status : true , data : customer})
        
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})
    }
    
}

module.exports = {createCustomer }