import express from 'express';
import cors from 'cors';

const app = express()
app.use(cors())
app.use(express.json());
const PORT = 5000

const user = {
	username: "",
	avatar: ""
}
const tweets = []

app.post("/sign-up", (req, res) => {
	const { username, avatar } = req.body
	
	if(typeof(username) !== 'string' || typeof(avatar) !== 'string'){
		res.send('Todos os campos são obrigatórios!')
	}
	if (username === '' || avatar === '') {
		res.status(400).send('Todos os campos são obrigatórios!')
	}
	else {
		user.username = username
		user.avatar = avatar
		res.status(201).send('OK')
	}
})


app.post("/tweets", (req, res) => {
	const { username, tweet } = req.body
	if(typeof(username) !== 'string' || typeof(tweet) !== 'string'){
		res.send('Todos os campos são obrigatórios!')
	}
	if (user.username === '' ||  tweet === '' ) {
		res.status(401).send('UNAUTHORIZED')
	} else {
		const newTweet = {
			username: username,
			avatar: user.avatar,
			tweet: tweet
		}
		tweets.push(newTweet)

		res.status(201).send('Tweet feito com sucesso');
	}
});

app.get("/tweets", (req, res) => {
	const {USERNAME} = req.query 
	if(USERNAME === 'undefined'){
		if (tweets.length > 10) {
			res.send(tweets.slice(-10));
		} else {
			res.send(tweets);
		}
	}
	const tweetUser = tweets.filter(name => name.user === USERNAME)
	res.send(tweetUser);
	
	
});



app.listen(PORT, () => console.log(`Running server on port ${PORT}`));