import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroText}>
        <h1>Welcome to 360 Muslim Experts</h1>
        <p>
          Connect with a dynamic network of professionals, scholars, and
          creatives shaping the future. Stay updated on events, insights, and
          opportunities in science, arts, and Islamic research. Let’s grow and
          thrive together!
        </p>
        <button className={styles.btn}>Explore More</button>
      </div>
    </div>
  );
};

export default Hero;
