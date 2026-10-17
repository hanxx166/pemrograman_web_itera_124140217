// ============================================================
// js/app.js
// Jawaban 5 Latihan Pertemuan 2 - JavaScript Next Gen (ES6+)
// PAW ITERA - Teknik Informatika
// ============================================================

// ------------------------------------------------------------
// LATIHAN 1A: Let & Const (Template Literals - poin 1 & 2)
// ------------------------------------------------------------
export function demoVariables() {
  // Poin 1: Coba ubah nilai const dan lihat error yang muncul
  let constErrorMsg = "Tidak ada error";
  try {
    // Dibungkus new Function + strict mode agar TypeError bisa ditangkap
    // tanpa menghentikan seluruh program demo
    new Function(`
      "use strict";
      const PI = 3.14;
      PI = 3.15;
    `)();
  } catch (e) {
    constErrorMsg = `${e.name}: ${e.message}`;
  }

  // const object: referensinya tetap, tapi ISINYA boleh dimutasi
  const user = { name: "Feldy", role: "Frontend" };
  user.role = "Frontend Developer"; // Boleh

  // Poin 2: Bandingkan behavior var di dalam dan luar block
  const scopeDemo = new Function(`
    var output = {};
    if (true) {
      var varInside = "var terbaca sampai luar block";
      let letInside = "let hanya hidup di dalam block";
    }
    output.varDiLuarBlock = varInside; // var bocor keluar
    try {
      output.letDiLuarBlock = letInside; // ReferenceError
    } catch (e) {
      output.letDiLuarBlock = e.name + ": " + e.message;
    }
    return output;
  `)();

  return {
    constError: constErrorMsg,
    constObjectMutable: user,
    varScope: scopeDemo.varDiLuarBlock,
    letScope: scopeDemo.letDiLuarBlock,
  };
}

// ------------------------------------------------------------
// LATIHAN 1B: Arrow Functions (Template Literals - poin 3)
// ------------------------------------------------------------
export function demoArrowFunctions() {
  // Berbagai sintaks arrow function
  const sayHello = () => "Hello, ITERA!"; // Tanpa parameter
  const square = (x) => x * x; // 1 param + implicit return
  const sum = (a, b) => a + b; // 2 param + implicit return
  const getFullName = (first, last) => {
    // Multi-line body
    const full = `${first} ${last}`;
    return full;
  };
  const createUser = (name) => ({ name, active: true }); // Return object (WAJIB pakai kurung)

  return {
    noParams: sayHello(),
    oneParam: square(5),
    twoParams: sum(3, 4),
    multiLine: getFullName("Feldy", "Pratama"),
    returnObject: createUser("Erhan"),
  };
}

// ------------------------------------------------------------
// LATIHAN 1C: Template Literals untuk HTML String (poin 4)
// ------------------------------------------------------------
export function demoTemplateLiterals() {
  const name = "Feldy";
  const age = 20;

  // Cara lama (concatenation)
  const oldWay = "Nama saya " + name + " dan umur saya " + age + " tahun.";

  // Cara modern (template literals)
  const newWay = `Nama saya ${name} dan umur saya ${age} tahun.`;

  // Dengan ekspresi dinamis
  const expression = `Tahun lahir: ${new Date().getFullYear() - age}`;

  // Template literals untuk HTML string (multi-baris)
  const products = [
    { name: "Laptop", price: 12000000 },
    { name: "Mouse", price: 150000 },
    { name: "Keyboard", price: 350000 },
  ];

  const htmlString = `
<ul class="product-list">
${products
  .map(
    (item) =>
      `  <li><strong>${item.name}</strong> - Rp${item.price.toLocaleString("id-ID")}</li>`,
  )
  .join("\n")}
</ul>`.trim();

  return { oldWay, newWay, expression, htmlString };
}

// ------------------------------------------------------------
// LATIHAN 2A: Destructuring (Destructuring - poin 1 & 4)
// ------------------------------------------------------------
export function demoDestructuring() {
  // Poin 1: Destructure object dengan NESTED properties minimal 3 level
  const student = {
    nim: "124140083",
    name: "Feldy",
    department: {
      name: "Teknik Informatika",
      faculty: {
        name: "Teknologi Industri",
        university: {
          name: "Institut Teknologi Sumatera",
          location: "Lampung Selatan",
        },
      },
    },
    hobbies: ["coding", "design"],
  };

  // Bongkar sampai level 3 (department → faculty → university)
  const {
    nim,
    name: studentName,
    department: {
      name: prodi,
      faculty: {
        university: { name: campus, location },
      },
    },
    hobbies: [firstHobby],
  } = student;

  // Poin 4: Destructuring dalam loop for...of
  const team = [
    { id: 1, name: "Erhan", role: "Project Manager" },
    { id: 2, name: "Dzaky", role: "Software Tester" },
    { id: 3, name: "Feldy", role: "Frontend Developer" },
    { id: 4, name: "Yabes", role: "UI/UX Designer" },
  ];

  const teamList = [];
  for (const { id, name, role } of team) {
    teamList.push(`User #${id}: ${name} - ${role}`);
  }

  return {
    nested: { nim, studentName, prodi, campus, location, firstHobby },
    forOf: teamList,
  };
}

