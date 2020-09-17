const TodoUser = require('../models/todoUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Creating jsonwebtoken
const loginTokenExpiryTime = 7 * 24 * 60 * 60;
const createToken = (email) => {
	return jwt.sign({email}, 'e-care', {
		expiresIn: loginTokenExpiryTime
	});
};

exports.signup = async (req, res, next) => {

    let { firstname, lastname, email, password } = req.body;


	const token = createToken(email);
	// res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

	const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
     
    let newUser = new TodoUser({ firstname, lastname, email, password });

    newUser.save().then((newUser) => {
        res.json({
            sucess: 'true',
            message: newUser,
        });
    })
}

exports.login = async (req, res) => {
	let { email, password } = req.body;

	const user = await TodoUser.findOne({email: email});
 
	if (user) {
		const passwaordAuth = await bcrypt.compare(password, user.password);
		if (passwaordAuth) {
			const loginToken = createToken(email);

			res.json({
                success: 'true',
                user: user,
				token: loginToken
			});

		} else {
			res.status(401).json({
				success: 'false',
				token: 'Incorrect Password'
            });		
        }
	}
	else {
        res.status(404).json({
            success: 'false',
            token: 'Email is not registered'
        });		
    }

    // res.json({
    //     true: 'true',
    //     message: user
    // });
}