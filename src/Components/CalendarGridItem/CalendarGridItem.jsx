import React from 'react'
import styles from './CalendarGridItem.module.css'

import { useDispatch } from 'react-redux';

import { removeEvent } from '../../Redux/Slices/EventReducer';

const CalendarGridItem = ({dayData}) => {
  const dispatch = useDispatch();
  const iconColor = '#5e5e5e';


  return (
    <div className={styles.calendarDayItem}>
      {dayData.i}

      <div className={styles.eventItemsList}>
     
        {dayData.events &&  
        
          dayData.events.map(ev => {
            const {tag, id} = ev;
            
            return (
              <div key={id} onClick={() => dispatch(removeEvent(id))} className={`${styles.eventItem} eventItem-${tag}`} >
                <p>{ev.title} {ev.date} {ev.tag}</p>
              </div>
            )
          })

         
        }

          


        
      </div>

      {/* <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill='rgb(70,70,70)' class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
      </svg> */}
    </div>
  )
}

export default CalendarGridItem

// each item should show: 
// - date 
// - any events for that day
// have click event for every day