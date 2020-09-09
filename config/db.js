const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI');
const url="mongodb+srv://asrar_123:asrar123@cluster0.4w0jm.azure.mongodb.net/store?retryWrites=true&w=majority"

const connectDB = async () => {
	try {
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;