
const s = new Set([0, 1, 2, 3]);

s.add(3); // не будет добавлено
s.size; // 4
s.delete(0);
s.has(0); // false

for (const entry of s) {
    console.log(entry);
}