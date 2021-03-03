const result = {
    'a-b-c': { remain: 10, price: 1000 },
    'a-B-c': { remain: 2, price: 1100 },
    'A-B-C': { remain: 10, price: 1000 }
  }
  data = {
    'A': 10, // +10
    'a': 12,
    'b': 10,
    'B': 12, // 2 + 10
    'c': 12,
    'a-b': 10,
    'a-B': 2,
    'A-B': 10, // +10
    'a-c': 12,
    'A-C': 10, // +10
    'b-c': 10,
    'B-c': 2,
    'B-C': 10, // +10
    'a-b-c': 10,
    'a-B-c': 2,
    'A-B-C': 10 // +10
  }