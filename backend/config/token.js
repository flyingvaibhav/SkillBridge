import jwt from 'jsonwebtoken';

const genToken = async (userid) => {
    try {
        const token = await jwt.sign({ userid }, process.env.
            JWT_SECRET, { expiresIn: "7d" });
        console.log(token);
    }
    catch(error) {
        console.log(error);
    }
}

export default genToken;