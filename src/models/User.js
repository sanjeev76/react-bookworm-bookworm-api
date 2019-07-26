import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";


//Todo: add uniquness and email validation to email field
const schema = new mongoose.Schema(
{
    email: { type: String, required: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true} 
},
 { timestamp: true }
 );

 //add methods
 schema.methods.isValidPassword = function isValidPassword(password) {
     return bcrypt.compareSync(password, this.passwordHash)
 }
 //add methods
 schema.methods.generateJWT = function generateJWT() {
    return jwt.sign({
      email: this.email  
    },
     "secretkey" 
     );
 }

 //add methods
 schema.methods.toAuthJSON = function toAuthJSON(){
     return {
        email: this.email,
        token: this.generateJWT()
     }
 };

 
export default mongoose.model("User", schema);