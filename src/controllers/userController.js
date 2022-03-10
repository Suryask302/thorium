

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");



const createUser = async function (req, res) {

try {
    let data = req.body;
    if (Object.keys(data).length != 0) {
      let savedData = await userModel.create(data);
      res.status(201).send({ msg: savedData });
    }
    else res.status(400).send({ msg: "BAD REQUEST" })

  } catch (err) { res.status(500).send({ Error: err.message }) }

};



const loginUser = async function (req, res) {

  try{

  let userName = req.body.emailId;
  let password = req.body.password;
  if(!userName || !password){
    return res.status(400).send( { Error : "Please Enter Username and password" } )
  }
  let user = await userModel.findOne({ emailId: userName, password: password });

  if (!user)
    return res.status(404).send({
      msg: "User Not Found ! Please Check credentials",
    });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FUnctionUp",
    },
    "functionup-thorium"
  );
  res.setHeader("x-auth-token", token);
  res.status(201).send({ status: true, data: token });

  }catch(err) {res.status(500).send( { Error : err } )}

};



const getUserData = async function (req, res) {

  try{

  let userId = req.params.userId;
  if(!userId){
    return res.status(400).send( { msg: "please Enter User ID" } )
  }
  let userDetails = await userModel.findById(userId);

  if (!userDetails) {
    return res.status(404).send({ status : false , msg: "No such user exists" });
  }
  res.status(200).send({ status: true, data: userDetails });

}catch(err) { res.status(500).send ( { Error : err } ) }
};



const updateUser = async function (req, res) {

  try{

  let userId = req.params.userId;
  if(!userId){
    res.status(400).send( { msg : "plase Enter UserId" } )
  }
  let user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).send( { msg : "No Such User Exist" } );
  }

    let userData = req.body
  if(Object.keys(userData).length !== 0){
    let updatedUser = await userModel.findOneAndUpdate({ userId }, { $set: userData }, { new: true });
    res.status(200).send({ status: "updatedUser", data: updatedUser });
  }else{res.status(400).send( { msg : "Bad Request" } )}
  

}catch(err) {res.status(500).send( { Error : err } )}
};



const deleteUser = async function (req, res) {

try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if(!user){
    res.status(404).send( { msg: "User Not Found !" } )
  }
  let ChangeUserProperty = await userModel.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: true } })
  res.status(204).send({ msg: "user deleted Succesfully", ChangeUserProperty })

}catch(err){ res.status(500).send( { Error : err } ) } 

};


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;