// ------------------------------------------------------------
// LATIHAN 2B: Spread & Rest (Destructuring - poin 2 & 3)
// ------------------------------------------------------------
export function demoSpreadRest() {
  // Poin 2: Function dengan REST parameters → statistik (min, max, average)
  const getStatistics = (...numbers) => {
    if (numbers.length === 0) return { min: null, max: null, average: 0 };
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const total = numbers.reduce((sum, num) => sum + num, 0);
    const average = total / numbers.length;
    return { min, max, average };
  };

  // Poin 3: MERGE 3 objects dengan SPREAD + override beberapa properties
  const baseUser = { name: "Feldy", role: "student", active: true };
  const profile = { email: "feldy@student.itera.ac.id", role: "frontend-dev" };
  const preferences = { theme: "dark", active: false };

  // Object yang ditulis BELAKANGAN menimpa property yang sama
  const mergedUser = {
    ...baseUser,
    ...profile, // role → "frontend-dev"
    ...preferences, // active → false
    campus: "ITERA", // property baru
  };

  return {
    statistics: getStatistics(10, 25, 5, 40, 20),
    merged: mergedUser,
  };
}

// ------------------------------------------------------------
// LATIHAN 3A: Classes + Getter/Setter (Classes - poin 1 & 2)
// ------------------------------------------------------------
export function demoClasses() {
  // Poin 1 & 2: Class Product + inheritance + getter/setter
  class Product {
    constructor(name, price, stock = 0) {
      this.name = name;
      this._price = price; // underscore = konvensi "private"
      this.stock = stock;
    }

    // GETTER: dibaca seperti property biasa
    get price() {
      return this._price;
    }

    // SETTER: dengan validasi
    set price(value) {
      if (value < 0) throw new Error("Harga tidak boleh negatif!");
      this._price = value;
    }

    getInfo() {
      return `${this.name} - Rp${this.price.toLocaleString("id-ID")}`;
    }

    getDiscountedPrice(discount = 0) {
      return this._price * (1 - discount);
    }
  }

  // Inheritance: DigitalProduct extends Product
  class DigitalProduct extends Product {
    constructor(name, price, downloadUrl, fileSizeMB = 0) {
      super(name, price);
      this.downloadUrl = downloadUrl;
      this.fileSizeMB = fileSizeMB;
    }
    getInfo() {
      return `${super.getInfo()} [Digital | ${this.fileSizeMB} MB]`;
    }
  }

  // Inheritance: PhysicalProduct extends Product
  class PhysicalProduct extends Product {
    constructor(name, price, weightKg, shippingCost = 0) {
      super(name, price);
      this.weightKg = weightKg;
      this.shippingCost = shippingCost;
    }
    getTotalPrice() {
      return this.price + this.shippingCost;
    }
    getInfo() {
      return `${super.getInfo()} [Fisik | ${this.weightKg} kg]`;
    }
  }

  // Instansiasi
  const ebook = new DigitalProduct(
    "E-Book JS",
    50000,
    "https://example.com/dl",
    12,
  );
  const laptop = new PhysicalProduct("Laptop", 12000000, 2.5, 50000);

  // Uji getter & setter
  laptop.price = 11500000; // setter berjalan

  return {
    digital: ebook.getInfo(),
    physical: laptop.getInfo(),
    laptopTotal: laptop.getTotalPrice(),
    afterSetter: laptop.price,
    inheritance: {
      laptopIsProduct: laptop instanceof Product,
      laptopIsPhysical: laptop instanceof PhysicalProduct,
    },
  };
}

// ------------------------------------------------------------
// LATIHAN 3B: Computed Property Names (Classes - poin 3)
// ------------------------------------------------------------
export function demoObjectLiterals() {
  const prefix = "user";
  const dynamicKey = "status";

  // Property shorthand
  const name = "Feldy";
  const age = 20;
  const person = { name, age };

  // Method shorthand
  const greeter = {
    sayHello() {
      return "Hello!";
    },
  };

  // Poin 3: Computed property names (dynamic keys)
  const userData = {
    [`${prefix}_id`]: 124140083, // → user_id
    [`${prefix}_name`]: "feldy", // → user_name
    [dynamicKey.toUpperCase()]: "active", // → STATUS
    ["skill_" + 1]: "JavaScript",
    ["skill_" + 2]: "React",
  };

  return {
    shorthand: person,
    methodShorthand: greeter.sayHello(),
    computed: userData,
  };
}

