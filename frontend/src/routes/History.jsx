import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import styles from "./History.module.css";
import chunhyang from "../assets/chunhyang.PNG";
import apart from "../assets/apart.PNG";
import ev9 from "../assets/ev9.PNG";
import kClassic from "../assets/kClassic.PNG";
import logoContest from "../assets/logoContest.PNG";
import missKorea from "../assets/missKorea.PNG";
import mrKorea from "../assets/mrKorea.PNG";

function History() {
  return (
    <div>
      <Nav />
      <div className={styles.history_title}>History</div>
      <div className={styles.contents}>
        <section className={styles.sec}>
          <div className={styles.history_container}>
            <ul className={styles.history_itemlist}>
              <li className={styles.short_img}>
                <img
                  src={chunhyang}
                  alt="img1"
                  className={styles.history_item}
                />
              </li>
              <li className={styles.long_img}>
                <img src={apart} alt="img2" className={styles.history_item} />
              </li>
              <li className={styles.short_img}>
                <img src={ev9} alt="img3" className={styles.history_item} />
              </li>
              <li className={styles.long_img}>
                <img
                  src={kClassic}
                  alt="img4"
                  className={styles.history_item}
                />
              </li>
              <li className={styles.short_img}>
                <img
                  src={logoContest}
                  alt="img5"
                  className={styles.history_item}
                />
              </li>
              <li className={styles.long_img}>
                <img
                  src={missKorea}
                  alt="img6"
                  className={styles.history_item}
                />
              </li>
              <li className={styles.short_img}>
                <img src={mrKorea} alt="img7" className={styles.history_item} />
              </li>
            </ul>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default History;
