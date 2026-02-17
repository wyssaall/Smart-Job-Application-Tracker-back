import jwt from 'jsonwebtoken'

const generateToken = (payload) =>{
    const token = jwt.sign(payload, process.env.JWT_secret, {expiresIn: '1h'});
    return token;
}

export default generateToken;