// ------------------------------------------------------------
// LATIHAN 3C: Default Params + Destructuring (Classes - poin 4)
// ------------------------------------------------------------
export function demoDefaultParams() {
  // Poin 4: Combine DEFAULT PARAMETERS dengan DESTRUCTURING di parameter fungsi
  const createOrder = (
    { product, quantity = 1, discount = 0 } = {},
    taxRate = 0.11,
  ) => {
    if (!product) return { error: "Product wajib diisi!" };
    const subtotal = product.price * quantity;
    const discounted = subtotal * (1 - discount);
    const tax = discounted * taxRate;
    const total = discounted + tax;
    return {
      product: product.name,
      quantity,
      subtotal,
      tax: Math.round(tax),
      total: Math.round(total),
    };
  };

  const laptop = { name: "Laptop", price: 12000000 };

  return {
    withParams: createOrder({ product: laptop, quantity: 2, discount: 0.1 }),
    defaultOnly: createOrder({ product: laptop }),
    emptyCall: createOrder(), // aman karena default {}
  };
}

// ------------------------------------------------------------
// LATIHAN 4: Modern Array Methods (semua poin)
// ------------------------------------------------------------
export function demoArrayMethods() {
  const students = [
    { name: "Erhan", score: 85, active: true },
    { name: "Dzaky", score: 70, active: true },
    { name: "Aditya", score: 90, active: false },
    { name: "Feldy", score: 78, active: true },
    { name: "Jhon", score: 88, active: true },
    { name: "Yabes", score: 65, active: false },
  ];

  // Poin 1: groupBy menggunakan reduce()
  const groupBy = (array, keyFn) =>
    array.reduce((acc, item) => {
      const key = typeof keyFn === "function" ? keyFn(item) : item[keyFn];
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    }, {});

  // Poin 2: Rata-rata dari array of objects
  const averageBy = (array, key) => {
    if (array.length === 0) return 0;
    return array.reduce((sum, item) => sum + item[key], 0) / array.length;
  };

  // Poin 3: Transform array bersarang → flat
  const nestedData = [[1, 2], [3, [4, 5]], [[6, [7]]], 8];
  const flatAll = nestedData.flat(Infinity);

  // Poin 4: Gabungan filter + map + reduce (analisis kompleks)
  const activeHighScores = students
    .filter((s) => s.active && s.score > 75)
    .map((s) => s.score);

  const avgActiveHigh =
    activeHighScores.length > 0
      ? activeHighScores.reduce((sum, s) => sum + s, 0) /
        activeHighScores.length
      : 0;

  // Analisis lanjutan: grouping status kelulusan + total skor
  const analysis = students
    .map((s) => ({ ...s, status: s.score >= 75 ? "LULUS" : "REMED" }))
    .reduce(
      (acc, s) => {
        acc[s.status] = (acc[s.status] || 0) + 1;
        acc.totalScore += s.score;
        return acc;
      },
      { totalScore: 0 },
    );

  return {
    groupByRole: groupBy(students, (s) => (s.active ? "aktif" : "nonaktif")),
    averageScore: averageBy(students, "score").toFixed(2),
    flattened: flatAll,
    activeHighScores,
    avgActiveHigh: avgActiveHigh.toFixed(2),
    analysis,
  };
}

