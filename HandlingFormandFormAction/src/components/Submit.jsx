import { useFormStatus } from "react-dom"; //useFormStatus, bir formun gönderilip gönderilmediğini (pending durumunu) öğrenmek için kullanılır.
                                          //bu bileşen form'u ve formActions içeren bileşende kullanılmaz!
                                          
export default function Submit() {
  const { pending } = useFormStatus();

  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? 'Gönderiliyor...' : 'Gönderildi.' }
      </button>
    </p>
  );
}
