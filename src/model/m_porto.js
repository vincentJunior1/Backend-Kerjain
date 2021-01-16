const connection = require('../config/mysql')

module.exports = {
  getPorto: () => {
    return new Promise((resolve, reject) => {
      console.log(
        connection.query('SELECT * FROM portofolio', (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        })
      )
    })
  },
  getPortoById: (id) => {
    return new Promise((resolve, reject) => {
      console.log(
        connection.query(
          `SELECT * FROM portofolio WHERE porto_id = ${id}`,
          (error, result) => {
            console.log(result)
            !error ? resolve(result) : reject(new Error(error))
          }
        )
      )
    })
  },
  postPorto: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO portofolio SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              porto_id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  patchPorto: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE portofolio SET ? WHERE porto_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              porto_id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            console.log(error)
            reject(new Error(error))
          }
        }
      )
    })
  },
  deletePorto: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM portofolio WHERE porto_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
