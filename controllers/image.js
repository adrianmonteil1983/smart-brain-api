const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: "240d3490082c471d8ba78c062be54e1e",
});


const handleApiCall = (req, res) => {
	const { input } = req.body;
	console.log(input);
	app.models
	.predict(
      Clarifai.FACE_DETECT_MODEL, 
      input)
	.then(data =>  res.json(data))
	.catch(err => res.status(400).json('unable to join api'))
}



const handleImage = (req,res, postgres) => {
	const { id } = req.body;
	postgres('users').where('id', '=', id).increment('entries', 1).returning('entries')
	.then(entries => res.json(entries[0]))
	.catch(err => res.status(400).json('unable to get entries'))
};

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};
