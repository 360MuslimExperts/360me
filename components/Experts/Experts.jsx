import React from "react";
import styles from "./Experts.module.css";

const Experts = () => {
  return (
    <div className={styles["experts-section"]}>
      <div className={styles["experts-header"]}>
        <h2>Meet Our Experts</h2>
      </div>

      <div className={styles["experts-container"]}>
        <div className={styles.expert} id="mohsin">
          <img src="/experts/mohsin-ilyas.jpg" alt="Mohsin Ilyas" />
          <div className={styles["expert-info"]}>
            <h3>Mohsin Ilyas</h3>
            <p>Central President</p>
          </div>
        </div>

        <div className={styles.expert} id="zain-salim">
          <img src="/experts/zain-salim.jpg" alt="Zain Salim" />
          <div className={styles["expert-info"]}>
            <h3>Zain Salim</h3>
            <p>Director of Content Department</p>
          </div>
        </div>

        <div className={styles.expert} id="iqra-habib">
          <img src="/experts/iqra-habib.jpg" alt="Iqra Habib" />
          <div className={styles["expert-info"]}>
            <h3>Iqra Habib</h3>
            <p>Head of Media Department</p>
          </div>
        </div>

        <div className={styles.expert} id="faiza-mansha">
          <img src="/experts/faiza-mansha.jpg" alt="Faiza Mansha" />
          <div className={styles["expert-info"]}>
            <h3>Faiza Mansha</h3>
            <p>Member of Governing Body</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experts;
