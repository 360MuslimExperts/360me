import React from "react";
import styles from "./Events.module.css";

const Events = () => {
  return (
    <div className={styles["events-section"]}>
      <div className={styles["events-header"]}>
        <h2>Events & Activities</h2>
      </div>

      <div className={styles["events-container"]}>
        <div className={styles.event}>
          <img src="/events/dora-e-quran.png" alt="Dora e Quran" id="event1" />
          <div className={styles["event-info"]}>
            <h3>Dora e Quran</h3>
            <p>Sir Jareer Hussain</p>
          </div>
        </div>

        <div className={styles.event}>
          <img src="/events/graphics-zain.png" alt="Graphics Zain" id="event2" />
          <div className={styles["event-info"]}>
            <h3>Graphics Course</h3>
            <p>Dr Zain Abbas</p>
          </div>
        </div>

        <div className={styles.event}>
          <img src="/events/amr-bil-maroof.png" alt="Amr bil Maroof" id="event3" />
          <div className={styles["event-info"]}>
            <h3>Amr bil Maroof</h3>
            <p>Al Noor Teachers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
