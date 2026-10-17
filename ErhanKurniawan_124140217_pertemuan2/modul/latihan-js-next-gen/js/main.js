// ============================================================
// js/main.js
// Gateway: import semua demo dari app.js lalu render ke HTML
// ============================================================

import {
  demoVariables,
  demoArrowFunctions,
  demoTemplateLiterals,
  demoDestructuring,
  demoSpreadRest,
  demoClasses,
  demoObjectLiterals,
  demoDefaultParams,
  demoArrayMethods,
  demoAsyncAwait,
} from "./app.js";

// Helper untuk menambahkan output ke halaman
function addOutput(title, description, content) {
  const outputEl = document.getElementById("output");
  const item = document.createElement("div");
  item.className = "output-item";

  const heading = document.createElement("h3");
  heading.textContent = title;

  const desc = document.createElement("p");
  desc.className = "desc";
  desc.textContent = description;

  const result = document.createElement("div");
  result.className = "result";

  // content bisa berupa string atau elemen DOM (untuk demo async)
  if (typeof content === "string") {
    result.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    result.appendChild(content);
  }

  item.appendChild(heading);
  item.appendChild(desc);
  item.appendChild(result);
  outputEl.appendChild(item);
  return result;
}

// Jalankan semua demo
function runAllDemos() {
  // ---- Latihan 1: Template Literals + Let/Const + Arrow Function ----
  const varResults = demoVariables();
  addOutput(
    "1. Let, Const & Block Scope",
    "Latihan Template Literals - poin 1 & 2",
    `Reassign const → ${varResults.constError}
Const object (isi boleh dimutasi) → ${JSON.stringify(varResults.constObjectMutable)}
var di luar block → ${varResults.varScope}
let di luar block → ${varResults.letScope}`,
  );

  const arrowResults = demoArrowFunctions();
  addOutput(
    "2. Arrow Functions",
    "Latihan Template Literals - poin 3",
    `Tanpa parameter → ${arrowResults.noParams}
Satu parameter → ${arrowResults.oneParam}
Dua parameter → ${arrowResults.twoParams}
Multi-line body → ${arrowResults.multiLine}
Return object → ${JSON.stringify(arrowResults.returnObject)}`,
  );

  const templateResults = demoTemplateLiterals();
  addOutput(
    "3. Template Literals → HTML String",
    "Latihan Template Literals - poin 4",
    `Cara lama → ${templateResults.oldWay}
Cara modern → ${templateResults.newWay}
Ekspresi → ${templateResults.expression}

HTML String yang dihasilkan:
${templateResults.htmlString}`,
  );

  // ---- Latihan 2: Destructuring & Spread/Rest ----
  const destResults = demoDestructuring();
  addOutput(
    "4. Destructuring (Nested 3 Level + for...of)",
    "Latihan Destructuring - poin 1 & 4",
    `Nested 3 level → ${JSON.stringify(destResults.nested, null, 2)}

Destructuring dalam for...of:
${destResults.forOf.join("\n")}`,
  );

  const spreadResults = demoSpreadRest();
  addOutput(
    "5. Spread & Rest Operators",
    "Latihan Destructuring - poin 2 & 3",
    `Statistik (rest params) → ${JSON.stringify(spreadResults.statistics)}
Merge 3 objects + override → ${JSON.stringify(spreadResults.merged, null, 2)}`,
  );

  // ---- Latihan 3: Classes & Object Literals ----
  const classResults = demoClasses();
  addOutput(
    "6. Classes + Inheritance + Getter/Setter",
    "Latihan Classes - poin 1 & 2",
    `DigitalProduct → ${classResults.digital}
PhysicalProduct → ${classResults.physical}
Total harga + ongkir → Rp${classResults.laptopTotal.toLocaleString("id-ID")}
Harga setelah setter → Rp${classResults.afterSetter.toLocaleString("id-ID")}
instanceof Product → ${classResults.inheritance.laptopIsProduct}
instanceof PhysicalProduct → ${classResults.inheritance.laptopIsPhysical}`,
  );

  const objResults = demoObjectLiterals();
  addOutput(
    "7. Enhanced Object Literals (Computed Keys)",
    "Latihan Classes - poin 3",
    `Property shorthand → ${JSON.stringify(objResults.shorthand)}
Method shorthand → ${objResults.methodShorthand}
Computed properties → ${JSON.stringify(objResults.computed, null, 2)}`,
  );

  const defaultParamsResults = demoDefaultParams();
  addOutput(
    "8. Default Parameters + Destructuring",
    "Latihan Classes - poin 4",
    `Dengan parameter → ${JSON.stringify(defaultParamsResults.withParams)}
Hanya default → ${JSON.stringify(defaultParamsResults.defaultOnly)}
Panggilan kosong → ${JSON.stringify(defaultParamsResults.emptyCall)}`,
  );

  // ---- Latihan 4: Modern Array Methods ----
  const arrayResults = demoArrayMethods();
  addOutput(
    "9. Modern Array Methods",
    "groupBy, average, flat, dan chaining filter+map+reduce",
    `groupBy (aktif/nonaktif) → ${JSON.stringify(arrayResults.groupByRole, null, 2)}
Rata-rata semua skor → ${arrayResults.averageScore}
Array bersarang → flat → ${JSON.stringify(arrayResults.flattened)}
Skor mahasiswa aktif > 75 → ${JSON.stringify(arrayResults.activeHighScores)}
Rata-rata aktif > 75 → ${arrayResults.avgActiveHigh}
Analisis kelulusan → ${JSON.stringify(arrayResults.analysis)}`,
  );

  // ---- Latihan 5: Async/Await (return elemen DOM) ----
  addOutput(
    "10. Async/Await (API Riil - JSONPlaceholder)",
    "Multi-fetch, retry backoff, loading state, error boundary, pagination, debounce",
    "",
  );
  const asyncOutput = demoAsyncAwait();
  document
    .querySelector(".output-item:last-child .result")
    .appendChild(asyncOutput);
}

// Hubungkan tombol "Run Demo" dengan fungsi eksekusi
document.getElementById("runBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";
  runAllDemos();
});
