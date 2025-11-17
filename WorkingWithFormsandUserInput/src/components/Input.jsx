export default function Input({ label, id, error, ...props }) {
  return (
    <div className="control no-margin">
      {/*htmlFor : html'deki for ve label-inpt ilişkilendirmek için kullanılır.*/}
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
}
