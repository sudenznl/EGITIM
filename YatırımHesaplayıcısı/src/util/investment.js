// Bu fonksiyon bir JS nesnesini argüman olarak bekliyor
// Nesne aşağıdaki özellikleri içermelidir
// - initialInvestment: İlk yatırım miktarı
// - annualInvestment: Her yıl yatırılan miktar
// - expectedReturn: Beklenen (yıllık) getiri oranı
// - duration: Yatırım süresi (zaman dilimi)
export function calculateInvestmentResults({
  initialInvestment,
  annualInvestment,
  expectedReturn,
  duration,
}) {
  const annualData = [];
  let investmentValue = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);
    investmentValue += interestEarnedInYear + annualInvestment;
    annualData.push({
      year: i + 1, // yıl tanımlayıcı
      interest: interestEarnedInYear, // bu yıl elde edilen faiz miktarı
      valueEndOfYear: investmentValue, // yıl sonundaki yatırım değeri
      annualInvestment: annualInvestment, // bu yıl eklenen yatırım
    });
  }

  return annualData;
}

// Tarayıcı tarafından sağlanan Intl API, biçimlendirici nesneyi hazırlamak için kullanılır
// Bu nesne, sayıları para birimi olarak biçimlendirmek için kullanılabilen bir "format()" yöntemi sunar
// Örnek Kullanım: formatter.format(1000) => "$1,000" döner
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
