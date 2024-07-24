const express = require('express');
const router = express.Router();
const Person = require('../models/Person')

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/", async(req,res)=>{
    try {
        const data = req.body

        const newPerson= new Person(data);

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })

    }
})



router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


router.put('/:id',async(req,res)=>{
    try {
        const personId =req.params.id;
        const updatedPersonalData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedPersonalData,{
            new:true,
            runValidators:true,
        })

        if(!response){
            return res.status(404).json({error:'Person Not found'});
        }
        console.log('Data Updated');
        res.status(500).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports = router;