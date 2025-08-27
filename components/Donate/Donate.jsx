import React from "react";
import styles from "./Donate.module.css"; // Import as CSS Module

const Donate = () => {
  return (
    <div>
      <div className={styles["donate-header"]}>
        Want to Donate for the sake of Allah?
      </div>
      {/* <p>Your contributions help us continue our mission.</p> */}
      <div className={styles["donate-content"]}>
        <div id="education">
          <img src="/donate/education.png" alt="Education" />
          <div className={styles["donate-desc"]}>
            <h3>Education</h3>
          </div>
        </div>
        <div id="food">
          <img src="/donate/food.png" alt="Food" />
          <div className={styles["donate-desc"]}>
            <h3>Food</h3>
          </div>
        </div>
        <div id="health">
          <img src="/donate/health.png" alt="Health" />
          <div className={styles["donate-desc"]}>
            <h3>Health</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
