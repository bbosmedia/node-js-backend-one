import config from 'config'
import mongoose from 'mongoose'
import log from '../logger'

const connect = async () => {
	const dbUri = config.get('dbUri') as string

	return await mongoose
		.connect(dbUri)
		.then(() => log.info('Database connected'))
		.catch((error) => {
			log.error('Database Error', error)
			process.exit(1)
		})
}

export default connect
