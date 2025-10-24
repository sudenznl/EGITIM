export const WINNING_COMBINATIONS = [
    //ilk satırda sütunların aynı olduğu durumlar:
  [
    { row: 0, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: 2 },
  ],
   //ikinci satırda sütunların aynı olduğu durumlar:
  [
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: 2 },
  ],
    //üçüncü satırda sütunların aynı olduğu durumlar:
  [
    { row: 2, column: 0 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
  ],
    //ilk sütunda satırların aynı olduğu durumlar:
  [
    { row: 0, column: 0 },
    { row: 1, column: 0 },
    { row: 2, column: 0 },
  ],
    //ikinci sütunda satırların aynı olduğu durumlar:
  [
    { row: 0, column: 1 },
    { row: 1, column: 1 },
    { row: 2, column: 1 },
  ],
    //üçüncü sütunda satırların aynı olduğu durumlar:
  [
    { row: 0, column: 2 },
    { row: 1, column: 2 },
    { row: 2, column: 2 },
  ],
    //çaprazda satır ve sütunların aynı olduğu durumlar:
  [
    { row: 0, column: 0 },
    { row: 1, column: 1 },
    { row: 2, column: 2 },
  ],
    //diğer çaprazda satır ve sütunların aynı olduğu durumlar:
  [
    { row: 0, column: 2 },
    { row: 1, column: 1 },
    { row: 2, column: 0 },
  ],
];