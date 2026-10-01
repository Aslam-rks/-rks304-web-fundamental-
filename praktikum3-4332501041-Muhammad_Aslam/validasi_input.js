const form = document.getElementById("registerForm");

const rules = {
  username: (v) => {
    if (v.trim() === "") return "Username tidak boleh kosong";
    if (v.trim().length < 3) return "Username minimal 3 karakter";
    return "";
  },
  password: (v) => {
    if (v === "") return "Password tidak boleh kosong";
    if (v.length < 8) return "Password minimal 8 karakter";
    return "";
  },
  nama: (v) => {
    if (v.trim() === "") return "Nama tidak boleh kosong";
    return "";
  },
  tanggalLahir: (v) => {
    if (v === "") return "Tanggal lahir tidak boleh kosong";

    if (v > getToday()) return "tidak boleh di masa depan";
    return "";
  },
  alamat: (v) => {
    if (v.trim() === "") return "Alamat tidak boleh kosong";
    return "";
  },
  telepon: (v) => {
    if (v.trim() === "") return "Nomor telepon tidak boleh kosong";
    if (!v.trim().startsWith("62")) return "Nomor telepon harus diawali 62";
    return "";
  },
};



function getToday() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}


function showError(name, message) {
  const input = document.getElementById(name);
  const errorEl = document.getElementById(name + "-error");

  errorEl.textContent = message;
  errorEl.classList.toggle("hidden", message === "");
  input.classList.toggle("border-red-500", message !== "");
  input.classList.toggle("border-slate-300", message === "");
}



function validateField(name) {
  const message = rules[name](document.getElementById(name).value);
  showError(name, message);
  return message === "";
}



document.getElementById("tanggalLahir").max = getToday();

Object.keys(rules).forEach((name) => {
  const input = document.getElementById(name);
  input.addEventListener("blur", () => validateField(name));   
  input.addEventListener("input", () => validateField(name));  
});

form.addEventListener("submit", (event) => {
  let allValid = true;

  Object.keys(rules).forEach((name) => {
    if (!validateField(name)) allValid = false;
  });


  if (!allValid) event.preventDefault();
});
