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
	

	// && typeof(username, avatar)  === String
	// && typeof(username, avatar)  === String 

	if (username === '' || typeof(username) !== 'string'|| 
	avatar === '' || typeof(avatar) !== 'string') {
		res.status(400).send('Todos os campos são obrigatórios!')
	}
	else {
		user.username = username
		user.avatar = avatar
		res.send('OK')
	}
})


app.post("/tweets", (req, res) => {
	const { username, tweet } = req.body
	if (username === '' || tweet === '') {
		res.status(400).send('UNAUTHORIZED')
	} else {
		const newTweet = {
			username: username,
			avatar: user.avatar,
			tweet: tweet
		}
		tweets.push(newTweet)

		res.send('Tweet feito com sucesso');
	}
});

app.get("/tweets", (req, res) => {
	//.slice(-2,-10)

	if (tweets.length > 10) {
		res.send(tweets.slice(-10));
	} else {
		res.send(tweets);
	}
});


app.listen(PORT, () => console.log(`Running server on port ${PORT}`));