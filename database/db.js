import mongoose from 'mongoose'

let connection = null

export const connectDatabase = async () => {
  if (connection == null) {
    console.log('Creating new connection to database ..')
    connection = await mongoose.connect(process.env.DB /*, {
      socketTimeoutMS: 1000,
      serverSelectionTimeoutMS: 0,
    }*/)
    console.log('Connection already established, resusing the connection')
    return connection
  }
}

export const disconnectDatabase = async () => {
  if(connection){
    connection.disconnect().then(() => {   console.log('Disconnected from database'); }).catch((error) => {   console.error('Error disconnecting from database:', error); });
    connection = null
  }
}

export const connectDatabaseUser = async () => {
  if (connection == null) {
    console.log('Creating new connection to database user..')
    connection = await mongoose.connect(process.env.DB_USER /*, {
      socketTimeoutMS: 1000,
      serverSelectionTimeoutMS: 0,
    }*/)
    console.log('Connection already established to user database, resusing the connection')
    return connection
  }
}

export const disconnectDatabaseUser = async () => {
  if(connection){
    connection.disconnect().then(() => {   console.log('Disconnected from database user'); }).catch((error) => {   console.error('Error disconnecting from database:', error); });
    connection = null
  }
}
