// ==============================
// DATA KERANJANG
// ==============================

let keranjang = [];


// ==============================
// TAMBAH PRODUK
// ==============================

function tambahKeranjang(nama, harga) {

    const produk = keranjang.find(item => item.nama === nama);

    if (produk) {
        produk.jumlah++;
    } else {
        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    updateKeranjang();

    alert(nama + " berhasil ditambahkan ke keranjang!");
}


// ==============================
// UPDATE KERANJANG
// ==============================

function updateKeranjang() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let jumlahProduk = 0;


    if (keranjang.length === 0) {

        cartItems.innerHTML =
            "<p>Keranjang masih kosong.</p>";

    }


    keranjang.forEach((item, index) => {

        const subtotal = item.harga * item.jumlah;

        total += subtotal;
        jumlahProduk += item.jumlah;


        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div class="cart-info">

                <h4>${item.nama}</h4>

                <p>${formatRupiah(item.harga)}</p>

            </div>


            <div class="quantity">

                <button onclick="kurangi(${index})">
                    −
                </button>

                <span>${item.jumlah}</span>

                <button onclick="tambahJumlah(${index})">
                    +
                </button>

            </div>


            <strong>
                ${formatRupiah(subtotal)}
            </strong>


            <button 
                class="delete"
                onclick="hapusProduk(${index})"
            >
                🗑
            </button>

        `;

        cartItems.appendChild(div);

    });


    cartCount.textContent = jumlahProduk;

    cartTotal.textContent = formatRupiah(total);
}


// ==============================
// TAMBAH JUMLAH
// ==============================

function tambahJumlah(index) {

    keranjang[index].jumlah++;

    updateKeranjang();
}


// ==============================
// KURANGI JUMLAH
// ==============================

function kurangi(index) {

    keranjang[index].jumlah--;

    if (keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }

    updateKeranjang();
}


// ==============================
// HAPUS PRODUK
// ==============================

function hapusProduk(index) {

    keranjang.splice(index, 1);

    updateKeranjang();
}


// ==============================
// FORMAT RUPIAH
// ==============================

function formatRupiah(angka) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);
}


// ==============================
// BUKA KERANJANG
// ==============================

function bukaKeranjang() {

    document.getElementById("cartModal").style.display = "flex";
}


// ==============================
// TUTUP KERANJANG
// ==============================

function tutupKeranjang() {

    document.getElementById("cartModal").style.display = "none";
}


// ==============================
// CHECKOUT
// ==============================

function checkout() {

    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    const metode =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    if (!metode) {
        alert("Silakan pilih metode pembayaran terlebih dahulu!");
        return;
    }

    let total = keranjang.reduce(
        (jumlah, item) =>
            jumlah + item.harga * item.jumlah,
        0
    );

    alert(
        "Pesanan berhasil dibuat!\n\n" +
        "Metode pembayaran: " +
        metode.value +
        "\nTotal: " +
        formatRupiah(total)
    );

    keranjang = [];

    updateKeranjang();

    // Reset pilihan pembayaran
    metode.checked = false;

    tutupKeranjang();
}


// ==============================
// PENCARIAN PRODUK
// ==============================

function cariProduk() {

    const keyword =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const produk =
        document.querySelectorAll(".product-card");


    produk.forEach(item => {

        const nama =
            item.dataset.name.toLowerCase();


        if (nama.includes(keyword)) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });

}


// ==============================
// ENTER UNTUK SEARCH
// ==============================

document
    .getElementById("searchInput")
    .addEventListener("keyup", function(event) {

        if (event.key === "Enter") {
            cariProduk();
        }

    });


// ==============================
// LOAD AWAL
// ==============================

updateKeranjang();