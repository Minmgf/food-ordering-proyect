import bcrypt from 'bcryptjs';
const { model, models, Schema } = require("mongoose");

const UserSchema  =  new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true ,
        validate: pass => {
            if(!pass?.length || pass.length < 5 ){
                new Error('Password must be at least 5 characters')
            }
        },
    },
}, {timestamps: true});

UserSchema.post('validate', function(user){
    const notHashedPassword = user.password ;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(notHashedPassword, salt);

    // CLG DATOS DE USUARIO CREADO
    // console.log(arguments)
})

export const User = models?.User || model('User', UserSchema);