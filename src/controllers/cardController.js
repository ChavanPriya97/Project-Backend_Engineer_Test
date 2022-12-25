const cardModel = require("../models/cardModel")
const customerModel = require('../models/customerModel')

const createCard = async function (req,res){
    try{
        let data=req.body
        let {cardType,vision,customerID} = data

        if(Object.keys(data).length==0 ) return res.status(400).send({status:false,message:"Request body doesn't be empty"})

        if(!cardType) return res.status(400).send({status:false,message:"cardType is Mandatory"})
        if(cardType!="REGULAR" && cardType!="SPECIAL")  return res.status(400).send({status:false,message:"carType is only be 'REGULAR/SPECIAL'"})

        if(!vision) return res.status(400).send({status:false,message:"vision is Mandatory"})

        if(!customerID) return res.status(400).send({status:false,message:"customerID is Mandatory"})
        
        let customer = await customerModel.findOne({customerID})
        if(!customer) return res.status(400).send({status:false,message:"customerID is not present in Customer Database"})

        let fullname = customer.firstName+" "+customer.lastName
        data.customerName = fullname

        let cards = await cardModel.find()
        data.cardNumber=`C00${++cards.length}`

        let card = await cardModel.findOne({customerID})
        if(card) return res.status(400).send({status:false,message:"Card is already created with this customerID"})

        let createCard = await cardModel.create(data)
        return res.status(201).send({status:true,message:"Success",data:createCard})

    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


const getcard = async(req,res)=>{
    try{
        let data = await cardModel.find()
        return res.status(200).send({status:true,data:data})

    }catch(err){
        return res.status(500).send({send:false,message:err.message})
    }
}

module.exports={getcard,createCard}