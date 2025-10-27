import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:{
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // we add index so that our searching becomes easy in DB       
        },
        email:{
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname:{
            type: String,
            require: true,
            trim: true,
            index: true
        },
        avatar:{
            type: String,
            required: true
        },
        coverImage:{
            type: String
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:{
            type: String,
            required: [true, 'password is required']
        },
        refreshToken:{
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModfied("password")) return next() // this step will run only when we have changed the password
    this.password = bcrypt.hash(this.password, 10) // encrypting the password before saving into DB
    next() // the issue is if next will call everytime any value is changed, to stop that we have used the if condition to check the logic
})

// before doing any operaytion we need to check the password as well and that can be done using the compare option in bcrypt 
// and to perform those activity we need to have a function as we cannot directly define it
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign(                   // its not necessary we need to specify these as sign, we can specify anything in payload
        {                              
            _id: this._id,
            email: this.email,
            username: this.username, 
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign(                   // in refresh token we motly just keep the id as this keep getting refreshed
        {                       
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)