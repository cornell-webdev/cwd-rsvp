import mongoose, { Connection, Mongoose } from 'mongoose'

class Database {
  private readonly _mongo: Mongoose

  constructor(mongo: Mongoose) {
    this._mongo = mongo
  }

  dbConnection() {
    let dbType = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
    let url = process.env.NODE_ENV === 'production' ? process.env.DB_PROD : process.env.DB_DEV

    const forceProd = false

    if (forceProd) {
      url = process.env.DB_PROD
      dbType = 'prod'
    }

    if (url) {
      this._mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      const db: Connection = this._mongo.connection
      db.on('error', console.error.bind(console, 'connection error:'))
      db.once('open', () => {
        console.log('DB connected of type: ', dbType)
      })
    }
  }

  get mongo() {
    return this._mongo
  }
}

export default Object.freeze(new Database(mongoose))
