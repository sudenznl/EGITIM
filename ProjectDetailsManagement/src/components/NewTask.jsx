import { useState } from "react";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState('');

  function handleChange(event) {
    setEnteredTask(event.target.value); //girilen değeri bu durum için yeni bir değer olarak depolar.
  }

  function handleClick() {
    onAdd(enteredTask);
    setEnteredTask('');
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask} /*girilen görev metnini bu giriş alanına geri besleyerek iki yönlü bağlamay tamamlamamız gerekiyor.*/
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Tak
      </button>
    </div>
  );
}
