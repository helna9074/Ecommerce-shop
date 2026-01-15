import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    firstname:{
      type: String,
      required: true,
      trim:true
    },
      lastname:{
        type:String,
        trim:true,
        default:""
      
      },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase:true,
      trim:true
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return ;

  this.password = await bcrypt.hash(this.password, 10);
  
});

export default mongoose.model("User", UserSchema);
