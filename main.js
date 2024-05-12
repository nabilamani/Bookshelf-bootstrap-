document.addEventListener("DOMContentLoaded", function () {
  const inputbuku = document.getElementById("inputbuku");
  const kirim = document.getElementById("kirim");
  const belumselesai = document.getElementById("belumselesai");
  const sudahselesai = document.getElementById("sudahselesai");

  let buku = [];

  const rakbuku = localStorage.getItem("buku");
  if (rakbuku) {
    buku = JSON.parse(rakbuku);
  }

  function simpanbuku() {
    localStorage.setItem("buku", JSON.stringify(buku));
  }

  inputbuku.addEventListener("submit", function (a) {
    a.preventDefault();

    const judulbuku = document.getElementById("judulbuku").value;
    const penulisbuku = document.getElementById("penulisbuku").value;
    const tahun = Number(document.getElementById("tahun").value);
    const inputsudahselesai = document.getElementById("inputsudahselesai").checked;

    const jikasama = buku.some((buku) => buku.title === judulbuku);

    if (jikasama) {
      alert("Judul buku sudah tertera pada rak buku.");
    } else {
      const book = {
        id: new Date().getTime(),
        title: judulbuku,
        author: penulisbuku,
        year: tahun,
        isComplete: inputsudahselesai,
      };

      buku.push(book);
      simpanbuku();

      perbaruirakbuku();

      document.getElementById("judulbuku").value = "";
      document.getElementById("penulisbuku").value = "";
      document.getElementById("tahun").value = "";
      document.getElementById("inputsudahselesai").checked = false;
    }
  });

  function perbaruirakbuku() {
    belumselesai.innerHTML = "";
    sudahselesai.innerHTML = "";

    for (const book of buku) {
      const itembuku = buatitembuku(book);
      if (book.isComplete) {
        sudahselesai.appendChild(itembuku);
      } else {
        belumselesai.appendChild(itembuku);
      }
    }
  }

  function hapusbuku(id) {
    const index = buku.findIndex((book) => book.id === id);
    if (index !== -1) {
      buku.splice(index, 1);
      simpanbuku();
      perbaruirakbuku();
    }
  }

  function tombolselesai(id) {
    const index = buku.findIndex((book) => book.id == id);
    if (index != -1) {
      buku[index].isComplete = !buku[index].isComplete;
      simpanbuku();
      perbaruirakbuku();
    }
  }

  const caribuku = document.getElementById("caribuku");
  const carijudul = document.getElementById("carijudul");

  caribuku.addEventListener("submit", function (a) {
    a.preventDefault();
    const query = carijudul.value.toLowerCase().trim();

    const carihasil = buku.filter((book) => {
      return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.year.toString().includes(query)
      );
    });

    perbaruipencarianbuku(carihasil);
  });

  function perbaruipencarianbuku(hasil) {
    belumselesai.innerHTML = "";
    sudahselesai.innerHTML = "";

    for (const book of hasil) {
      const itembuku = buatitembuku(book);
      if (book.isComplete) {
        sudahselesai.appendChild(itembuku);
      } else {
        belumselesai.appendChild(itembuku);
      }
    }
  }

  function buatitembuku(book) {
    const itembuku = document.createElement("article");
    itembuku.className = "book_item";
    itembuku.style.marginBottom = "10px";
    itembuku.style.padding = "10px";
    itembuku.style.border = "solid #BC6FF1";
    itembuku.style.borderRadius = "5px";

    const actionButtons = document.createElement("div");
    actionButtons.className = "action";

    const title = document.createElement("h4");
    title.textContent = book.title;
    title.style.color = "#5fbe00";
    title.style.marginBottom = "10px";

    const author = document.createElement("p");
    author.textContent = "Penulis : " + book.author;
    author.style.color = "#464646";
    author.style.fontWeight = "500";
    author.style.marginBottom = "2px";

    const year = document.createElement("p");
    year.textContent = "Terbit : " + book.year;
    year.style.color = "#464646";
    year.style.fontWeight = "500";
    year.style.marginBottom = "2px";

    const tombolhapus = buataksitombol("Hapus Buku", "red", function () {
      hapusbuku(book.id);
    });

    let tombolbotton;
    if (book.isComplete) {
      tombolbotton = buataksitombol(
        "Belum Selesai di Baca",
        "yellow",
        function () {
          tombolselesai(book.id);
        }
      );
    } else {
      tombolbotton = buataksitombol("Selesai Dibaca", "green", function () {
        tombolselesai(book.id);
      });
    }

    tombolhapus.style.padding = "5px 10px";
    tombolhapus.style.margin = "10px";
    tombolhapus.style.border = "0";
    tombolhapus.style.backgroundColor = "#c4251a";
    tombolhapus.style.color = "white";
    tombolhapus.style.fontWeight = "bold";

    tombolbotton.style.padding = "5px 10px";
    tombolbotton.style.border = "0";
    tombolbotton.style.backgroundColor = "#5fbe00";
    tombolbotton.style.color = "white";
    tombolbotton.style.fontWeight = "bold";

    actionButtons.appendChild(tombolbotton);
    actionButtons.appendChild(tombolhapus);

    itembuku.appendChild(title);
    itembuku.appendChild(author);
    itembuku.appendChild(year);
    itembuku.appendChild(actionButtons);

    return itembuku;
  }

  function buataksitombol(text, className, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(className);
    button.addEventListener("click", clickHandler);
    return button;
  }

  perbaruirakbuku();
});
