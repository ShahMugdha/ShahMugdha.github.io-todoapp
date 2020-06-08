const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');
const Product=require('../../models/product');
const mongoose = require('mongoose');

// Gets All Members
router.get('/', (req, res) => {
  Product.find()
  .exec()
  .then(docs=>{
    console.log(docs);
    res.status(200).json(docs);
  })
  .catch(err=>console.log(err));
  //res.json(members)
});

// Get Single Member
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  const id=req.params.id;
  Product.findById(id)
  .exec()
  .then(doc=>{
    console.log("from database",doc);
    res.status(200).json(doc);
  })
  .catch(err=>console.log(err));

  /*if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }*/
});

// Create Member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  const product=new Product({
    _id:new mongoose.Types.ObjectId(),
    name:req.body.name,
    email:req.body.email
  });

  product.save().then(result=>{
    console.log(result);
    res.status(201).json({
      message:"handling post requests",
      createdProduct:result
    });
  })
  .catch(err=>console.log(err));
  res.status(500).json({error:err})

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  members.push(newMember);
  res.json(members);
  //res.redirect('/');
  
});

// Update Member
router.patch('/:id', (req, res) => {
  const id=req.params.id;
  const updateOps={};
  for (const ops of req.body){
    updateOps[ops.propName]=ops.value;
  }
  Product.update({_id:id}, {$set:updateOps})
  .exec()
  .then(resullt=>{
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({error:err})
  });
 /* const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: 'Member updated', member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }*/
});

// Delete Member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  const id=req.params.id;
  Product.remove({_id:id})
  .exec()
  .then(result=>{
    res.status(200).json(result);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
  });
  /*if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }*/
});

module.exports = router;
