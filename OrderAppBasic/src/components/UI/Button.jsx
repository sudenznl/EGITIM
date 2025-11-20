export default function Button({ children, textOnly, className, ...props }) {
  //fazladan cssclasses ekleyerek dışarıdan da ayarlabilmesini sağlıyoruz:
  let cssClasses = textOnly ? 'text-button': 'button';
  cssClasses += ' ' + className;
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}

//bazı propslar eklememiz gerekiyor:
//children : <Button>Click me</Button> gibi yazıldığında içeriğin button içinde görünmesini sağlar.
//textOnly : true ise cssClasses = 'text-button' olacak ve buton sadece metin görünümüne sahip olacak.
//classNAme prop'u : sahip olduğumuz sabit kodlu sınıflarla birleştirmek için