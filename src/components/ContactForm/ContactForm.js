import css from './ContactForm.module.css';

const ContactForm = ({ name, number, onInputChange, onAddContact }) => {
  return (
    <form className={css.form} onSubmit={onAddContact}>
      <label className={css.label}>
        <span className={css.title}>Name</span>
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          required
          onChange={onInputChange}
        />
      </label>

      <label className={css.label}>
        <span className={css.title}>Phone number</span>
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          required
          onChange={onInputChange}
        />
      </label>

      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
