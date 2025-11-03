import { useRef } from "react";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";
export default function NewProject({onAdd, onCancel }) {
  const title = useRef();
  const description = useRef();
  const DueDate = useRef();
  const modal =useRef();


  function handleSave() {

    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = DueDate.current.value;

    if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() ==='')
    {
      modal.current.open();
      return;
    }

    //doğrulama : 
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      DueDate: enteredDueDate
    });
  }

  return (
    <>
    <Modal  ref={modal} buttonCaption="Tamam">
      <h2 className="text-xl font-bold text-stone-500 my-4">Geçersiz Giriş</h2>
      <p className="text-stone-600 mb-4">Oops...Sanrım değer girmeyi unuttunuz.</p>
      <p className="text-stone-600 mb-4">Lütfen her giriş alanı için geçerli bir değer sağladığınızdan emin olun</p>
    </Modal>
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
            Sil
          </button>
        </li>
        <li>
          <button 
          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          onClick={handleSave}
          >
            Kaydet
          </button>
        </li>
      </menu>
      <div>
        <Input type="text" ref={title} label="Proje Adı" />
        <Input ref={description} label="Proje Açıklaması" textarea={true} />
        <Input type="date" ref={DueDate} label="Son Teslim Tarihi" />
      </div>
    </div>
    </>
  );
}
