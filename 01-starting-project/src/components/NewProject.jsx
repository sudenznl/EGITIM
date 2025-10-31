import { useRef } from "react";
import Input from "./Input.jsx";
export default function NewProject() {
  const title = useRef();
  const description = useRef();
  const DueDate = useRef();

  function hadleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = DueDate.current.value;

    //doğrulama : burada kaldık.


  }

  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950">
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
        <Input ref={title} label="Proje Adı" />
        <Input ref={description} label="Proje Açıklaması" textarea={true} />
        <Input ref={DueDate} label="Son Teslim Tarihi" />
      </div>
    </div>
  );
}
