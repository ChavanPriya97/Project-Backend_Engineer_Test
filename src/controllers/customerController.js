const customerModel = require("../models/customerModel")
const { v4: uuidv4 } = require('uuid');

const createCustomer = async function(req,res){
    try {
        let data = req.body
        //only customerID in req.body then delete the customer
        if(data.customerID){
            await customerModel.deleteOne({customerID : data.customerID})
            return res.status(200).send({status : true , message : " deleted successfully"})
        }

        //req.body is empty means get all customer which is equal to "ACTIVE"
        if(Object.keys(data).length == 0) {
            let customers = await customerModel.find({status : "ACTIVE"})
            return res.status(200).send({status : true , data : customers})
        }

        //user give all fields without customerID in req.body that time it creat new cutomer
        data.customerID = uuidv4()
        let customer = await customerModel.create(data)
        return res.status(201).send({status : true , data : customer})
        
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})
    }
    
}

/*
const createCustomer = async function(req,res){
    try {
        let data = req.body
        data.customerID = uuidv4()
        let customer = await customerModel.create(data)
        return res.status(201).send({status : true , data : customer})
        
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})       
    }
}

/*

const getCustomer = async function(req,res){
    try {
        let customers = await customerModel.find({status : "ACTIVE"})
        return res.status(200).send({status : true , data : customers})
        
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})       
    }

}

const deleteCustomer = async function(req,res){
    try {
        let customerID = req.body.customerID
        await customerModel.deleteOne({customerID : customerID})
        return res.status(200).send({status : true , message : " deleted successfully"})
        
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})       
    }
    
}
*/
// module.exports = {createCustomer ,getCustomer , deleteCustomer}

module.exports = {createCustomer}
