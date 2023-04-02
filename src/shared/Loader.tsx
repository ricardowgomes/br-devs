import styles from './Loader.module.scss'

const Loader = ({ show }) => {
  return show ? <div className={styles.loader}></div> : null;
}

export default Loader;
