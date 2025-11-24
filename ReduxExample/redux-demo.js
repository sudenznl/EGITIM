const redux = require('redux');

//redütör fonk. :
const counterReducer = (state = { counter: 0 }, action) => {
    if(action.type === 'increment') 
    {
        return {
        counter: state.counter + 1, // Mevcut state içindeki counter değerini alıp 1 artırıyoruz.
        };
    }
    
    if(action.type === 'decrement') 
    {
        return{
            counter: state.counter - 1, 
        };
    }
    return state;
}; 
//burada anonim ok işlevi sözdizimini kullanıyoruz.
//redükleyici işlevi standart bir js işlevidir, ancak Redux kütüphanesi tarafından çağırılır:
//Ve her zaman iki girdi parçası ,iki parametre, eski veya mevcut durum gönderilen eylem alır.
// Ve sonra bu indirgeyici fonksiyon belirili bir çıktı döndürmelidir
//Bu nedenle bir indirgeyici fonksiyon saf bir fonksiyon olmalıdır. 
//Bu da temel olarak aynı girdilerin, girdiler için aynı değerlerin her zaman tam olarak aynı çıktıyı üretmesi gerektiği anlamına geliyor!
//Ve bu fonksiyonun içinde hiçbir yan etki olmamalıdır.(Dolayısıyla, bit HTTP isteği göndermemeli/local storage'e bir şey yazmmamalı/almamalıyız.)
//Bunun yerine bir redüktör, redux tarafından sağlanan girdileri alan ve ardından beklenen çıktı olan yeni bir durum nesnesi üreten bir fonksiyon olmalıdır. 

//return için : yeni state herhangi bir durum olabilir. sadece sayı/dizi de olabilir. Ancak gerçekte, çoğunlukla bir nesne olacaktır.
// istediğimiz herhangi bir yapıya sahip olabilir.

const store = redux.createStore(counterReducer); 
//bu redux kütüphanesi tarafından sunurluyor ve bir mağaza oluşturuluyor. Ve her zaman yeni bir durum nesnesi döndürmelidir.
//---- BU STORE NE İŞE YARIYOR ? ----
// bu deponun verileri yönetmesi gerekiyor , yönettiği veriler indirgeyici işlev tarafından belirlenir:
//çünkü yeni durum anlık görüntülerini üretecek olan indirgeyici işlevdir.
//İNDİRGEYİCİ : Bir eylem kendisine her ulaştığında yeni bir durum anlık görüntüsünü çıkarmak zorundadır
// Kodu ilk defa çalıştırdığımızda, indirgeyici de varsayılan bir eylemle yürütülecektir, yani başlangıç durumunu ortaya çıkaracaktır.
//bu nedenle şimdi eklememiz gereken şey bir redüktör fonksiyonudur.  (redüktör fonk. => bir nevi sayaç azaltıcıdır.)
// mağzamıza redüktör fonk.'u ekliyoruz. Çünkü mapazanın hangi azaltıcının o mağazayı değiştirdiğini bilmesi gerekiyor.

//şimdi bu mağzaya abone olan birine ihtiyacımız var: 
//abone burada herhangi bir parametre almayan bir işlevdir, ancak sonrasında getState' çağırabiliriz. 
// getState : create store ile oluşturulan mağaza üzerinde kullanılabilen bir metottur.
//güncellendikten sonra son durumun anlık görüntüsünü verecektir.
//Dolayısıyla, durum her değiştiğinde bu abonelik işlevi tetiklenecektir. 
//Tetiklendikten sonra, getState yöntemiyle değiştirilir ve sonra son duruma ulaşırız.
const counterSubscriber = () => {
   const latesState = store.getState();
   console.log(latesState);
};

//Şimdi Redux'u bu abone bu abone fonk.'undan haberdar etmeliyiFz.
//Ve state her değiştiğinde abone fonksiyonun çalıştırılmasıs gerektiğini söylememiz gerekiyor:

store.subscribe(counterSubscriber);
//abone olma yöntemi daha sonra böyle bir abone işlevi ister. 
//Bu yüzden, abone olma yöntemi, Redux'un  veri ve mağaza değiştiğinde çalıştıracak bir fonksiyon bekler.
//yani burada şimdi abone olmak için sayaç abonesini geçiyoruz.
//Dikkat burada sayaç abonesini çalıştırmıyoruz, sadece ona işaret ediyoruz,tıpkı burada sayaç azaltıcıyı çalıştırmadığımız gibi, sadece ona işaret ediyoruz. 
//Çünkü hem redükleyici hem de abone fonksiyonu Redux tarafından yürütülecektir.

store.dispatch({ type: 'increment' });
store.dispatch({ type: 'decrement' });
