import styles from './Button.module.css'

export function Button() {
  return (
    <button
      type="submit"
      // Note how the "error" class is accessed as a property on the imported
      // `styles` object.
      className={styles.error}
    >
      SUBMIT
    </button>
  )
}
