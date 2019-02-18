const handleProfileGet = (req, res, postgres) => {
	console.log('requete');
	const { id } = req.params;
	postgres.select('*').from('users').where({id:id})
	.then(user => {
		if(user.length){
			console.log(user);
			res.json(user[0]);	
		}else {
			res.status(400).json("not found");
		}	
	})
	.catch(err => {
		console.log(err);
		res.status(400).json('error getting user');
	})
}

module.exports = {
	handleProfileGet: handleProfileGet
}