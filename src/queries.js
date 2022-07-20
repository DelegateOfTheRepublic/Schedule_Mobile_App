import { showToast } from './toast'
import {ScheduleDB as db} from '../App'


export const getSubjects = (query, setItems) => {
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

export const deleteSubject = (currentItem, query, values) => {
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