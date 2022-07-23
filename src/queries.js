import { showToast } from './toast'
import {ScheduleDB as db} from '../App'
import SQLite from 'react-native-sqlite-storage'

/**
 * #getItems - извлекает все записи из бд
 * @param {string} query - строка запроса на извлечение
 * @param {function} setItems - передает извлеченные записи обратно
 * 
 * #addItem - добавляет запись в бд
 * @param {string} itemName - наименование объекта
 * @param {string} query - строка запроса на добавление
 * @param {array} values - массив со значениями добавляемого объекта
 * @param {function} setSuccess - передает true/false в зависимости от успеха транзакции
 * 
 * #deleteItem - удаляет запись из бд
 * @param {object} currentItem - удаляемый объект
 * @param {string} query - строка запроса на удаление
 * @param {array} values - массив со значениями удаляемого объекта
 * 
 * #editItem - редактирует запись в бд
 * @param {string} itemName - наименование объекта
 * @param {string} query - строка запроса на редактирование
 * @param {array} value - массив со значениями редактируемого объекта
 * @param {function} setSuccess - передает true/false в зависимости от успеха транзакции
 */

export const QuerieStrings = {
  GET_ALL: {
    SUBJECTS: 'SELECT * FROM Subjects',
    NOTES: 'SELECT * FROM Notes',
    TEACHERS: 'SELECT * FROM Teachers',
    CLASSROOMS: 'SELECT * FROM Classrooms',
    WEEKENDS: 'SELECT * FROM Weekends'
  },
  GET: {
    SUBJECT: 'SELECT * FROM Subjects WHERE NAME = ?'
  },
  GET_COUNT: {
    SUBJECTS_IN_NOTE: 'SELECT Subject, count(Subject) as count from Notes GROUP BY Subject'
  },
  ADD: {
    SUBJECT: 'INSERT OR IGNORE INTO Subjects(Name, Color) VALUES(?, ?)',
    NOTE: 'INSERT OR IGNORE INTO Notes(Note, Subject, StartTime, EndTime, Date) VALUES(?, ?, ?, ?, ?)',
    TEACHER: 'INSERT OR IGNORE INTO Teachers(FirstName, Phone, Email, Info) VALUES(?, ?, ?, ?)',
    CLASSROOM: 'INSERT OR IGNORE INTO Classrooms(classroom) VALUES(?)',
    WEEKEND: 'INSERT OR IGNORE INTO Weekends(Name, StartDate, EndDate) VALUES(?, ?, ?)'
  },
  DELETE: {
    SUBJECT: 'DELETE FROM Subjects WHERE IDS = ?',
    NOTE: 'DELETE FROM Notes WHERE IDN = ?',
    TEACHER: 'DELETE FROM Teachers WHERE IDT = ?',
    CLASSROOM: 'DELETE FROM Classrooms WHERE IDCr = ?',
    WEEKEND: 'DELETE FROM Weekends WHERE IDW = ?'
  },
  EDIT: {
    SUBJECT: 'UPDATE Subjects SET Name = ?, Color = ? WHERE IDS = ?',
    NOTE: 'UPDATE Notes SET Note = ?, Subject = ?, StartTime = ?, EndTime = ?, Date = ? WHERE IDN = ?',
    TEACHER: 'UPDATE Teachers SET FirstName = ?, Phone = ?, Email = ?, Info = ? WHERE IDT = ?',
    CLASSROOM: 'UPDATE Classrooms SET classroom = ? WHERE IDCr = ?',
    WEEKEND: 'UPDATE Weekends SET Name = ?, StartDate = ?, EndDate = ? WHERE IDW = ?'
  }
}

SQLite.enablePromise(true)

export const getItems = (query, setItems) => {
  db.transaction(tx => {
    tx.executeSql(query, [], (tx, results) => {
      const rows = results.rows;
      let tmp = []

      for (let i = 0; i < rows.length; i++) {
        tmp.push({
          ...rows.item(i),
        });
      }
      setItems(tmp);
    });
  });
}

export const getItemsCount = (query, setItemsCount) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        const rows = results.rows;
        let tmp = []
  
        for (let i = 0; i < rows.length; i++) {
          rowItem = {
            ...rows.item(i),
          }
          tmp.push(rowItem);
        }
  
        for (let i = 0; i < tmp.length; i++){
          let notes = []
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Notes WHERE Subject = ?', [tmp[i].Subject], (tx, result) => {
              const rows = result.rows;
  
              for (let i = 0; i < rows.length; i++){
                notes.push({...rows.item(i)})
              }
            })
          }).then(() => { tmp[i]['Notes'] = notes; resolve(tmp) })
        }
        setItemsCount(tmp);
      });
    });
  })
}

export const getItem = (query, value, setItem) => {
  return new Promise((resolve, reject) => {
    let item = null
    db.transaction(tx => {
      tx.executeSql(query, value, (tx, result) => {
        item = {...result.rows.item(0)}
      })
    }).then(() => resolve(item))
  })
}

export const addItem = (itemName, query, values, setSuccess) => {
  if (itemName.trim() != ''){
      db.transaction( (tx) => {
          tx.executeSql(
              query,
              values,
              (tx, result) => {
                  if (result.rowsAffected > 0){
                    console.log(result)
                      setSuccess(true)
                  } else {
                      setSuccess(false)
                  }
              }
          )
      })
  } else {
      setSuccess(false)
  }
}

export const deleteItem = (currentItem, query, values) => {
  if (currentItem != null) {
    db.transaction(tx => {
      tx.executeSql(
        query, 
        values, 
        (tx, result) => {
          if (result.rowsAffected > 0){
            showToast('success', 'Удалено')
          } else {
            showToast('warning', 'Не удалено')
          }
        }
      )
    })
  }
}

export const editItem = (itemName, query, values, setSuccess) => {
  if (itemName.trim() != ''){
      db.transaction((tx) => {
          tx.executeSql(
              query,
              values,
              (tx, result) => {
                  if (result.rowsAffected > 0){
                    setSuccess(true)
                  } else {
                    setSuccess(false)
                  }
              }
          )
      })
  } else {
    setSuccess(false)
  }
}