// ------------------------------------------------------------
// LATIHAN 5: Async Programming (semua 6 poin)
// ------------------------------------------------------------
export function demoAsyncAwait() {
  const container = document.createElement("div");
  container.className = "async-container";

  // Helper: buat section dengan status loading
  const createSection = (title) => {
    const section = document.createElement("div");
    section.className = "async-section";
    section.innerHTML = `<strong>${title}</strong><br /><span class="async-status">⏳ Memuat...</span>`;
    container.appendChild(section);
    return section.querySelector(".async-status");
  };

  const setStatus = (el, text, ok = true) => {
    el.innerHTML = `<span class="${ok ? "ok" : "err"}">${text}</span>`;
  };

  // ===== Poin 1: Fetch dari beberapa endpoint + gabungkan (PARALEL) =====
  const fetchCombinedData = async (userId = 1) => {
    try {
      const [userRes, postsRes, todosRes] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
        fetch(
          `https://jsonplaceholder.typicode.com/todos?userId=${userId}&_limit=3`,
        ),
      ]);
      const [user, posts, todos] = await Promise.all([
        userRes.json(),
        postsRes.json(),
        todosRes.json(),
      ]);
      return {
        success: true,
        user: user.name,
        totalPosts: posts.length,
        todos,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const combinedStatus = createSection("1. Fetch Multi-Endpoint + Promise.all");
  fetchCombinedData(1).then((result) => {
    if (result.success) {
      setStatus(
        combinedStatus,
        `User: ${result.user} | ${result.totalPosts} posts | ${result.todos.length} todos dimuat paralel`,
      );
    } else {
      setStatus(combinedStatus, `${result.error}`, false);
    }
  });

  // ===== Poin 2: Retry dengan Exponential Backoff =====
  const retryAsync = async (fn, retries = 3, baseDelay = 300) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn(attempt);
      } catch (error) {
        const isLast = attempt === retries;
        if (isLast) throw error;
        const delay = baseDelay * Math.pow(2, attempt - 1); // 300ms, 600ms, 1200ms
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  // Simulasi request yang gagal 2x lalu sukses di percobaan ke-3
  let attemptCounter = 0;
  const unstableRequest = () => {
    attemptCounter++;
    return new Promise((resolve, reject) => {
      if (attemptCounter < 3)
        reject(new Error(`Gagal di percobaan ${attemptCounter}`));
      else resolve(`Berhasil di percobaan ke-${attemptCounter}`);
    });
  };

  const retryStatus = createSection("2. Retry + Exponential Backoff");
  retryAsync(unstableRequest, 3, 300)
    .then((msg) => setStatus(retryStatus, `${msg} (delay 300ms → 600ms)`))
    .catch((err) => setStatus(retryStatus, `${err.message}`, false));

  // ===== Poin 3: Loading States untuk operasi async di UI =====
  const loadingStatus = createSection("3. Loading States");
  const loadWithState = async () => {
    setStatus(loadingStatus, "⏳ Loading... (menunggu data)", true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/2",
      );
      const data = await response.json();
      setStatus(loadingStatus, `Selesai memuat: ${data.name} (${data.email})`);
    } catch (error) {
      setStatus(loadingStatus, `Error: ${error.message}`, false);
    }
  };
  loadWithState();

  // ===== Poin 4: Error Boundary untuk error async =====
  class AsyncErrorBoundary {
    constructor() {
      this.errors = [];
    }
    async run(label, asyncFn) {
      try {
        return await asyncFn();
      } catch (error) {
        this.errors.push({ label, message: error.message });
        return null;
      }
    }
  }

  const errorStatus = createSection("4. Async Error Boundary");
  const boundary = new AsyncErrorBoundary();
  (async () => {
    // Request ke user yang tidak ada → 404 → ditangkap boundary
    const result = await boundary.run("fetch-invalid-user", async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users/99999",
      );
      if (!res.ok) throw new Error(`HTTP ${res.status} - user tidak ditemukan`);
      return await res.json();
    });
    if (result === null && boundary.errors.length > 0) {
      setStatus(
        errorStatus,
        `Error tertangkap: "${boundary.errors[0].message}" (aplikasi tetap berjalan)`,
      );
    }
  })();

  // ===== Poin 5: Pagination dengan async/await =====
  const fetchPaginated = async (resource = "posts", page = 1, limit = 5) => {
    const url = `https://jsonplaceholder.typicode.com/${resource}?_page=${page}&_limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    const total = Number(response.headers.get("x-total-count") || 0);
    return {
      data,
      page,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
    };
  };

  const pageStatus = createSection("5. Pagination (async/await)");
  fetchPaginated("posts", 1, 5)
    .then((p) =>
      setStatus(
        pageStatus,
        `Halaman ${p.page} dari ${p.totalPages} | Total ${p.total} data | hasNext: ${p.hasNext}`,
      ),
    )
    .catch((err) => setStatus(pageStatus, `${err.message}`, false));

  // ===== Poin 6: Debounced Search dengan async API calls =====
  const debounce = (fn, delay = 400) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  let executionCount = 0;
  const searchUsers = async (query) => {
    executionCount++;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?q=${encodeURIComponent(query)}`,
    );
    return await response.json();
  };
  const debouncedSearch = debounce(searchUsers, 400);

  const debounceStatus = createSection("6. Debounced Search");
  // Panggil 5x berturut-turut dengan cepat → hanya 1 yang benar-benar dieksekusi
  debouncedSearch("leanne");
  debouncedSearch("lea");
  debouncedSearch("leann");
  debouncedSearch("lean");
  debouncedSearch("leanne");

  setTimeout(() => {
    setStatus(
      debounceStatus,
      `Dipanggil 5x cepat, hanya ${executionCount} request yang dikirim (hemat API)`,
    );
  }, 1200);

  return container;
}
